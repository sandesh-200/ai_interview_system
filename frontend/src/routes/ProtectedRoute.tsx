import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.JSX.Element;
  allowedRoles?: ("admin" | "candidate")[]; // Optional: filter access by role
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. Show a loading state while checking the HttpOnly cookie session
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Loading session...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}