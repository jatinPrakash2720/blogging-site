import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../common/Avatar";
import Input from "../common/Input";
import Button from "../common/Button";

const Header: React.FC = () => {
  // Mock user data - this will come from useAuth() later
  const mockUser = {
    avatar: "https://github.com/shadcn.png",
    username: "johndoe",
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold">
            Bloggr
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link to="/explore" className="text-gray-500 hover:text-blue-600">
              Explore
            </Link>
            <Link to="/bookmarks" className="text-gray-500 hover:text-blue-600">
              Bookmarks
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <Input type="search" placeholder="Search..." className="w-64" />
          </div>
          <Button
            intent="primary"
            className="bg-black hover:bg-gray-800 hidden md:inline-flex"
          >
            Write
          </Button>
          <Link to={`/profile/${mockUser.username}`}>
            <Avatar src={mockUser.avatar} alt={mockUser.username} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
