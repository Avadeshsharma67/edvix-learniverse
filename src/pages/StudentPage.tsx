
import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { ChatInterface } from '@/components/Chat/ChatInterface';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { BookOpen, GraduationCap, Clock, Calendar, Award, BarChart, FileCheck, FileQuestion, AlertTriangle } from 'lucide-react';
import { useChat, students, tutors } from '@/contexts/ChatContext';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const StudentPage = () => {
  const { setCurrentUser, conversations, getUnreadCount } = useChat();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [totalUnread, setTotalUnread] = useState(0);

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Advanced Mathematics',
      instructor: 'Dr. Emily Johnson',
      instructorId: 't1',
      progress: 75,
      nextClass: 'Today, 2:30 PM',
      lastActive: '2 hours ago',
      avatar: '/placeholder.svg',
    },
    {
      id: 2,
      title: 'Physics 101',
      instructor: 'Prof. Michael Chen',
      instructorId: 't2',
      progress: 60,
      nextClass: 'Tomorrow, 10:00 AM',
      lastActive: '1 day ago',
      avatar: '/placeholder.svg',
    },
    {
      id: 3,
      title: 'Data Science Workshop',
      instructor: 'Dr. Sophia Rodriguez',
      instructorId: 't3',
      progress: 30,
      nextClass: 'Wed, June 15, 3:00 PM',
      lastActive: 'Just now',
      avatar: '/placeholder.svg',
    },
  ]);

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Mathematical Models Research',
      course: 'Advanced Mathematics',
      courseId: 1,
      dueDate: 'Tomorrow, 11:59 PM',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Physics Lab Report',
      course: 'Physics 101',
      courseId: 2,
      dueDate: 'June 12, 11:59 PM',
      status: 'submitted',
      submittedDate: '3 days ago',
    },
    {
      id: 3,
      title: 'Data Analysis Project',
      course: 'Data Science Workshop',
      courseId: 3,
      dueDate: 'June 15, 11:59 PM',
      status: 'pending',
    },
    {
      id: 4,
      title: 'Linear Algebra Problem Set',
      course: 'Advanced Mathematics',
      courseId: 1,
      dueDate: 'June 8, 11:59 PM',
      status: 'graded',
      grade: 'A',
      feedback: 'Excellent work! Your approach to the problems was very creative.',
    },
  ]);

  useEffect(() => {
    // Set current user as the first student (for demo)
    setCurrentUser(students[0]);
    
    // Calculate total unread messages
    if (conversations) {
      const total = conversations.reduce((acc, conv) => {
        return acc + getUnreadCount(conv.id);
      }, 0);
      setTotalUnread(total);
    }
    
    // Show welcome toast
    toast({
      title: "Welcome back, Alex!",
      description: `You have ${assignments.filter(a => a.status === 'pending').length} upcoming assignments and ${totalUnread} unread messages.`,
    });

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [conversations, getUnreadCount, totalUnread]);

  // Simulate course progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCourses(prev => 
        prev.map(course => ({
          ...course,
          progress: Math.min(100, course.progress + Math.floor(Math.random() * 2))
        }))
      );
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmitAssignment = (assignmentId: number) => {
    setAssignments(prev => 
      prev.map(assignment => {
        if (assignment.id === assignmentId) {
          return { ...assignment, status: 'submitted', submittedDate: 'Just now' };
        }
        return assignment;
      })
    );
    
    toast({
      title: "Assignment Submitted",
      description: "Your work has been successfully submitted for review.",
    });
  };

  const handleViewFeedback = (assignmentId: number) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment && assignment.feedback) {
      toast({
        title: `Feedback for ${assignment.title}`,
        description: assignment.feedback,
      });
    }
  };

  const handleMessageInstructor = (instructorId: string) => {
    setActiveTab('messages');
    toast({
      title: "Opening conversation",
      description: "You can now message your instructor directly.",
    });
  };

  const getTotalProgress = () => {
    const total = courses.reduce((acc, course) => acc + course.progress, 0);
    return Math.round(total / courses.length);
  };

  const getPendingAssignmentsCount = () => {
    return assignments.filter(a => a.status === 'pending').length;
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
            title="Course Progress" 
            value={`${getTotalProgress()}%`}
            trend="up"
            trendValue="5% from last week"
            icon={BarChart}
            isLoading={isLoading}
          />
          <StatsCard 
            title="Hours Studied" 
            value="42"
            trend="up"
            trendValue="7% from last week"
            icon={Clock}
            isLoading={isLoading}
          />
          <StatsCard 
            title="Pending Assignments" 
            value={getPendingAssignmentsCount().toString()}
            description="Next due: Tomorrow"
            icon={Calendar}
            isLoading={isLoading}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="messages">
              Messages
              {totalUnread > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {totalUnread}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-6">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
                              <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                            </div>
                            <div className="h-4 w-12 bg-muted rounded animate-pulse"></div>
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
                              <Badge variant={course.progress > 70 ? "default" : "outline"}>
                                {course.progress}%
                              </Badge>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                              <span>Next class: {course.nextClass}</span>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="h-auto p-0 text-xs"
                                onClick={() => handleMessageInstructor(course.instructorId)}
                              >
                                Message instructor
                              </Button>
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
                  <CardTitle>Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                          <div className="space-y-1">
                            <div className="h-4 w-40 bg-muted rounded animate-pulse"></div>
                            <div className="h-3 w-32 bg-muted rounded animate-pulse"></div>
                            <div className="h-3 w-24 bg-muted rounded animate-pulse"></div>
                          </div>
                          <div className="h-6 w-20 bg-muted rounded-md animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
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
                            <div className="flex flex-col items-end gap-1">
                              <Badge 
                                variant={
                                  assignment.status === 'pending' 
                                    ? 'outline' 
                                    : assignment.status === 'submitted' 
                                      ? 'secondary' 
                                      : 'default'
                                }
                                className="mb-1"
                              >
                                {assignment.status === 'graded' 
                                  ? assignment.grade 
                                  : assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)
                                }
                              </Badge>
                              
                              {assignment.status === 'pending' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleSubmitAssignment(assignment.id)}
                                >
                                  Submit
                                </Button>
                              )}
                              
                              {assignment.status === 'submitted' && (
                                <div className="text-xs text-muted-foreground">
                                  Submitted: {assignment.submittedDate}
                                </div>
                              )}
                              
                              {assignment.status === 'graded' && (
                                <Button 
                                  size="sm" 
                                  variant="link" 
                                  className="h-auto p-0 text-xs"
                                  onClick={() => handleViewFeedback(assignment.id)}
                                >
                                  View feedback
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
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Track your learning journey across all courses</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="h-full w-full bg-muted/50 rounded-md animate-pulse flex items-center justify-center">
                      <Award className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  </div>
                ) : (
                  <div className="h-[300px] flex flex-col items-center justify-center">
                    <div className="text-center">
                      <div className="relative mb-4">
                        <Award className="h-16 w-16 mx-auto text-accent/80" />
                        <Badge className="absolute -top-2 -right-2 px-2">{getTotalProgress()}%</Badge>
                      </div>
                      <h3 className="text-xl font-medium">Great Progress!</h3>
                      <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                        You're making steady progress in your courses. Keep up the great work to unlock more achievements!
                      </p>
                      <div className="grid grid-cols-3 gap-4 mt-6 max-w-md mx-auto">
                        <div className="text-center p-3 border rounded-lg">
                          <FileCheck className="h-8 w-8 mx-auto text-green-500 mb-2" />
                          <p className="text-sm font-medium">{assignments.filter(a => a.status === 'graded').length} Completed</p>
                        </div>
                        <div className="text-center p-3 border rounded-lg">
                          <FileQuestion className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                          <p className="text-sm font-medium">{assignments.filter(a => a.status === 'submitted').length} Awaiting</p>
                        </div>
                        <div className="text-center p-3 border rounded-lg">
                          <AlertTriangle className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                          <p className="text-sm font-medium">{assignments.filter(a => a.status === 'pending').length} Pending</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-32 bg-muted animate-pulse"></div>
                    <CardContent className="p-6 space-y-4">
                      <div className="h-6 w-3/4 bg-muted rounded animate-pulse"></div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 bg-muted rounded-full animate-pulse"></div>
                        <div className="h-4 w-1/2 bg-muted rounded animate-pulse"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                          <div className="h-4 w-10 bg-muted rounded animate-pulse"></div>
                        </div>
                        <div className="h-2 bg-muted rounded animate-pulse"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                courses.map((course) => (
                  <Card key={course.id} className="overflow-hidden transition-all hover:shadow-md">
                    <div className="h-32 bg-gradient-to-r from-accent/80 to-accent/30 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-white" />
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
                      <div className="mt-4 text-xs text-muted-foreground">
                        Last active: {course.lastActive}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Course Resources",
                            description: `Viewing resources for ${course.title}`,
                          });
                        }}
                      >
                        Resources
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleMessageInstructor(course.instructorId)}
                      >
                        Contact Instructor
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
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
