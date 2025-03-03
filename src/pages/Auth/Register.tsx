
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, User, ArrowRight, Shield, Check, UserCheck, Smartphone, ChevronRight } from 'lucide-react';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  confirmPassword: z.string(),
  phone: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and privacy policy',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function Register() {
  const [activeTab, setActiveTab] = useState<UserRole>('student');
  const { register, isAuthenticated, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [verificationSent, setVerificationSent] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);
  const [verificationProgress, setVerificationProgress] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      termsAccepted: false,
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(activeTab === 'tutor' ? '/tutors' : '/students');
    }
  }, [isAuthenticated, activeTab, navigate]);

  const simulateEmailVerification = () => {
    setVerificationSent(true);
    setVerificationProgress(0);
    
    const interval = setInterval(() => {
      setVerificationProgress(prev => {
        const newProgress = prev + 5;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            handleFinalRegistration();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 50);
  };

  const handleFinalRegistration = () => {
    const values = form.getValues();
    register(values.name, values.email, values.password, activeTab, (success) => {
      if (success) {
        // Welcome toast
        toast({
          title: "Registration successful",
          description: `Welcome to EdVix, ${values.name}!`,
        });
        
        // Redirect to appropriate dashboard
        navigate(activeTab === 'tutor' ? '/tutors' : '/students');
      }
    });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (registrationStep === 1) {
      setRegistrationStep(2);
    } else {
      simulateEmailVerification();
    }
  };

  const passwordStrength = () => {
    const password = form.watch('password');
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return (strength / 5) * 100;
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-800 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg animate-fade-in bg-white dark:bg-zinc-900 sm:rounded-xl">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Create your EdVix account</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
          
          {registrationStep > 1 && !verificationSent && (
            <div className="pt-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{registrationStep}/2</span>
              </div>
              <Progress value={registrationStep * 50} className="h-2" />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as UserRole)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="student" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Student</TabsTrigger>
              <TabsTrigger value="tutor" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Tutor</TabsTrigger>
            </TabsList>
            
            {verificationSent ? (
              <div className="space-y-4">
                <Alert className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-900">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    Verification email has been sent. Confirming your account...
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Verification progress</span>
                    <span className="font-medium">{verificationProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={verificationProgress} className="h-2" />
                </div>
                
                <div className="flex flex-col items-center justify-center text-center pt-4">
                  <UserCheck className="h-12 w-12 text-green-500 mb-2" />
                  <h3 className="text-lg font-semibold">Account verification in progress</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    We're setting up your account. This will just take a moment.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <TabsContent value="student">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      {registrationStep === 1 ? (
                        <>
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="John Doe" {...field} className="pl-10" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
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
                                <div className="mt-2">
                                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full ${
                                        passwordStrength() < 40 ? 'bg-red-500' : 
                                        passwordStrength() < 80 ? 'bg-yellow-500' : 'bg-green-500'
                                      }`} 
                                      style={{ width: `${passwordStrength()}%` }}
                                    ></div>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Password strength: {
                                      passwordStrength() < 40 ? 'Weak' : 
                                      passwordStrength() < 80 ? 'Medium' : 'Strong'
                                    }
                                  </p>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
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
                        </>
                      ) : (
                        <>
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number (Optional)</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="+1 (555) 123-4567" {...field} className="pl-10" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="termsAccepted"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    I accept the <Link to="/terms" className="text-primary hover:underline">terms of service</Link> and <Link to="/privacy" className="text-primary hover:underline">privacy policy</Link>
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Your data is protected and encrypted</span>
                          </div>
                        </>
                      )}
                      
                      <Button type="submit" className="w-full" disabled={loading}>
                        {registrationStep === 1 ? (
                          <>
                            Continue
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </>
                        ) : (
                          <>
                            {loading ? 'Creating account...' : 'Register as Student'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                <TabsContent value="tutor">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      {registrationStep === 1 ? (
                        <>
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="John Doe" {...field} className="pl-10" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
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
                                <div className="mt-2">
                                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full ${
                                        passwordStrength() < 40 ? 'bg-red-500' : 
                                        passwordStrength() < 80 ? 'bg-yellow-500' : 'bg-green-500'
                                      }`} 
                                      style={{ width: `${passwordStrength()}%` }}
                                    ></div>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Password strength: {
                                      passwordStrength() < 40 ? 'Weak' : 
                                      passwordStrength() < 80 ? 'Medium' : 'Strong'
                                    }
                                  </p>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
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
                        </>
                      ) : (
                        <>
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number (Optional)</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="+1 (555) 123-4567" {...field} className="pl-10" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="termsAccepted"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    I accept the <Link to="/terms" className="text-primary hover:underline">terms of service</Link> and <Link to="/privacy" className="text-primary hover:underline">privacy policy</Link>
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Your data is protected and encrypted</span>
                          </div>
                        </>
                      )}
                      
                      <Button type="submit" className="w-full" disabled={loading}>
                        {registrationStep === 1 ? (
                          <>
                            Continue
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </>
                        ) : (
                          <>
                            {loading ? 'Creating account...' : 'Register as Tutor'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </>
            )}
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t px-6 py-4 dark:border-gray-800">
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
