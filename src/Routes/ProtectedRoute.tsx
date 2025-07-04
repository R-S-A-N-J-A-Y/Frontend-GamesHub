import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const {
    state: { isLogged },
  } = useAuth();
  const Navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) Navigate("/");
  }, [isLogged, Navigate]);
  return isLogged ? <Outlet /> : <></>;
};

export default ProtectedRoute;
