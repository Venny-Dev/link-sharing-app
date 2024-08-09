import { toast } from "react-toastify";
import { handleLogin, handleSignup } from "../firebase/auth";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { getUserProfile } from "../firebase/firebaseUtils";
// import { useNavigate } from "react-router-dom";
import { validateLoginData } from "../firebase/helpers";

const AuthContext = createContext();

// console.log(auth.currentUser);

function handleChange(e, setterFunc, variable, errors) {
  if (e.target.type === "email") {
    delete errors.email;
    setterFunc({
      ...variable,
      email: e.target.value,
    });
  }

  if (e.target.type === "password") {
    delete errors.password;
    setterFunc({
      ...variable,
      password: e.target.value,
    });
  }
}

async function handleSubmit(userData, setErrorFunc, navigate, setIsLoading) {
  const validationErrors = validateLoginData(userData);
  setErrorFunc(validationErrors);

  // For creating account
  if (Object.keys(validationErrors).length === 0 && userData?.confirmPassword) {
    setIsLoading(true);
    try {
      const user = await handleSignup(userData.email, userData.password);

      // console.log(user);
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          firstName: "",
          lastName: "",
          email: userData.email,
          links: [],
          profilePicture: "",
          id: user.uid,
        });
      }
      toast.success("Account created successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  // For logging in
  if (
    Object.keys(validationErrors).length === 0 &&
    !userData?.confirmPassword
  ) {
    setIsLoading(true);
    try {
      await handleLogin(userData.email, userData.password);

      navigate("/app");
      toast.success("Login sucess");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }
}

function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [createAccountData, setCreateAccountData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  // const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, async (data) => {
      try {
        if (data) {
          const curUser = await getUserProfile(data?.uid);
          setUser(curUser);
        } else {
          setUser(null);
        }
      } catch (err) {
        // console.log("User not signed in");
        toast.error("Error getting user profile");
      } finally {
        setIsLoading(false);
      }
    });
  }, []);

  // useEffect(() => {
  //   if (!isLoading) {
  //     if (user) {
  //       // console.log(user);
  //       // toast.success("Welcome 😊");
  //     } else {
  //       toast.error("User not signed in");
  //       navigate("/login");
  //     }
  //   }
  // }, [user, isLoading, navigate]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        createAccountData,
        setCreateAccountData,
        errors,
        setErrors,
        loginData,
        setLoginData,
        handleSubmit,
        handleChange,
        loginErrors,
        setLoginErrors,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("Context was used outside of its provider");
  return context;
}
export { useAuth, AuthProvider };
