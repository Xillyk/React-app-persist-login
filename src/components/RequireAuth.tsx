import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hook/useAuth";
import { Role, Roles } from "@/interface/Role";

interface Props {
  allowedRoles: Roles;
}

const RequireAuth = ({ allowedRoles }: Props) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role: Role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
