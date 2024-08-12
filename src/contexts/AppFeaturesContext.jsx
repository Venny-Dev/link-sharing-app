import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

import { updateUserLink, updateUserProfile } from "../firebase/firebaseUtils";
import { toast } from "react-toastify";
import {
  options,
  validateLinksInputFields,
  handleLinkChange,
} from "../firebase/helpers";

import { getUserProfile } from "../firebase/firebaseUtils";

const AppFeaturesContexts = createContext();

function AppFeaturesProvider({ children }) {
  const { user, setIsLoading } = useAuth();
  const [amtOfLinkContainer, setAmtOfLinkContainer] = useState([]);
  const [errorId, setErrorId] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (user) {
      setAmtOfLinkContainer(user.links || []);
    } else {
      setAmtOfLinkContainer([]);
    }
  }, [user]);

  function handleAddLinkContainer() {
    const newId = amtOfLinkContainer.length
      ? amtOfLinkContainer[amtOfLinkContainer.length - 1].id + 1
      : 1;

    setAmtOfLinkContainer([
      ...amtOfLinkContainer,
      {
        id: newId,
        value: options[0].value,
        icon: options[0].icon,
        link: "",
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
        // await updateUserLink(user.id, []);
        setAmtOfLinkContainer([]);
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      setAmtOfLinkContainer((prevContainers) => {
        const newContainers = prevContainers.filter(
          ({ id }) => id !== selectedId
        );
        updateUserLink(user.id, newContainers).catch((err) => {
          toast.error(err.message);
        });
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

    setIsLoading(true);
    try {
      await updateUserLink(user.id, amtOfLinkContainer);
      toast.success("Link(s) updated successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputChange(e, setUserLink, id) {
    setUserLink((prevPlatformAndLink) => ({
      ...prevPlatformAndLink,
      userLink: e.target.value,
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

  async function handleProfileSubmit(e, userDetails, setUser) {
    e.preventDefault();

    setIsLoading(true);

    try {
      await updateUserProfile(user.id, userDetails);
      console.log("User profile updated successfully:", userDetails);
      console.log(user);

      const updatedUser = await getUserProfile(user.id);

      console.log(updatedUser);
      setUser(updatedUser);

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
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
