
import React, { useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { ChatInterface } from '@/components/Chat/ChatInterface';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { BookOpen, GraduationCap, Clock, Calendar, Award, BarChart } from 'lucide-react';
import { useChat, students } from '@/contexts/ChatContext';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

const StudentPage = () => {
  const { setCurrentUser } = useChat();
  const { toast } = useToast();

  const courses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      instructor: 'Dr. Emily Johnson',
      progress: 75,
      nextClass: 'Today, 2:30 PM',
      avatar: '/placeholder.svg',
    },
    {
      id: 2,
      title: 'Physics 101',
      instructor: 'Prof. Michael Chen',
      progress: 60,
      nextClass: 'Tomorrow, 10:00 AM',
      avatar: '/placeholder.svg',
    },
    {
      id: 3,
      title: 'Data Science Workshop',
      instructor: 'Dr. Sophia Rodriguez',
      progress: 30,
      nextClass: 'Wed, June 15, 3:00 PM',
      avatar: '/placeholder.svg',
    },
  ];

  const assignments = [
    {
      id: 1,
      title: 'Mathematical Models Research',
      course: 'Advanced Mathematics',
      dueDate: 'Tomorrow, 11:59 PM',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Physics Lab Report',
      course: 'Physics 101',
      dueDate: 'June 12, 11:59 PM',
      status: 'submitted',
    },
    {
      id: 3,
      title: 'Data Analysis Project',
      course: 'Data Science Workshop',
      dueDate: 'June 15, 11:59 PM',
      status: 'pending',
    },
    {
      id: 4,
      title: 'Linear Algebra Problem Set',
      course: 'Advanced Mathematics',
      dueDate: 'June 8, 11:59 PM',
      status: 'graded',
      grade: 'A',
    },
  ];

  useEffect(() => {
    // Set current user as the first student (for demo)
    setCurrentUser(students[0]);
    
    // Show welcome toast
    toast({
      title: "Welcome back, Alex!",
      description: "You have 3 upcoming assignments and 1 unread message.",
    });
  }, []);

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="Enrolled Courses" 
            value="3"
            icon={BookOpen}
          />
          <StatsCard 
            title="Course Progress" 
            value="68%"
            trend="up"
            trendValue="5% from last week"
            icon={BarChart}
          />
          <StatsCard 
            title="Hours Studied" 
            value="42"
            trend="up"
            trendValue="7% from last week"
            icon={Clock}
          />
          <StatsCard 
            title="Pending Assignments" 
            value="3"
            description="Next due: Tomorrow"
            icon={Calendar}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[240px]">
                    <div className="space-y-5">
                      {courses.map((course) => (
                        <div key={course.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={course.avatar} />
                                <AvatarFallback>
                                  {course.instructor.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{course.title}</h4>
                                <p className="text-xs text-muted-foreground">{course.instructor}</p>
                              </div>
                            </div>
                            <Badge variant="outline">
                              {course.progress}%
                            </Badge>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>Next class: {course.nextClass}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[240px]">
                    <div className="space-y-4">
                      {assignments.map((assignment) => (
                        <div key={assignment.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                          <div>
                            <h4 className="font-medium">{assignment.title}</h4>
                            <p className="text-xs text-muted-foreground">{assignment.course}</p>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <Calendar className="mr-1 h-3 w-3" />
                              <span>Due: {assignment.dueDate}</span>
                            </div>
                          </div>
                          <Badge 
                            variant={
                              assignment.status === 'pending' 
                                ? 'outline' 
                                : assignment.status === 'submitted' 
                                ? 'secondary' 
                                : 'default'
                            }
                          >
                            {assignment.status === 'graded' 
                              ? assignment.grade 
                              : assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)
                            }
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Track your learning journey across all courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <Award className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">Progress metrics will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="h-32 bg-muted flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                    <div className="flex items-center mb-4">
                      <Avatar className="h-5 w-5 mr-2">
                        <AvatarImage src={course.avatar} />
                        <AvatarFallback>
                          {course.instructor.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{course.instructor}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <div className="mt-4 text-xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Next class: {course.nextClass}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardContent className="p-0">
                <ChatInterface />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentPage;
