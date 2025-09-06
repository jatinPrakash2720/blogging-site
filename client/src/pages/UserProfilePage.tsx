"use client";

import { useState } from "react";
import { useMediaQuery } from "../hooks/use-media-query";
import Header from "../components/layout/Header";
import ProfileSidebar from "../components/features/user/ProfileSidebar";
import ProfilePreview from "../components/features/user/ProfilePreview";
import ProfileDetails from "../components/features/user/ProfileDetails";
import Library from "../components/features/user/Library";
import type { User } from "@/types/api";

// Mock data for the user
const mockUser: User = {
  _id: "user123",
  fullName: "Jatin Prakash",
  username: "jatinprakash",
  email: "jatin.prakash@example.com",
  avatar: "https://i.pravatar.cc/150?u=jatinprakash",
  coverImage:
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=800&auto=format&fit=crop",
  bio: "Frontend Developer | React Enthusiast | UI/UX Designer",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export type ProfileView = "profile" | "library" | "stories" | "stats";

function ProfilePage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<ProfileView>("profile");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const renderContent = () => {
    switch (activeView) {
      case "profile":
        return <ProfileDetails user={mockUser} />;
      case "library":
        return <Library />;
      // Add cases for 'stories' and 'stats' when they are built
      default:
        return <ProfileDetails user={mockUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header disableScrollEffect={true} />
      <div className="flex pt-16">
        {/* Sidebar */}
        <ProfileSidebar
          activeView={activeView}
          setActiveView={setActiveView}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isDesktop={isDesktop}
        />

        {/* Main Content */}
        <main
          className={`flex-grow transition-all duration-300 ease-in-out ${
            !isDesktop && isSidebarOpen ? "ml-64" : "ml-0 lg:ml-64"
          } p-4 sm:p-6 lg:p-8 grid grid-cols-1 xl:grid-cols-3 gap-8`}
        >
          {/* Middle Content Section */}
          <div className="xl:col-span-2">{renderContent()}</div>

          {/* Right Profile Preview */}
          <aside className="hidden xl:block">
            <ProfilePreview user={mockUser} />
          </aside>
        </main>
      </div>
    </div>
  );
}

export { ProfilePage };