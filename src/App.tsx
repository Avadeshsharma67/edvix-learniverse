
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import TutorPage from "./pages/TutorPage";
import StudentPage from "./pages/StudentPage";
import { ChatProvider } from "./contexts/ChatContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ChatProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/about" element={<About />} />
            
            {/* Tutor routes */}
            <Route path="/tutors" element={<TutorPage />} />
            <Route path="/tutors/messages" element={<TutorPage />} />
            <Route path="/tutors/calendar" element={<TutorPage />} />
            <Route path="/tutors/resources" element={<TutorPage />} />
            <Route path="/tutors/students" element={<TutorPage />} />
            <Route path="/tutors/courses" element={<TutorPage />} />
            <Route path="/tutors/settings" element={<TutorPage />} />
            
            {/* Student routes */}
            <Route path="/students" element={<StudentPage />} />
            <Route path="/students/messages" element={<StudentPage />} />
            <Route path="/students/calendar" element={<StudentPage />} />
            <Route path="/students/courses" element={<StudentPage />} />
            <Route path="/students/assignments" element={<StudentPage />} />
            <Route path="/students/tutors" element={<StudentPage />} />
            <Route path="/students/settings" element={<StudentPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
