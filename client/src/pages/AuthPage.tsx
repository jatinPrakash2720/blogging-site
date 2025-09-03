"use client";

import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { SignInPage } from "@/components/features/auth/SignIn";
import { SignUpPage } from "@/components/features/auth/SignUp";
import { ProfileSetup } from "@/components/features/auth/ProfileSetup";
import { ForgotPassword } from "@/components/features/auth/ForgotPassword";
import { OTPVerificationPage as OTPVerificationFeature } from "@/components/features/auth/OTPVerification";
import { RestorePassword } from "@/components/features/auth/RestorePassword";
import { useAuth } from "@/store/auth";
import AuthLayout from "@/components/layout/AuthLayout";
import type { Testimonial } from "@/types/components/features/auth";

export type AuthMode =
  | "login"
  | "register"
  | "profile-setup"
  | "forgot-password"
  | "verify-otp"
  | "reset-password";

interface AuthPageProps {
  mode: AuthMode;
}

const AuthPage: React.FC<AuthPageProps> = ({ mode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useParams<{ token: string }>();
  const { login, register, forgotPassword, restorePassword, clearAuthError } =
    useAuth();

  // Sample testimonials for register page
  const sampleTestimonials: Testimonial[] = [
    {
      avatarSrc: "https://randomuser.me/api/portraits/women/57.jpg",
      name: "Sarah Chen",
      handle: "@sarahdigital",
      text: "Amazing platform! The user experience is seamless and the features are exactly what I needed.",
    },
    {
      avatarSrc: "https://randomuser.me/api/portraits/men/64.jpg",
      name: "Marcus Johnson",
      handle: "@marcustech",
      text: "This service has transformed how I work. Clean design, powerful features, and excellent support.",
    },
    {
      avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "David Martinez",
      handle: "@davidcreates",
      text: "I've tried many platforms, but this one stands out. Intuitive, reliable, and genuinely helpful for productivity.",
    },
  ];

  // Login handlers
  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (email && password) {
      await login({ email, password });
    }
  };

  // Register handlers
  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const registrationData = Object.fromEntries(formData.entries());
    console.log("Collected registration data, navigating to profile setup...");
    navigate("/auth/profile-setup", { state: { registrationData } });
  };

  // Profile setup handlers
  const registrationData = location.state?.registrationData;

  React.useEffect(() => {
    if (mode === "profile-setup" && !registrationData) {
      console.error(
        "No registration data found, redirecting to register page."
      );
      navigate("/auth/register");
    }
  }, [mode, registrationData, navigate]);

  const handleProfileComplete = async (profileData: {
    avatar?: File;
    coverImage?: File;
  }) => {
    const finalFormData = new FormData();

    for (const key in registrationData) {
      finalFormData.append(key, registrationData[key]);
    }

    if (profileData.avatar) {
      finalFormData.append("avatar", profileData.avatar);
    }

    if (profileData.coverImage) {
      finalFormData.append("coverImage", profileData.coverImage);
    }

    console.log("Sending complete registration data to the backend...");
    await register(finalFormData);
  };

  const handleProfileSkip = async () => {
    console.log("Skipping profile setup, sending only registration data...");
    const finalFormData = new FormData();
    for (const key in registrationData) {
      finalFormData.append(key, registrationData[key]);
    }
    await register(finalFormData);
  };

  // Forgot password handlers
  const handleResetPassword = async (identifier: string): Promise<boolean> => {
    clearAuthError();
    const success = await forgotPassword({ identifier: identifier });
    return success;
  };

  // OTP verification handlers
  const handleVerifyOTP = (otp: string) => {
    console.log("Verifying OTP:", otp);
    navigate("/auth/profile-setup");
  };

  const handleResendCode = () => {
    console.log("Resending OTP code...");
  };

  // Reset password handlers
  const handleRestorePassword = async (password: string): Promise<boolean> => {
    if (!token) {
      console.error("No reset token found in URL.");
      return false;
    }
    clearAuthError();
    const success = await restorePassword(token, { password });
    return success;
  };

  // Navigation handlers
  const handleCreateAccount = () => navigate("/auth/register");
  const handleSignInNav = () => navigate("/auth/login");
  const handleForgotPassword = () => navigate("/auth/forgot-password");
  const handleGoBack = () => {
     if (mode === "forgot-password" || mode === "verify-otp") {
       navigate("/auth/login");
     }
  };
  const handleGoToSignIn = () => navigate("/auth/login");

  const renderAuthComponent = () => {
    switch (mode) {
      case "login":
        return (
          <SignInPage
            onSignIn={handleSignIn}
            onCreateAccount={handleCreateAccount}
            onResetPassword={handleForgotPassword}
            heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
          />
        );

      case "register":
        return (
          <SignUpPage
            heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
            onSignUp={handleSignUp}
            onSignIn={handleSignInNav}
            testimonials={sampleTestimonials}
          />
        );

      case "profile-setup":
        return (
          <ProfileSetup
            onComplete={handleProfileComplete}
            onSkip={handleProfileSkip}
          />
        );

      case "forgot-password":
        return (
          <ForgotPassword
            onResetPassword={handleResetPassword}
            onGoBack={handleGoBack}
            heroImageSrc="https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=2070&auto=format&fit=crop"
          />
        );

      case "verify-otp":
        return (
          <OTPVerificationFeature
            onVerifyOTP={handleVerifyOTP}
            onResendCode={handleResendCode}
            onGoBack={handleGoBack}
            heroImageSrc="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1950&auto=format&fit=crop"
            testimonials={[]}
          />
        );

      case "reset-password":
        return (
          <RestorePassword
            onRestorePassword={handleRestorePassword}
            onGoToSignIn={handleGoToSignIn}
            heroImageSrc="https://images.unsplash.com/photo-1528460033278-a6457c209501?q=80&w=1912&auto=format&fit=crop"
            onGoBack={handleGoBack}
          />
        );

      default:
        return null;
    }
  };

  return <AuthLayout>{renderAuthComponent()}</AuthLayout>;
};

export default AuthPage;
