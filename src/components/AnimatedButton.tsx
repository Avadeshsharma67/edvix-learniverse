
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  to?: string; // Optional prop for routing
  asLink?: boolean; // Flag to render as Link component
}

const AnimatedButton = ({ 
  variant = 'primary', 
  size = 'md', 
  className = "", 
  children,
  to,
  asLink = false,
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
  
  const rippleEffect = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - element.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - element.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = element.getElementsByClassName('ripple')[0];
    
    if (ripple) {
      ripple.remove();
    }
    
    element.appendChild(circle);
  };

  const buttonClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    isHovered ? 'shadow-sm translate-y-[-2px]' : 'shadow-none',
    className
  );
  
  // Render as Link if to prop is provided
  if (asLink || to) {
    return (
      <Link
        to={to || "#"}
        className={buttonClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={rippleEffect as any}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        <style>
          {`
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
          `}
        </style>
      </Link>
    );
  }
  
  // Default render as button
  return (
    <button
      className={buttonClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        rippleEffect(e);
        if (props.onClick) {
          props.onClick(e);
        }
      }}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <style>
        {`
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
        `}
      </style>
    </button>
  );
};

export default AnimatedButton;
