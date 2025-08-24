import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProfileSetup } from "@/components/features/auth/ProfileSetup";
import { useAuth } from "@/store/auth";

const ProfileSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();

  const registrationData = location.state?.registrationData;

  React.useEffect(() => {
    if (!registrationData) {
      console.error(
        "No registration data found, redirecting to register page."
      );
      navigate("/register");
    }
  }, [registrationData, navigate]);

  const handleComplete = async (profileData: {
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

  const handleSkip = async () => {
    console.log("Skipping profile setup, sending only registration data...");
    const finalFormData = new FormData();
    for (const key in registrationData) {
      finalFormData.append(key, registrationData[key]);
    }
    await register(finalFormData);
  };

  return <ProfileSetup onComplete={handleComplete} onSkip={handleSkip} />;
};

export default ProfileSetupPage;
