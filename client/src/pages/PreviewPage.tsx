import React from "react";
import Header from "@/components/layout/Header";
import { Particles } from "@/components/common/background/Particles";
import { Preview } from "@/components/features/blog/Preview";
import AuthorProfileCard from "@/components/features/user/AuthorPreviewCard";
import CommentSection from "@/components/features/user/CommentSection";
import FollowSuggestions from "@/components/features/user/FollowSuggestions";
import type { User } from "@/types/api";
import ParticleBackground from "@/components/common/background/ParticeBackground";

// Mock data for the author
const mockAuthor: User = {
  _id: "author1",
  fullName: "Sophia Carter",
  username: "sophiacarter",
  email: "sophia.carter@example.com", // Added missing field
  avatar: "https://randomuser.me/api/portraits/women/57.jpg",
  coverImage:
    "https://images.unsplash.com/photo-1518837695005-2083393ee9b4?q=80&w=800&auto=format&fit=crop",
  bio: "Software Engineer | Foodie | Travel Enthusiast",
  createdAt: new Date().toISOString(), // Added missing field
  updatedAt: new Date().toISOString(), // Added missing field
};


export default function BlogPreviewPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onHeightChange={() => {}} disableScrollEffect={true} />
      <div className="relative flex-grow w-full">
        <ParticleBackground className="fixed inset-0 -z-10" quantity={250} />
        <main className="container mx-auto py-8 px-0 grid grid-cols-1 lg:grid-cols-8 gap-4">
          {/* Left Sidebar */}
          <aside className="hidden lg:block lg:col-span-2 space-y-8">
            <AuthorProfileCard author={mockAuthor} />
            <FollowSuggestions />
          </aside>

          {/* Main Content: Blog Preview */}
          <div className="lg:col-span-4">
            <Preview />
          </div>

          {/* Right Sidebar: Comments */}
          <aside className="lg:col-span-2">
            <CommentSection />
          </aside>
        </main>
      </div>
    </div>
  );
}
