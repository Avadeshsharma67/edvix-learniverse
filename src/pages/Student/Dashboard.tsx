
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Users, MessageSquare, BookOpen, Award, Calendar, BarChart } from 'lucide-react';
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
    { name: 'Advanced Mathematics', id: 'c1', progress: 78, lastActivity: '2 hours ago', tutor: 'Dr. Emily Johnson' },
    { name: 'Physics 101', id: 'c2', progress: 62, lastActivity: '1 day ago', tutor: 'Prof. Michael Brown' },
    { name: 'Computer Science', id: 'c3', progress: 91, lastActivity: '4 hours ago', tutor: 'Sarah Williams' },
    { name: 'Data Science', id: 'c4', progress: 45, lastActivity: '3 days ago', tutor: 'Dr. Alex Thompson' },
  ]);

  const upcomingClasses = [
    {
      id: 1,
      subject: 'Advanced Mathematics',
      time: 'Today, 2:30 PM',
      duration: '1h 30m',
      tutor: 'Dr. Emily Johnson',
      status: 'upcoming',
    },
    {
      id: 2,
      subject: 'Physics 101',
      time: 'Tomorrow, 10:00 AM',
      duration: '1h',
      tutor: 'Prof. Michael Brown',
      status: 'upcoming',
    },
    {
      id: 3,
      subject: 'Data Science Workshop',
      time: 'Wed, June 15, 3:00 PM',
      duration: '2h',
      tutor: 'Dr. Alex Thompson',
      status: 'planning',
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
            icon={Calendar}
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
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Classes</CardTitle>
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
                            <div>
                              <h4 className="font-medium">{cls.subject}</h4>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="mr-1 h-3 w-3" />
                                <span>{cls.time}</span>
                                <span className="mx-1">•</span>
                                <span>{cls.duration}</span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Tutor: {cls.tutor}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {cls.status === 'upcoming' && (
                                <Button 
                                  variant="secondary" 
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
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Progress</CardTitle>
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
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src="/placeholder.svg" />
                                  <AvatarFallback>
                                    {course.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
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
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="progress">
            <Card>
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
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
