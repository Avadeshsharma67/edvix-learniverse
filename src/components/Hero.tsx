
import { useEffect, useRef } from 'react';
import AnimatedButton from './AnimatedButton';
import AnimatedTitle from './AnimatedTitle';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const containerRect = containerRef.current?.getBoundingClientRect();
      
      if (!containerRect) return;
      
      const x = (clientX - containerRect.left) / containerRect.width;
      const y = (clientY - containerRect.top) / containerRect.height;
      
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
      
      <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center text-center z-10">
        <div className="inline-block bg-secondary/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <span className="text-sm font-medium text-secondary/80">Reimagining Education</span>
        </div>
        
        <AnimatedTitle 
          element="h1" 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-balance mb-6 text-secondary"
          delay={200}
        >
          Learning Evolved for the <span className="text-gradient">Digital Age</span>
        </AnimatedTitle>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-secondary/70 mb-10 opacity-0 animate-fade-in text-balance" style={{ animationDelay: '0.5s' }}>
          Personalized education powered by AI, connecting students with tutors and transforming how we learn through interactive experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <AnimatedButton size="lg">
            Explore Courses
          </AnimatedButton>
          <AnimatedButton variant="outline" size="lg">
            Find a Tutor
          </AnimatedButton>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-20 max-w-3xl w-full opacity-0 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          {[
            { label: 'Courses', value: '2,500+' },
            { label: 'Tutors', value: '500+' },
            { label: 'Students', value: '25K+' },
            { label: 'Countries', value: '120+' },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <p className="text-2xl md:text-3xl font-display font-bold text-secondary">{stat.value}</p>
              <p className="text-sm text-secondary/60">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <span className="text-xs text-secondary/50 mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-secondary/20 rounded-full flex justify-center">
            <div className="w-1.5 h-1.5 bg-secondary/40 rounded-full mt-2 animate-[bounce_1.5s_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
