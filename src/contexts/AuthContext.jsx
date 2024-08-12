import { toast } from "react-toastify";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import { getUserProfile } from "../firebase/firebaseUtils";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
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

  const [isSigningOut, setIsSigningOut] = useState(false);

  const [errors, setErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (data) => {
      try {
        if (data) {
          const curUser = await getUserProfile(data?.uid);
          setUser(curUser);
          navigate("/app");
        } else {
          setUser(null);
        }
      } catch (err) {
        toast.error("Error getting user profile");
        // navigate("/login");
      } finally {
        setIsLoading(false);
      }

      return () => unsubscribe();
    });
  }, []);

  const value = {
    isLoading,
    setIsLoading,
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
    setUser,
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
