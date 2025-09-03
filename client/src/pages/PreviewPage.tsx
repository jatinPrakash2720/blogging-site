import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Particles } from "@/components/common/background/Particles";
import { Preview } from "@/components/features/blog/Preview";
import AuthorProfileCard from "@/components/features/user/AuthorPreviewCard";
import CommentSection from "@/components/features/user/CommentSection";
import FollowSuggestions from "@/components/features/user/FollowSuggestions";
import type { User } from "@/types/api";
import ParticleBackground from "@/components/common/background/ParticeBackground";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/common/wrappers/DropdownMenu";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

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

const BlogActionBar = () => {
  return (
    <div className="flex items-center justify-between w-full px-3  dark:bg-background/50  bg-background/10 backdrop-blur-lg border border-border rounded-xl rounded-t-none shadow-sm">
      {/* Left side actions: Like, Comment, Share */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Heart className="w-4 h-4" />
          <span className="text-xs">Like</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs">Comment</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          <span className="text-xs">Share</span>
        </Button>
      </div>

      {/* Right side actions: Save and More Options */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bookmark className="w-4 h-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Report this content</DropdownMenuItem>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default function BlogPreviewPage() {
  const [headerHeight, setHeaderHeight] = useState(0);
  return (
    <div className="min-h-screen flex flex-col">
      <Header onHeightChange={setHeaderHeight} disableScrollEffect={true} />
      <div
        className="relative flex-grow w-full "
        style={{ paddingTop: `${headerHeight}px` }}
      >
        <ParticleBackground
          className="fixed inset-0 -z-10"
          // quantity={250}
        />
        <main className="container mx-auto py-4 flex justify-center items-center">
          {/* Centered content column */}
          <div className="mx-auto space-y-4">
            {/* Author card now sits above the preview */}
            <div>
              <AuthorProfileCard author={mockAuthor} />
            <BlogActionBar  />
            </div>

            {/* Main Blog Preview Content */}
            <Preview />

            {/* New Action Bar */}
          </div>
        </main>
      </div>
    </div>
  );
}
