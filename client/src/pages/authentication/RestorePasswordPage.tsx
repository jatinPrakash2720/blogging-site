import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RestorePassword } from "../../components/features/auth/RestorePassword";// Assuming the component is in this path
import { useAuth } from "@/store/auth";

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { restorePassword,clearAuthError } = useAuth();

  const handleRestorePassword = async (password: string): Promise<boolean> => {
    if (!token) {
      console.error("No reset token found in URL.");
      return false;
    }
    clearAuthError();
    const success = await restorePassword(token, { password });
    return success;
  };

  const handleGoToSignIn = () => {
    navigate("/login");
  };

  return (
    <RestorePassword
      onRestorePassword={handleRestorePassword}
      onGoToSignIn={handleGoToSignIn}
      heroImageSrc="https://images.unsplash.com/photo-1528460033278-a6457c209501?q=80&w=1912&auto=format&fit=crop"
    />
  );
};

export default ResetPasswordPage;
