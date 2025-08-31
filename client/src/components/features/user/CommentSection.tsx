import React from "react";
import { useAuth } from "@/store/auth";
import Avatar from "@/components/common/wrappers/Avatar";
import Button from "@/components/common/wrappers/Button";
import Textarea from "@/components/common/wrappers/Textarea";
import type { User, Comment as CommentType } from "@/types/api";

// --- Heart Icon for the Like Button ---
const HeartIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

// --- Updated Mock Data with Likes ---
const mockComments: (CommentType & { likes: number })[] = [
  {
    _id: "1",
    owner: {
      _id: "user1",
      fullName: "Jane Doe",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      username: "jane",
      email: "j@d.com",
      createdAt: "",
      updatedAt: "",
    },
    content: "This is a great article! Really enjoyed the perspective.",
    createdAt: "Aug 28",
    updatedAt: "2h ago",
    blog: "1",
    likes: 12,
  },
  {
    _id: "2",
    owner: {
      _id: "currentUser",
      fullName: "You",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      username: "you",
      email: "y@o.com",
      createdAt: "",
      updatedAt: "",
    },
    content: "Thanks for sharing!",
    createdAt: "Aug 25",
    updatedAt: "1h ago",
    blog: "1",
    likes: 5,
  },
  {
    _id: "3",
    owner: {
      _id: "user3",
      fullName: "Sam Wilson",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      username: "sam",
      email: "s@w.com",
      createdAt: "",
      updatedAt: "",
    },
    content:
      "I learned a lot from this. Looking forward to more content like this.",
    createdAt: "Aug 15",
    updatedAt: "30m ago",
    blog: "1",
    likes: 28,
  },
];

const CommentSection: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-8 rounded-xl bg-white p-6 dark:bg-zinc-900">
      <h2 className="text-2xl font-bold">Responses ({mockComments.length})</h2>

      {/* --- Input for adding a new comment --- */}
      <div className="flex items-start gap-4">
        <Avatar src={currentUser?.avatar} alt={currentUser?.fullName} />
        <div className="flex-grow">
          <Textarea
            placeholder="What are your thoughts?"
            className="w-full rounded-lg border-gray-300"
          />
          <Button
            intent="primary"
            className="mt-2 bg-black hover:bg-gray-800 px-4 py-1.5 text-sm"
          >
            Comment
          </Button>
        </div>
      </div>

      {/* --- Divider --- */}
      <div className="border-b border-gray-200 dark:border-zinc-800"></div>

      {/* --- List of comments --- */}
      <div className="space-y-6">
        {mockComments.map((comment) => (
          <div key={comment._id} className="flex items-start gap-4">
            <Avatar src={comment.owner.avatar} alt={comment.owner.fullName} />
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm">
                  {comment.owner.fullName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {comment.createdAt}
                </p>
              </div>
              <p className="text-gray-800 dark:text-gray-300 mt-1">
                {comment.content}
              </p>

              {/* --- Action Buttons (Like & Reply) --- */}
              <div className="flex items-center gap-4 mt-2 text-gray-500 dark:text-gray-400">
                <button className="flex items-center gap-1 group">
                  <HeartIcon className="size-4 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
                  <span className="text-xs font-medium">{comment.likes}</span>
                </button>
                <button className="text-xs font-semibold hover:text-black dark:hover:text-white">
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
