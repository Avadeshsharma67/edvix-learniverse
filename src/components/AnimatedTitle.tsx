
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  delay?: number;
  animation?: 'slide-up' | 'fade-in' | 'scale-in' | 'text-gradient' | 'highlight' | 'none';
  color?: string;
}

const AnimatedTitle = ({ 
  children, 
  className = "", 
  element = 'h2',
  delay = 0,
  animation = 'slide-up',
  color
}: AnimatedTitleProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
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
  
  const getAnimationClass = () => {
    switch(animation) {
      case 'slide-up':
        return isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8';
      case 'fade-in':
        return isVisible ? 'animate-fade-in' : 'opacity-0';
      case 'scale-in':
        return isVisible ? 'animate-scale-in' : 'opacity-0 scale-95';
      case 'text-gradient':
        return 'text-gradient';
      case 'highlight':
        return 'highlight-animation';
      case 'none':
        return '';
      default:
        return 'opacity-0';
    }
  };
  
  const Element = element;
  
  return (
    <Element 
      ref={titleRef} 
      className={cn(
        getAnimationClass(),
        color || '',
        'transition-all duration-700 ease-out',
        className
      )}
    >
      {children}
      <style jsx>{`
        .highlight-animation {
          position: relative;
        }
        .highlight-animation::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 5px;
          background: rgba(59, 130, 246, 0.5);
          transition: width 1s ease-out;
          z-index: -1;
        }
        .highlight-animation.animate-highlight::after {
          width: 100%;
        }
      `}</style>
    </Element>
  );
};

export default AnimatedTitle;
