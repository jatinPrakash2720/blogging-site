"use client";

import type React from "react";
import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, Shield, FileText } from "lucide-react";
import { continueWithGoogle } from "@/lib/auth";
import { GlassInputWrapper } from "@/components/common/subComps/GlassInputWrapper";
import type { SignUpPageProps } from "@/types/components/features/auth";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import FocusTrackingInput from "@/components/common/wrappers/FocusTrackingInput";
import Button from "@/components/common/wrappers/Button";
import Checkbox from "@/components/common/wrappers/Checkbox";
import { useTheme } from "@/store/theme";

export const SignUpPage: React.FC<SignUpPageProps> = ({
  title = (
    <span className="font-light text-foreground tracking-tighter">
      Create Account
    </span>
  ),
  description = "Join our community and start your journey with us today",
  heroImageSrc,
  testimonials = [],
  onSignUp,
  onSignIn,
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="h-screen flex flex-col md:flex-row font-sans w-screen bg-transparent">
      {/* Right column: hero image + testimonials */}
      {heroImageSrc && (
        <section className="hidden md:block flex-1 relative p-4">
          <div
            className="animate-app-zoom-in duration-[0.5s] absolute inset-4 rounded-3xl bg-cover bg-center "
            style={{ backgroundImage: `url(${heroImageSrc})` }}
          ></div>
        </section>
      )}
      {/* Left column: sign-up form */}
      <section className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-4">
            <h1 className="animate-app-fade-in duration-[0.1s] text-4xl md:text-5xl font-semibold leading-tight">
              {title}
            </h1>
            <p className="animate-app-fade-in duration-[0.2s]  text-muted-foreground">
              {description}
            </p>

            <form className="space-y-4" onSubmit={onSignUp}>
              <div className="animate-app-fade-in duration-[0.3s] grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Username <span className="text-red-500">*</span>
                  </label>
                  <GlassInputWrapper>
                    <FocusTrackingInput
                      fieldName="add-username"
                      name="username"
                      type="text"
                      placeholder="Choose a unique username"
                      className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                      required
                    />
                  </GlassInputWrapper>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <GlassInputWrapper>
                    <FocusTrackingInput
                      fieldName="add-fullname"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full h-13  bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                      required
                    />
                  </GlassInputWrapper>
                </div>
              </div>

              <div className="animate-app-fade-in duration-[0.4s]">
                <label className=" text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address <span className="text-red-500">*</span>
                </label>
                <GlassInputWrapper>
                  <FocusTrackingInput
                    fieldName="add-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full h-13 bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                    required
                  />
                </GlassInputWrapper>
              </div>

              <div className="animate-app-fade-in duration-[0.5s] grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password <span className="text-red-500">*</span>
                  </label>
                  <GlassInputWrapper>
                    <div className="relative">
                      <FocusTrackingInput
                        fieldName="add-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="w-full h-13 bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                        ) : (
                          <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                        )}
                      </button>
                    </div>
                  </GlassInputWrapper>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <GlassInputWrapper>
                    <div className="relative">
                      <FocusTrackingInput
                        fieldName="confirm-password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                        ) : (
                          <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                        )}
                      </button>
                    </div>
                  </GlassInputWrapper>
                </div>
              </div>

              <div className="animate-app-fade-in duration-[0.6s] flex items-center gap-3">
                <Checkbox
                  name="agreeToTerms"
                  className="custom-checkbox"
                  required
                />

                <span className=" pt-0.5 text-sm text-foreground/90 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />I agree
                  to the{" "}
                  <a href="#" className="text-sky-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-sky-600 hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </div>

              <Button
                intent={theme.theme === "dark" ? "authd" : "authl"}
                size="auth"
                className="animate-app-fade-in duration-[0.7s] flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                Create Account
              </Button>
            </form>

            <div className="animate-app-fade-in duration-[0.7s] relative flex items-center justify-center">
              <span className="w-full border-t border-border"></span>
              <span className="px-4 text-sm text-muted-foreground bg-background absolute">
                Or continue with
              </span>
            </div>

            <Button
              onClick={continueWithGoogle}
              intent={theme.theme === "dark" ? "authl" : "authd"}
              size="auth"
              className="animate-app-fade-in duration-[0.8s] flex items-center justify-center gap-2"
            >
              <GoogleIcon />
              Continue with Google
            </Button>

            <p className="animate-app-fade-in duration-[0.9s] text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSignIn?.();
                }}
                className="text-sky-600 hover:underline transition-colors"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
