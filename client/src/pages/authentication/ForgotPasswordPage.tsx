import React from "react";
import { useNavigate } from "react-router-dom";
import { ForgotPassword} from "../../components/features/auth/ForgotPassword";
import { useAuth } from "@/store/auth";

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { forgotPassword, clearAuthError } = useAuth();
  const handleResetPassword = async (identifier: string): Promise<boolean> => {
    clearAuthError();
    const success = await forgotPassword({ identifier: identifier });
    return success;
  };

  const handleGoBack = () => {
    navigate("/login");
  };


  return (
    <ForgotPassword
      onResetPassword={handleResetPassword}
      onGoBack={handleGoBack}
      heroImageSrc="https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=2070&auto=format&fit=crop"
    />
  );
};

export default ForgotPasswordPage;
