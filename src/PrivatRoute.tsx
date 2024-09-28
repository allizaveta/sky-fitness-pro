import { Navigate } from "react-router-dom";
import { useAppSelector } from "./store/store";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};
