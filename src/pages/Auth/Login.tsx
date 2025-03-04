
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowRight, Shield, AlertCircle, Fingerprint, Smartphone, Phone } from 'lucide-react';
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

const emailFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});

const phoneFormSchema = z.object({
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
});

export default function Login() {
  const [activeTab, setActiveTab] = useState<UserRole>('student');
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const { login, loginWithPhone, isAuthenticated, loading } = useAuth();
  const { setCurrentUser } = useChat();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [verificationStep, setVerificationStep] = useState<string | null>(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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
    },
  });

  // Redirect if already authenticated
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
        
        // Update verification steps based on progress
        if (newProgress === 20) {
          setVerificationStep('Checking credentials...');
        } else if (newProgress === 50) {
          setVerificationStep('Verifying identity...');
        } else if (newProgress === 80) {
          setVerificationStep('Authenticating session...');
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          if (authMethod === 'email') {
            if (Math.random() > 0.5) { // 50% chance of showing OTP verification
              setShowOtpInput(true);
              return 100;
            } else {
              completeLogin();
              return 100;
            }
          } else if (authMethod === 'phone') {
            setShowOtpInput(true);
            return 100;
          }
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const handleOtpSubmit = () => {
    if (otpValue.length === 6) {
      setShowOtpInput(false);
      // Simulate verification delay
      setTimeout(() => {
        if (authMethod === 'email') {
          completeLogin();
        } else if (authMethod === 'phone') {
          completePhoneLogin();
        }
      }, 500);
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit code",
        variant: "destructive",
      });
    }
  };

  const completeLogin = () => {
    const values = emailForm.getValues();
    login(values.email, values.password, activeTab, (success) => {
      if (success) {
        // Set current user in chat context
        if (activeTab === 'student') {
          const student = students.find(s => s.email?.toLowerCase() === values.email.toLowerCase());
          if (student) setCurrentUser(student);
        } else {
          const tutor = tutors.find(t => t.email?.toLowerCase() === values.email.toLowerCase());
          if (tutor) setCurrentUser(tutor);
        }
        
        setShowVerificationAlert(false);
        setVerificationStep(null);
        
        // Redirect to appropriate dashboard
        navigate(activeTab === 'tutor' ? '/tutors' : '/students');
        
        // Show welcome toast
        toast({
          title: "Login successful",
          description: `Welcome to EdVix ${activeTab === 'tutor' ? 'tutor' : 'student'} dashboard!`,
        });
      } else {
        setShowVerificationAlert(false);
        setVerificationStep(null);
      }
    });
  };

  const completePhoneLogin = () => {
    loginWithPhone(phoneNumber, otpValue, activeTab, (success) => {
      if (success) {
        // Create mock user for phone auth
        const mockUser = {
          id: `${activeTab === 'student' ? 's' : 't'}-phone-${Date.now()}`,
          name: `${activeTab === 'student' ? 'Student' : 'Tutor'} User`,
          avatar: '/placeholder.svg',
          role: activeTab,
          email: `phone-user-${Date.now()}@example.com`
        };
        
        setCurrentUser(mockUser);
        setShowVerificationAlert(false);
        setVerificationStep(null);
        
        // Redirect to appropriate dashboard
        navigate(activeTab === 'tutor' ? '/tutors' : '/students');
        
        // Show welcome toast
        toast({
          title: "Login successful",
          description: `Welcome to EdVix ${activeTab === 'tutor' ? 'tutor' : 'student'} dashboard!`,
        });
      } else {
        setShowVerificationAlert(false);
        setVerificationStep(null);
      }
    });
  };

  const onEmailSubmit = () => {
    handleVerificationProgress();
  };

  const onPhoneSubmit = (data: z.infer<typeof phoneFormSchema>) => {
    setPhoneNumber(data.phone);
    handleVerificationProgress();
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
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="otp" className="text-sm font-medium">
                    Enter the 6-digit code
                  </label>
                  <div className="flex space-x-2">
                    <Input 
                      id="otp"
                      placeholder="000000"
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                      className="text-center text-lg"
                      maxLength={6}
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    onClick={handleOtpSubmit} 
                    className="w-full"
                    disabled={otpValue.length !== 6}
                  >
                    Verify Code
                    <Fingerprint className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-center text-sm pt-2">
                  <span className="text-muted-foreground">Didn't receive the code? </span>
                  <button className="text-primary hover:underline font-medium">
                    Resend
                  </button>
                </div>
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
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input 
                                    placeholder="+1 (555) 000-0000" 
                                    {...field} 
                                    className="pl-10" 
                                    onChange={(e) => {
                                      // Allow only numbers and some special characters for phone formatting
                                      const value = e.target.value.replace(/[^\d\s\+\-\(\)\.]/g, '');
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
