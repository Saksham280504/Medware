import { Navigate } from "react-router-dom";
import { useGlobalContext } from "./context";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useGlobalContext();

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;