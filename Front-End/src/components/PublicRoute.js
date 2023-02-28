import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
  const isLogined = useSelector((state) => state.auth.isLogined);

  return isLogined ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
