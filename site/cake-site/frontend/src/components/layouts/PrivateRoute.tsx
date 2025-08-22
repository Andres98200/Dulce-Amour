import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    // Redirige vers login si pas connecté
    return <Navigate to="/login" replace />;
  }

  return children;
};
