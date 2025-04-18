
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnimatedButton from './AnimatedButton';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Tutors', path: '/tutors' },
    { name: 'About', path: '/about' },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    // Check current auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'py-3 bg-white shadow-subtle' : 'py-5 bg-white/80 backdrop-blur-lg'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-display font-semibold text-secondary flex items-center"
          >
            <span className="bg-accent text-white px-2 py-1 rounded mr-1 transform transition-transform hover:scale-105">Ed</span>
            <span className="text-secondary transform transition-transform hover:scale-105">Vix</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors button-hover-animation ${
                  location.pathname === link.path 
                    ? 'text-secondary' 
                    : 'text-secondary/70 hover:text-secondary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <AnimatedButton 
                  variant="outline" 
                  size="sm"
                  to="/dashboard"
                  asLink
                >
                  Dashboard
                </AnimatedButton>
                <AnimatedButton 
                  variant="accent" 
                  size="sm"
                  onClick={handleLogout}
                >
                  Log Out
                </AnimatedButton>
              </>
            ) : (
              <>
                <AnimatedButton 
                  variant="outline" 
                  size="sm"
                  to="/auth"
                  asLink
                >
                  Log In
                </AnimatedButton>
                <AnimatedButton 
                  variant="accent" 
                  size="sm"
                  to="/auth"
                  asLink
                  withArrow
                >
                  Sign Up
                </AnimatedButton>
              </>
            )}
          </div>
          
          <button 
            className="md:hidden p-2 rounded-md text-secondary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span 
                className={`block h-0.5 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span 
                className={`block h-0.5 bg-current transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span 
                className={`block h-0.5 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>
        
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out-expo ${
            isMobileMenuOpen ? 'max-h-64 mt-4 opacity-100' : 'max-h-0 mt-0 opacity-0 pointer-events-none'
          }`}
        >
          <nav className="flex flex-col space-y-4 py-4 bg-white rounded-lg shadow-subtle my-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium px-4 py-2 ${
                  location.pathname === link.path 
                    ? 'text-secondary bg-slate-50' 
                    : 'text-secondary/70 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-3 px-4 border-t border-slate-100">
              {isLoggedIn ? (
                <>
                  <AnimatedButton 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-center"
                    to="/dashboard"
                    asLink
                  >
                    Dashboard
                  </AnimatedButton>
                  <AnimatedButton 
                    variant="accent" 
                    size="sm" 
                    className="w-full justify-center"
                    onClick={handleLogout}
                  >
                    Log Out
                  </AnimatedButton>
                </>
              ) : (
                <>
                  <AnimatedButton 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-center"
                    to="/auth"
                    asLink
                  >
                    Log In
                  </AnimatedButton>
                  <AnimatedButton 
                    variant="accent" 
                    size="sm" 
                    className="w-full justify-center"
                    to="/auth"
                    asLink
                    withArrow
                  >
                    Sign Up
                  </AnimatedButton>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
