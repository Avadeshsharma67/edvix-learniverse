
import React from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { SettingsForm } from '@/components/Dashboard/SettingsForm';

const TutorSettings = () => {
  return (
    <DashboardLayout title="Settings">
      <div className="max-w-4xl">
        <SettingsForm />
      </div>
    </DashboardLayout>
  );
};

export default TutorSettings;
