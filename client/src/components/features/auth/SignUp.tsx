"use client";

import type React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./auth.css";
import { continueWithGoogle } from "@/lib/auth";
import { GlassInputWrapper } from "@/components/common/subComps/GlassInputWrapper";
import { TestimonialCard } from "@/components/common/subComps/TestimonialCard";
import type { SignUpPageProps } from "@/types/components/features/auth";
import { GoogleIcon } from "@/components/icons/GoogleIcon";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row font-sans w-[100dvw]">
      {/* Left column: sign-up form */}
      <section className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <h1 className="animate-element animate-delay-100 text-4xl md:text-5xl font-semibold leading-tight">
              {title}
            </h1>
            <p className="animate-element animate-delay-200 text-muted-foreground">
              {description}
            </p>

            <form className="space-y-5" onSubmit={onSignUp}>
              <div className="animate-element animate-delay-300 grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <GlassInputWrapper>
                    <input
                      name="username"
                      type="text"
                      placeholder="Choose a unique username"
                      className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                      required
                    />
                  </GlassInputWrapper>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <GlassInputWrapper>
                    <input
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                      required
                    />
                  </GlassInputWrapper>
                </div>
              </div>

              <div className="animate-element animate-delay-400">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <GlassInputWrapper>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                    required
                  />
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-500 grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <GlassInputWrapper>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none"
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
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <GlassInputWrapper>
                    <div className="relative">
                      <input
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

              <div className="animate-element animate-delay-600 flex items-center gap-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  className="custom-checkbox"
                  required
                />
                <span className="text-sm text-foreground/90">
                  I agree to the{" "}
                  <a href="#" className="text-violet-400 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-violet-400 hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </div>

              <button
                type="submit"
                className="animate-element animate-delay-700 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Create Account
              </button>
            </form>

            <div className="animate-element animate-delay-800 relative flex items-center justify-center">
              <span className="w-full border-t border-border"></span>
              <span className="px-4 text-sm text-muted-foreground bg-background absolute">
                Or continue with
              </span>
            </div>

            <button
              onClick={continueWithGoogle}
              className="animate-element animate-delay-900 w-full flex items-center justify-center gap-3 border border-border rounded-2xl py-4 hover:bg-secondary transition-colors"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <p className="animate-element animate-delay-1000 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSignIn?.();
                }}
                className="text-violet-400 hover:underline transition-colors"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Right column: hero image + testimonials */}
      {heroImageSrc && (
        <section className="hidden md:block flex-1 relative p-4">
          <div
            className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImageSrc})` }}
          ></div>
          {testimonials.length > 0 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
              <TestimonialCard
                testimonial={testimonials[0]}
                delay="animate-delay-1500"
              />
              {testimonials[1] && (
                <div className="hidden xl:flex">
                  <TestimonialCard
                    testimonial={testimonials[1]}
                    delay="animate-delay-1600"
                  />
                </div>
              )}
              {testimonials[2] && (
                <div className="hidden 2xl:flex">
                  <TestimonialCard
                    testimonial={testimonials[2]}
                    delay="animate-delay-1700"
                  />
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
};
