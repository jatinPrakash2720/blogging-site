import type React from "react";
import ThemeToggle from "../common/wrappers/ThemeToggle";
import { AuthProgressBar } from "./auth-progress-bar";
import type { AuthMode } from "@/pages/AuthPage";
interface AuthLayoutProps {
  children: React.ReactNode;
}
import "../../assets/pexels-splitshire-1526.jpg";
import ParticleBackground from "../common/background/ParticeBackground";
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <ParticleBackground className="fixed inset-0 -z-10" quantity={250} />
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-3 right-3 z-50 ">
        <ThemeToggle className="hidden md:block" />
      </div>

      <AuthProgressBar className="hidden md:block" />

      {children}
    </div>
  );
};

export default AuthLayout;

//  <div
//    className="min-h-screen flex items-center justify-center p-4"
//    style={{
//      backgroundImage: "url('/bg.jpeg')",
//      backgroundSize: "cover",
//      backgroundPosition: "center",
//      backgroundRepeat: "no-repeat",
//    }}
//  >
// //    <AuthCard
//      isLoading={isLoading}
//      email={email}
//      setEmail={setEmail}
//      password={password}
//      setPassword={setPassword}
//      rememberMe={rememberMe}
//      setRememberMe={setRememberMe}
//      onSignIn={handleSignIn}
//      onSignUp={handleSignUp}
//      onSocialLogin={handleSocialLogin}
//      onForgotPassword={handleForgotPassword}
//    />
//    <Toaster />
//  </div>;
