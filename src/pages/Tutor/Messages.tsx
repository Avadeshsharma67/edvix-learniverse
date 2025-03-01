
import React from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { ChatInterface } from '@/components/Chat/ChatInterface';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const TutorMessages = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect if not authenticated or not a tutor
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (currentUser?.role !== 'tutor') {
      navigate('/');
      return;
    }
  }, [isAuthenticated, currentUser, navigate]);

  return (
    <DashboardLayout title="Messages">
      <div className="card rounded-lg border bg-card text-card-foreground shadow-sm">
        <ChatInterface />
      </div>
    </DashboardLayout>
  );
};

export default TutorMessages;
