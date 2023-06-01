import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("token");

  useEffect(() => {
    if ( ! isAuth) {
      navigate("/login", { replace: true });
    }
  }, [isAuth, navigate]);

  return isAuth ? children : null;
};

export default ProtectedRoute;
