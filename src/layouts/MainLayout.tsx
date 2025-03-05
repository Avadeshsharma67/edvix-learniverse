
import React, { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface MainLayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, fullWidth = false }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95">
      <Navbar />
      <main className={`flex-grow ${fullWidth ? '' : 'container mx-auto px-4 py-6 md:py-12'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
