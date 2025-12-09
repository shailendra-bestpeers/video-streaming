import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Permissions, Role } from "../config/permissions";
import { ROLE_PERMISSIONS } from "../config/roles";

interface ProtectedRouteProps {
  children: React.ReactNode;
  permissions?: Permissions[];
}

const ProtectedRoute = ({ children, permissions = [] }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  const role = user.role as Role;

  // Admin override
  if (role === "admin") return children;

  const userPermissions = ROLE_PERMISSIONS[role]; // <-- NOW typed correctly as Permissions[]

  const allowed = permissions.every((p) => userPermissions.includes(p));

  if (!allowed) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default ProtectedRoute;
