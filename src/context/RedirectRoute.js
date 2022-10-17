import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const RedirectRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    // user is not authenticated
    return <Navigate to="/dashboard" />;
  }
  return children;
};