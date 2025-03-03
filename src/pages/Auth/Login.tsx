
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowRight, Shield, AlertCircle, Fingerprint, Smartphone } from 'lucide-react';
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

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});

export default function Login() {
  const [activeTab, setActiveTab] = useState<UserRole>('student');
  const { login, isAuthenticated, loading } = useAuth();
  const { setCurrentUser } = useChat();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [verificationStep, setVerificationStep] = useState<string | null>(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Prefill demo credentials based on selected role
  useEffect(() => {
    if (activeTab === 'student') {
      form.setValue('email', 'alex@example.com');
      form.setValue('password', 'Password123');
    } else {
      form.setValue('email', 'emily@example.com');
      form.setValue('password', 'Password123');
    }
  }, [activeTab, form]);

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
          if (Math.random() > 0.5) { // 50% chance of showing OTP verification
            setShowOtpInput(true);
            return 100;
          } else {
            completeLogin();
            return 100;
          }
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
        completeLogin();
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
    const values = form.getValues();
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

  const onSubmit = () => {
    handleVerificationProgress();
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-800 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg animate-fade-in bg-white dark:bg-zinc-900 sm:rounded-xl">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back to EdVix</CardTitle>
          <CardDescription>Enter your credentials to sign in to your account</CardDescription>
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
                  <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We've sent a verification code to your mobile device
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
                <TabsContent value="student">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
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
                        control={form.control}
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
                        {loading ? 'Signing in...' : 'Sign in as Student'} 
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                <TabsContent value="tutor">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
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
                        control={form.control}
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
                        {loading ? 'Signing in...' : 'Sign in as Tutor'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </>
            )}
            
            {!showVerificationAlert && !showOtpInput && (
              <div className="mt-4 text-center text-sm">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Demo credentials pre-filled
                </div>
              </div>
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
