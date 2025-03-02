
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart, Star, Calendar, Users, ListChecks } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CourseDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: {
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
}

const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({ open, onOpenChange, course }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchase = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to purchase this course",
        variant: "destructive",
      });
      onOpenChange(false);
      navigate('/login');
      return;
    }

    setPurchasing(true);
    
    // Simulate purchase process
    setTimeout(() => {
      setPurchasing(false);
      onOpenChange(false);
      
      toast({
        title: "Purchase successful!",
        description: `You've successfully enrolled in "${course.title}"`,
      });
      
      // Navigate to the appropriate dashboard based on user role
      const dashboardPath = currentUser?.role === 'student' 
        ? '/students/courses' 
        : '/tutors/courses';
      
      navigate(dashboardPath);
    }, 1500);
  };

  const calculateDiscount = () => {
    if (!course.originalPrice) return 0;
    return Math.round((1 - course.price / course.originalPrice) * 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="relative">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-40 sm:h-56 object-cover"
          />
          
          {course.isRevamped && (
            <Badge className="absolute top-4 left-4 bg-secondary text-white">
              Revamped
            </Badge>
          )}
          
          <Badge className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-secondary">
            {course.category}
          </Badge>
        </div>
        
        <DialogHeader className="px-6 pt-4">
          <DialogTitle className="text-xl sm:text-2xl font-display">{course.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-secondary/80">
            By {course.instructor}
          </DialogDescription>
          
          <div className="flex items-center mt-2 space-x-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="ml-1 text-sm font-medium">{course.rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-secondary/70">{course.studentsCount.toLocaleString()} students</span>
          </div>
        </DialogHeader>
        
        <div className="px-6 py-3">
          <h4 className="text-sm font-semibold mb-2">About This Course</h4>
          <p className="text-sm text-secondary/80">{course.description}</p>
          
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-secondary/70" />
              <span>8 weeks</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-secondary/70" />
              <span>{course.studentsCount} enrolled</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ListChecks className="h-4 w-4 text-secondary/70" />
              <span>Certificate</span>
            </div>
          </div>
        </div>
        
        <DialogFooter className="bg-muted/20 p-6 flex-row items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold">
              ${course.price.toFixed(2)}
            </span>
            {course.originalPrice && (
              <>
                <span className="text-sm text-secondary/60 line-through">
                  ${course.originalPrice.toFixed(2)}
                </span>
                <Badge variant="outline" className="text-green-600 bg-green-50 border-green-100">
                  {calculateDiscount()}% off
                </Badge>
              </>
            )}
          </div>
          
          <Button 
            onClick={handlePurchase} 
            disabled={purchasing}
            className="gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            {purchasing ? "Processing..." : "Enroll Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailsModal;
