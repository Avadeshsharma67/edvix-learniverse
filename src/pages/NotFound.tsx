
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import AnimatedButton from '@/components/AnimatedButton';

const NotFound = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <div className="absolute bg-secondary px-2 text-sm rounded rotate-12 text-white">
          Page Not Found
        </div>
        <div className="text-5xl font-bold text-secondary mt-5">Oops!</div>
        <div className="text-gray-500 mt-8 text-xl max-w-md">
          We can't seem to find the page you're looking for.
        </div>
        <div className="mt-12">
          <AnimatedButton>
            <Link to="/">Go Home</Link>
          </AnimatedButton>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
