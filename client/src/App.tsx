import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./components/features/route/PrivateRoute";
import PublicRoute from "./components/features/route/PublicRoute";
// Import your page components
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import BlogPreviewPage from "./pages/PreviewPage";
import {ProfilePage as UserProfilePage} from "./pages/UserProfilePage";
import { Loader } from "lucide-react";
function App() {
  return (
    <Routes>
      <Route path="/auth/google/callback" element={<Loader />} />
      <Route path="/auth/github/callback" element={<Loader />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/blog/:blogId"
        element={
          <PrivateRoute>
            <BlogPreviewPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/blog/preview"
        element={
          <PrivateRoute>
            <BlogPreviewPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/auth/login"
        element={
          <PublicRoute>
            <AuthPage mode="login" />
          </PublicRoute>
        }
      />
      <Route
        path="/auth/register"
        element={
          <PublicRoute>
            <AuthPage mode="register" />
          </PublicRoute>
        }
      />
      <Route
        path="/auth/profile-setup"
        element={
          <PublicRoute>
            <AuthPage mode="profile-setup" />
          </PublicRoute>
        }
      />
      <Route
        path="/auth/verify-otp"
        element={
          <PublicRoute>
            <AuthPage mode="verify-otp" />
          </PublicRoute>
        }
      />
      <Route
        path="/auth/restore-password"
        element={
          <PublicRoute>
            <AuthPage mode="reset-password" />
          </PublicRoute>
        }
      />
      <Route
        path="/auth/restore-password/:token"
        element={
          <PublicRoute>
            <AuthPage mode="reset-password" />
          </PublicRoute>
        }
      />

      {/* --- Legacy Redirects --- */}
      <Route path="/login" element={<Navigate to="/auth/login" replace />} />
      <Route
        path="/register"
        element={<Navigate to="/auth/register" replace />}
      />
      <Route
        path="/profile-setup"
        element={<Navigate to="/auth/profile-setup" replace />}
      />
      <Route
        path="/forgot-password"
        element={<Navigate to="/auth/forgot-password" replace />}
      />
      <Route
        path="/verify-otp"
        element={<Navigate to="/auth/verify-otp" replace />}
      />
      <Route
        path="/restore-password"
        element={<Navigate to="/auth/restore-password" replace />}
      />
    </Routes>
  );
}
export default App;
