
import React, { useState } from 'react';
import { StarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { toast } from "@/components/ui/use-toast";

type CourseCardProps = {
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
};

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
}: CourseCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const formatIndianPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleEnroll = () => {
    toast({
      title: "Enrollment successful!",
      description: `You've enrolled in "${title}"`,
    });
    setIsOpen(false);
  };
  
  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;
  
  return (
    <>
      <div 
        className="flex flex-col h-full rounded-xl overflow-hidden bg-white border border-gray-100 shadow-subtle transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      >
        <div className="relative">
          <div className="aspect-video bg-gray-200 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <Badge 
            variant="secondary" 
            className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs"
          >
            {category}
          </Badge>
          {isRevamped && (
            <Badge 
              className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-white text-xs"
            >
              Revamped
            </Badge>
          )}
        </div>
        
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
            <p className="text-sm text-secondary/60 mb-2">By {instructor}</p>
            <p className="text-sm text-secondary/70 mb-4 line-clamp-2">{description}</p>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-500 mr-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-current' : 'fill-gray-200 text-gray-200'}`} 
                  />
                ))}
              </div>
              <span className="text-xs text-secondary/60">
                {rating} ({studentsCount} students)
              </span>
            </div>
          </div>
          
          <div>
            <div className="flex items-baseline mb-4">
              <span className="font-display font-bold text-lg mr-2">{formatIndianPrice(price)}</span>
              {originalPrice && (
                <>
                  <span className="text-sm text-secondary/50 line-through mr-2">{formatIndianPrice(originalPrice)}</span>
                  <span className="text-xs bg-green-50 text-green-600 px-1.5 py-0.5 rounded">
                    {discountPercentage}% off
                  </span>
                </>
              )}
            </div>
            
            <Button 
              className="w-full"
              onClick={() => setIsOpen(true)}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{title}</DialogTitle>
            <DialogDescription className="text-sm text-secondary/60">
              By {instructor} • {category}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img src={image} alt={title} className="w-full h-48 object-cover rounded-md" />
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Course Overview</h4>
                <p className="text-sm text-secondary/70">{description}</p>
              </div>
              
              <div className="flex items-center mt-4">
                <div className="flex items-center text-yellow-500 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-current' : 'fill-gray-200 text-gray-200'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs text-secondary/60">
                  {rating} ({studentsCount} students)
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">What You'll Learn</h4>
              <ul className="text-sm text-secondary/70 space-y-1">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Comprehensive understanding of {category} concepts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Practical exercises and real-world projects</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Access to exclusive learning resources</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Certificate of completion</span>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <div className="flex items-baseline mb-2">
                  <span className="font-display font-bold text-xl mr-2">{formatIndianPrice(price)}</span>
                  {originalPrice && (
                    <>
                      <span className="text-sm text-secondary/50 line-through mr-2">{formatIndianPrice(originalPrice)}</span>
                      <span className="text-xs bg-green-50 text-green-600 px-1.5 py-0.5 rounded">
                        {discountPercentage}% off
                      </span>
                    </>
                  )}
                </div>
                
                <Button 
                  className="w-full mb-2"
                  onClick={handleEnroll}
                >
                  Enroll Now
                </Button>
                
                <p className="text-xs text-center text-secondary/50">
                  30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <p className="text-xs text-secondary/50">Course ID: {id}</p>
            <DialogClose asChild>
              <Button variant="outline" size="sm">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseCard;
