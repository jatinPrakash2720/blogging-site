import React from "react";
import Avatar from "@/components/common/wrappers/Avatar";
import Button from "@/components/common/wrappers/Button";
import type { User } from "@/types/api";

interface AuthorProfileCardProps {
  author: User;
}

const AuthorProfileCard: React.FC<AuthorProfileCardProps> = ({ author }) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-card border border-border shadow-lg p-4 text-center">
      <div
        className="h-24 bg-gradient-to-r from-violet-200 to-blue-200 dark:from-violet-900/50 dark:to-blue-900/50 rounded-lg mb-[-48px]"
        style={{
          backgroundImage: `url(${author.coverImage})`,
          backgroundSize: "cover",
        }}
      />
      <div className="relative flex flex-col items-center">
        <Avatar
          src={author.avatar}
          alt={author.fullName}
          className="w-24 h-24 border-4 border-background"
        />
        <h3 className="text-lg font-bold mt-2">{author.fullName}</h3>
        <p className="text-sm text-muted-foreground">@{author.username}</p>
        <p className="text-xs text-muted-foreground mt-2">
          {author.bio || "Content Creator"}
        </p>
        <Button
          intent="primary"
          className="mt-4 w-full bg-black hover:bg-gray-800"
        >
          Follow
        </Button>
      </div>
    </div>
  );
};

export default AuthorProfileCard;
