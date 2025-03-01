
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
import TutorCourses from "./pages/Tutor/Courses";
import TutorSettings from "./pages/Tutor/Settings";
import StudentDashboard from "./pages/Student/Dashboard";
import StudentMessages from "./pages/Student/Messages";
import StudentCalendar from "./pages/Student/Calendar";
import StudentCourses from "./pages/Student/Courses";
import StudentAssignments from "./pages/Student/Assignments";
import StudentTutors from "./pages/Student/Tutors";
import StudentSettings from "./pages/Student/Settings";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { ChatProvider } from "./contexts/ChatContext";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ChatProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Tutor routes */}
              <Route path="/tutors" element={<TutorDashboard />} />
              <Route path="/tutors/messages" element={<TutorMessages />} />
              <Route path="/tutors/calendar" element={<TutorCalendar />} />
              <Route path="/tutors/resources" element={<TutorResources />} />
              <Route path="/tutors/students" element={<TutorStudents />} />
              <Route path="/tutors/courses" element={<TutorCourses />} />
              <Route path="/tutors/settings" element={<TutorSettings />} />
              
              {/* Student routes */}
              <Route path="/students" element={<StudentDashboard />} />
              <Route path="/students/messages" element={<StudentMessages />} />
              <Route path="/students/calendar" element={<StudentCalendar />} />
              <Route path="/students/courses" element={<StudentCourses />} />
              <Route path="/students/assignments" element={<StudentAssignments />} />
              <Route path="/students/tutors" element={<StudentTutors />} />
              <Route path="/students/settings" element={<StudentSettings />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ChatProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
