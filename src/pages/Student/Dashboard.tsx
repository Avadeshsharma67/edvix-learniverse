
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Users, MessageSquare, BookOpen, Award, Calendar, BarChart, Clock, TrendingUp, CheckCircle, FileText } from 'lucide-react';
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

  const fetchData = () => {
    // Simulating API calls
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // Redirect if not authenticated or not a student
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
      // Cleanup
    };
  }, [isAuthenticated, currentUser, navigate]);

  const handleJoinClass = (classId: number) => {
    const classToJoin = upcomingClasses.find(cls => cls.id === classId);
    if (classToJoin) {
      toast({
        title: "Joining Class",
        description: `Connecting to ${classToJoin.subject} virtual classroom...`,
      });
      
      // Simulate joining process
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
    
    // Simulate download process
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

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-purple-500/10 rounded-lg p-6 shadow-sm border">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, {currentUser?.name || 'Student'}!</h2>
              <p className="text-muted-foreground">
                Here's an overview of your learning progress and upcoming activities.
              </p>
            </div>
            <Button variant="default" size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600" onClick={() => navigate('/students/messages')}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Tutor
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="Enrolled Courses" 
            value={courses.length.toString()}
            icon={BookOpen}
            isLoading={isLoading}
          />
          <StatsCard 
            title="Learning Hours" 
            value="32"
            trend="up"
            trendValue="8% from last week"
            icon={Clock}
            isLoading={isLoading}
          />
          <StatsCard 
            title="Achievement Points" 
            value="450"
            trend="up"
            trendValue="15% from last month"
            icon={Award}
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

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
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
                                >
                                  Join
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
                    className="w-full" 
                    size="sm"
                    onClick={() => navigate('/students/calendar')}
                  >
                    View All Classes
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border shadow-sm">
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
                        {courses.map((course) => (
                          <div key={course.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
                                  <img 
                                    src={course.image} 
                                    alt={course.name} 
                                    className="h-full w-full object-cover"
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
                            <Progress value={course.progress} className="h-2" />
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                              <span>Progress</span>
                              <span>Last active: {course.lastActivity}</span>
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
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
