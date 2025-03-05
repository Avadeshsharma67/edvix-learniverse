import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Users, MessageSquare, BookOpen, Award, Calendar, BarChart, Clock, TrendingUp, CheckCircle, FileText, Sparkles } from 'lucide-react';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import StudyProgressWidget from '@/components/Dashboard/StudyProgressWidget';
import LeaderboardWidget from '@/components/Dashboard/LeaderboardWidget';
import GoalsWidget from '@/components/Dashboard/GoalsWidget';
import AchievementsWidget from '@/components/Dashboard/AchievementsWidget';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const StudentDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [courses, setCourses] = useState([
    { name: 'Advanced Mathematics', id: 'c1', progress: 78, lastActivity: '2 hours ago', tutor: 'Dr. Emily Johnson', image: 'https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?q=80&w=100&auto=format&fit=crop' },
    { name: 'Physics 101', id: 'c2', progress: 62, lastActivity: '1 day ago', tutor: 'Prof. Michael Brown', image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=100&auto=format&fit=crop' },
    { name: 'Computer Science', id: 'c3', progress: 91, lastActivity: '4 hours ago', tutor: 'Sarah Williams', image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=100&auto=format&fit=crop' },
    { name: 'Data Science', id: 'c4', progress: 45, lastActivity: '3 days ago', tutor: 'Dr. Alex Thompson', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=100&auto=format&fit=crop' },
  ]);

  const upcomingClasses = [
    {
      id: 1,
      subject: 'Advanced Mathematics',
      time: 'Today, 2:30 PM',
      duration: '1h 30m',
      tutor: 'Dr. Emily Johnson',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?q=80&w=100&auto=format&fit=crop'
    },
    {
      id: 2,
      subject: 'Physics 101',
      time: 'Tomorrow, 10:00 AM',
      duration: '1h',
      tutor: 'Prof. Michael Brown',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=100&auto=format&fit=crop'
    },
    {
      id: 3,
      subject: 'Data Science Workshop',
      time: 'Wed, June 15, 3:00 PM',
      duration: '2h',
      tutor: 'Dr. Alex Thompson',
      status: 'planning',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=100&auto=format&fit=crop'
    },
  ];

  const assignments = [
    {
      id: 1,
      title: "Linear Algebra Assignment",
      course: "Advanced Mathematics",
      dueDate: "Today, 11:59 PM",
      status: "pending",
    },
    {
      id: 2,
      title: "Physics Lab Report",
      course: "Physics 101",
      dueDate: "Tomorrow, 11:59 PM",
      status: "pending",
    },
    {
      id: 3,
      title: "Data Visualization Project",
      course: "Data Science",
      dueDate: "Jun 18, 11:59 PM",
      status: "completed",
    },
  ];

  const achievements = [
    {
      id: '1',
      title: 'Perfect Attendance',
      description: 'Attended all scheduled sessions for 2 consecutive weeks',
      date: 'Today',
      icon: 'star' as 'star',
      points: 50,
      isNew: true
    },
    {
      id: '2',
      title: 'Quiz Master',
      description: 'Scored 90% or higher on 5 consecutive quizzes',
      date: '3 days ago',
      icon: 'trophy' as 'trophy',
      points: 100
    },
    {
      id: '3',
      title: 'Fast Learner',
      description: 'Completed a course 30% faster than average',
      date: '1 week ago',
      icon: 'zap' as 'zap',
      points: 75
    },
    {
      id: '4',
      title: 'Bookworm',
      description: 'Read all recommended materials for your courses',
      date: '2 weeks ago',
      icon: 'book' as 'book',
      points: 50
    },
  ];

  const leaderboardEntries = [
    { id: '1', name: 'Alex Thompson', avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?q=80&w=100&auto=format&fit=crop', score: 785, position: 1 },
    { id: '2', name: 'Emma Johnson', avatar: 'https://images.unsplash.com/photo-1438761696357-6461ffad8d80?q=80&w=100&auto=format&fit=crop', score: 720, position: 2 },
    { id: '3', name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop', score: 695, position: 3 },
    { id: '4', name: currentUser?.name || 'Student', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop', score: 650, position: 4, isCurrentUser: true },
    { id: '5', name: 'Sophia Rodriguez', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop', score: 620, position: 5 },
    { id: '6', name: 'James Williams', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop', score: 590, position: 6 },
    { id: '7', name: 'Olivia Lee', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop', score: 585, position: 7 },
  ];

  const goals = [
    { id: '1', title: 'Complete Advanced Mathematics course', progress: 78, dueDate: '3 weeks left', isCompleted: false },
    { id: '2', title: 'Submit all pending assignments', progress: 65, dueDate: '1 week left', isCompleted: false },
    { id: '3', title: 'Prepare for midterm exams', progress: 100, isCompleted: true },
  ];

  const studyStats = {
    timeSpent: "18h 45m",
    completedLessons: 32,
    totalLessons: 48,
    streak: 7,
    pointsEarned: 450
  };

  const fetchData = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (currentUser?.role !== 'student') {
      navigate('/');
      return;
    }
    
    fetchData();
    
    return () => {
    };
  }, [isAuthenticated, currentUser, navigate]);

  const handleJoinClass = (classId: number) => {
    const classToJoin = upcomingClasses.find(cls => cls.id === classId);
    if (classToJoin) {
      toast({
        title: "Joining Class",
        description: `Connecting to ${classToJoin.subject} virtual classroom...`,
      });
      
      setTimeout(() => {
        toast({
          title: "Connected",
          description: "You have successfully joined the class session.",
        });
      }, 1500);
    }
  };

  const handleViewCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      toast({
        title: "Opening Course",
        description: `Loading ${course.name}...`,
      });
      navigate(`/students/courses?id=${courseId}`);
    }
  };

  const handleViewAssignment = (assignmentId: number) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
      toast({
        description: `Opening ${assignment.title}...`,
      });
      navigate(`/students/assignments?id=${assignmentId}`);
    }
  };

  const handleDownloadReport = () => {
    toast({
      title: "Generating Report",
      description: "Your learning progress report is being generated...",
    });
    
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: "Your learning progress report has been downloaded.",
      });
    }, 2000);
  };

  const handleViewAllCourses = () => {
    navigate('/students/courses');
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
    <DashboardLayout title="Student Dashboard">
      <motion.div 
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-purple-500/10 rounded-lg p-6 shadow-sm border relative overflow-hidden"
          variants={itemVariants}
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                Welcome back, {currentUser?.name || 'Student'}!
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
                Here's an overview of your learning progress and upcoming activities.
              </p>
            </div>
            <Button variant="default" size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600" onClick={() => navigate('/students/messages')}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Tutor
            </Button>
          </div>
          
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -left-16 -top-16 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <StatsCard 
              title="Enrolled Courses" 
              value={courses.length.toString()}
              icon={BookOpen}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard 
              title="Learning Hours" 
              value="32"
              trend="up"
              trendValue="8% from last week"
              icon={Clock}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard 
              title="Achievement Points" 
              value="450"
              trend="up"
              trendValue="15% from last month"
              icon={Award}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard 
              title="Upcoming Classes" 
              value={upcomingClasses.filter(c => c.status === 'upcoming').length.toString()}
              description="Next: Today, 2:30 PM"
              icon={Calendar}
              isLoading={isLoading}
            />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <StudyProgressWidget stats={studyStats} isLoading={isLoading} />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={itemVariants}
        >
          <LeaderboardWidget
            title="Student Leaderboard"
            description="Rankings based on points and achievements"
            entries={leaderboardEntries}
            isLoading={isLoading}
            onViewAll={handleViewLeaderboard}
          />
          
          <AchievementsWidget
            achievements={achievements}
            isLoading={isLoading}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <GoalsWidget
            goals={goals}
            isLoading={isLoading}
            onAddGoal={handleAddGoal}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      Upcoming Classes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                            <div className="space-y-2">
                              <div className="h-4 w-40 bg-muted rounded animate-pulse"></div>
                              <div className="h-3 w-32 bg-muted rounded animate-pulse"></div>
                            </div>
                            <div className="h-7 w-20 bg-muted rounded-full animate-pulse"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ScrollArea className="h-[240px]">
                        <div className="space-y-4">
                          {upcomingClasses.map((cls, idx) => (
                            <motion.div 
                              key={cls.id} 
                              className="flex items-center justify-between border-b pb-3 last:border-0"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-md overflow-hidden bg-muted relative group">
                                  <img 
                                    src={cls.image} 
                                    alt={cls.subject} 
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-medium">{cls.subject}</h4>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="mr-1 h-3 w-3" />
                                    <span>{cls.time}</span>
                                    <span className="mx-1">•</span>
                                    <span>{cls.duration}</span>
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Tutor: {cls.tutor}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {cls.status === 'upcoming' && (
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    onClick={() => handleJoinClass(cls.id)}
                                    className="relative overflow-hidden group"
                                  >
                                    <span className="relative z-10">Join</span>
                                    <span className="absolute inset-0 bg-primary-foreground/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                  </Button>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      size="sm"
                      onClick={() => navigate('/students/calendar')}
                    >
                      View All Classes
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <BookOpen className="mr-2 h-5 w-5 text-primary" />
                      Course Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-6">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
                                <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                              </div>
                              <div className="h-4 w-10 bg-muted rounded animate-pulse"></div>
                            </div>
                            <div className="h-2 bg-muted rounded animate-pulse"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ScrollArea className="h-[240px]">
                        <div className="space-y-5">
                          {courses.map((course, idx) => (
                            <motion.div 
                              key={course.id} 
                              className="space-y-2"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-md overflow-hidden bg-muted relative group">
                                    <img 
                                      src={course.image} 
                                      alt={course.name} 
                                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-sm">{course.name}</h4>
                                    <p className="text-xs text-muted-foreground">Tutor: {course.tutor}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant={course.progress > 75 ? "default" : "outline"}>
                                    {course.progress}%
                                  </Badge>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleViewCourse(course.id)}
                                  >
                                    View
                                  </Button>
                                </div>
                              </div>
                              <div className="relative">
                                <Progress value={course.progress} className="h-2" />
                                <motion.div 
                                  className="absolute top-0 h-2 bg-primary/30 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${course.progress}%` }}
                                  transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                                />
                              </div>
                              <div className="flex justify-between items-center text-xs text-muted-foreground">
                                <span>Progress</span>
                                <span>Last active: {course.lastActivity}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      size="sm"
                      onClick={handleViewAllCourses}
                    >
                      View All Courses
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="progress">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>Track your learning journey and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <BarChart className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">
                        Detailed progress analytics will be displayed here
                      </p>
                      <div className="mt-4 flex gap-2 justify-center">
                        <Button variant="outline" onClick={handleDownloadReport}>Download Report</Button>
                        <Button onClick={handleViewAllCourses}>View All Courses</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Assignments
                  </CardTitle>
                  <CardDescription>Track your assignments and submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0">
                          <div className="space-y-2">
                            <div className="h-4 w-40 bg-muted rounded animate-pulse"></div>
                            <div className="h-3 w-32 bg-muted rounded animate-pulse"></div>
                          </div>
                          <div className="h-7 w-20 bg-muted rounded-full animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {assignments.map((assignment) => (
                        <div key={assignment.id} className="flex items-center justify-between p-4 border-b last:border-0 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${
                              assignment.status === 'completed' 
                                ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' 
                                : 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300'
                            }`}>
                              {assignment.status === 'completed' ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : (
                                <Clock className="h-5 w-5" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">{assignment.title}</h4>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span>{assignment.course}</span>
                                <span className="mx-1">•</span>
                                <span>Due: {assignment.dueDate}</span>
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewAssignment(assignment.id)}
                          >
                            {assignment.status === 'completed' ? 'Review' : 'View'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                    onClick={() => navigate('/students/assignments')}
                  >
                    View All Assignments
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
