
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import TutorDashboard from "./pages/Tutor/Dashboard";
import TutorMessages from "./pages/Tutor/Messages";
import TutorCalendar from "./pages/Tutor/Calendar";
import TutorResources from "./pages/Tutor/Resources";
import TutorStudents from "./pages/Tutor/Students";
import StudentDashboard from "./pages/Student/Dashboard";
import StudentMessages from "./pages/Student/Messages";
import StudentCalendar from "./pages/Student/Calendar";
import StudentCourses from "./pages/Student/Courses";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { ChatProvider } from "./contexts/ChatContext";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";
import TutorCourses from "./pages/Tutor/Courses";
import TutorSettings from "./pages/Tutor/Settings";
import StudentAssignments from "./pages/Student/Assignments";
import StudentSettings from "./pages/Student/Settings";
import StudentTutors from "./pages/Student/Tutors";
import Courses from "./pages/Courses";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import HelpCenter from "./pages/HelpCenter";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import AuthLogs from './pages/Admin/AuthLogs';
import { useEffect } from "react";
import { useToast } from "./components/ui/use-toast";

const queryClient = new QueryClient();

// Auth redirect handler
const AuthRedirector = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // If user is authenticated and hits the root route, redirect to their dashboard
    if (isAuthenticated && location.pathname === '/') {
      // Check if there's a scheduleRedirect pending
      const scheduleRedirect = localStorage.getItem('scheduleRedirect');
      
      if (scheduleRedirect) {
        try {
          const tutor = JSON.parse(scheduleRedirect);
          
          if (currentUser?.role === 'student') {
            // Clear the redirect to prevent it from happening again
            localStorage.removeItem('scheduleRedirect');
            
            // Show a toast about the redirect
            setTimeout(() => {
              toast({
                title: "Schedule with " + tutor.name,
                description: `You can now schedule a session with ${tutor.name}.`,
              });
            }, 1000);
          }
        } catch (error) {
          console.error('Error parsing schedule redirect data:', error);
        }
      }
    }
  }, [isAuthenticated, location.pathname, currentUser, toast]);

  return null;
};

// Protected Route component
const ProtectedRoute = ({ element, requiredRole }: { element: JSX.Element, requiredRole?: 'student' | 'tutor' }) => {
  const { isAuthenticated, currentUser } = useAuth();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If role is specified and doesn't match, redirect
  if (requiredRole && currentUser?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return element;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* New routes for additional pages */}
      <Route path="/courses" element={<Courses />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<Faq />} />
      
      {/* Tutor routes */}
      <Route 
        path="/tutors" 
        element={<ProtectedRoute element={<TutorDashboard />} requiredRole="tutor" />} 
      />
      <Route 
        path="/tutors/messages" 
        element={<ProtectedRoute element={<TutorMessages />} requiredRole="tutor" />} 
      />
      <Route 
        path="/tutors/calendar" 
        element={<ProtectedRoute element={<TutorCalendar />} requiredRole="tutor" />} 
      />
      <Route 
        path="/tutors/resources" 
        element={<ProtectedRoute element={<TutorResources />} requiredRole="tutor" />} 
      />
      <Route 
        path="/tutors/students" 
        element={<ProtectedRoute element={<TutorStudents />} requiredRole="tutor" />} 
      />
      <Route 
        path="/tutors/courses" 
        element={<ProtectedRoute element={<TutorCourses />} requiredRole="tutor" />} 
      />
      <Route 
        path="/tutors/settings" 
        element={<ProtectedRoute element={<TutorSettings />} requiredRole="tutor" />} 
      />
      
      {/* Student routes */}
      <Route 
        path="/students" 
        element={<ProtectedRoute element={<StudentDashboard />} requiredRole="student" />} 
      />
      <Route 
        path="/students/messages" 
        element={<ProtectedRoute element={<StudentMessages />} requiredRole="student" />} 
      />
      <Route 
        path="/students/calendar" 
        element={<ProtectedRoute element={<StudentCalendar />} requiredRole="student" />} 
      />
      <Route 
        path="/students/courses" 
        element={<ProtectedRoute element={<StudentCourses />} requiredRole="student" />} 
      />
      <Route 
        path="/students/assignments" 
        element={<ProtectedRoute element={<StudentAssignments />} requiredRole="student" />} 
      />
      <Route 
        path="/students/settings" 
        element={<ProtectedRoute element={<StudentSettings />} requiredRole="student" />} 
      />
      <Route 
        path="/students/tutors" 
        element={<ProtectedRoute element={<StudentTutors />} requiredRole="student" />} 
      />
      
      {/* Admin routes */}
      <Route path="/admin/logs" element={<AuthLogs />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <ChatProvider>
            <Toaster />
            <Sonner />
            <AuthRedirector />
            <AppRoutes />
          </ChatProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
