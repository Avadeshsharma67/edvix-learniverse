
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { label: 'Courses', href: '/marketplace' },
        { label: 'Tutors', href: '/tutors' },
        { label: 'Live Sessions', href: '/live-sessions' },
        { label: 'Community', href: '/community' },
        { label: 'Pricing', href: '/pricing' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Blog', href: '/blog' },
        { label: 'Press', href: '/press' },
        { label: 'Partners', href: '/partners' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'Tutorials', href: '/tutorials' },
        { label: 'Support', href: '/support' },
        { label: 'API', href: '/api' },
        { label: 'Status', href: '/status' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms', href: '/terms' },
        { label: 'Privacy', href: '/privacy' },
        { label: 'Cookies', href: '/cookies' },
        { label: 'Licensing', href: '/licensing' },
        { label: 'Settings', href: '/settings' },
      ],
    },
  ];
  
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-2 lg:col-span-4">
            <Link to="/" className="text-2xl font-display font-semibold text-secondary inline-flex items-center mb-4">
              <span className="bg-secondary text-white px-1.5 py-0.5 rounded mr-1">Ed</span>
              <span className="text-secondary">Vix</span>
            </Link>
            <p className="text-sm text-secondary/70 mb-4 max-w-xs">
              AI-powered educational platform connecting students with tutors from across India for personalized learning experiences.
            </p>
            <div className="flex space-x-4">
              {/* Social icons */}
              {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social}
                  href={`https://${social}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary/5 text-secondary/70 hover:bg-secondary hover:text-white transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          {/* Link columns */}
          {footerLinks.map((column, i) => (
            <div key={i} className="col-span-1 md:col-span-1 lg:col-span-2">
              <h3 className="font-medium text-secondary mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <Link 
                      to={link.href}
                      className="text-sm text-secondary/60 hover:text-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom section */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-secondary/60">
            &copy; {currentYear} EdVix. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <select 
              name="language" 
              id="language-select"
              className="text-sm bg-transparent border border-gray-200 rounded-md py-1 px-2 text-secondary/70 focus:outline-none focus:ring-1 focus:ring-secondary"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
