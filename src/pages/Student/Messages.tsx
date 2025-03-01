
import React from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { ChatInterface } from '@/components/Chat/ChatInterface';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const StudentMessages = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect if not authenticated or not a student
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (currentUser?.role !== 'student') {
      navigate('/tutors');
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

export default StudentMessages;
