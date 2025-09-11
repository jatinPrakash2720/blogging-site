import type React from "react";
import ThemeToggle from "../common/wrappers/ThemeToggle";
import { AuthProgressBar } from "./auth-progress-bar";
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
