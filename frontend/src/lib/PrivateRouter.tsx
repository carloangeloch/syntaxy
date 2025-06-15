import { Outlet, Navigate } from "react-router-dom";
import { userAuthStore } from "../store/authStore";

const PrivateRouter = () => {
  const { authUser } = userAuthStore();
  return Object.keys(authUser).length === 0 ? (
    <Navigate to="/login" />
  ) : (
    <Outlet />
  );
};

export default PrivateRouter;
