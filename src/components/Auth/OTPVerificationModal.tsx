
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight, CheckCircle, Loader2, Smartphone, Alert } from 'lucide-react';
import { Alert as AlertComponent, AlertDescription } from '@/components/ui/alert';

interface OTPVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerificationSuccess?: () => void;
  phoneNumber?: string;
}

const OTPVerificationModal: React.FC<OTPVerificationModalProps> = ({
  open,
  onOpenChange,
  onVerificationSuccess,
  phoneNumber: initialPhoneNumber = '',
}) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'verified'>('phone');
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [demoOTP, setDemoOTP] = useState<string>('');
  const { toast } = useToast();

  // For demo purposes, set a valid test OTP
  const validTestOTP = '123456'; 

  // Handle countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (step === 'otp' && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [step, remainingTime]);

  const formatPhoneNumber = (phone: string): string => {
    // Basic validation and formatting
    const cleaned = phone.replace(/\D/g, '');
    return phone.startsWith('+') ? phone : `+1${cleaned}`;
  };

  const handleSendOTP = async () => {
    setError(null);
    setLoading(true);
    
    try {
      // Validate phone
      if (!phoneNumber || phoneNumber.length < 10) {
        throw new Error('Please enter a valid phone number');
      }
      
      // Generate a random OTP for demo purposes
      const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      setDemoOTP(generatedOTP);
      
      // In a real app, this would call Supabase
      // For demo, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Move to OTP step
      setStep('otp');
      setRemainingTime(60); // 60 seconds countdown
      
      toast({
        title: 'OTP Sent',
        description: `A verification code has been sent to ${formatPhoneNumber(phoneNumber)}`,
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError(null);
    setLoading(true);
    
    try {
      const enteredOTP = otp.join('');
      
      // In a real app, this would call Supabase to verify
      // For demo, we'll check against our generated OTP or the test OTP
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      if (enteredOTP !== demoOTP && enteredOTP !== validTestOTP) {
        throw new Error('Invalid verification code. Please try again.');
      }
      
      // Success
      setStep('verified');
      
      toast({
        title: 'Verification Successful',
        description: 'Your phone number has been verified successfully.',
      });
      
      // Wait a moment before calling success callback
      setTimeout(() => {
        if (onVerificationSuccess) onVerificationSuccess();
        setTimeout(() => onOpenChange(false), 1500);
      }, 1500);
      
    } catch (err: any) {
      setError(err.message);
      toast({
        title: 'Verification Failed',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    setRemainingTime(60);
    handleSendOTP();
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) {
      // If pasting the entire code at once
      const pastedOTP = value.split('').slice(0, 6);
      setOtp([...pastedOTP, ...Array(6 - pastedOTP.length).fill('')]);
      return;
    }
    
    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAutoFillOTP = () => {
    // Auto-fill the OTP fields with the generated OTP
    setOtp(demoOTP.split(''));
  };

  const renderPhoneInput = () => (
    <>
      <DialogHeader>
        <DialogTitle>Phone Verification</DialogTitle>
        <DialogDescription>
          Enter your phone number to receive a verification code.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0">
            <Smartphone className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="flex-1"
            disabled={loading}
          />
        </div>
        
        {error && (
          <div className="text-sm text-destructive">{error}</div>
        )}
      </div>
      
      <DialogFooter>
        <Button
          onClick={handleSendOTP}
          disabled={loading || !phoneNumber}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            <>
              Send Verification Code <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </DialogFooter>
    </>
  );

  const renderOTPInput = () => (
    <>
      <DialogHeader>
        <DialogTitle>Enter Verification Code</DialogTitle>
        <DialogDescription>
          A 6-digit code has been sent to {formatPhoneNumber(phoneNumber)}
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOTPChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-12 w-12 text-center text-lg"
              autoFocus={index === 0}
              disabled={loading}
            />
          ))}
        </div>
        
        {error && (
          <div className="text-sm text-destructive text-center">{error}</div>
        )}
        
        <div className="text-center text-sm">
          {remainingTime > 0 ? (
            <span className="text-muted-foreground">
              Resend code in {formatTime(remainingTime)}
            </span>
          ) : (
            <button
              onClick={handleResendOTP}
              className="text-primary hover:underline"
              disabled={loading}
            >
              Resend verification code
            </button>
          )}
        </div>
        
        {/* Demo OTP Alert - In a real app, this would be removed */}
        <AlertComponent className="bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900">
          <Alert className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription>
            <div className="flex flex-col">
              <span>Demo Mode: Your verification code is:</span>
              <span className="font-mono text-lg font-bold">{demoOTP}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAutoFillOTP} 
                className="mt-2 bg-white dark:bg-gray-800"
              >
                Auto-fill Code
              </Button>
            </div>
          </AlertDescription>
        </AlertComponent>
      </div>
      
      <DialogFooter>
        <Button
          onClick={handleVerifyOTP}
          disabled={loading || otp.some(digit => !digit)}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
            </>
          ) : (
            <>
              Verify Code <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </DialogFooter>
    </>
  );

  const renderVerifiedState = () => (
    <>
      <DialogHeader>
        <DialogTitle>Verification Successful</DialogTitle>
      </DialogHeader>
      
      <div className="py-8 flex flex-col items-center justify-center">
        <div className="rounded-full bg-primary/10 p-3 mb-4">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <p className="text-center">
          Your phone number has been verified successfully.
        </p>
      </div>
    </>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {step === 'phone' && renderPhoneInput()}
        {step === 'otp' && renderOTPInput()}
        {step === 'verified' && renderVerifiedState()}
      </DialogContent>
    </Dialog>
  );
};

export default OTPVerificationModal;
