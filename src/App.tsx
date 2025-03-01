
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const queryClient = new QueryClient();

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
            <AppRoutes />
          </ChatProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
