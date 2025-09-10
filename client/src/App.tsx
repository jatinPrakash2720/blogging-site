import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./components/features/route/PrivateRoute";
import PublicRoute from "./components/features/route/PublicRoute";
// Import your page components
// import HomePage from "./pages/HomePage";
import HomePage from "./pages/HomePage2";
// import HomePage from "./pages/HomePage1";
import ProfilePage from "./pages/ProfilePage";
import BlogDetailPage from "./pages/BlogDetailPage";
import AuthPage from "./pages/AuthPage";
import BlogEditorPage from "./pages/EditorPage";
import BlogPreviewPage from "./pages/PreviewPage";
import {ProfilePage as UserProfilePage} from "./pages/UserProfilePage";
function App() {
  return (
    <Routes>
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
        path="/blog/:slug"
        element={
          <PrivateRoute>
            <BlogDetailPage />
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
        path="/blog/write"
        element={
          <PrivateRoute>
            <BlogEditorPage />
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
    // <Routes>
    //   {/* Main App Routes */}
    //   <Route path="/" element={<HomePage />} />
    //   <Route path="/profile" element={<UserProfilePage />} />
    //   <Route path="/profile/:username" element={<ProfilePage />} />
    //   <Route path="/blog/:slug" element={<BlogDetailPage />} />

    //   <Route path="/auth/login" element={<AuthPage mode="login" />} />
    //   <Route path="/auth/register" element={<AuthPage mode="register" />} />
    //   <Route
    //     path="/auth/profile-setup"
    //     element={<AuthPage mode="profile-setup" />}
    //   />
    //   <Route
    //     path="/auth/forgot-password"
    //     element={<AuthPage mode="forgot-password" />}
    //   />
    //   <Route path="/auth/verify-otp" element={<AuthPage mode="verify-otp" />} />
    //   <Route
    //     path="/auth/restore-password"
    //     element={<AuthPage mode="reset-password" />}
    //   />
    //   <Route
    //     path="/auth/restore-password/:token"
    //     element={<AuthPage mode="reset-password" />}
    //   />

    //   {/* Auth Legacy Routes - Redirecting to new unified auth system */}
    //   <Route path="/login" element={<Navigate to="/auth/login" replace />} />
    //   <Route
    //     path="/register"
    //     element={<Navigate to="/auth/register" replace />}
    //   />
    //   <Route
    //     path="/profile-setup"
    //     element={<Navigate to="/auth/profile-setup" replace />}
    //   />
    //   <Route
    //     path="/forgot-password"
    //     element={<Navigate to="/auth/forgot-password" replace />}
    //   />
    //   <Route
    //     path="/verify-otp"
    //     element={<Navigate to="/auth/verify-otp" replace />}
    //   />
    //   <Route
    //     path="/restore-password"
    //     element={<Navigate to="/auth/restore-password" replace />}
    //   />

    //   {/* Blog Routes */}
    //   <Route path="/blog/write" element={<BlogEditorPage />} />
    //   <Route path="/blog/preview" element={<BlogPreviewPage />} />
    //   {/* <Route path="/editor" element={<SimpleEditor />} />
    //   <Route path="/view" element={<SimpleEditorTrial />} />
    //   <Route path="/preview" element={<BlogPreview content={content} />} /> */}
    //   {/* Development/Testing Route */}
    // </Routes>
  );
}

export default App;
