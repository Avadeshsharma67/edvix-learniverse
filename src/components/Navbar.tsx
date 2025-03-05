
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  GraduationCap, 
  Menu, 
  X, 
  Users, 
  LogIn, 
  UserPlus, 
  BookOpen, 
  Home, 
  Calendar,
  MessageSquare,
  Settings,
  LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (!isMobile && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, isMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isMenuOpen && e.target instanceof HTMLElement) {
        const navbar = document.getElementById("navbar");
        if (navbar && !navbar.contains(e.target)) {
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  const handleNavigation = (path: string, role?: string) => {
    if (role && !isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: "/", label: "Home", icon: <Home className="h-4 w-4 mr-2" /> },
    { to: "/marketplace", label: "Marketplace", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { to: "/about", label: "About", icon: <Users className="h-4 w-4 mr-2" /> },
  ];

  const callToActionLinks = [
    { 
      to: "/tutors", 
      label: "For Tutors", 
      icon: <GraduationCap className="h-4 w-4 mr-2" />,
      role: "tutor"
    },
    { 
      to: "/students", 
      label: "For Students", 
      icon: <Users className="h-4 w-4 mr-2" />,
      role: "student" 
    },
  ];

  const accountLinks = isAuthenticated ? [
    { 
      to: currentUser?.role === "tutor" ? "/tutors/messages" : "/students/messages", 
      label: "Messages", 
      icon: <MessageSquare className="h-4 w-4 mr-2" /> 
    },
    { 
      to: currentUser?.role === "tutor" ? "/tutors/calendar" : "/students/calendar", 
      label: "Calendar", 
      icon: <Calendar className="h-4 w-4 mr-2" /> 
    },
    { 
      to: currentUser?.role === "tutor" ? "/tutors/settings" : "/students/settings", 
      label: "Settings", 
      icon: <Settings className="h-4 w-4 mr-2" /> 
    },
  ] : [
    { to: "/login", label: "Sign In", icon: <LogIn className="h-4 w-4 mr-2" /> },
    { to: "/register", label: "Sign Up", icon: <UserPlus className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header
      id="navbar"
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-bold text-accent"
          >
            <GraduationCap className="h-6 w-6" />
            <span className="bg-gradient-to-r from-accent to-blue-600 bg-clip-text text-transparent">
              EdVix
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="ml-10 hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent flex items-center",
                  location.pathname === link.to
                    ? "text-accent"
                    : "text-muted-foreground"
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop call to action */}
        <div className="hidden md:flex items-center gap-4">
          {callToActionLinks.map((link) => (
            <Button
              key={link.to}
              variant={location.pathname === link.to ? "default" : "outline"}
              size="sm"
              onClick={() => handleNavigation(link.to, link.role)}
              className="flex items-center"
            >
              {link.icon}
              {link.label}
            </Button>
          ))}
          
          {isAuthenticated ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full overflow-hidden">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={currentUser?.avatar || ""} alt={currentUser?.name} />
                          <AvatarFallback>{currentUser?.name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{currentUser?.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">{currentUser?.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {accountLinks.map((link) => (
                        <DropdownMenuItem key={link.to} onClick={() => navigate(link.to)}>
                          {link.icon}
                          {link.label}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Account</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <div className="flex items-center gap-2">
              {accountLinks.map((link) => (
                <Button
                  key={link.to}
                  variant={link.to === "/register" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigate(link.to)}
                  className="flex items-center"
                >
                  {link.icon}
                  {link.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container py-4 grid gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "py-2 px-3 text-sm font-medium rounded-md transition-colors flex items-center",
                  location.pathname === link.to
                    ? "bg-muted text-accent"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            
            <div className="border-t my-2 pt-2">
              {callToActionLinks.map((link) => (
                <button
                  key={link.to}
                  onClick={() => handleNavigation(link.to, link.role)}
                  className={cn(
                    "flex items-center w-full py-2 px-3 text-sm font-medium rounded-md transition-colors",
                    location.pathname === link.to
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  {link.icon}
                  {link.label}
                </button>
              ))}
            </div>
            
            <div className="border-t my-2 pt-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 py-2 px-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser?.avatar || ""} alt={currentUser?.name} />
                      <AvatarFallback>{currentUser?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{currentUser?.name}</span>
                      <span className="text-xs text-muted-foreground">{currentUser?.email}</span>
                    </div>
                  </div>
                  {accountLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center w-full py-2 px-3 text-sm font-medium rounded-md transition-colors hover:bg-muted"
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full py-2 px-3 text-sm font-medium rounded-md transition-colors text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                accountLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "flex items-center w-full py-2 px-3 text-sm font-medium rounded-md transition-colors",
                      link.to === "/register" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    )}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
