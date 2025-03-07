
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useOnboarding = (route: string) => {
  const { currentUser } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  useEffect(() => {
    // Only proceed if we have a logged-in user
    if (!currentUser) {
      return;
    }
    
    const key = `${currentUser.role}_${route}_onboarded`;
    const isFirstVisit = !localStorage.getItem(key);
    
    if (isFirstVisit) {
      // First visit to this route, show onboarding
      setShowOnboarding(true);
      // Mark as visited
      localStorage.setItem(key, 'true');
    }
  }, [currentUser, route]);
  
  return {
    showOnboarding,
    closeOnboarding: () => setShowOnboarding(false),
    resetOnboarding: () => {
      if (currentUser) {
        const key = `${currentUser.role}_${route}_onboarded`;
        localStorage.removeItem(key);
        setShowOnboarding(true);
      }
    }
  };
};

export default useOnboarding;
