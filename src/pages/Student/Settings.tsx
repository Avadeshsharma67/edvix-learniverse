
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { SettingsForm } from '@/components/Dashboard/SettingsForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, ShieldCheck, UserCircle, Lock, Video, Calendar } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const StudentSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-4 sm:grid-cols-4">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="account" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span className="hidden sm:inline">Account</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <SettingsForm />

                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Video className="h-5 w-5 mr-2 text-primary" />
                    Class Preferences
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-join">Auto-join video meetings</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically join the meeting when a class is scheduled to start
                        </p>
                      </div>
                      <Switch id="auto-join" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="reminder">Class reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications 15 minutes before a scheduled class
                        </p>
                      </div>
                      <Switch id="reminder" defaultChecked />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="account">
                <SettingsForm />
              </TabsContent>
              
              <TabsContent value="notifications">
                <SettingsForm />
              </TabsContent>
              
              <TabsContent value="security">
                <SettingsForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentSettings;
