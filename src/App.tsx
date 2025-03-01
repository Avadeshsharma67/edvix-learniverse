
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
