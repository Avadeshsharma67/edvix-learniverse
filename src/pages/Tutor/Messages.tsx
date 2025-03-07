
import React, { useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import ChatLayout from '@/components/Chat/ChatLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useChat } from '@/contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const TutorMessages = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { initializeChat, setCurrentUser } = useChat();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

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
  }, [isAuthenticated, currentUser, navigate, initializeChat, toast, setCurrentUser]);

  return (
    <DashboardLayout title="Messages">
      <div className={`card rounded-lg border bg-card text-card-foreground shadow-sm ${isMobile ? 'h-[calc(100vh-120px)]' : 'h-[calc(100vh-180px)]'}`}>
        <ChatLayout />
      </div>
    </DashboardLayout>
  );
};

export default TutorMessages;
