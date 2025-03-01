
import React, { useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { ChatInterface } from '@/components/Chat/ChatInterface';
import { useAuth } from '@/contexts/AuthContext';
import { useChat } from '@/contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const TutorMessages = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { initializeChat } = useChat();
  const navigate = useNavigate();
  const { toast } = useToast();

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

    // Initialize chat
    initializeChat?.();
    
    // Show welcome toast
    toast({
      title: "Messages Loaded",
      description: "You can now chat with your students.",
    });
  }, [isAuthenticated, currentUser, navigate, initializeChat, toast]);

  return (
    <DashboardLayout title="Messages">
      <div className="card rounded-lg border bg-card text-card-foreground shadow-sm">
        <ChatInterface />
      </div>
    </DashboardLayout>
  );
};

export default TutorMessages;
