
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { SettingsForm } from '@/components/Dashboard/SettingsForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, ShieldCheck, UserCircle, Lock, Video, Calendar, Headphones, Mic, Volume2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const StudentSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [videoQuality, setVideoQuality] = useState('720p');
  const [audioLevel, setAudioLevel] = useState([70]);

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
                  
                  <div className="space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
                      <h4 className="text-sm font-medium mb-3 flex items-center">
                        <Video className="h-4 w-4 mr-2 text-primary" />
                        Video Settings
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="auto-join">Auto-join video meetings</Label>
                            <p className="text-sm text-muted-foreground">
                              Automatically join the meeting when a class is scheduled to start
                            </p>
                          </div>
                          <Switch id="auto-join" defaultChecked />
                        </div>
                        
                        <div className="space-y-0.5">
                          <Label htmlFor="video-quality">Video Quality</Label>
                          <Select value={videoQuality} onValueChange={setVideoQuality}>
                            <SelectTrigger id="video-quality" className="w-full">
                              <SelectValue placeholder="Select video quality" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="360p">360p (Low)</SelectItem>
                              <SelectItem value="480p">480p (Medium)</SelectItem>
                              <SelectItem value="720p">720p (High)</SelectItem>
                              <SelectItem value="1080p">1080p (HD)</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-sm text-muted-foreground pt-1">
                            Higher quality requires more bandwidth
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
                      <h4 className="text-sm font-medium mb-3 flex items-center">
                        <Headphones className="h-4 w-4 mr-2 text-primary" />
                        Audio Settings
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="noise-cancel">Noise cancellation</Label>
                            <p className="text-sm text-muted-foreground">
                              Reduce background noise during classes
                            </p>
                          </div>
                          <Switch id="noise-cancel" defaultChecked />
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <Label htmlFor="audio-level" className="flex items-center">
                              <Volume2 className="h-4 w-4 mr-2" />
                              Speaker volume
                            </Label>
                            <span className="text-sm text-muted-foreground">{audioLevel[0]}%</span>
                          </div>
                          <Slider
                            id="audio-level"
                            value={audioLevel}
                            onValueChange={setAudioLevel}
                            max={100}
                            step={1}
                          />
                        </div>
                      </div>
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
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-mute">Join with microphone muted</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically mute your microphone when joining a class
                        </p>
                      </div>
                      <Switch id="auto-mute" />
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
