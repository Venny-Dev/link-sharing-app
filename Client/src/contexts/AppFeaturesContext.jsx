import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
// import { useAuth } from "./AuthContext";

// import { updateUserProfile } from "../firebase/firebaseUtils";
// import { getUserProfile } from "../firebase/firebaseUtils";
import { toast } from "react-toastify";
import {
  options,
  validateLinksInputFields,
  handleLinkChange,
} from "../firebase/helpers";

import {
  useGetLinks,
  useUpdateLinks,
  useUpdateUser,
} from "../reactQueryHooks/useAppFeatures";

const AppFeaturesContexts = createContext();

function AppFeaturesProvider({ children }) {
  // const { user, setIsLoading } = useAuth();
  const [errorId, setErrorId] = useState([]);
  const [image, setImage] = useState(null);
  const { links, isGettingLinks } = useGetLinks();
  const [amtOfLinkContainer, setAmtOfLinkContainer] = useState([]);
  const { saveLinks, isSavingLinks } = useUpdateLinks();
  const { updateUser, isUpdating } = useUpdateUser();

  useEffect(() => {
    if (!isGettingLinks) {
      setAmtOfLinkContainer(links);
    }
  }, [links]);

  function handleAddLinkContainer() {
    const newId = amtOfLinkContainer.length ? amtOfLinkContainer.length + 1 : 1;

    // console.log(options);

    setAmtOfLinkContainer([
      ...amtOfLinkContainer,
      {
        id: newId,
        value: options[0].value,
        icon: options[0].icon,
        link: options[0].defaultValue,
        label: "",
      },
    ]);
  }

  async function handleRemoveLinkContainer(selectedId) {
    const updatedContainers = amtOfLinkContainer.filter(
      ({ id }) => id !== selectedId
    );
    if (updatedContainers.length === 0) {
      try {
        setAmtOfLinkContainer([]);
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      setAmtOfLinkContainer((prevContainers) => {
        const newContainers = prevContainers.filter(
          ({ id }) => id !== selectedId
        );
        return newContainers;
      });
    }
  }

  function handlePlatformChange(selected, id) {
    setAmtOfLinkContainer((prevContainers) =>
      prevContainers.map((prevContaier) =>
        prevContaier.id === id ? { ...prevContaier, ...selected } : prevContaier
      )
    );
  }

  async function handleUpdateLink(e) {
    e.preventDefault();

    const errors = validateLinksInputFields(amtOfLinkContainer);
    setErrorId(errors);

    if (errors.length > 0) {
      return;
    }

    const links = amtOfLinkContainer.map(
      ({ label, icon, value: name, ...link }) => ({
        ...link,
        name,
      })
    );

    saveLinks({ links });
  }

  function handleInputChange(e, setUserLink, id, defaultValue) {
    setUserLink((prevPlatformAndLink) => ({
      ...prevPlatformAndLink,
      userLink: e.target.value.startsWith(defaultValue)
        ? e.target.value
        : defaultValue,
    }));

    setErrorId((prevIds) => prevIds.filter((prevId) => prevId.id !== id));

    handleLinkChange(e.target.value, id, setAmtOfLinkContainer);
  }

  const handleChangeUserData = useCallback((e, userData, setUserDetails) => {
    if (e.target.placeholder.includes("John")) {
      setUserDetails({ ...userData, firstName: e.target.value });
    }
    if (e.target.placeholder.includes("Appleseed")) {
      setUserDetails({ ...userData, lastName: e.target.value });
    }
    if (e.target.placeholder.includes("example")) {
      setUserDetails({ ...userData, email: e.target.value });
    }
  }, []);

  async function handleProfileSubmit(e, userDetails) {
    e.preventDefault();

    // console.log(userDetails);

    if (!userDetails.firstName || !userDetails.lastName) {
      return toast.error("First and Last name is required");
    }

    const formData = new FormData();

    formData.append("firstName", userDetails.firstName);
    formData.append("lastName", userDetails.lastName);

    if (image) {
      formData.append("photo", image);
    }

    updateUser(formData);

    // try {
    //   toast.success("Profile updated successfully");
    // } catch (error) {
    //   toast.error(error.message);
    // } finally {
    //   setIsLoading(false);
    // }
  }

  return (
    <AppFeaturesContexts.Provider
      value={{
        handleAddLinkContainer,
        handleRemoveLinkContainer,
        amtOfLinkContainer,
        options,
        handleUpdateLink,
        setAmtOfLinkContainer,
        handlePlatformChange,
        errorId,
        handleInputChange,
        handleProfileSubmit,
        handleChangeUserData,
        setImage,
        isSavingLinks,
        isUpdating,
      }}
    >
      {children}
    </AppFeaturesContexts.Provider>
  );
}

function useAppFeatures() {
  const context = useContext(AppFeaturesContexts);

  if (context === undefined)
    throw new Error("Context was used outside of its provider");
  return context;
}

export { useAppFeatures, AppFeaturesProvider };
