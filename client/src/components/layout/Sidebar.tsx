import React from "react";
import FollowSuggestions from "../features/user/FollowSuggestions.tsx";

const Sidebar: React.FC = () => {
  return (
    <aside className="sticky top-24 space-y-8">
      <FollowSuggestions />
      {/* You can add more sidebar modules here later */}
    </aside>
  );
};

export default Sidebar;
