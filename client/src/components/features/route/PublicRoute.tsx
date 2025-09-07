import React, {type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../store/auth"; // Corrected path
import Loader from "@/components/ui/Loader"; // Corrected path

/**
 * A component that renders its children only if the user is NOT authenticated.
 * While checking for authentication, it shows a loading indicator.
 * If the user is already authenticated, it redirects them to the homepage.
 */
const PublicRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAuthReady } = useAuth();

  // Show a loading spinner while the auth state is being determined.
  if (!isAuthReady) {
    return <Loader />;
  }

  // If the user is already logged in, redirect them away from public-only pages.
  if (isAuthenticated) {
    return <Navigate to="/" replace />; // Redirect to the homepage
  }

  // If the user is not authenticated, render the public component (e.g., Login, Register).
  return <>{children}</>;
};

export default PublicRoute;
