"use client";

import type React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { continueWithGoogle } from "@/lib/auth";
import type { SignInPageProps } from "@/types/components/features/auth";
import { GlassInputWrapper } from "@/components/common/subComps/GlassInputWrapper";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import Button from "@/components/common/wrappers/Button";
import Checkbox from "@/components/common/wrappers/Checkbox";
import Label from "@/components/common/wrappers/Label";
import Input from "@/components/common/wrappers/Input";
import { useTheme } from "@/store/theme";
import FocusTrackingInput from "@/components/common/wrappers/FocusTrackingInput";

export const SignInPage: React.FC<SignInPageProps> = ({
  title = (
    <span className="font-light text-foreground tracking-tighter">Welcome</span>
  ),
  description = "Access your account and continue your journey with us",
  heroImageSrc,
  testimonials = [],
  onSignIn,
  onResetPassword,
  onCreateAccount,
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen flex flex-col md:flex-row font-sans w-screen overflow-hidden">
      {/* Right column: hero image + testimonials */}
      {heroImageSrc && (
        <section className="hidden md:block flex-1 relative p-4">
          <div
            className="animate-app-zoom-in duration-[0.4s] absolute inset-4 rounded-3xl bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImageSrc})` }}
          ></div>
          {/* ... testimonials */}
        </section>
      )}
      {/* Left column: sign-in form */}
      <section className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <h1 className="animate-app-fade-in duration-[0.1s] text-4xl md:text-5xl font-semibold leading-tight">
              {title}
            </h1>
            <p className="animate-app-fade-in duration-[0.2s] text-muted-foreground">
              {description}
            </p>

            <form className="space-y-5" onSubmit={onSignIn}>
              <div className="animate-app-fade-in duration-[0.3s] space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Email Address
                </Label>
                <GlassInputWrapper>
                  <FocusTrackingInput
                    fieldName="add-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                  />
                  {/* <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                  /> */}
                </GlassInputWrapper>
              </div>

              <div className="animate-app-fade-in duration-[0.4s] space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Password
                </Label>
                <GlassInputWrapper>
                  <div className="relative">
                    <FocusTrackingInput
                      fieldName="write-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                    />
                    {/* <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                    /> */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center bg-transparent hover:bg-transparent p-0 h-auto"
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

              <div className="animate-app-fade-in duration-[0.5s] flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Checkbox id="rememberMe" name="rememberMe" />
                  <Label
                    htmlFor="rememberMe"
                    className="text-foreground/90 cursor-pointer"
                  >
                    Keep me signed in
                  </Label>
                </div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onResetPassword?.();
                  }}
                  className="hover:underline text-sky-600 transition-colors"
                >
                  Reset password
                </a>
              </div>

              <Button
                intent={theme.theme === "dark" ? "authd" : "authl"}
                size="auth"
                className="animate-app-fade-in duration-[0.6s]"
              >
                Sign In
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
              className="animate-app-fade-in duration-[0.7s]"
            >
              <GoogleIcon />
              Continue with Google
            </Button>

            <p className="animate-app-fade-in duration-[0.8s] text-center text-sm text-muted-foreground">
              New to our platform?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onCreateAccount?.();
                }}
                className="text-sky-600 hover:underline transition-colors"
              >
                Create Account
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
