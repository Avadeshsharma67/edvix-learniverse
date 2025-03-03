
import React, { useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import ChatInterface from '@/components/Chat/ChatInterface';
import { useAuth } from '@/contexts/AuthContext';
import { useChat } from '@/contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const StudentMessages = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { initializeChat } = useChat();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Redirect if not authenticated or not a student
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (currentUser?.role !== 'student') {
      navigate('/');
      return;
    }

    // Initialize chat
    initializeChat?.();
    
    // Silent initialization without toast to prevent notification blinking issue
    if (!localStorage.getItem('chat_initialized')) {
      toast({
        title: "Messages Ready",
        description: "You can now chat with your tutors.",
      });
      localStorage.setItem('chat_initialized', 'true');
    }
  }, [isAuthenticated, currentUser, navigate, initializeChat, toast]);

  return (
    <DashboardLayout title="Messages">
      <div className={`card rounded-lg border bg-card text-card-foreground shadow-sm ${isMobile ? 'h-[calc(100vh-120px)]' : 'h-[calc(100vh-180px)]'}`}>
        <ChatInterface />
      </div>
    </DashboardLayout>
  );
};

export default StudentMessages;
