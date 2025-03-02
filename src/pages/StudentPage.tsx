
import React from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import ChatInterface from '@/components/Chat/ChatInterface';
import { useAuth } from '@/contexts/AuthContext';

const StudentPage = () => {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout title={`Welcome, ${currentUser?.name || 'Student'}!`}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          {/* Course content or welcome message */}
          <div className="p-6 bg-white rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold mb-4">Your Learning Journey</h2>
            <p className="text-gray-600">
              Track your progress, connect with tutors, and access your course materials all in one place.
            </p>
          </div>
        </div>
        <div className="col-span-1">
          {/* Quick chat interface */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden h-[400px]">
            <ChatInterface />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentPage;
