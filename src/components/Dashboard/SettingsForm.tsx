
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface SettingsFormProps {
  role: 'student' | 'tutor';
}

const SettingsForm: React.FC<SettingsFormProps> = ({ role }) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    notifications: {
      email: true,
      messages: true,
      updates: false,
    },
    privacy: {
      profileVisible: true,
      showActivityStatus: true,
    },
    appearance: {
      darkMode: false,
      fontSize: 'medium',
    }
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (category: string, name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [name]: checked
      }
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Settings updated",
        description: "Your settings have been successfully saved.",
      });
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile details and personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={currentUser?.avatar} />
                  <AvatarFallback>
                    {currentUser?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Profile Picture</h4>
                  <p className="text-sm text-muted-foreground mb-2">Upload a new profile picture</p>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                {role === 'tutor' && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all"
                      placeholder="Write a short professional bio..."
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you want to receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={formData.notifications.email}
                  onCheckedChange={(checked) => handleSwitchChange('notifications', 'email', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Message Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified when you receive a message</p>
                </div>
                <Switch
                  checked={formData.notifications.messages}
                  onCheckedChange={(checked) => handleSwitchChange('notifications', 'messages', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Platform Updates</Label>
                  <p className="text-sm text-muted-foreground">Get notified about platform updates and new features</p>
                </div>
                <Switch
                  checked={formData.notifications.updates}
                  onCheckedChange={(checked) => handleSwitchChange('notifications', 'updates', checked)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your privacy and visibility on the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                </div>
                <Switch
                  checked={formData.privacy.profileVisible}
                  onCheckedChange={(checked) => handleSwitchChange('privacy', 'profileVisible', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Activity Status</Label>
                  <p className="text-sm text-muted-foreground">Show when you're active on the platform</p>
                </div>
                <Switch
                  checked={formData.privacy.showActivityStatus}
                  onCheckedChange={(checked) => handleSwitchChange('privacy', 'showActivityStatus', checked)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Update Privacy"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how the application looks for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                </div>
                <Switch
                  checked={formData.appearance.darkMode}
                  onCheckedChange={(checked) => handleSwitchChange('appearance', 'darkMode', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Font Size</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['small', 'medium', 'large'].map((size) => (
                    <Button
                      key={size}
                      type="button"
                      variant={formData.appearance.fontSize === size ? "default" : "outline"}
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        appearance: {
                          ...prev.appearance,
                          fontSize: size
                        }
                      }))}
                      className="capitalize"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Appearance"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
};

export default SettingsForm;
