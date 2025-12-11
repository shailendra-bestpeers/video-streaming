import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  roles?: string[]; 
  children: React.ReactNode;
}

const ProtectedRoute = ({ roles = [], children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // If roles array is empty → route is protected but no role restriction
  if (roles.length === 0) return <>{children}</>;

  // Check authorization
  if (!roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
