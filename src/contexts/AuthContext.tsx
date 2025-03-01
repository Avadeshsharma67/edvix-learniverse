
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export type UserRole = 'student' | 'tutor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole, callback?: (success: boolean) => void) => void;
  register: (name: string, email: string, password: string, role: UserRole, callback?: (success: boolean) => void) => void;
  logout: (callback?: () => void) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: 's1',
    name: 'Alex Thompson',
    email: 'alex@example.com',
    role: 'student',
    avatar: '/placeholder.svg',
  },
  {
    id: 't1',
    name: 'Dr. Emily Johnson',
    email: 'emily@example.com',
    role: 'tutor',
    avatar: '/placeholder.svg',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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
        if (callback) callback(true);
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password',
          variant: 'destructive',
        });
        if (callback) callback(false);
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
        if (callback) callback(false);
      } else {
        // Create new user
        const newUser: User = {
          id: `${role.charAt(0)}${mockUsers.length + 1}`,
          name,
          email,
          role,
          avatar: '/placeholder.svg',
        };
        
        // In a real app, we would add the user to the database
        // For this demo, we'll just set them as the current user
        mockUsers.push(newUser);
        setCurrentUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        toast({
          title: 'Registration successful',
          description: `Welcome to EdVix, ${name}!`,
        });
        
        if (callback) callback(true);
      }
      
      setLoading(false);
    }, 1000);
  };

  const logout = (callback?: () => void) => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
    if (callback) callback();
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        register,
        logout,
        loading,
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
