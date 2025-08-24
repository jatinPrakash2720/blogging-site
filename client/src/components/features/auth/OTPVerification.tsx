"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { ArrowLeft, RefreshCw } from "lucide-react";
import type { OTPVerificationPageProps } from "@/types/components/features/auth";
import { TestimonialCard } from "@/components/common/subComps/TestimonialCard";
import { OTPInput } from "@/components/common/subComps/OTPInputs";
import "./auth.css";

export const OTPVerificationPage: React.FC<OTPVerificationPageProps> = ({
  title = (
    <span className="font-light text-foreground tracking-tighter">
      Verify Your Email
    </span>
  ),
  description = "We've sent a verification code to your email address",
  email = "user@example.com",
  heroImageSrc,
  testimonials = [],
  onVerifyOTP,
  onResendCode,
  onGoBack,
  codeLength = 6,
}) => {
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOTPComplete = (otpValue: string) => {
    setOtp(otpValue);
  };

  const handleVerify = () => {
    if (otp.length === codeLength) {
      onVerifyOTP?.(otp);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    setCountdown(60); // 60 second cooldown

    try {
      await onResendCode?.();
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col md:flex-row font-sans w-[100dvw]">
      {/* Left column: OTP verification form */}
      <section className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            {onGoBack && (
              <button
                onClick={onGoBack}
                className="animate-element animate-delay-100 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}

            <h1 className="animate-element animate-delay-200 text-4xl md:text-5xl font-semibold leading-tight">
              {title}
            </h1>

            <div className="animate-element animate-delay-300">
              <p className="text-muted-foreground">{description}</p>
              <p className="text-sm text-foreground/80 mt-1">
                Sent to <span className="font-medium">{email}</span>
              </p>
            </div>

            <div className="animate-element animate-delay-400 space-y-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-4 text-center">
                  Enter {codeLength}-digit verification code
                </label>
                <OTPInput length={codeLength} onComplete={handleOTPComplete} />
              </div>

              <button
                onClick={handleVerify}
                disabled={otp.length !== codeLength}
                className="animate-element animate-delay-500 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify Code
              </button>
            </div>

            <div className="animate-element animate-delay-600 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Didn't receive the code?
              </p>
              <button
                onClick={handleResend}
                disabled={countdown > 0 || isResending}
                className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isResending ? "animate-spin" : ""}`}
                />
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
              </button>
            </div>

            <div className="animate-element animate-delay-700 text-center text-xs text-muted-foreground">
              <p>Check your spam folder if you don't see the email</p>
            </div>
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
                delay="animate-delay-800"
              />
              {testimonials[1] && (
                <div className="hidden xl:flex">
                  <TestimonialCard
                    testimonial={testimonials[1]}
                    delay="animate-delay-900"
                  />
                </div>
              )}
              {testimonials[2] && (
                <div className="hidden 2xl:flex">
                  <TestimonialCard
                    testimonial={testimonials[2]}
                    delay="animate-delay-1000"
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
