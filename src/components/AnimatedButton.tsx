
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  animation?: 'ripple' | 'scale' | 'pulse' | 'shine' | 'none';
}

const AnimatedButton = ({ 
  variant = 'primary', 
  size = 'md', 
  className = "", 
  children,
  isLoading = false,
  loadingText,
  animation = 'ripple',
  ...props 
}: AnimatedButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const baseStyles = "relative rounded-md font-medium transition-all duration-300 ease-out-expo transform overflow-hidden";
  
  const variantStyles = {
    primary: "bg-secondary text-white hover:bg-secondary/90 active:bg-secondary/95 shadow-md hover:shadow-lg",
    secondary: "bg-primary text-secondary hover:bg-primary/80 active:bg-primary/90 shadow-md hover:shadow-lg",
    outline: "bg-transparent border-2 border-secondary text-secondary hover:bg-secondary/5 active:bg-secondary/10 shadow-sm hover:shadow-md",
    ghost: "bg-transparent text-secondary hover:bg-secondary/5 active:bg-secondary/10",
    accent: "bg-accent text-white hover:bg-accent/90 active:bg-accent/95 shadow-md hover:shadow-lg",
    success: "bg-green-500 text-white hover:bg-green-600 active:bg-green-700 shadow-md hover:shadow-lg",
    warning: "bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 shadow-md hover:shadow-lg",
    info: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 shadow-md hover:shadow-lg",
  };
  
  const sizeStyles = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
    xl: "px-10 py-4 text-xl",
  };
  
  // Animation classes
  const getAnimationClass = () => {
    switch(animation) {
      case 'ripple':
        return "";  // Ripple is handled by rippleEffect function
      case 'scale':
        return "transition-transform hover:scale-105 active:scale-95";
      case 'pulse':
        return "hover:animate-pulse";
      case 'shine':
        return "shine-effect";
      case 'none':
      default:
        return "";
    }
  };
  
  const rippleEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (animation !== 'ripple') return;
    
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
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
        getAnimationClass(),
        isHovered && !isLoading ? 'shadow-md translate-y-[-2px]' : 'shadow-sm',
        isPressed && !isLoading ? 'scale-[0.98] translate-y-0' : '',
        isLoading ? 'opacity-90 cursor-progress' : '',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={rippleEffect}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading && loadingText ? loadingText : children}
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
          
          .shine-effect {
            position: relative;
            overflow: hidden;
          }
          
          .shine-effect::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.3) 50%,
              rgba(255, 255, 255, 0) 100%
            );
            transform: rotate(30deg);
            opacity: 0;
            transition: opacity 0.3s;
          }
          
          .shine-effect:hover::after {
            opacity: 1;
            animation: shine 1.5s ease-in-out;
          }
          
          @keyframes shine {
            from {
              transform: translateX(-100%) rotate(30deg);
            }
            to {
              transform: translateX(100%) rotate(30deg);
            }
          }
        `}
      </style>
    </button>
  );
};

export default AnimatedButton;
