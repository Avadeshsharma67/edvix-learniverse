
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

const PhoneAuthForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const { toast } = useToast();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone
      });

      if (error) throw error;

      setShowOtpInput(true);
      toast({
        title: "OTP Sent",
        description: "Please check your WhatsApp for the verification code.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: 'sms'
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Phone number verified successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={showOtpInput ? handleVerifyOTP : handleSendOTP}>
        {!showOtpInput ? (
          <div className="space-y-4">
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="tel"
                placeholder="+1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Send OTP
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Verify OTP
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PhoneAuthForm;
