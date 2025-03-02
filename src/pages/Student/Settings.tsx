
import React from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import SettingsForm from '@/components/Dashboard/SettingsForm';

const StudentSettings = () => {
  return (
    <DashboardLayout title="Settings">
      <div className="max-w-4xl">
        <SettingsForm role="student" />
      </div>
    </DashboardLayout>
  );
};

export default StudentSettings;
