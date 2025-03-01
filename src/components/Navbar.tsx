
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { GraduationCap, Menu, X, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { currentUser, isAuthenticated } = useAuth();
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

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/marketplace", label: "Marketplace" },
    { to: "/about", label: "About" },
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

  return (
    <header
      id="navbar"
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-bold text-accent"
          >
            <GraduationCap className="h-5 w-5" />
            EdVix
          </Link>

          {/* Desktop navigation */}
          <nav className="ml-10 hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  location.pathname === link.to
                    ? "text-accent"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop call to action */}
        <div className="hidden md:flex gap-2">
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
                  "py-2 px-3 text-sm font-medium rounded-md transition-colors",
                  location.pathname === link.to
                    ? "bg-muted text-accent"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
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
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
