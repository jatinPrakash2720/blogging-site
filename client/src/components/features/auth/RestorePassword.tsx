"use client";

import type React from "react";
import { useState } from "react";
import { Lock, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import type {RestorePasswordProps } from "@/types/components/features/auth";
import { GlassInputWrapper } from "@/components/common/subComps/GlassInputWrapper";
import Input from "@/components/common/wrappers/Input";
import Button from "@/components/common/wrappers/Button";
import { useTheme } from "@/store/theme";
import { TestimonialCard } from "@/components/common/subComps/TestimonialCard";
import "./auth.css";
import FocusTrackingInput from "@/components/common/wrappers/FocusTrackingInput";

export const RestorePassword: React.FC<RestorePasswordProps> = ({
  title = (
    <span className="font-light text-foreground tracking-tighter">
      Create New Password
    </span>
  ),
  description = "Enter your new password below",
  heroImageSrc,
  testimonials = [],
  onRestorePassword,
  onGoToSignIn,
}) => {

  const theme = useTheme();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) return "Password must be at least 8 characters long";
    if (!/(?=.*[a-z])/.test(pwd))
      return "Password must contain at least one lowercase letter";
    if (!/(?=.*[A-Z])/.test(pwd))
      return "Password must contain at least one uppercase letter";
    if (!/(?=.*\d)/.test(pwd))
      return "Password must contain at least one number";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrorMessage(passwordError);
      setSubmitStatus("error");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const success = await onRestorePassword?.(password);
      if (success) {
        setSubmitStatus("success");
        // Redirect to sign in after 2 seconds
        setTimeout(() => {
          onGoToSignIn?.();
        }, 2000);
      } else {
        setSubmitStatus("error");
        setErrorMessage("Failed to update password. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="h-[100dvh] flex flex-col md:flex-row font-sans w-[100dvw]">
        <section className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md text-center">
            <div className="flex flex-col gap-6">
              <div className="opacity-0 animate-fade-slide-in [animation-delay:0.1s] flex items-center justify-center w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>

              <h1 className="opacity-0 animate-fade-slide-in [animation-delay:0.2s] text-4xl md:text-5xl font-semibold leading-tight">
                Password Updated!
              </h1>

              <div className="opacity-0 animate-fade-slide-in [animation-delay:0.3s] space-y-2">
                <p className="text-muted-foreground">
                  Your password has been successfully updated.
                </p>
                <p className="text-sm text-muted-foreground">
                  Redirecting you to sign in...
                </p>
              </div>

              <button
                onClick={onGoToSignIn}
                className="opacity-0 animate-fade-slide-in [animation-delay:0.4s] w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Continue to Sign In
              </button>
            </div>
          </div>
        </section>

        {/* {heroImageSrc && (
          <section className="hidden md:block flex-1 relative p-4">
            <div
              className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImageSrc})` }}
            ></div>
            {testimonials.length > 0 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
                <TestimonialCard
                  testimonial={testimonials[0]}
                  delay="animate-delay-500"
                />
                {testimonials[1] && (
                  <div className="hidden xl:flex">
                    <TestimonialCard
                      testimonial={testimonials[1]}
                      delay="animate-delay-600"
                    />
                  </div>
                )}
                {testimonials[2] && (
                  <div className="hidden 2xl:flex">
                    <TestimonialCard
                      testimonial={testimonials[2]}
                      delay="animate-delay-700"
                    />
                  </div>
                )}
              </div>
            )}
          </section>
        )} */}
      </div>
    );
  }

  return (
    <div className="h-[100dvh] flex flex-col md:flex-row font-sans w-[100dvw]">
      <section className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <div className="opacity-0 animate-fade-slide-in [animation-delay:0.1s] text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-2">
                {title}
              </h1>
              <p className="text-muted-foreground">{description}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="opacity-0 animate-fade-slide-in [animation-delay:0.2s]">
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  New Password
                </label>
                <GlassInputWrapper>
                  <div className="relative">
                    <FocusTrackingInput
                      fieldName="set-new-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your new password"
                      className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none"
                      required
                      disabled={isSubmitting}
                    />
                    {/* <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your new password"
                      className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none"
                      required
                      disabled={isSubmitting}
                    /> */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              <div className="opacity-0 animate-fade-slide-in [animation-delay:0.3s]">
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Confirm New Password
                </label>
                <GlassInputWrapper>
                  <div className="relative">
                    <FocusTrackingInput
                      fieldName="set-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none"
                      required
                      disabled={isSubmitting}
                    />
                    {/* <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none"
                      required
                      disabled={isSubmitting}
                    /> */}
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              {submitStatus === "error" && (
                <div className="animate-element flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {errorMessage}
                  </p>
                </div>
              )}

              <div className="animate-element animate-delay-500 text-xs text-muted-foreground space-y-1">
                <p>Password requirements:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>At least 8 characters long</li>
                  <li>Contains uppercase and lowercase letters</li>
                  <li>Contains at least one number</li>
                </ul>
              </div>

              <Button
                intent={theme.theme === "dark" ? "authd" : "authl"}
                size="auth"
                type="submit"
                disabled={
                  isSubmitting || !password.trim() || !confirmPassword.trim()
                }
                className="animate-element animate-delay-600 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Updating Password...
                  </div>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* {heroImageSrc && (
        <section className="hidden md:block flex-1 relative p-4">
          <div
            className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImageSrc})` }}
          ></div>
          {testimonials.length > 0 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
              <TestimonialCard
                testimonial={testimonials[0]}
                delay="animate-delay-700"
              />
              {testimonials[1] && (
                <div className="hidden xl:flex">
                  <TestimonialCard
                    testimonial={testimonials[1]}
                    delay="animate-delay-800"
                  />
                </div>
              )}
              {testimonials[2] && (
                <div className="hidden 2xl:flex">
                  <TestimonialCard
                    testimonial={testimonials[2]}
                    delay="animate-delay-900"
                  />
                </div>
              )}
            </div>
          )}
        </section>
      )} */}
    </div>
  );
};
