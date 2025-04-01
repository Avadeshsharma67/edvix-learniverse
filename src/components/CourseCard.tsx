
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  description: string;
  image: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  studentsCount: number;
  isRevamped?: boolean;
  className?: string;
}

const CourseCard = ({
  id,
  title,
  instructor,
  description,
  image,
  category,
  price,
  originalPrice,
  rating,
  studentsCount,
  isRevamped = false,
  className = ""
}: CourseCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsLoaded(true);
          }, Math.random() * 300);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center (-1 to 1)
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    // Limit rotation to a subtle amount
    setRotation({
      x: -y * 2, // Reversed for natural feel
      y: x * 2,
    });
  };
  
  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  return (
    <div
      ref={cardRef}
      className={`group relative bg-white rounded-xl overflow-hidden shadow-card 
                 transition-all duration-500 transform opacity-0 translate-y-8
                 ${isLoaded ? 'opacity-100 translate-y-0' : ''} ${className}`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.4s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetRotation}
    >
      <Link to={`/course/${id}`}>
        <div className="relative aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-700 ${isLoaded ? 'blur-0 scale-100' : 'blur-md scale-110'}`}
          />
          
          {/* Revamped badge */}
          {isRevamped && (
            <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-medium px-2 py-1 rounded-full">
              Revamped
            </div>
          )}
          
          {/* Category chip */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-secondary text-xs font-medium px-2.5 py-1 rounded-full">
            {category}
          </div>
        </div>
        
        <div className="p-5">
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
              <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-xs text-secondary/70">{studentsCount.toLocaleString()} students</span>
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-display font-semibold mb-1 line-clamp-2 group-hover:text-accent transition-colors duration-300">
            {title}
          </h3>
          
          {/* Instructor */}
          <p className="text-sm text-secondary/70 mb-3">By {instructor}</p>
          
          {/* Description */}
          <p className="text-sm text-secondary/80 mb-4 line-clamp-2">{description}</p>
          
          {/* Price */}
          <div className="flex items-center">
            <span className="text-lg font-semibold">{formatPrice(price)}</span>
            {originalPrice && (
              <span className="ml-2 text-sm text-secondary/60 line-through">{formatPrice(originalPrice)}</span>
            )}
            {originalPrice && (
              <span className="ml-2 bg-green-50 text-green-600 text-xs font-medium px-2 py-0.5 rounded">
                {Math.round((1 - price / originalPrice) * 100)}% off
              </span>
            )}
          </div>
        </div>
      </Link>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default CourseCard;
