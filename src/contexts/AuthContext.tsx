
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export type UserRole = 'student' | 'tutor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  notifications?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  theme?: string;
  language?: string;
  phone?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole, callback?: (success: boolean) => void) => void;
  loginWithPhone: (phone: string, otp: string, role: UserRole, callback?: (success: boolean) => void) => void;
  register: (name: string, email: string, password: string, role: UserRole, callback?: (success: boolean) => void) => void;
  registerWithPhone: (name: string, phone: string, otp: string, role: UserRole, callback?: (success: boolean) => void) => void;
  logout: (callback?: () => void) => void;
  loading: boolean;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
  authLogs: AuthLogEntry[];
}

export interface AuthLogEntry {
  id: string;
  timestamp: Date;
  userId?: string;
  action: 'login' | 'register' | 'logout';
  method: 'email' | 'phone';
  role: UserRole;
  userAgent: string;
  ipAddress?: string;
  success: boolean;
  details?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes - not showing preloaded credentials
const mockUsers: User[] = [];

// Auth logs array for tracking login/registration attempts
const initialAuthLogs: AuthLogEntry[] = 
  JSON.parse(localStorage.getItem('authLogs') || '[]').map((log: any) => ({
    ...log,
    timestamp: new Date(log.timestamp)
  }));

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLogs, setAuthLogs] = useState<AuthLogEntry[]>(initialAuthLogs);
  const { toast } = useToast();

  const isAuthenticated = !!currentUser;

  // Check for saved authentication on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  // Save auth logs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('authLogs', JSON.stringify(authLogs));
  }, [authLogs]);

  // Helper function to log authentication events
  const logAuthEvent = (
    action: 'login' | 'register' | 'logout',
    method: 'email' | 'phone',
    role: UserRole,
    success: boolean,
    userId?: string,
    details?: string
  ) => {
    const newLogEntry: AuthLogEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date(),
      userId,
      action,
      method,
      role,
      userAgent: navigator.userAgent,
      success,
      details
    };

    // In a real app, you might send this to your backend API
    console.log('Auth event logged:', newLogEntry);
    
    // Add to local logs
    setAuthLogs(prevLogs => [newLogEntry, ...prevLogs]);
  };

  const login = (email: string, password: string, role: UserRole, callback?: (success: boolean) => void) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.role === role
      );

      if (user) {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast({
          title: 'Welcome back!',
          description: `You have successfully logged in as ${user.name}`,
        });
        
        logAuthEvent('login', 'email', role, true, user.id);
        
        if (callback) callback(true);
      } else {
        // Create a new user if none exists (for demo purposes only)
        const newUser: User = {
          id: `${role.charAt(0)}${mockUsers.length + 1}`,
          name: email.split('@')[0],
          email,
          role,
          avatar: '/placeholder.svg',
        };
        
        mockUsers.push(newUser);
        setCurrentUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        toast({
          title: 'Welcome to EdVix!',
          description: `You have successfully logged in as ${newUser.name}`,
        });
        
        logAuthEvent('login', 'email', role, true, newUser.id, 'New user created for demo');
        
        if (callback) callback(true);
      }
      
      setLoading(false);
    }, 1000);
  };

  const loginWithPhone = (phone: string, otp: string, role: UserRole, callback?: (success: boolean) => void) => {
    setLoading(true);
    
    // Simulate API call for phone authentication
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.phone === phone && u.role === role
      );

      if (user) {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast({
          title: 'Welcome back!',
          description: `You have successfully logged in as ${user.name}`,
        });
        
        logAuthEvent('login', 'phone', role, true, user.id);
        
        if (callback) callback(true);
      } else {
        // Create a new user if none exists (for demo purposes only)
        const newUser: User = {
          id: `${role.charAt(0)}${mockUsers.length + 1}`,
          name: `New ${role.charAt(0).toUpperCase() + role.slice(1)}`,
          email: `${phone.replace(/\D/g, '')}@edvix.com`,
          role,
          avatar: '/placeholder.svg',
          phone
        };
        
        mockUsers.push(newUser);
        setCurrentUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        toast({
          title: 'Welcome to EdVix!',
          description: `You have successfully logged in using your phone number`,
        });
        
        logAuthEvent('login', 'phone', role, true, newUser.id, 'New user created for demo');
        
        if (callback) callback(true);
      }
      
      setLoading(false);
    }, 1000);
  };

  const register = (name: string, email: string, password: string, role: UserRole, callback?: (success: boolean) => void) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Check if email already exists
      const existingUser = mockUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        toast({
          title: 'Registration failed',
          description: 'Email already in use',
          variant: 'destructive',
        });
        logAuthEvent('register', 'email', role, false, undefined, 'Email already in use');
        if (callback) callback(false);
        setLoading(false);
        return;
      }
      
      // Create new user
      const newUser: User = {
        id: `${role.charAt(0)}${mockUsers.length + 1}`,
        name,
        email,
        role,
        avatar: '/placeholder.svg',
      };
      
      // In a real app, we would add the user to the database
      // For this demo, we'll add to the mockUsers array and set as current user
      mockUsers.push(newUser);
      setCurrentUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      toast({
        title: 'Registration successful',
        description: `Welcome to EdVix, ${name}!`,
      });
      
      logAuthEvent('register', 'email', role, true, newUser.id);
      
      if (callback) callback(true);
      setLoading(false);
    }, 1000);
  };

  const registerWithPhone = (name: string, phone: string, otp: string, role: UserRole, callback?: (success: boolean) => void) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Check if phone already exists
      const existingUser = mockUsers.find(
        (u) => u.phone === phone
      );

      if (existingUser) {
        toast({
          title: 'Registration failed',
          description: 'Phone number already in use',
          variant: 'destructive',
        });
        logAuthEvent('register', 'phone', role, false, undefined, 'Phone number already in use');
        if (callback) callback(false);
        setLoading(false);
        return;
      }
      
      // Create new user
      const newUser: User = {
        id: `${role.charAt(0)}${mockUsers.length + 1}`,
        name,
        email: `${phone.replace(/\D/g, '')}@edvix.com`,
        role,
        avatar: '/placeholder.svg',
        phone
      };
      
      mockUsers.push(newUser);
      setCurrentUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      toast({
        title: 'Registration successful',
        description: `Welcome to EdVix, ${name}!`,
      });
      
      logAuthEvent('register', 'phone', role, true, newUser.id);
      
      if (callback) callback(true);
      setLoading(false);
    }, 1000);
  };

  const logout = (callback?: () => void) => {
    if (currentUser) {
      logAuthEvent('logout', 'email', currentUser.role, true, currentUser.id);
    }
    
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
    if (callback) callback();
  };

  const updateUserProfile = async (userData: Partial<User>): Promise<void> => {
    setLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          setCurrentUser(updatedUser);
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          
          toast({
            title: 'Profile updated',
            description: 'Your profile has been updated successfully',
          });
        }
        
        setLoading(false);
        resolve();
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        loginWithPhone,
        register,
        registerWithPhone,
        logout,
        loading,
        updateUserProfile,
        authLogs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
