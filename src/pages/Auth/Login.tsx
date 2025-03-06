import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowRight, Shield, AlertCircle, Fingerprint, Smartphone, Phone, Check, Flag } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { UserRole } from '@/contexts/AuthContext';
import { useChat } from '@/contexts/ChatContext';
import { tutors, students } from '@/contexts/ChatContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from '@/components/ui/loader2';

const emailFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});

const phoneFormSchema = z.object({
  phone: z.string().min(5, { message: 'Please enter a valid phone number' }),
  countryCode: z.string().min(1, { message: 'Country code is required' }),
});

const countryCodes = [
  { value: '+1', label: 'United States (+1)', flag: '🇺🇸' },
  { value: '+44', label: 'United Kingdom (+44)', flag: '🇬🇧' },
  { value: '+91', label: 'India (+91)', flag: '🇮🇳' },
  { value: '+61', label: 'Australia (+61)', flag: '🇦🇺' },
  { value: '+55', label: 'Brazil (+55)', flag: '🇧🇷' },
  { value: '+33', label: 'France (+33)', flag: '🇫🇷' },
  { value: '+49', label: 'Germany (+49)', flag: '🇩🇪' },
  { value: '+81', label: 'Japan (+81)', flag: '🇯🇵' },
  { value: '+86', label: 'China (+86)', flag: '🇨🇳' },
  { value: '+234', label: 'Nigeria (+234)', flag: '🇳🇬' },
  { value: '+27', label: 'South Africa (+27)', flag: '🇿🇦' },
  { value: '+52', label: 'Mexico (+52)', flag: '🇲🇽' },
  { value: '+82', label: 'South Korea (+82)', flag: '🇰🇷' },
  { value: '+7', label: 'Russia (+7)', flag: '🇷🇺' },
  { value: '+971', label: 'UAE (+971)', flag: '🇦🇪' },
  { value: '+966', label: 'Saudi Arabia (+966)', flag: '🇸🇦' },
  { value: '+65', label: 'Singapore (+65)', flag: '🇸🇬' },
  { value: '+60', label: 'Malaysia (+60)', flag: '🇲🇾' },
  { value: '+254', label: 'Kenya (+254)', flag: '🇰🇪' },
  { value: '+20', label: 'Egypt (+20)', flag: '🇪🇬' },
];

export default function Login() {
  const [activeTab, setActiveTab] = useState<UserRole>('student');
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0]);
  const { login, loginWithPhone, isAuthenticated, loading, sendOTP, verifyOTP, sendEmailOTP, verifyEmailOTP, currentOTP } = useAuth();
  const { setCurrentUser } = useChat();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [verificationStep, setVerificationStep] = useState<string | null>(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(''));
  const [demoOTP, setDemoOTP] = useState<string>('');

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const phoneForm = useForm<z.infer<typeof phoneFormSchema>>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phone: '',
      countryCode: '+1',
    },
  });

  useEffect(() => {
    otpInputsRef.current = otpInputsRef.current.slice(0, 6);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(activeTab === 'tutor' ? '/tutors' : '/students');
    }
  }, [isAuthenticated, activeTab, navigate]);

  const handleVerificationProgress = () => {
    setVerificationProgress(0);
    setShowVerificationAlert(true);
    
    const interval = setInterval(() => {
      setVerificationProgress(prev => {
        const newProgress = prev + 10;
        
        if (newProgress === 20) {
          setVerificationStep('Checking credentials...');
        } else if (newProgress === 50) {
          setVerificationStep('Verifying identity...');
        } else if (newProgress === 80) {
          setVerificationStep('Authenticating session...');
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Different behavior based on auth method
          if (authMethod === 'email') {
            const userEmail = emailForm.getValues().email;
            setEmail(userEmail);
            
            // Always send OTP for demo purposes
            sendEmailOTP(userEmail, (success) => {
              if (success) {
                setDemoOTP(currentOTP || '');
                setShowOtpInput(true);
                setShowVerificationAlert(false);
              }
            });
            
            return 100;
          } else if (authMethod === 'phone') {
            const formattedPhoneNumber = `${selectedCountryCode.value}${phoneNumber}`;
            
            // Send OTP for phone verification
            sendOTP(formattedPhoneNumber, (success) => {
              if (success) {
                setDemoOTP(currentOTP || '');
                setShowOtpInput(true);
                setShowVerificationAlert(false);
                
                toast({
                  title: "OTP Sent!",
                  description: `Verification code sent to ${formattedPhoneNumber}`,
                });
              }
            });
            
            return 100;
          }
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const handleOtpSubmit = () => {
    const fullOtp = otpDigits.join('');
    
    if (fullOtp.length === 6) {
      if (authMethod === 'email') {
        verifyEmailOTP(email, fullOtp, (success) => {
          if (success) {
            setShowOtpInput(false);
            
            // Update chat context
            const user = activeTab === 'student' 
              ? students.find(s => s.email?.toLowerCase() === email.toLowerCase())
              : tutors.find(t => t.email?.toLowerCase() === email.toLowerCase());
            
            if (user) setCurrentUser(user);
            
            navigate(activeTab === 'tutor' ? '/tutors' : '/students');
            
            toast({
              title: "Login successful",
              description: `Welcome to EdVix ${activeTab === 'tutor' ? 'tutor' : 'student'} dashboard!`,
            });
          }
        });
      } else if (authMethod === 'phone') {
        const formattedPhoneNumber = `${selectedCountryCode.value}${phoneNumber}`;
        loginWithPhone(formattedPhoneNumber, fullOtp, activeTab, (success) => {
          if (success) {
            setShowOtpInput(false);
            
            // Create a mock user for the chat context
            const mockUser = {
              id: `${activeTab === 'student' ? 's' : 't'}-phone-${Date.now()}`,
              name: `${activeTab === 'student' ? 'Student' : 'Tutor'} User`,
              avatar: '/placeholder.svg',
              role: activeTab,
              email: `${formattedPhoneNumber.replace(/\D/g, '')}@edvix.com`
            };
            
            setCurrentUser(mockUser);
            navigate(activeTab === 'tutor' ? '/tutors' : '/students');
            
            toast({
              title: "Login successful",
              description: `Welcome to EdVix ${activeTab === 'tutor' ? 'tutor' : 'student'} dashboard!`,
            });
          }
        });
      }
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit code",
        variant: "destructive",
      });
    }
  };

  const handleOtpInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);
    
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        otpInputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handlePasteOtp = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtpDigits(digits);
      otpInputsRef.current[5]?.focus();
    }
  };

  const handleAutoFillOTP = () => {
    if (demoOTP && demoOTP.length === 6) {
      setOtpDigits(demoOTP.split(''));
    }
  };

  const onEmailSubmit = () => {
    handleVerificationProgress();
  };

  const onPhoneSubmit = (data: z.infer<typeof phoneFormSchema>) => {
    setPhoneNumber(data.phone);
    handleVerificationProgress();
  };

  const resendOtp = () => {
    if (authMethod === 'email') {
      sendEmailOTP(email, (success) => {
        if (success) {
          setDemoOTP(currentOTP || '');
          toast({
            title: "OTP Resent",
            description: `A new verification code has been sent to ${email}`,
          });
        }
      });
    } else {
      const formattedPhoneNumber = `${selectedCountryCode.value}${phoneNumber}`;
      sendOTP(formattedPhoneNumber, (success) => {
        if (success) {
          setDemoOTP(currentOTP || '');
          toast({
            title: "OTP Resent",
            description: `A new verification code has been sent to ${formattedPhoneNumber}`,
          });
        }
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-800 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg animate-fade-in bg-white dark:bg-zinc-900 sm:rounded-xl">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to EdVix</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as UserRole)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="student" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Student</TabsTrigger>
              <TabsTrigger value="tutor" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Tutor</TabsTrigger>
            </TabsList>
            
            {showVerificationAlert && (
              <div className="mb-6 space-y-3">
                <Alert className="border-amber-400 bg-amber-50 dark:bg-amber-950 dark:border-amber-900">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertTitle className="text-amber-800 dark:text-amber-300">
                    {verificationStep || "Verifying your credentials"}
                  </AlertTitle>
                  <AlertDescription className="text-amber-700 dark:text-amber-400">
                    Please wait while we verify your account...
                  </AlertDescription>
                </Alert>
                
                <Progress value={verificationProgress} className="h-2" />
              </div>
            )}
            
            {showOtpInput ? (
              <div className="space-y-4">
                <div className="text-center">
                  <Smartphone className="h-12 w-12 mx-auto text-primary mb-2" />
                  <h3 className="text-lg font-semibold">Verification Code</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We've sent a verification code to your {authMethod === 'email' ? 'email' : 'phone'}
                    {authMethod === 'email' && (
                      <span className="font-medium"> ({email})</span>
                    )}
                    {authMethod === 'phone' && (
                      <span className="font-medium"> ({selectedCountryCode.value} {phoneNumber})</span>
                    )}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="text-center mb-2">
                    <label htmlFor="otp-input" className="text-sm font-medium">
                      Enter the 6-digit code
                    </label>
                  </div>
                  
                  <div className="flex justify-center gap-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <Input
                        key={index}
                        ref={(el) => (otpInputsRef.current[index] = el)}
                        type="text"
                        maxLength={1}
                        value={otpDigits[index]}
                        onChange={(e) => handleOtpInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={index === 0 ? handlePasteOtp : undefined}
                        className="w-10 h-12 text-center text-lg"
                        aria-label={`digit ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    onClick={handleOtpSubmit} 
                    className="w-full"
                    disabled={otpDigits.join('').length !== 6 || loading}
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
                </div>
                
                <div className="text-center text-sm pt-2">
                  <span className="text-muted-foreground">Didn't receive the code? </span>
                  <button onClick={resendOtp} className="text-primary hover:underline font-medium">
                    Resend
                  </button>
                </div>
                
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
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <div className="inline-flex rounded-md shadow-sm">
                    <Button
                      variant={authMethod === 'email' ? 'default' : 'outline'}
                      onClick={() => setAuthMethod('email')}
                      className="rounded-r-none"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button
                      variant={authMethod === 'phone' ? 'default' : 'outline'}
                      onClick={() => setAuthMethod('phone')}
                      className="rounded-l-none"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Phone
                    </Button>
                  </div>
                </div>

                {authMethod === 'email' && (
                  <TabsContent value={activeTab} className="mt-0">
                    <Form {...emailForm}>
                      <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                        <FormField
                          control={emailForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input placeholder="you@example.com" {...field} className="pl-10" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={emailForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input type="password" placeholder="••••••••" {...field} className="pl-10" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Secure login</span>
                          </div>
                          <Link to="#" className="text-xs text-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <Button type="submit" className="w-full" disabled={loading || showVerificationAlert}>
                          {loading ? 'Signing in...' : `Sign in as ${activeTab === 'student' ? 'Student' : 'Tutor'}`} 
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                )}

                {authMethod === 'phone' && (
                  <TabsContent value={activeTab} className="mt-0">
                    <Form {...phoneForm}>
                      <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                        <FormField
                          control={phoneForm.control}
                          name="countryCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button 
                                      variant="outline" 
                                      className="w-full justify-between"
                                      role="combobox"
                                    >
                                      <div className="flex items-center">
                                        <span className="mr-2">{selectedCountryCode.flag}</span>
                                        <span>{selectedCountryCode.label}</span>
                                      </div>
                                      <Flag className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0" align="start">
                                    <ScrollArea className="h-80">
                                      <div className="space-y-1">
                                        {countryCodes.map((country) => (
                                          <Button
                                            key={country.value}
                                            variant="ghost"
                                            className="w-full justify-start px-2 py-1.5 text-sm"
                                            onClick={() => {
                                              setSelectedCountryCode(country);
                                              field.onChange(country.value);
                                            }}
                                          >
                                            <span className="mr-2">{country.flag}</span>
                                            <span>{country.label}</span>
                                            {country.value === selectedCountryCode.value && (
                                              <Check className="ml-auto h-4 w-4" />
                                            )}
                                          </Button>
                                        ))}
                                      </div>
                                    </ScrollArea>
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={phoneForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <div className="absolute left-3 top-2.5 text-muted-foreground">
                                    {selectedCountryCode.value}
                                  </div>
                                  <Input 
                                    placeholder="Phone number without country code" 
                                    {...field} 
                                    className="pl-12" 
                                    onChange={(e) => {
                                      const value = e.target.value.replace(/\D/g, '');
                                      field.onChange(value);
                                    }}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full" disabled={loading || showVerificationAlert}>
                          {loading ? 'Sending code...' : 'Send verification code'} 
                          <Smartphone className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                )}
              </>
            )}
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t px-6 py-4 dark:border-gray-800">
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/register" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
