import React from "react";
import { useNavigate } from "react-router-dom";
import {
  SignInPage,
} from "../../components/features/auth/SignIn";
import { useAuth } from "@/store/auth";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (email && password) {
      await login({ email, password });
    }

   
  };
   const handleCreateAccount = () => {
     navigate("/register");
   };

   const handleResetPassword = () => {
     navigate("/forgot-password");
   };


  return (
    <SignInPage
      heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
      onSignIn={handleSignIn}
      onCreateAccount={handleCreateAccount}
      onResetPassword={handleResetPassword}
    />
  );
};

export default LoginPage;
