import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";
import Tutors from "./pages/Tutors";
import About from "./pages/About";
import Course from "./pages/Course";
import Tutor from "./pages/Tutor";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TutorDashboard from "./pages/TutorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Auth from "./pages/Auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" closeButton={true} richColors={true} />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/tutors" element={<Tutors />} />
              <Route path="/about" element={<About />} />
              <Route path="/course/:id" element={<Course />} />
              <Route path="/tutor/:id" element={<Tutor />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/tutor" element={<TutorDashboard />} />
              <Route path="/dashboard/student" element={<StudentDashboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/callback" element={<Auth />} />
              
              <Route path="" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
