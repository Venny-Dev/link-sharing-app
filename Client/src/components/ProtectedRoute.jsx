import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoaderFull from "./LoaderFull";

function ProtectedRoute({ children }) {
  const { user, isGettingUser } = useAuth();

  if (isGettingUser) {
    return <LoaderFull />;
  }

  if (!user && !isGettingUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
