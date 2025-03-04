
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { LoaderCircle } from 'lucide-react';

interface OTPVerificationProps {
  phoneNumber: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  onBack: () => void;
  isProcessing: boolean;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  phoneNumber,
  onVerify,
  onResend,
  onBack,
  isProcessing
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const { toast } = useToast();

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Handle countdown for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countdown]);

  // Debug: Log test OTP code for development
  useEffect(() => {
    // Generate a random 6-digit code for testing
    const testCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Test OTP code for ${phoneNumber}: ${testCode}`);
    
    // Optionally show it in toast for easy testing
    toast({
      title: "Test OTP Code",
      description: `Use ${testCode} for testing with ${phoneNumber}`,
    });
  }, [phoneNumber, toast]);

  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // If filled a digit and not the last input, move to next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Only process if it looks like an OTP
    if (!/^\d+$/.test(pastedData)) return;
    
    const digits = pastedData.slice(0, 6).split('');
    const newOtp = [...otp];
    
    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    
    setOtp(newOtp);
    
    // Focus appropriate field after paste
    if (digits.length < 6) {
      inputRefs.current[digits.length]?.focus();
    }
  };

  const handleResend = () => {
    onResend();
    setResendDisabled(true);
    setCountdown(30);
    toast({
      title: "OTP Resent",
      description: `A new verification code has been sent to ${phoneNumber}`
    });
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      onVerify(otpString);
    } else {
      toast({
        title: "Incomplete OTP",
        description: "Please enter all 6 digits of the OTP",
        variant: "destructive"
      });
    }
  };

  // Format phone number for display
  const formatPhoneNumber = (phone: string) => {
    // If it's international format with country code
    if (phone.startsWith('+')) {
      // Handle international numbers based on length and country code
      if (phone.startsWith('+1') && phone.length === 12) {
        // US/Canada format: +1 (XXX) XXX-XXXX
        return `+1 (${phone.substr(2, 3)}) ${phone.substr(5, 3)}-${phone.substr(8, 4)}`;
      } else {
        // Generic international format
        return phone;
      }
    } 
    
    // For 10-digit US numbers without country code
    if (phone.length === 10 && /^\d+$/.test(phone)) {
      return `(${phone.substr(0, 3)}) ${phone.substr(3, 3)}-${phone.substr(6, 4)}`;
    }
    
    // Return as-is for other formats
    return phone;
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Verify Your Phone</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to {formatPhoneNumber(phoneNumber)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center space-x-2">
          {Array(6).fill(0).map((_, index) => (
            <Input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-12 h-12 text-center text-lg"
              value={otp[index]}
              onChange={e => handleInputChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              autoFocus={index === 0}
            />
          ))}
        </div>
        <div className="text-center text-sm text-muted-foreground">
          {resendDisabled ? (
            <p>Resend code in {countdown} seconds</p>
          ) : (
            <Button variant="link" className="p-0" onClick={handleResend} disabled={resendDisabled}>
              Resend verification code
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={onBack} disabled={isProcessing}>
          Back
        </Button>
        <Button onClick={handleVerify} disabled={otp.join('').length !== 6 || isProcessing}>
          {isProcessing ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OTPVerification;
