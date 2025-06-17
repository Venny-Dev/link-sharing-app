import { createContext, useContext, useState } from "react";

import { useGetUser } from "../reactQueryHooks/useAppFeatures";

const AuthContext = createContext();

function AuthProvider({ children }) {
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

  const { user, isGettingUser } = useGetUser();

  const value = {
    isGettingUser,
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
