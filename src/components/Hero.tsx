
import { useEffect, useRef } from 'react';
import AnimatedButton from './AnimatedButton';
import AnimatedTitle from './AnimatedTitle';
import { Link } from 'react-router-dom';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Parallax effect for the hero section
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const containerRect = containerRef.current?.getBoundingClientRect();
      
      if (!containerRect) return;
      
      const x = (clientX - containerRect.left) / containerRect.width;
      const y = (clientY - containerRect.top) / containerRect.height;
      
      const moveX = x * 20 - 10; // -10 to 10px movement
      const moveY = y * 20 - 10;
      
      const blurs = containerRef.current?.querySelectorAll('.floating-blur');
      const heroImages = containerRef.current?.querySelectorAll('.parallax-image');
      
      blurs?.forEach((blur, index) => {
        const factor = index === 0 ? 1 : -0.5;
        (blur as HTMLElement).style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
      });
      
      heroImages?.forEach((image, index) => {
        const factor = (index + 1) * 0.2;
        (image as HTMLElement).style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
      });
    };
    
    // Animation for the digital particles
    const initParticles = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Set canvas size
      const updateSize = () => {
        if (!canvas || !containerRef.current) return;
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
      };
      
      window.addEventListener('resize', updateSize);
      updateSize();
      
      // Particle system
      const particles: {
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        opacity: number;
        color: string;
      }[] = [];
      
      const colors = ['rgba(30, 174, 219, 0.5)', 'rgba(139, 92, 246, 0.5)'];
      
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (const particle of particles) {
          // Move particles
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Wrap particles around the canvas
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.y > canvas.height) particle.y = 0;
          if (particle.y < 0) particle.y = canvas.height;
          
          // Draw particles
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        }
        
        // Connect particles with lines if they're close enough
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(100, 100, 255, ${0.1 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => {
        window.removeEventListener('resize', updateSize);
      };
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    const cleanup = initParticles();
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (cleanup) cleanup();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10"
      ></canvas>
      
      {/* Animated background blurs */}
      <div className="floating-blur absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] -z-10 opacity-60 animate-pulse-subtle"></div>
      <div className="floating-blur absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] -z-10 opacity-40 animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
      
      {/* 3D Floating elements */}
      <div className="parallax-image absolute top-1/3 -right-10 md:right-10 lg:right-20 w-24 h-24 md:w-32 md:h-32 opacity-30 md:opacity-40">
        <img src="https://images.unsplash.com/photo-1594904351111-a072f80b1a71?q=80&w=240&auto=format&fit=crop" alt="" className="w-full h-full object-cover rounded-2xl" />
      </div>
      
      <div className="parallax-image absolute bottom-1/3 -left-10 md:left-10 lg:left-32 w-20 h-20 md:w-28 md:h-28 opacity-30 md:opacity-40 rotate-12">
        <img src="https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=200&auto=format&fit=crop" alt="" className="w-full h-full object-cover rounded-2xl" />
      </div>
      
      <div className="parallax-image absolute top-[60%] left-[60%] w-16 h-16 md:w-24 md:h-24 opacity-20 md:opacity-30 -rotate-6">
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=200&auto=format&fit=crop" alt="" className="w-full h-full object-cover rounded-2xl" />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.015] -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center text-center z-10">
        <div className="inline-block bg-gradient-to-r from-accent/10 to-secondary/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <span className="text-sm font-medium text-secondary/80">AI-Powered Education Platform</span>
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
          <Link to="/marketplace">
            <AnimatedButton size="lg" asLink>
              Explore Courses
            </AnimatedButton>
          </Link>
          <Link to="/tutors">
            <AnimatedButton variant="outline" size="lg" asLink>
              Find a Tutor
            </AnimatedButton>
          </Link>
        </div>
        
        {/* Futuristic "As Featured In" */}
        <div className="mt-16 max-w-4xl w-full">
          <p className="text-xs uppercase tracking-wide text-secondary/40 mb-6">As featured in</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-80">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/The_Economic_Times_logo.svg/320px-The_Economic_Times_logo.svg.png" alt="Economic Times" className="h-6 md:h-8 opacity-50 hover:opacity-70 transition-opacity" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/YourStory_logo.svg/320px-YourStory_logo.svg.png" alt="YourStory" className="h-6 md:h-8 opacity-50 hover:opacity-70 transition-opacity" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/ThePrint_Logo_Blue.svg/320px-ThePrint_Logo_Blue.svg.png" alt="ThePrint" className="h-6 md:h-8 opacity-50 hover:opacity-70 transition-opacity" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/The_Hindu_logo.svg/320px-The_Hindu_logo.svg.png" alt="The Hindu" className="h-6 md:h-8 opacity-50 hover:opacity-70 transition-opacity" />
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-20 max-w-3xl w-full opacity-0 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          {[
            { label: 'Courses', value: '2,500+' },
            { label: 'Tutors', value: '500+' },
            { label: 'Students', value: '25K+' },
            { label: 'Countries', value: '120+' },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center group">
              <p className="text-2xl md:text-3xl font-display font-bold text-secondary group-hover:text-accent transition-colors">{stat.value}</p>
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
