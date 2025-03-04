
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { SettingsForm } from '@/components/Dashboard/SettingsForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, ShieldCheck, UserCircle, Lock, Video, Calendar, Link as LinkIcon, Copy, Check, Laptop } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const TutorSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { toast } = useToast();
  const [meetLink, setMeetLink] = useState('https://meet.google.com/qpj-stgk-opm');
  const [isLinkSaved, setIsLinkSaved] = useState(true);
  const [copied, setCopied] = useState(false);

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

  const copyMeetLink = () => {
    navigator.clipboard.writeText(meetLink);
    setCopied(true);
    
    toast({
      title: "Link copied!",
      description: "Google Meet link copied to clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const testMeeting = () => {
    window.open(meetLink, '_blank');
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
                  
                  <div className="space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <LinkIcon className="h-4 w-4 mr-2 text-primary" />
                        Default Google Meet Link
                      </h4>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1">
                          <Input 
                            id="meetLink"
                            placeholder="https://meet.google.com/xxx-xxxx-xxx" 
                            value={meetLink}
                            onChange={(e) => {
                              setMeetLink(e.target.value);
                              setIsLinkSaved(false);
                            }}
                            className="pr-10"
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="absolute right-0 top-0 h-full px-3"
                                  onClick={copyMeetLink}
                                >
                                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Copy link</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            onClick={handleSaveMeetLink}
                            disabled={isLinkSaved}
                            className="whitespace-nowrap"
                          >
                            {isLinkSaved ? 'Saved' : 'Save'} 
                          </Button>
                          <Button
                            variant="outline"
                            onClick={testMeeting}
                            className="whitespace-nowrap"
                          >
                            <Laptop className="mr-2 h-4 w-4" />
                            Test
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
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

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="reminder">Send meeting reminder</Label>
                        <p className="text-sm text-muted-foreground">
                          Send a reminder with the meeting link 15 minutes before class
                        </p>
                      </div>
                      <Switch id="reminder" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="record">Auto-record meetings</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically start recording when a class begins
                        </p>
                      </div>
                      <Switch id="record" />
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
