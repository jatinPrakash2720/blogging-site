"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Bell, Edit2, User, Settings, LogOut } from "lucide-react";
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
} from "../common/wrappers/DropdownMenu";
import { cn } from "../../lib/utils";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Blogs", href: "/blogs" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
];

interface HeaderProps {
  onHeightChange?: (height: number) => void;
  disableScrollEffect?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onHeightChange,
  disableScrollEffect = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuState, setMenuState] = useState(false);
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
      setIsScrolled(window.scrollY > 50);
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
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full px-2 group"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/80 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            {/* Logo */}
            <div className="flex w-full justify-between lg:w-auto">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                  <span className="text-background font-bold text-sm">BL</span>
                </div>
                <span className="text-foreground font-semibold text-lg hidden sm:inline">
                  BlogLikho
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.href}
                      className="text-muted-foreground hover:text-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              {/* Mobile Navigation */}
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.href}
                        className="text-muted-foreground hover:text-foreground block duration-150"
                        onClick={() => setMenuState(false)}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <div className="flex items-center gap-2">
                  <ThemeToggle />

                  {/* 2. Conditionally render UI based on authentication state */}
                  {isAuthenticated && currentUser ? (
                    // Logged-in user view
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className={cn(isScrolled && "lg:hidden")}
                      >
                        <Link
                          to="/blog/write"
                          className="flex items-center gap-2"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span className="hidden md:inline">Write</span>
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(isScrolled && "lg:hidden")}
                      >
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
                            className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            <span>Sign Out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* Scrolled state compact button */}
                      <Button
                        asChild
                        size="sm"
                        className={cn(isScrolled ? "lg:inline-flex" : "hidden")}
                      >
                        <Link to="/blog/write">
                          <span>Write</span>
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    // Logged-out user view
                    <>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className={cn(isScrolled && "lg:hidden")}
                      >
                        <Link to="/auth/login">
                          <span>Login</span>
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        className={cn(isScrolled && "lg:hidden")}
                      >
                        <Link to="/auth/register">
                          <span>Sign Up</span>
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        className={cn(isScrolled ? "lg:inline-flex" : "hidden")}
                      >
                        <Link to="/auth/register">
                          <span>Get Started</span>
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Search, Bell, Edit2, User, Settings, LogOut } from "lucide-react";
// import { useAuth } from "../../store/auth";
// import ThemeToggle from "../common/wrappers/ThemeToggle";
// import { Button } from "../ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { cn } from "../../lib/utils";

// interface HeaderProps {
//   onHeightChange?: (height: number) => void;
//   disableScrollEffect?: boolean;
// }

// const Header: React.FC<HeaderProps> = ({
//   onHeightChange,
//   disableScrollEffect = false,
// }) => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const headerRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();

//   // 1. Get user data and actions from the Auth context
//   const { isAuthenticated, currentUser, logout } = useAuth();

//   useEffect(() => {
//     if (headerRef.current && onHeightChange) {
//       onHeightChange(headerRef.current.offsetHeight);
//     }
//   }, [isScrolled, onHeightChange]);

//   useEffect(() => {
//     if (disableScrollEffect) return;
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [disableScrollEffect]);

//   const handleLogout = async () => {
//     await logout();
//     navigate("/auth/login"); // Redirect to login after logout
//   };

//   const getInitials = (name: string) => {
//     if (!name) return "";
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase();
//   };

//   return (
//     <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
//       <div
//         className={cn(
//           "transition-all duration-300 ease-in-out",
//           !disableScrollEffect && (isScrolled ? "mt-0" : "mt-4")
//         )}
//       >
//         <nav
//           className={cn(
//             "transition-all duration-300 ease-in-out backdrop-blur-lg",
//             !disableScrollEffect &&
//               (isScrolled
//                 ? "bg-card/80 shadow-lg"
//                 : "bg-card/50 border border-border rounded-2xl mx-4 shadow-md")
//           )}
//         >
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between h-16">
//               {/* Logo */}
//               <Link
//                 to="/"
//                 className="flex items-center space-x-3 flex-shrink-0"
//               >
//                 <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
//                   <span className="text-white dark:text-black font-bold text-sm">
//                     BL
//                   </span>
//                 </div>
//                 <span className="text-black dark:text-white font-semibold text-lg hidden sm:inline">
//                   BlogLikho
//                 </span>
//               </Link>

//               {/* Search Bar */}
//               <div className="flex-1 max-w-md mx-6">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
//                   <input
//                     type="text"
//                     placeholder="Search blogs..."
//                     className="w-full pl-10 pr-4 py-2.5 bg-muted/80 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary border-none transition-all duration-300 text-sm"
//                   />
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex items-center gap-2 flex-shrink-0">
//                 <ThemeToggle />

//                 {/* 2. Conditionally render UI based on authentication state */}
//                 {isAuthenticated && currentUser ? (
//                   // Logged-in user view
//                   <div className="flex items-center gap-2">
//                     <Button variant="ghost" size="sm" asChild>
//                       <Link
//                         to="/blog/write"
//                         className="flex items-center gap-2"
//                       >
//                         <Edit2 className="w-4 h-4" />
//                         <span className="hidden md:inline">Write</span>
//                       </Link>
//                     </Button>
//                     <Button variant="ghost" size="icon">
//                       <Bell className="w-5 h-5" />
//                     </Button>

//                     {/* Profile Dropdown */}
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
//                           <Avatar>
//                             <AvatarImage
//                               src={currentUser.avatar}
//                               alt={currentUser.fullName}
//                             />
//                             <AvatarFallback>
//                               {getInitials(currentUser.fullName)}
//                             </AvatarFallback>
//                           </Avatar>
//                         </button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end" className="w-56">
//                         <DropdownMenuLabel>
//                           <p className="font-bold">{currentUser.fullName}</p>
//                           <p className="text-xs text-muted-foreground">
//                             @{currentUser.username}
//                           </p>
//                         </DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem asChild>
//                           <Link
//                             to="/profile"
//                             className="flex items-center cursor-pointer"
//                           >
//                             <User className="w-4 h-4 mr-2" />
//                             <span>Profile</span>
//                           </Link>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem asChild>
//                           <Link
//                             to="/profile/settings"
//                             className="flex items-center cursor-pointer"
//                           >
//                             <Settings className="w-4 h-4 mr-2" />
//                             <span>Settings</span>
//                           </Link>
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem
//                           onClick={handleLogout}
//                           className="cursor-pointer text-red-500 focus:bg-red-500/10 focus:text-red-600"
//                         >
//                           <LogOut className="w-4 h-4 mr-2" />
//                           <span>Sign Out</span>
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>
//                 ) : (
//                   // Logged-out user view
//                   <div className="flex items-center gap-2">
//                     <Button variant="ghost" asChild>
//                       <Link to="/auth/login">Sign In</Link>
//                     </Button>
//                     <Button asChild>
//                       <Link to="/auth/register">Get Started</Link>
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
