
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedButton from './AnimatedButton';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Information */}
          <div className="space-y-4">
            <Link 
              to="/" 
              className="text-2xl font-display font-semibold text-secondary flex items-center"
            >
              <span className="bg-secondary text-white px-2 py-1 rounded mr-1">Ed</span>
              <span className="text-secondary">Vix</span>
            </Link>
            <p className="text-sm text-secondary/70 mt-2 max-w-xs">
              Revolutionizing education with AI-powered personalized learning experiences for students around the world.
            </p>
            <div className="flex space-x-4 mt-4">
              {/* Social Media Icons */}
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social} 
                  href={`#${social}`} 
                  className="w-8 h-8 rounded-full bg-white shadow-subtle flex items-center justify-center text-secondary/70 hover:text-secondary transition-colors duration-300"
                  aria-label={`EdVix on ${social.charAt(0).toUpperCase() + social.slice(1)}`}
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4">
                    {social === 'facebook' && (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" fill="currentColor"/>
                      </svg>
                    )}
                    {social === 'twitter' && (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 3C9.10457 3 10 3.89543 10 5V8H16C17.1046 8 18 8.89543 18 10C18 11.1046 17.1046 12 16 12H10V14C10 15.6569 11.3431 17 13 17H16C17.1046 17 18 17.8954 18 19C18 20.1046 17.1046 21 16 21H13C9.13401 21 6 17.866 6 14V5C6 3.89543 6.89543 3 8 3Z" fill="currentColor"/>
                      </svg>
                    )}
                    {social === 'instagram' && (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12Z" fill="currentColor"/>
                        <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="currentColor"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M5 1C2.79086 1 1 2.79086 1 5V19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5ZM19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" fill="currentColor"/>
                      </svg>
                    )}
                    {social === 'linkedin' && (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" fill="currentColor"/>
                        <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z" fill="currentColor"/>
                        <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z" fill="currentColor"/>
                      </svg>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Courses', path: '/marketplace' },
                { name: 'Tutors', path: '/tutors' },
                { name: 'Pricing', path: '/pricing' },
                { name: 'Blog', path: '/blog' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-secondary/70 hover:text-secondary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4 text-secondary">Resources</h3>
            <ul className="space-y-2">
              {[
                { name: 'Help Center', path: '/help' },
                { name: 'Terms of Service', path: '/terms' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-secondary/70 hover:text-secondary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4 text-secondary">Stay Updated</h3>
            <p className="text-sm text-secondary/70 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-2.5 rounded-md bg-white border border-gray-200 text-secondary/80 placeholder:text-secondary/40 focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all duration-300"
                />
              </div>
              <AnimatedButton 
                variant="primary" 
                size="sm" 
                className="w-full"
              >
                Subscribe
              </AnimatedButton>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-secondary/60">
            &copy; {new Date().getFullYear()} EdVix. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              {[
                { name: 'Terms', path: '/terms' },
                { name: 'Privacy', path: '/privacy' },
                { name: 'Cookies', path: '/cookies' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-secondary/60 hover:text-secondary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
