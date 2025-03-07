
import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import ChatLayout from '@/components/Chat/ChatLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useChat } from '@/contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import AnimatedTitle from '@/components/AnimatedTitle';
import { motion } from 'framer-motion';
import OnboardingSuggestions from '@/components/Onboarding/OnboardingSuggestions';

const TutorMessages = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { initializeChat, setCurrentUser } = useChat();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  useEffect(() => {
    // Redirect if not authenticated or not a tutor
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (currentUser?.role !== 'tutor') {
      navigate('/');
      return;
    }

    // Set the current chat user based on auth user
    if (currentUser) {
      setCurrentUser({
        id: currentUser.id || 't1', // Fallback to demo ID
        name: currentUser.name || 'Tutor User',
        avatar: currentUser.avatar || '/placeholder.svg',
        role: 'tutor',
        email: currentUser.email
      });

      // Initialize chat
      initializeChat?.();
    }
    
    // Check if user is new (first login)
    const isFirstVisit = !localStorage.getItem('tutor_messages_visited');
    
    // Check if we have a message redirect pending
    const messageRedirect = localStorage.getItem('messageRedirect');
    
    if (messageRedirect) {
      // We have someone to message, this takes precedence
      try {
        const person = JSON.parse(messageRedirect);
        console.log('Redirected to message:', person);
        setTimeout(() => {
          toast({
            title: "Connect with " + person.name,
            description: `You can now start a conversation with ${person.name}.`,
          });
        }, 1000);
        // Clear the redirect to prevent it from happening again
        localStorage.removeItem('messageRedirect');
      } catch (error) {
        console.error('Error parsing message redirect data:', error);
      }
    } else if (isFirstVisit) {
      // First time visiting messages, show onboarding
      setShowOnboarding(true);
      localStorage.setItem('tutor_messages_visited', 'true');
    }
    
    // Silent initialization without toast to prevent notification blinking issue
    if (!localStorage.getItem('chat_initialized')) {
      toast({
        title: "Messages Ready",
        description: "You can now chat with your students.",
      });
      localStorage.setItem('chat_initialized', 'true');
    }
  }, [isAuthenticated, currentUser, navigate, initializeChat, toast, setCurrentUser]);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
  };

  return (
    <DashboardLayout title="Messages">
      <div className="mb-6">
        <AnimatedTitle 
          element="h1" 
          className="text-2xl font-bold" 
          animation="slide-up"
        >
          Your Conversations
        </AnimatedTitle>
        <motion.p 
          className="text-secondary/70 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Connect with your students and provide ongoing support.
        </motion.p>
      </div>
      
      <motion.div 
        className={`card rounded-lg border bg-card text-card-foreground shadow-md ${isMobile ? 'h-[calc(100vh-160px)]' : 'h-[calc(100vh-220px)]'} overflow-hidden`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ChatLayout />
      </motion.div>
      
      {/* Onboarding suggestions for new users */}
      <OnboardingSuggestions 
        open={showOnboarding} 
        onClose={handleCloseOnboarding} 
      />
    </DashboardLayout>
  );
};

export default TutorMessages;
