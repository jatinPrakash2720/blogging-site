"use client";

import type React from "react";
import { useState } from "react";
import { ArrowLeft, Mail, User, CheckCircle, AlertCircle } from "lucide-react";
import type { ForgotPasswordProps } from "@/types/components/features/auth";
import { GlassInputWrapper } from "@/components/common/subComps/GlassInputWrapper";
import Input from "@/components/common/wrappers/Input";
import { useTheme } from "@/store/theme";
import { TestimonialCard } from "@/components/common/subComps/TestimonialCard";
import Button from "@/components/common/wrappers/Button";
import FocusTrackingInput from "@/components/common/wrappers/FocusTrackingInput";

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  title = (
    <span className="font-light text-foreground tracking-tighter">
      Reset Password
    </span>
  ),
  description = "Enter your email address or username and we'll send you a link to reset your password",
  heroImageSrc,
  testimonials = [],
  onResetPassword,
  onGoBack,
}) => {

  const theme = useTheme();
  const [searchMethod, setSearchMethod] = useState<"email" | "username">(
    "email"
  );
  const [identifier, setIdentifier] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const success = await onResetPassword?.(identifier);
      if (success) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          `${searchMethod === "email" ? "Email address" : "Username"} not found. Please check and try again.`
        );
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
        {/* Left column: Success message */}
        <section className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md text-center">
            <div className="flex flex-col gap-6">
              <div className="animate-app-fade-in duration-[0.1s] flex items-center justify-center w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>

              <h1 className="animate-app-fade-in duration-[0.2s] text-4xl md:text-5xl font-semibold leading-tight">
                Check Your Email
              </h1>

              <div className="animate-app-fade-in duration-[0.2s] space-y-2">
                <p className="text-muted-foreground">
                  We've sent a password reset link to your email address
                </p>
                <p className="text-sm text-muted-foreground">
                  Click the link in the email to reset your password. The link
                  will expire in 24 hours.
                </p>
              </div>

              <div className="animate-app-fade-in duration-[0.2s] space-y-4">
                <button
                  onClick={onGoBack}
                  className="w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Back to Sign In
                </button>

                <p className="text-sm text-muted-foreground">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => {
                      setSubmitStatus("idle");
                      setIdentifier("");
                    }}
                    className="text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    try again
                  </button>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right column: hero image + testimonials */}
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
    <div className="h-[100dvh] flex flex-col md:flex-row font-sans w-[100dvw] overflow-hidden">
      {/* Left column: Reset password form */}
      <section className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            {onGoBack && (
              <button
                onClick={onGoBack}
                className="animate-app-fade-in duration-[0.2s] flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </button>
            )}

            <div className="animate-app-fade-in duration-[0.2s] text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-2">
                {title}
              </h1>
              <p className="text-muted-foreground">{description}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="animate-app-fade-in duration-[0.2s]">
                <label className="text-sm font-medium text-muted-foreground block mb-3">
                  Find your account by:
                </label>
                <div className="flex gap-2 p-1 bg-muted/30  rounded-2xl">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchMethod("email");
                      setIdentifier("");
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                      searchMethod === "email"
                        ? "dark:bg-foreground/10 bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchMethod("username");
                      setIdentifier("");
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                      searchMethod === "username"
                        ? "dark:bg-foreground/10 bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Username
                  </button>
                </div>
              </div>

              <div className="animate-app-fade-in duration-[0.2s]">
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  {searchMethod === "email" ? "Email Address" : "Username"}
                </label>
                <GlassInputWrapper>
                  <FocusTrackingInput
                    fieldName="find-account"
                    type={searchMethod === "email" ? "email" : "text"}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={
                      searchMethod === "email"
                        ? "Enter your email address"
                        : "Enter your username"
                    }
                    className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                    required
                    disabled={isSubmitting}
                  />
                </GlassInputWrapper>
              </div>

              {submitStatus === "error" && (
                <div className="animate-app-fade-in duration-[0.2s] flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {errorMessage}
                  </p>
                </div>
              )}

              <Button
                // type="submit"
                intent={theme.theme === "dark" ? "authl" : "authd"}
                size="auth"
                disabled={isSubmitting || !identifier.trim()}
                className="animate-app-fade-in duration-[0.2s] w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Finding Account...
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>

            <div className="animate-app-fade-in duration-[0.2s] text-center text-xs text-muted-foreground">
              <p>
                Remember your password?{" "}
                <button
                  onClick={onGoBack}
                  className="text-sky-600 hover:text-sky-500 transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Right column: hero image + testimonials */}
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
