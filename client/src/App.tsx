import { Routes, Route } from "react-router-dom";

// Import your page components
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import ProfilePage from "./pages/authentication/ProfilePage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ComponentPlayground from "./pages/ComponentPlayground";
import ProfileSetupPage from "./pages/authentication/ProfileSetupPage";
import ForgotPasswordPage from "./pages/authentication/ForgotPasswordPage";
import OTPVerificationPage from "./pages/authentication/OTPVerificationPage";
import RestorePasswordPage from "./pages/authentication/RestorePasswordPage";

function App() {
  return (
    <Routes>
      {/* Main App Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/profile/:username" element={<ProfilePage />} />
      <Route path="/blog/:slug" element={<BlogDetailPage />} />

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile-setup" element={<ProfileSetupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-otp" element={<OTPVerificationPage />} />
      <Route path="/restore-password/:token" element={<RestorePasswordPage />} />

      {/* Development/Testing Route */}
      <Route path="/playground" element={<ComponentPlayground />} />
    </Routes>
  );
}

export default App;
