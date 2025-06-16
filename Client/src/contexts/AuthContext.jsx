import { toast } from "react-toastify";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import { getUserProfile } from "../firebase/firebaseUtils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetUser } from "../reactQueryHooks/useAppFeatures";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [createAccountData, setCreateAccountData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isSigningOut, setIsSigningOut] = useState(false);

  const [errors, setErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState({});
  // const [user, setUser] = useState(null);
  const location = useLocation();
  const { id } = useParams();
  const currentPath = location.pathname;

  const { user, isGettingUser } = useGetUser();
  // const [isLoading, setIsLoading] = useState(isGettingUser);

  // useEffect(() => {
  //   setIsLoading(true);
  //   onAuthStateChanged(auth, async (data) => {
  //     try {
  //       if (data) {
  //         const curUser = await getUserProfile(data?.uid);
  //         setUser(curUser);
  //         // console.log(currentPath);

  //         const previewId = location.pathname.split("/preview/")[1];
  //         if (
  //           location.pathname.startsWith("/preview") &&
  //           previewId === undefined
  //         ) {
  //           return;
  //         }
  //         if (location.pathname.startsWith("/app")) {
  //           // navigate("/app");
  //           return;
  //         }
  //         if (
  //           location.pathname.startsWith("/preview") &&
  //           previewId !== undefined
  //         ) {
  //           return;
  //         }
  //         // console.log(location.pathname);
  //       } else {
  //         setUser(null);
  //       }
  //     } catch (err) {
  //       toast.error("Error getting user profile");
  //       // navigate("/login");
  //     } finally {
  //       setIsLoading(false);
  //     }

  //     // return () => unsubscribe();
  //   });
  // }, []);

  const value = {
    // isLoading,
    isGettingUser,
    // setIsLoading,
    createAccountData,
    setCreateAccountData,
    errors,
    setErrors,
    loginData,
    setLoginData,
    loginErrors,
    setLoginErrors,
    user,
    isSigningOut,
    setIsSigningOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("Context was used outside of its provider");
  return context;
}
export { useAuth, AuthProvider };
