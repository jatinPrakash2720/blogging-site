import type React from "react";
import ThemeToggle from "../common/wrappers/ThemeToggle";
import { AuthProgressBar } from "./auth-progress-bar";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-background relative flex items-center justify-center">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <AuthProgressBar />

      <div className="relative w-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
