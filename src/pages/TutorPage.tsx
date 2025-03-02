
import React from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import ChatInterface from '@/components/Chat/ChatInterface';
import { useAuth } from '@/contexts/AuthContext';

const TutorPage = () => {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout title={`Welcome, ${currentUser?.name || 'Tutor'}!`}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          {/* Dashboard content */}
          <div className="p-6 bg-white rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold mb-4">Tutor Dashboard</h2>
            <p className="text-gray-600">
              Manage your courses, connect with students, and track progress all in one place.
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

export default TutorPage;
