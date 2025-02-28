
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import AnimatedButton from '@/components/AnimatedButton';

const NotFound = () => {
  return (
    <MainLayout className="bg-gray-50">
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-lg">
          <div className="relative mb-10">
            <div className="text-9xl font-display font-bold text-secondary/10">404</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl font-semibold text-secondary">Page Not Found</div>
          </div>
          
          <p className="text-lg text-secondary/70 mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton 
              onClick={() => window.history.back()}
              variant="outline"
            >
              Go Back
            </AnimatedButton>
            
            <Link to="/">
              <AnimatedButton>
                Return Home
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
