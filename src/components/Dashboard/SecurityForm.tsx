
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, ExternalLink, Shield, Smartphone } from 'lucide-react';
import OTPVerificationModal from '../Auth/OTPVerificationModal';

const securityFormSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Current password is required' }),
  newPassword: z.string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .optional(),
  confirmPassword: z.string().optional(),
  twoFactorAuth: z.boolean(),
  receiveAlerts: z.boolean().default(true),
}).refine((data) => {
  if (data.newPassword && data.confirmPassword) {
    return data.newPassword === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export function SecurityForm() {
  const { currentUser, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [otpVerificationEnabled, setOtpVerificationEnabled] = useState(false);
  const [verifyingPhone, setVerifyingPhone] = useState(false);
  
  const form = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorAuth: false,
      receiveAlerts: true,
    }
  });

  const onSubmit = async (values: z.infer<typeof securityFormSchema>) => {
    try {
      // In a real app, you would make an API call to update the password
      
      toast({
        title: "Security Settings Updated",
        description: "Your security settings have been updated successfully.",
      });
      
      // Reset form fields for the password
      form.setValue('currentPassword', '');
      form.setValue('newPassword', '');
      form.setValue('confirmPassword', '');
      
      console.log("Security form values:", values);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOTPVerificationSuccess = () => {
    setOtpVerificationEnabled(true);
    form.setValue('twoFactorAuth', true);
    
    // Update user profile with 2FA enabled
    updateUserProfile({
      ...currentUser,
      twoFactorAuth: true,
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Password</h2>
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
          </div>
          
          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-medium">Authentication</h2>
            
            <FormField
              control={form.control}
              name="twoFactorAuth"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <FormLabel className="text-base mr-2">
                        Two-Factor Authentication
                      </FormLabel>
                      {otpVerificationEnabled && (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-800/30 dark:text-green-500">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Enabled
                        </span>
                      )}
                    </div>
                    <FormDescription>
                      Add an extra layer of security with SMS verification.
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
                              setIsOTPModalOpen(true);
                            }
                          }}
                        />
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="receiveAlerts"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Security Alerts</FormLabel>
                    <FormDescription>
                      Receive notifications about suspicious login attempts.
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
                <Smartphone className="h-5 w-5 mr-2 text-blue-500" />
                <span>
                  Two-factor authentication is active. You'll receive a verification code when logging in from a new device.
                </span>
              </div>
            )}
          </div>
          
          <Button type="submit">Update Security Settings</Button>
        </form>
      </Form>
      
      <OTPVerificationModal
        open={isOTPModalOpen}
        onOpenChange={setIsOTPModalOpen}
        onVerificationSuccess={handleOTPVerificationSuccess}
        phoneNumber={currentUser?.phone || ''}
      />
    </>
  );
}
