
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, CheckCircle, ExternalLink, Shield, Upload } from 'lucide-react';

// Create different form schemas for each section
const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  bio: z.string().max(500, { message: 'Bio cannot exceed 500 characters.' }).optional(),
  profilePhoto: z.string().optional(),
});

const accountFormSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters.' }),
  timezone: z.string(),
  language: z.string(),
});

const notificationsFormSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  updatesAndNews: z.boolean(),
});

const securityFormSchema = z.object({
  currentPassword: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  newPassword: z.string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .optional(),
  confirmPassword: z.string().optional(),
  twoFactorAuth: z.boolean(),
}).refine((data) => {
  if (data.newPassword && data.confirmPassword) {
    return data.newPassword === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

interface SettingsFormProps {
  section?: 'profile' | 'account' | 'notifications' | 'security';
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ section = 'profile' }) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [verifyingPhone, setVerifyingPhone] = useState(false);
  const [otpVerificationEnabled, setOtpVerificationEnabled] = useState(false);
  
  // Configure form based on selected section
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      bio: '',
      profilePhoto: '',
    }
  });

  const accountForm = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      username: currentUser?.name?.toLowerCase().replace(/\s+/g, '_') || '',
      timezone: 'UTC-5 (Eastern Time)',
      language: 'en',
    }
  });

  const notificationsForm = useForm<z.infer<typeof notificationsFormSchema>>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      updatesAndNews: true,
    }
  });

  const securityForm = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorAuth: false,
    }
  });

  const onSubmitProfile = (values: z.infer<typeof profileFormSchema>) => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
    console.log("Profile form values:", values);
  };

  const onSubmitAccount = (values: z.infer<typeof accountFormSchema>) => {
    toast({
      title: "Account Settings Updated",
      description: "Your account settings have been updated successfully.",
    });
    console.log("Account form values:", values);
  };

  const onSubmitNotifications = (values: z.infer<typeof notificationsFormSchema>) => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
    console.log("Notifications form values:", values);
  };

  const onSubmitSecurity = (values: z.infer<typeof securityFormSchema>) => {
    toast({
      title: "Security Settings Updated",
      description: "Your security settings have been updated successfully.",
    });
    console.log("Security form values:", values);
    
    if (values.twoFactorAuth && !otpVerificationEnabled) {
      setVerifyingPhone(true);
      setTimeout(() => {
        setOtpVerificationEnabled(true);
        setVerifyingPhone(false);
        toast({
          title: "Two-Factor Authentication Enabled",
          description: "Your account is now more secure with 2FA.",
        });
      }, 2000);
    }
  };

  const handlePhotoUpload = () => {
    setUploadingPhoto(true);
    setTimeout(() => {
      setUploadingPhoto(false);
      toast({
        title: "Profile Photo Updated",
        description: "Your profile photo has been updated successfully.",
      });
    }, 1500);
  };

  const renderProfileSection = () => (
    <Form {...profileForm}>
      <form onSubmit={profileForm.handleSubmit(onSubmitProfile)} className="space-y-6">
        <FormField
          control={profileForm.control}
          name="profilePhoto"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center gap-4">
              <FormLabel>Profile Photo</FormLabel>
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={field.value || "https://github.com/shadcn.png"} />
                  <AvatarFallback>{currentUser?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <Button 
                  variant="outline" 
                  size="sm" 
                  type="button" 
                  onClick={handlePhotoUpload}
                  disabled={uploadingPhoto}
                >
                  {uploadingPhoto ? 'Uploading...' : 'Change Photo'}
                  <Upload className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={profileForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={profileForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormDescription>
                This is the email used for your account and notifications.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={profileForm.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us a little about yourself" 
                  className="resize-none min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Share some information about yourself, your expertise, or your background.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">Save Profile Changes</Button>
      </form>
    </Form>
  );

  const renderAccountSection = () => (
    <Form {...accountForm}>
      <form onSubmit={accountForm.handleSubmit(onSubmitAccount)} className="space-y-6">
        <FormField
          control={accountForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public username that appears in URLs.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={accountForm.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your timezone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="UTC-8 (Pacific Time)">UTC-8 (Pacific Time)</SelectItem>
                  <SelectItem value="UTC-7 (Mountain Time)">UTC-7 (Mountain Time)</SelectItem>
                  <SelectItem value="UTC-6 (Central Time)">UTC-6 (Central Time)</SelectItem>
                  <SelectItem value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time)</SelectItem>
                  <SelectItem value="UTC+0 (GMT)">UTC+0 (GMT)</SelectItem>
                  <SelectItem value="UTC+1 (Central European Time)">UTC+1 (Central European Time)</SelectItem>
                  <SelectItem value="UTC+5:30 (Indian Standard Time)">UTC+5:30 (Indian Standard Time)</SelectItem>
                  <SelectItem value="UTC+8 (China Standard Time)">UTC+8 (China Standard Time)</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Your timezone is used to display times and dates correctly.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={accountForm.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This is the language used throughout the interface.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">Save Account Settings</Button>
      </form>
    </Form>
  );

  const renderNotificationsSection = () => (
    <Form {...notificationsForm}>
      <form onSubmit={notificationsForm.handleSubmit(onSubmitNotifications)} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <FormField
                control={notificationsForm.control}
                name="emailNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Email Notifications</FormLabel>
                      <FormDescription>
                        Receive notifications about messages and updates via email.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={notificationsForm.control}
                name="pushNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Push Notifications</FormLabel>
                      <FormDescription>
                        Receive real-time notifications on your device.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={notificationsForm.control}
                name="marketingEmails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Marketing Emails</FormLabel>
                      <FormDescription>
                        Receive emails about new features, special offers, and promotions.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={notificationsForm.control}
                name="updatesAndNews"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Updates & News</FormLabel>
                      <FormDescription>
                        Receive updates about platform improvements and educational news.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        <Button type="submit">Save Notification Preferences</Button>
      </form>
    </Form>
  );

  const renderSecuritySection = () => (
    <Form {...securityForm}>
      <form onSubmit={securityForm.handleSubmit(onSubmitSecurity)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={securityForm.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your current password to make changes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={securityForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormDescription>
                  Password must be at least 8 characters with uppercase, lowercase, and numbers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={securityForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormDescription>
                  Confirm your new password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={securityForm.control}
            name="twoFactorAuth"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Two-Factor Authentication
                    {otpVerificationEnabled && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-800/30 dark:text-green-500">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Enabled
                      </span>
                    )}
                  </FormLabel>
                  <FormDescription>
                    Add an extra layer of security with OTP verification.
                  </FormDescription>
                </div>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    {verifyingPhone ? (
                      <div className="text-xs text-muted-foreground animate-pulse">Verifying...</div>
                    ) : (
                      <Switch
                        checked={field.value || otpVerificationEnabled}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          if (checked && !otpVerificationEnabled) {
                            setVerifyingPhone(true);
                          }
                        }}
                      />
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="flex items-center rounded-lg border p-4 text-sm text-muted-foreground">
            <Shield className="h-5 w-5 mr-2 text-blue-500" />
            <span>
              We use encryption and secure storage to protect your sensitive information. 
              <a href="#" className="text-primary hover:underline ml-1 inline-flex items-center">
                Learn more <ExternalLink className="h-3 w-3 ml-0.5" />
              </a>
            </span>
          </div>
          
          {otpVerificationEnabled && (
            <div className="flex items-center rounded-lg bg-blue-50 dark:bg-blue-950/50 p-4 text-sm text-blue-800 dark:text-blue-300">
              <Bell className="h-5 w-5 mr-2 text-blue-500" />
              <span>
                Email verification is currently active. A confirmation link will be sent for any important account changes.
              </span>
            </div>
          )}
        </div>
        
        <Button type="submit">Update Security Settings</Button>
      </form>
    </Form>
  );

  // Render the appropriate form based on section
  const renderForm = () => {
    switch (section) {
      case 'account':
        return renderAccountSection();
      case 'notifications':
        return renderNotificationsSection();
      case 'security':
        return renderSecuritySection();
      case 'profile':
      default:
        return renderProfileSection();
    }
  };

  return renderForm();
};
