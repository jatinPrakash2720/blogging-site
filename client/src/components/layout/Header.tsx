"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, Edit2, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../store/auth";
import ThemeToggle from "../common/wrappers/ThemeToggle";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "../../lib/utils";

interface HeaderProps {
  onHeightChange?: (height: number) => void;
  disableScrollEffect?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onHeightChange,
  disableScrollEffect = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 1. Get user data and actions from the Auth context
  const { isAuthenticated, currentUser, logout } = useAuth();

  useEffect(() => {
    if (headerRef.current && onHeightChange) {
      onHeightChange(headerRef.current.offsetHeight);
    }
  }, [isScrolled, onHeightChange]);

  useEffect(() => {
    if (disableScrollEffect) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [disableScrollEffect]);

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login"); // Redirect to login after logout
  };

  const getInitials = (name: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          !disableScrollEffect && (isScrolled ? "mt-0" : "mt-4")
        )}
      >
        <nav
          className={cn(
            "transition-all duration-300 ease-in-out backdrop-blur-lg",
            !disableScrollEffect &&
              (isScrolled
                ? "bg-card/80 shadow-lg"
                : "bg-card/50 border border-border rounded-2xl mx-4 shadow-md")
          )}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center space-x-3 flex-shrink-0"
              >
                <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                  <span className="text-white dark:text-black font-bold text-sm">
                    BL
                  </span>
                </div>
                <span className="text-black dark:text-white font-semibold text-lg hidden sm:inline">
                  BlogLikho
                </span>
              </Link>

              {/* Search Bar */}
              <div className="flex-1 max-w-md mx-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    className="w-full pl-10 pr-4 py-2.5 bg-muted/80 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary border-none transition-all duration-300 text-sm"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <ThemeToggle />

                {/* 2. Conditionally render UI based on authentication state */}
                {isAuthenticated && currentUser ? (
                  // Logged-in user view
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link
                        to="/blog/write"
                        className="flex items-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span className="hidden md:inline">Write</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Bell className="w-5 h-5" />
                    </Button>

                    {/* Profile Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
                          <Avatar>
                            <AvatarImage
                              src={currentUser.avatar}
                              alt={currentUser.fullName}
                            />
                            <AvatarFallback>
                              {getInitials(currentUser.fullName)}
                            </AvatarFallback>
                          </Avatar>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                          <p className="font-bold">{currentUser.fullName}</p>
                          <p className="text-xs text-muted-foreground">
                            @{currentUser.username}
                          </p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link
                            to="/profile"
                            className="flex items-center cursor-pointer"
                          >
                            <User className="w-4 h-4 mr-2" />
                            <span>Profile</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            to="/profile/settings"
                            className="flex items-center cursor-pointer"
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            <span>Settings</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="cursor-pointer text-red-500 focus:bg-red-500/10 focus:text-red-600"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          <span>Sign Out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  // Logged-out user view
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" asChild>
                      <Link to="/auth/login">Sign In</Link>
                    </Button>
                    <Button asChild>
                      <Link to="/auth/register">Get Started</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
