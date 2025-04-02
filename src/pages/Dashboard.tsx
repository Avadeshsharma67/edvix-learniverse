
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedButton from '@/components/AnimatedButton';
import { BarChart, BookOpen, Calendar, GraduationCap, Users } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem('edvix_user_type') || '';

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('edvix_user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleRoleSelection = (role: string) => {
    localStorage.setItem('edvix_user_type', role);
    navigate(`/dashboard/${role.toLowerCase()}`);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">EdVix Dashboard</h1>
          
          {!userType ? (
            <div className="text-center space-y-8">
              <h2 className="text-2xl">Select your role to continue</h2>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <Card className="w-full md:w-64 hover:shadow-xl transition-shadow duration-300 cursor-pointer" 
                      onClick={() => handleRoleSelection('student')}>
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="w-8 h-8 text-accent" />
                    </div>
                    <CardTitle>Student</CardTitle>
                    <CardDescription>Access your courses and track progress</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="w-full md:w-64 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                      onClick={() => handleRoleSelection('tutor')}>
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-secondary" />
                    </div>
                    <CardTitle>Tutor</CardTitle>
                    <CardDescription>Manage your courses and students</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">+1 from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Hours Studied</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">26.5</div>
                      <p className="text-xs text-muted-foreground">+4.5 from last week</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Assignments Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12/15</div>
                      <p className="text-xs text-muted-foreground">3 pending tasks</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Courses</CardTitle>
                    <CardDescription>Your enrolled courses and their progress.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['Machine Learning Basics', 'Web Development Bootcamp', 'Data Science with Python'].map((course, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-accent/10 rounded-md flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                              <p className="font-medium">{course}</p>
                              <p className="text-sm text-muted-foreground">Progress: {Math.floor(Math.random() * 100)}%</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Continue</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="calendar">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Sessions</CardTitle>
                    <CardDescription>Your scheduled classes and meetings.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: 'Machine Learning Live Session', date: 'Today, 3:00 PM', tutor: 'Dr. Alan Smith' },
                        { title: 'Group Study: JavaScript', date: 'Tomorrow, 10:00 AM', tutor: 'Peer Group' },
                        { title: '1:1 Mentoring Session', date: 'Friday, 2:30 PM', tutor: 'Jane Cooper' }
                      ].map((session, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-secondary/10 rounded-md flex items-center justify-center">
                              <Calendar className="w-5 h-5 text-secondary" />
                            </div>
                            <div>
                              <p className="font-medium">{session.title}</p>
                              <p className="text-sm text-muted-foreground">{session.date} • {session.tutor}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Join</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
