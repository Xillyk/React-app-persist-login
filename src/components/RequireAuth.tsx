import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hook/useAuth";
import { Role, Roles } from "@/interface/Role";
import jwt_decode from "jwt-decode";
import { AccessTokenPayload } from "@/interface/Token";
interface Props {
  allowedRoles: Roles;
}

const RequireAuth = ({ allowedRoles }: Props) => {
  const { auth } = useAuth();
  const location = useLocation();

  const decoded: AccessTokenPayload | undefined = auth?.accessToken
    ? jwt_decode(auth?.accessToken)
    : undefined;
  const roles = decoded?.userInfo?.roles || [];

  return roles.find((role: Role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
