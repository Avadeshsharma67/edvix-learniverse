
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Users, MessageSquare, BookOpen, Clock, Calendar, BarChart, TrendingUp, Award, Zap, CheckCircle, Bell } from 'lucide-react';
import { StatsCard } from '@/components/Dashboard/StatsCard';
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

const TutorDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('overview');

  const [studentProgress, setStudentProgress] = useState([
    { name: 'Alex Thompson', id: 's1', progress: 78, lastActivity: '2 hours ago', course: 'Advanced Mathematics', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Jamie Wilson', id: 's2', progress: 62, lastActivity: '1 day ago', course: 'Physics 101', avatar: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Taylor Smith', id: 's3', progress: 91, lastActivity: '4 hours ago', course: 'Computer Science', avatar: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Jordan Lee', id: 's4', progress: 45, lastActivity: '3 days ago', course: 'Data Science', avatar: 'https://i.pravatar.cc/150?img=4' },
  ]);

  const upcomingClasses = [
    {
      id: 1,
      subject: 'Advanced Mathematics',
      time: 'Today, 2:30 PM',
      duration: '1h 30m',
      students: 12,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?q=80&w=100&auto=format&fit=crop'
    },
    {
      id: 2,
      subject: 'Physics 101',
      time: 'Tomorrow, 10:00 AM',
      duration: '1h',
      students: 8,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=100&auto=format&fit=crop'
    },
    {
      id: 3,
      subject: 'Data Science Workshop',
      time: 'Wed, June 15, 3:00 PM',
      duration: '2h',
      students: 15,
      status: 'planning',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=100&auto=format&fit=crop'
    },
  ];

  // Recent activity data
  const recentActivities = [
    { id: 1, type: 'message', user: 'Jamie Wilson', time: '5 minutes ago', details: 'Sent you a message about the upcoming Physics test.' },
    { id: 2, type: 'assignment', user: 'Alex Thompson', time: '1 hour ago', details: 'Submitted the Mathematics assignment.' },
    { id: 3, type: 'enrollment', user: 'New Student', time: '3 hours ago', details: 'Emily Parker enrolled in your Computer Science course.' },
    { id: 4, type: 'feedback', user: 'Taylor Smith', time: 'Yesterday', details: 'Left a 5-star rating for your Data Structures lesson.' },
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

  const handleStartClass = (classId: number) => {
    const classToStart = upcomingClasses.find(cls => cls.id === classId);
    if (classToStart) {
      toast({
        title: "Class Started",
        description: `Virtual classroom for ${classToStart.subject} has been initiated. Students are being notified.`,
      });
      
      // Simulate notification process
      setTimeout(() => {
        toast({
          title: "Classroom Ready",
          description: `${classToStart.students} students have been notified.`,
        });
      }, 1500);
    }
  };

  const handleViewStudentProfile = (studentId: string) => {
    const student = studentProgress.find(s => s.id === studentId);
    if (student) {
      toast({
        title: "Loading Profile",
        description: `Opening ${student.name}'s profile...`,
      });
      navigate(`/tutors/students?id=${studentId}`);
    }
  };

  const handleGenerateInsights = () => {
    toast({
      title: "Generating Insights",
      description: "Analyzing teaching patterns and student performance...",
    });
    
    // Simulate insights generation
    setTimeout(() => {
      toast({
        title: "Insights Ready",
        description: "Teaching analytics report has been generated successfully.",
      });
    }, 2000);
  };

  const handleDownloadReport = () => {
    toast({
      title: "Preparing Report",
      description: "Your teaching analytics report is being generated...",
    });
    
    // Simulate download process
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: "Your teaching analytics report has been downloaded.",
      });
    }, 2000);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'assignment':
        return <CheckCircle className="h-4 w-4" />;
      case 'enrollment':
        return <Users className="h-4 w-4" />;
      case 'feedback':
        return <Award className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout title="Tutor Dashboard">
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-purple-500/10 rounded-lg p-6 shadow-sm border">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, {currentUser?.name || 'Tutor'}!</h2>
              <p className="text-muted-foreground">
                Here's an overview of your teaching dashboard and upcoming sessions.
              </p>
            </div>
            <Button 
              variant="default" 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600" 
              onClick={() => navigate('/tutors/courses')}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Manage Courses
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="Total Students" 
            value="127"
            trend="up"
            trendValue="4% from last month"
            icon={Users}
            isLoading={isLoading}
          />
          <StatsCard 
            title="Active Courses" 
            value="8"
            icon={BookOpen}
            isLoading={isLoading}
          />
          <StatsCard 
            title="Hours Taught" 
            value="247"
            trend="up"
            trendValue="12% from last month"
            icon={Clock}
            isLoading={isLoading}
          />
          <StatsCard 
            title="Upcoming Classes" 
            value={upcomingClasses.filter(c => c.status === 'upcoming').length.toString()}
            description="Next: Today, 2:30 PM"
            icon={Calendar}
            isLoading={isLoading}
          />
        </div>

        <Tabs 
          defaultValue="overview" 
          className="space-y-4"
          value={currentTab}
          onValueChange={setCurrentTab}
        >
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border shadow-sm">
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
                        {upcomingClasses.map((cls) => (
                          <div key={cls.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
                                <img 
                                  src={cls.image} 
                                  alt={cls.subject} 
                                  className="h-full w-full object-cover"
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
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center bg-muted px-2 py-1 rounded-full text-xs">
                                <Users className="h-3 w-3 mr-1" />
                                {cls.students} students
                              </div>
                              {cls.status === 'upcoming' && (
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  onClick={() => handleStartClass(cls.id)}
                                >
                                  Start
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => navigate('/tutors/calendar')}
                  >
                    View All Classes
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Student Progress
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
                        {studentProgress.map((student) => (
                          <div key={student.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={student.avatar} />
                                  <AvatarFallback>
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium text-sm">{student.name}</h4>
                                  <p className="text-xs text-muted-foreground">{student.course}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={student.progress > 75 ? "default" : "outline"}>
                                  {student.progress}%
                                </Badge>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleViewStudentProfile(student.id)}
                                >
                                  View
                                </Button>
                              </div>
                            </div>
                            <Progress value={student.progress} className="h-2" />
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                              <span>Progress</span>
                              <span>Last active: {student.lastActivity}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => navigate('/tutors/students')}
                  >
                    View All Students
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle>Teaching Analytics</CardTitle>
                <CardDescription>Comprehensive data about your teaching performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-muted/30 p-4 rounded-lg border text-center">
                    <div className="flex items-center justify-center mb-2 text-primary">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">94%</h3>
                    <p className="text-sm text-muted-foreground">Student Satisfaction</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg border text-center">
                    <div className="flex items-center justify-center mb-2 text-primary">
                      <Zap className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">4.8/5</h3>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg border text-center">
                    <div className="flex items-center justify-center mb-2 text-primary">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">87%</h3>
                    <p className="text-sm text-muted-foreground">Course Completion Rate</p>
                  </div>
                </div>
                
                <div className="h-[250px] flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">
                      Detailed analytics will be displayed here
                    </p>
                    <div className="mt-4 flex gap-2 justify-center">
                      <Button variant="outline" onClick={handleDownloadReport}>Download Report</Button>
                      <Button onClick={handleGenerateInsights}>Generate Insights</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your students and courses</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="flex gap-4 pb-4 border-b last:border-0">
                        <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                          <div className="h-3 w-2/3 bg-muted rounded animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className={`p-2 mt-0.5 rounded-full flex-shrink-0 ${
                          activity.type === 'message' 
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                            : activity.type === 'assignment'
                            ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                            : activity.type === 'enrollment'
                            ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300'
                            : 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300'
                        }`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{activity.user}</h4>
                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{activity.details}</p>
                        </div>
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
                  onClick={() => navigate('/tutors/students')}
                >
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TutorDashboard;
