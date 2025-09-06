import React from "react";
import { useParams } from "react-router-dom";
export type ProfileView = "profile" | "library" | "stories" | "stats";
const ProfilePage: React.FC = () => {
  const { username } = useParams();
  return (
    <div className="p-8">
      <h1>Profile Page for {username}</h1>
    </div>
  );
};

export default ProfilePage;
