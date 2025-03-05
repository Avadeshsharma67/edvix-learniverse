
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { Users, Clock, CreditCard, Calendar, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import TutorActivityWidget from '@/components/Dashboard/TutorActivityWidget';
import LeaderboardWidget from '@/components/Dashboard/LeaderboardWidget';
import GoalsWidget from '@/components/Dashboard/GoalsWidget';

const TutorDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const tutor = {
    id: 1,
    name: currentUser?.name || 'Tutor',
    earnings: 2540,
    students: 18,
    totalHours: 145,
    bookingRate: 85,
    upcomingSessions: 3
  };

  // Mock leaderboard data
  const leaderboardEntries = [
    { id: '1', name: 'Jessica Thompson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop', score: 4820, position: 1 },
    { id: '2', name: 'Michael Rodriguez', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop', score: 4615, position: 2 },
    { id: '3', name: 'Sophia Williams', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop', score: 4590, position: 3 },
    { id: '4', name: currentUser?.name || 'David Chen', avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=100&auto=format&fit=crop', score: 4210, position: 4, isCurrentUser: true },
    { id: '5', name: 'Emma Johnson', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=100&auto=format&fit=crop', score: 4050, position: 5 },
    { id: '6', name: 'Daniel Martin', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop', score: 3980, position: 6 },
    { id: '7', name: 'Olivia Taylor', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop', score: 3820, position: 7 },
  ];

  // Mock goals data
  const goals = [
    { id: '1', title: 'Achieve 95% student satisfaction rating', progress: 87, dueDate: '2 weeks left', isCompleted: false },
    { id: '2', title: 'Complete advanced teaching certification', progress: 100, isCompleted: true },
    { id: '3', title: 'Create 5 new learning resources', progress: 60, dueDate: '1 month left', isCompleted: false },
  ];

  const fetchData = () => {
    // Simulating API calls
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // Redirect if not authenticated or not a tutor
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (currentUser?.role !== 'tutor') {
      navigate('/');
      return;
    }
    
    fetchData();
    
    return () => {
      // Cleanup
    };
  }, [isAuthenticated, currentUser, navigate]);

  const tutorStats = {
    totalStudents: tutor.students,
    hoursCompleted: tutor.totalHours,
    earnings: tutor.earnings,
    bookingRate: tutor.bookingRate
  };

  const handleAddGoal = () => {
    toast({
      title: "Add Goal",
      description: "Goal creation feature coming soon!",
    });
  };

  const handleViewLeaderboard = () => {
    toast({
      title: "Leaderboard",
      description: "Full leaderboard feature coming soon!",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <DashboardLayout title="Tutor Dashboard">
      <motion.div 
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Welcome Banner */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-purple-500/10 rounded-lg p-6 shadow-sm border relative overflow-hidden"
          variants={itemVariants}
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                Welcome back, {currentUser?.name || 'Tutor'}!
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="ml-2"
                >
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                </motion.div>
              </h2>
              <p className="text-muted-foreground max-w-lg">
                Here's an overview of your tutoring activity and upcoming sessions.
              </p>
            </div>
            <Button variant="default" size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600" onClick={() => navigate('/tutors/calendar')}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Session
            </Button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -left-16 -top-16 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <StatsCard 
              title="Active Students" 
              value={tutor.students.toString()}
              icon={Users}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard 
              title="Total Hours" 
              value={tutor.totalHours.toString()}
              trend="up"
              trendValue="12% from last month"
              icon={Clock}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard 
              title="Total Earnings" 
              value={`$${tutor.earnings}`}
              trend="up"
              trendValue="8% from last month"
              icon={CreditCard}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard 
              title="Booking Rate" 
              value={`${tutor.bookingRate}%`}
              description="Industry avg: 72%"
              icon={CheckCircle}
              isLoading={isLoading}
            />
          </motion.div>
        </motion.div>

        {/* Activity Widget */}
        <motion.div variants={itemVariants}>
          <TutorActivityWidget stats={tutorStats} isLoading={isLoading} />
        </motion.div>

        {/* Leaderboard and Goals Widgets */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={itemVariants}
        >
          <LeaderboardWidget
            title="Top Tutors Leaderboard"
            description="Rankings based on student ratings and engagement"
            entries={leaderboardEntries}
            isLoading={isLoading}
            onViewAll={handleViewLeaderboard}
          />
          
          <GoalsWidget
            goals={goals}
            isLoading={isLoading}
            onAddGoal={handleAddGoal}
          />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default TutorDashboard;
