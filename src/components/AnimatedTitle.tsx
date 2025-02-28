
import React, { useEffect, useRef } from 'react';

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  delay?: number;
}

const AnimatedTitle = ({ 
  children, 
  className = "", 
  element = 'h2',
  delay = 0 
}: AnimatedTitleProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-slide-up');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, [delay]);
  
  const Element = element;
  
  return (
    <Element 
      ref={titleRef} 
      className={`opacity-0 ${className}`}
    >
      {children}
    </Element>
  );
};

export default AnimatedTitle;
