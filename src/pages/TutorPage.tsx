
import React, { useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { ChatInterface } from '@/components/Chat/ChatInterface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, MessageSquare, BookOpen, Clock, Calendar, BarChart } from 'lucide-react';
import { useChat, tutors } from '@/contexts/ChatContext';
import { useToast } from '@/components/ui/use-toast';

const TutorPage = () => {
  const { setCurrentUser } = useChat();
  const { toast } = useToast();

  const upcomingClasses = [
    {
      id: 1,
      subject: 'Advanced Mathematics',
      time: 'Today, 2:30 PM',
      duration: '1h 30m',
      students: 12,
    },
    {
      id: 2,
      subject: 'Physics 101',
      time: 'Tomorrow, 10:00 AM',
      duration: '1h',
      students: 8,
    },
    {
      id: 3,
      subject: 'Data Science Workshop',
      time: 'Wed, June 15, 3:00 PM',
      duration: '2h',
      students: 15,
    },
  ];

  const recentStudents = [
    {
      id: 1,
      name: 'Alex Thompson',
      course: 'Advanced Mathematics',
      lastActivity: '2 hours ago',
      avatar: '/placeholder.svg',
    },
    {
      id: 2,
      name: 'Jamie Wilson',
      course: 'Physics 101',
      lastActivity: '3 hours ago',
      avatar: '/placeholder.svg',
    },
    {
      id: 3,
      name: 'Taylor Smith',
      course: 'Computer Science',
      lastActivity: 'Yesterday',
      avatar: '/placeholder.svg',
    },
    {
      id: 4,
      name: 'Jordan Lee',
      course: 'Data Science',
      lastActivity: 'Yesterday',
      avatar: '/placeholder.svg',
    },
  ];

  useEffect(() => {
    // Set current user as the first tutor (for demo)
    setCurrentUser(tutors[0]);
    
    // Show welcome toast
    toast({
      title: "Welcome back, Dr. Johnson!",
      description: "You have 3 upcoming classes and 2 unread messages.",
    });
  }, []);

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
          />
          <StatsCard 
            title="Active Courses" 
            value="8"
            icon={BookOpen}
          />
          <StatsCard 
            title="Hours Taught" 
            value="247"
            trend="up"
            trendValue="12% from last month"
            icon={Clock}
          />
          <StatsCard 
            title="Upcoming Classes" 
            value="3"
            description="Next: Today, 2:30 PM"
            icon={Calendar}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Classes</CardTitle>
                </CardHeader>
                <CardContent>
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
                          <div className="flex items-center bg-muted px-2 py-1 rounded-full text-xs">
                            <Users className="h-3 w-3 mr-1" />
                            {cls.students} students
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Student Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[240px]">
                    <div className="space-y-4">
                      {recentStudents.map((student) => (
                        <div key={student.id} className="flex items-center gap-3 border-b pb-3 last:border-0">
                          <Avatar>
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{student.name}</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <BookOpen className="mr-1 h-3 w-3" />
                              <span className="truncate">{student.course}</span>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {student.lastActivity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">Performance metrics will be displayed here</p>
                  </div>
                </div>
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
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">Analytics will be displayed here</p>
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

export default TutorPage;
