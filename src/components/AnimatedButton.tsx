
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

const AnimatedButton = ({ 
  variant = 'primary', 
  size = 'md', 
  className = "", 
  children,
  ...props 
}: AnimatedButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseStyles = "relative rounded-md font-medium transition-all duration-300 ease-out-expo transform overflow-hidden";
  
  const variantStyles = {
    primary: "bg-secondary text-white hover:bg-secondary/90",
    secondary: "bg-primary text-secondary hover:bg-primary/80",
    outline: "bg-transparent border border-secondary text-secondary hover:bg-secondary/5",
    ghost: "bg-transparent text-secondary hover:bg-secondary/5",
  };
  
  const sizeStyles = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };
  
  const rippleEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    
    if (ripple) {
      ripple.remove();
    }
    
    button.appendChild(circle);
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        isHovered ? 'shadow-sm translate-y-[-2px]' : 'shadow-none',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={rippleEffect}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <style jsx>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 600ms linear;
          background-color: rgba(255, 255, 255, 0.7);
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
};

export default AnimatedButton;
