import React from "react";
import { useNavigate } from "react-router-dom";
import { SignUpPage } from "../../components/features/auth/SignUp";
import type { Testimonial } from "@/types/components/features/auth";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const sampleTestimonials: Testimonial[] = [
    {
      avatarSrc: "https://randomuser.me/api/portraits/women/57.jpg",
      name: "Sarah Chen",
      handle: "@sarahdigital",
      text: "Amazing platform! The user experience is seamless and the features are exactly what I needed.",
    },
    {
      avatarSrc: "https://randomuser.me/api/portraits/men/64.jpg",
      name: "Marcus Johnson",
      handle: "@marcustech",
      text: "This service has transformed how I work. Clean design, powerful features, and excellent support.",
    },
    {
      avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "David Martinez",
      handle: "@davidcreates",
      text: "I've tried many platforms, but this one stands out. Intuitive, reliable, and genuinely helpful for productivity.",
    },
  ];
  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const registrationData = Object.fromEntries(formData.entries());
    console.log("Collected registration data, navigating to profile setup...");
    navigate("/profile-setup", { state: { registrationData } });
  };

  const handleSignIn = () => {
    console.log("Navigating to login page...");
    navigate("/login");
  };

  return (
    <SignUpPage
      heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
      onSignUp={handleSignUp}
      onSignIn={handleSignIn}
      testimonials={sampleTestimonials}
    />
  );
};

export default RegisterPage;
