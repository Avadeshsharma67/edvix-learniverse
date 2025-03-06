import { useEffect, useRef, useState } from 'react';
import AnimatedButton from './AnimatedButton';
import AnimatedTitle from './AnimatedTitle';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Brain, Book, Users, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const containerRect = containerRef.current?.getBoundingClientRect();
      
      if (!containerRect) return;
      
      const x = (clientX - containerRect.left) / containerRect.width;
      const y = (clientY - containerRect.top) / containerRect.height;
      
      setMousePosition({ x, y });
      
      const moveX = x * 20 - 10; // -10 to 10px movement
      const moveY = y * 20 - 10;
      
      const blurs = containerRef.current?.querySelectorAll('.floating-blur');
      
      blurs?.forEach((blur, index) => {
        const factor = index === 0 ? 1 : -0.5;
        (blur as HTMLElement).style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleExplore = () => {
    navigate('/marketplace');
  };

  const handleFindTutor = () => {
    if (currentUser) {
      navigate(currentUser.role === 'student' ? '/students/tutors' : '/tutors');
    } else {
      navigate('/students');
    }
  };
  
  const handleScrollExplore = () => {
    const featuresSection = document.querySelector('section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const stats = [
    { label: 'Courses', value: '2,500+', icon: <Book className="h-5 w-5 text-blue-500" /> },
    { label: 'Tutors', value: '500+', icon: <Users className="h-5 w-5 text-green-500" /> },
    { label: 'Students', value: '25K+', icon: <Brain className="h-5 w-5 text-purple-500" /> },
    { label: 'Countries', value: '120+', icon: <Globe className="h-5 w-5 text-amber-500" /> },
  ];

  const floatingElements = [
    { icon: '📚', x: '10%', y: '20%', size: 40, delay: 0 },
    { icon: '🔍', x: '85%', y: '25%', size: 36, delay: 0.2 },
    { icon: '💡', x: '75%', y: '65%', size: 42, delay: 0.4 },
    { icon: '🎓', x: '15%', y: '70%', size: 38, delay: 0.6 },
    { icon: '📝', x: '50%', y: '15%', size: 34, delay: 0.8 },
  ];
  
  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated background blurs */}
      <div className="floating-blur absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] -z-10 opacity-60 animate-pulse-subtle"></div>
      <div className="floating-blur absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] -z-10 opacity-40 animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.015] -z-10"></div>

      {/* Floating elements */}
      {floatingElements.map((el, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl z-10 pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: el.delay,
            type: "spring",
            stiffness: 200
          }}
          style={{ 
            left: el.x, 
            top: el.y, 
            fontSize: el.size,
          }}
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0], 
              rotate: [0, mousePosition.x * 10, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            {el.icon}
          </motion.div>
        </motion.div>
      ))}
      
      <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center text-center z-10">
        <motion.div 
          className="inline-block bg-secondary/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="text-sm font-medium text-secondary/80 flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
            Reimagining Education
          </span>
        </motion.div>
        
        <AnimatedTitle 
          element="h1" 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-balance mb-6 text-secondary"
          delay={200}
        >
          Learning Evolved for the <span className="text-gradient">Digital Age</span>
        </AnimatedTitle>
        
        <motion.p 
          className="max-w-2xl mx-auto text-lg md:text-xl text-secondary/70 mb-10 text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Personalized education powered by AI, connecting students with tutors and transforming how we learn through interactive experiences.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <AnimatedButton size="lg" onClick={handleExplore}>
            Explore Courses
          </AnimatedButton>
          <AnimatedButton variant="outline" size="lg" onClick={handleFindTutor}>
            Find a Tutor
          </AnimatedButton>
        </motion.div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-20 max-w-3xl w-full">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + (index * 0.1) }}
            >
              <div className="flex items-center gap-2 mb-2">
                {stat.icon}
                <p className="text-2xl md:text-3xl font-display font-bold text-secondary">{stat.value}</p>
              </div>
              <p className="text-sm text-secondary/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Scroll indicator - Updated to be clickable */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          onClick={handleScrollExplore}
          role="button"
          aria-label="Scroll to explore"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleScrollExplore();
            }
          }}
        >
          <span className="text-xs text-secondary/50 mb-2">Scroll to explore</span>
          <motion.div 
            className="w-6 h-10 border-2 border-secondary/20 rounded-full flex justify-center hover:border-secondary/40 transition-colors"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div 
              className="w-1.5 h-1.5 bg-secondary/40 rounded-full mt-2"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="h-4 w-4 text-secondary/40" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
