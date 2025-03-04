
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { SettingsForm } from '@/components/Dashboard/SettingsForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, ShieldCheck, UserCircle, Lock, Video, Calendar, Link as LinkIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const TutorSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { toast } = useToast();
  const [meetLink, setMeetLink] = useState('https://meet.google.com/qpj-stgk-opm');
  const [isLinkSaved, setIsLinkSaved] = useState(true);

  const handleSaveMeetLink = () => {
    // Validate Google Meet link
    if (!meetLink.includes('meet.google.com')) {
      toast({
        title: "Invalid Google Meet link",
        description: "Please enter a valid Google Meet URL",
        variant: "destructive"
      });
      return;
    }
    
    // Save the link (this would connect to a backend in a real application)
    setIsLinkSaved(true);
    toast({
      title: "Google Meet link saved",
      description: "Your default meeting link has been updated successfully"
    });
  };

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
                    Video Meeting Settings
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="meetLink">Default Google Meet Link</Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="meetLink"
                            placeholder="https://meet.google.com/xxx-xxxx-xxx" 
                            value={meetLink}
                            onChange={(e) => {
                              setMeetLink(e.target.value);
                              setIsLinkSaved(false);
                            }}
                            className="pl-10"
                          />
                        </div>
                        <Button 
                          onClick={handleSaveMeetLink}
                          disabled={isLinkSaved}
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This link will be used when scheduling classes with students
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-create">Auto-create meeting for each class</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically generate a new meeting link for each scheduled class
                        </p>
                      </div>
                      <Switch id="auto-create" />
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

export default TutorSettings;
