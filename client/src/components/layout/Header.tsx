"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Sun, Moon, Bell, ChevronDown } from "lucide-react";
import Input from "@/components/common/wrappers/Input";
import Button from "@/components/common/wrappers/Button";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface HeaderProps {
  theme: string;
  themeProp: (theme: string) => void;
  onHeightChange?: (height: number) => void;
}

export default function Header({
  theme,
  themeProp,
  onHeightChange,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current && onHeightChange) {
      onHeightChange(headerRef.current.offsetHeight);
    }
  }, [isScrolled, onHeightChange]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10; // Start animation after 10px scroll
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`transition-all duration-500 ease-in-out ${
          isScrolled ? "mt-0" : "mt-4"
        }`}
      >
        <nav
          className={`transition-all duration-500 ease-in-out backdrop-blur-md ${isScrolled ? "border-none " : "border border-[#E0E1E1/30] dark:border-[#E0E1E1/40]"} ${
            theme === "dark" ? "bg-black/90" : "bg-white/90"
          } ${
            isScrolled
              ? "rounded-none mx-0 shadow-lg"
              : "rounded-2xl mx-4 shadow-md"
          }`}
        >
          <div
            className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
          >
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3 flex-shrink-0">
                <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                  <span className="text-white dark:text-black font-bold text-sm">
                    BL
                  </span>
                </div>
                <span className="text-black dark:text-white font-semibold text-lg hidden sm:inline">
                  BlogLikho
                </span>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-md mx-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-600 dark:text-sky-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search blogs..."
                    className="w-full pl-10 pr-4 py-2.5 bg-sky-100/80 dark:bg-sky-900/30 rounded-xl text-sky-600 dark:text-sky-400 placeholder-sky-600 dark:placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 border-none transition-all duration-300 text-sm hover:bg-sky-200/50 dark:hover:bg-sky-800/50"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <Button
                  onClick={() => themeProp(theme === "dark" ? "light" : "dark")}
                  className="p-2.5 bg-gray-100/90 dark:bg-gray-800/90 hover:bg-gray-200/90 dark:hover:bg-gray-700/90 rounded-xl transition-all duration-200 text-black dark:text-white"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </Button>

                {isLoggedIn ? (
                  <div className="flex items-center gap-3">
                    <Button className="p-2.5 bg-gray-100/90 dark:bg-gray-800/90 hover:bg-gray-200/90 dark:hover:bg-gray-700/90 rounded-xl transition-all duration-200 text-black dark:text-white">
                      <Bell className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-2 bg-gray-100/90 dark:bg-gray-800/90 hover:bg-gray-200/90 dark:hover:bg-gray-700/90 rounded-xl px-3 py-2 transition-all duration-200 cursor-pointer">
                      <div className="w-6 h-6 bg-black dark:bg-white rounded-full flex items-center justify-center">
                        <span className="text-white dark:text-black text-xs font-medium">
                          JD
                        </span>
                      </div>
                      <span className="text-black dark:text-white text-sm font-medium hidden md:inline">
                        John Doe
                      </span>
                      <ChevronDown className="w-3 h-3 text-black dark:text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <a
                      href="/login"
                      className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 text-sm font-medium hidden sm:inline"
                    >
                      Sign In
                    </a>
                    <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium">
                      <a href="/signup">
                        <span className="hidden sm:inline">Get Started</span>
                        <span className="sm:hidden">Start</span>
                      </a>
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
}
