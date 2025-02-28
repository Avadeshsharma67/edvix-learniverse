
import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { ChatInterface } from '@/components/Chat/ChatInterface';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, BookOpen, Clock, Calendar, BarChart } from 'lucide-react';
import { useChat, tutors } from '@/contexts/ChatContext';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const TutorPage = () => {
  const { setCurrentUser, conversations, getUnreadCount } = useChat();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [totalUnread, setTotalUnread] = useState(0);

  // Sample data for charts and stats
  const [studentProgress, setStudentProgress] = useState([
    { name: 'Alex Thompson', id: 's1', progress: 78, lastActivity: '2 hours ago', course: 'Advanced Mathematics' },
    { name: 'Jamie Wilson', id: 's2', progress: 62, lastActivity: '1 day ago', course: 'Physics 101' },
    { name: 'Taylor Smith', id: 's3', progress: 91, lastActivity: '4 hours ago', course: 'Computer Science' },
    { name: 'Jordan Lee', id: 's4', progress: 45, lastActivity: '3 days ago', course: 'Data Science' },
  ]);

  const upcomingClasses = [
    {
      id: 1,
      subject: 'Advanced Mathematics',
      time: 'Today, 2:30 PM',
      duration: '1h 30m',
      students: 12,
      status: 'upcoming',
    },
    {
      id: 2,
      subject: 'Physics 101',
      time: 'Tomorrow, 10:00 AM',
      duration: '1h',
      students: 8,
      status: 'upcoming',
    },
    {
      id: 3,
      subject: 'Data Science Workshop',
      time: 'Wed, June 15, 3:00 PM',
      duration: '2h',
      students: 15,
      status: 'planning',
    },
  ];

  useEffect(() => {
    // Set current user as the first tutor (for demo)
    setCurrentUser(tutors[0]);
    
    // Calculate total unread messages
    if (conversations) {
      const total = conversations.reduce((acc, conv) => {
        return acc + getUnreadCount(conv.id);
      }, 0);
      setTotalUnread(total);
    }
    
    // Show welcome toast
    toast({
      title: "Welcome back, Dr. Johnson!",
      description: `You have ${upcomingClasses.filter(c => c.status === 'upcoming').length} upcoming classes and ${totalUnread} unread messages.`,
    });

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [conversations, getUnreadCount, totalUnread]);

  // Update student progress periodically to simulate real activity
  useEffect(() => {
    const interval = setInterval(() => {
      setStudentProgress(prev => 
        prev.map(student => ({
          ...student,
          progress: Math.min(100, student.progress + Math.floor(Math.random() * 3))
        }))
      );
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const handleStartClass = (classId: number) => {
    toast({
      title: "Class Started",
      description: "Virtual classroom has been initiated. Students are being notified.",
    });
  };

  const handleViewStudentProfile = (studentId: string) => {
    toast({
      title: "Student Profile",
      description: `Viewing detailed profile for student ${studentId}`,
    });
  };

  return (
    <DashboardLayout title="Tutor Dashboard">
      <div className="space-y-6">
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="messages">
              Messages
              {totalUnread > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {totalUnread}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
                                <Clock className="mr-1 h-3 w-3" />
                                <span>{cls.time}</span>
                                <span className="mx-1">•</span>
                                <span>{cls.duration}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center bg-muted px-2 py-1 rounded-full text-xs">
                                <Users className="h-3 w-3 mr-1" />
                                {cls.students} students
                              </div>
                              {cls.status === 'upcoming' && (
                                <Button 
                                  variant="secondary" 
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
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Progress</CardTitle>
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
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src="/placeholder.svg" />
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
                                <Badge variant={student.progress > 75 ? "success" : "outline"}>
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
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Teaching Analytics</CardTitle>
                <CardDescription>Performance metrics across your active courses</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="h-full w-full bg-muted/50 rounded-md animate-pulse flex items-center justify-center">
                      <BarChart className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  </div>
                ) : (
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <BarChart className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">
                        Interactive analytics visualization will appear here
                      </p>
                      <Button variant="outline" className="mt-4">
                        View Detailed Reports
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardContent className="p-0">
                <ChatInterface />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Teaching Analytics</CardTitle>
                <CardDescription>Comprehensive data about your teaching performance</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[400px] flex items-center justify-center">
                    <div className="h-full w-full bg-muted/50 rounded-md animate-pulse flex items-center justify-center">
                      <BarChart className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  </div>
                ) : (
                  <div className="h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <BarChart className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">
                        Detailed analytics will be displayed here
                      </p>
                      <div className="mt-4 flex gap-2 justify-center">
                        <Button variant="outline">Download Report</Button>
                        <Button>Generate Insights</Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TutorPage;
