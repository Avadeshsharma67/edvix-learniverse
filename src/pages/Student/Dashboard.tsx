
import React from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, GraduationCap, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Redirect if not authenticated or not a student
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (currentUser?.role !== 'student') {
      navigate('/tutors');
      return;
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, currentUser, navigate]);

  // Mock upcoming sessions
  const upcomingSessions = [
    { 
      id: 1, 
      title: 'Calculus Tutoring', 
      tutor: 'Dr. Emily Johnson', 
      date: new Date(Date.now() + 86400000), // Tomorrow
      duration: 60 
    },
    { 
      id: 2, 
      title: 'Physics Problem Solving', 
      tutor: 'Dr. Michael Rodriguez', 
      date: new Date(Date.now() + 86400000 * 3), // 3 days from now
      duration: 90 
    },
  ];

  // Mock assignments
  const assignments = [
    { 
      id: 1, 
      title: 'Calculus Practice Set', 
      course: 'Advanced Mathematics', 
      dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
      status: 'in-progress' 
    },
    { 
      id: 2, 
      title: 'Physics Lab Report', 
      course: 'Advanced Physics', 
      dueDate: new Date(Date.now() + 86400000 * 5), // 5 days from now
      status: 'not-started' 
    },
    { 
      id: 3, 
      title: 'Literature Essay', 
      course: 'English Literature', 
      dueDate: new Date(Date.now() - 86400000), // Yesterday
      status: 'completed' 
    },
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Enrolled Courses" 
          value="3" 
          icon={BookOpen}
          isLoading={isLoading}
        />
        <StatsCard 
          title="Study Hours" 
          value="24h" 
          trend="up" 
          trendValue="12%" 
          icon={Clock}
          isLoading={isLoading}
        />
        <StatsCard 
          title="Assignments" 
          value="5" 
          trend="up" 
          trendValue="2 new" 
          icon={GraduationCap}
          isLoading={isLoading}
        />
        <StatsCard 
          title="Upcoming Sessions" 
          value="2" 
          description="Next: Tomorrow at 3PM" 
          icon={Calendar}
          isLoading={isLoading}
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled tutoring sessions</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <h4 className="font-medium">{session.title}</h4>
                      <p className="text-sm text-muted-foreground">with {session.tutor}</p>
                      <p className="text-sm">
                        {session.date.toLocaleDateString()} at {session.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        {' • '}{session.duration} minutes
                      </p>
                    </div>
                    <Button size="sm">Join</Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">No upcoming sessions</p>
            )}
            <div className="mt-4 flex justify-center">
              <Button variant="outline" onClick={() => navigate('/students/calendar')}>
                View Calendar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
            <CardDescription>Track your course assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming">
                {assignments.filter(a => a.status !== 'completed').length > 0 ? (
                  <div className="space-y-4">
                    {assignments
                      .filter(a => a.status !== 'completed')
                      .map((assignment) => (
                        <div key={assignment.id} className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                            <h4 className="font-medium">{assignment.title}</h4>
                            <p className="text-sm text-muted-foreground">{assignment.course}</p>
                            <p className="text-sm">
                              Due: {assignment.dueDate.toLocaleDateString()}
                              {assignment.dueDate < new Date() && (
                                <span className="text-destructive"> (Overdue)</span>
                              )}
                            </p>
                          </div>
                          <Button 
                            variant={assignment.status === 'in-progress' ? 'outline' : 'default'} 
                            size="sm"
                          >
                            {assignment.status === 'in-progress' ? 'Continue' : 'Start'}
                          </Button>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">No upcoming assignments</p>
                )}
              </TabsContent>
              <TabsContent value="completed">
                {assignments.filter(a => a.status === 'completed').length > 0 ? (
                  <div className="space-y-4">
                    {assignments
                      .filter(a => a.status === 'completed')
                      .map((assignment) => (
                        <div key={assignment.id} className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                            <h4 className="font-medium">{assignment.title}</h4>
                            <p className="text-sm text-muted-foreground">{assignment.course}</p>
                            <p className="text-sm">Completed on {assignment.dueDate.toLocaleDateString()}</p>
                          </div>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">No completed assignments</p>
                )}
              </TabsContent>
            </Tabs>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" onClick={() => navigate('/students/assignments')}>
                View All Assignments
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
