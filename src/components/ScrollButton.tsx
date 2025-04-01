
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollButtonProps {
  targetId: string;
  className?: string;
  children?: React.ReactNode;
}

const ScrollButton = ({ targetId, className, children }: ScrollButtonProps) => {
  const handleScroll = () => {
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <button
      onClick={handleScroll}
      className={cn(
        "flex items-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:ring-offset-2 rounded-full",
        className
      )}
      aria-label={`Scroll to ${targetId}`}
    >
      {children}
      <ChevronDown className="animate-bounce" size={20} />
    </button>
  );
};

export default ScrollButton;
