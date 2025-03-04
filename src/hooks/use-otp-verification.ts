
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface UseOTPVerificationReturn {
  isVerifying: boolean;
  startVerification: (phoneNumber: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<boolean>;
  error: string | null;
  isVerified: boolean;
  phoneNumber: string | null;
}

export function useOTPVerification(): UseOTPVerificationReturn {
  const [isVerifying, setIsVerifying] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();

  // In a real app, this would be stored securely and unique per verification session
  const validTestOTP = '123456';

  const startVerification = async (phone: string): Promise<void> => {
    setIsVerifying(true);
    setError(null);
    
    try {
      // Validate phone number format
      if (!phone || phone.trim().length < 10) {
        throw new Error('Please enter a valid phone number');
      }
      
      // In a real app, this would call your backend or Supabase
      // For demo purposes, we'll just simulate the API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Store the phone number for later verification
      setPhoneNumber(phone);
      
      toast({
        title: 'OTP Sent',
        description: `A verification code has been sent to ${phone}`,
      });
      
    } catch (err: any) {
      setError(err.message);
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    setIsVerifying(true);
    setError(null);
    
    try {
      if (!phoneNumber) {
        throw new Error('Phone number not provided. Please start verification first.');
      }
      
      // In a real app, this would call your backend or Supabase
      // For demo purposes, we'll just simulate the API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp !== validTestOTP) {
        throw new Error('Invalid verification code. Please try again.');
      }
      
      // Set verification status
      setIsVerified(true);
      
      toast({
        title: 'Verification Successful',
        description: 'Your phone number has been verified successfully.',
      });
      
      return true;
      
    } catch (err: any) {
      setError(err.message);
      toast({
        title: 'Verification Failed',
        description: err.message,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    isVerifying,
    startVerification,
    verifyOTP,
    error,
    isVerified,
    phoneNumber
  };
}
