import React from "react";
import { useNavigate } from "react-router-dom";
import { OTPVerificationPage as OTPVerificationFeature } from "../../components/features/auth/OTPVerification";

const OTPVerificationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleVerifyOTP = (otp: string) => {
    console.log("Verifying OTP:", otp);
    navigate("/profile-setup");
  };

  const handleResendCode = () => {
    console.log("Resending OTP code...");
  };

  const handleGoBack = () => {
    navigate("/register");
  };

  return (
    <OTPVerificationFeature
      onVerifyOTP={handleVerifyOTP}
      onResendCode={handleResendCode}
      onGoBack={handleGoBack}
      heroImageSrc="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1950&auto=format&fit=crop"
      testimonials={[]}
    />
  );
};

export default OTPVerificationPage;
