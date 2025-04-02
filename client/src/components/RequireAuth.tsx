import { useAuth } from "@/store/useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(auth);
  return auth?.accessToken ? <Outlet /> : <Navigate to="/start" state={{ from: location }} replace />;
};
