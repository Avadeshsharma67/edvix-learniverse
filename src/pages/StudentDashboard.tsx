
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import AnimatedButton from '@/components/AnimatedButton';
import { BarChart, BookOpen, Calendar, Clock, GraduationCap, Medal, MessageSquare, Star, Users } from 'lucide-react';

const StudentDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and has the right role
    const user = localStorage.getItem('edvix_user');
    const userType = localStorage.getItem('edvix_user_type');
    
    if (!user) {
      navigate('/login');
    } else if (userType !== 'student') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Student Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Continue your learning journey.</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Badge className="bg-blue-500">Level 7</Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> 650 XP
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">In progress</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">26.5</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Earned</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">On assignments</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { 
                    title: 'Machine Learning Basics', 
                    instructor: 'Dr. Alan Smith',
                    progress: 65,
                    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=240&auto=format&fit=crop',
                    nextLesson: 'Neural Networks Introduction'
                  },
                  { 
                    title: 'Web Development Bootcamp', 
                    instructor: 'Jane Cooper',
                    progress: 32,
                    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=240&auto=format&fit=crop',
                    nextLesson: 'Advanced CSS Layouts'
                  },
                  { 
                    title: 'Data Science with Python', 
                    instructor: 'Robert Johnson',
                    progress: 89,
                    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=240&auto=format&fit=crop',
                    nextLesson: 'Final Project'
                  }
                ].map((course, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105" 
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>Instructor: {course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">Next lesson:</p>
                        <p className="text-sm font-medium">{course.nextLesson}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <AnimatedButton variant="accent" className="w-full" withArrow>
                        Continue Learning
                      </AnimatedButton>
                    </CardFooter>
                  </Card>
                ))}
                
                <Card className="border-dashed border-2 flex flex-col items-center justify-center h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                      <BookOpen className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-center">Discover More</CardTitle>
                    <CardDescription className="text-center">Explore our course catalog</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <AnimatedButton variant="outline" to="/marketplace" asLink withArrow>
                      Browse Courses
                    </AnimatedButton>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="schedule" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled classes and meetings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { 
                        title: 'Machine Learning Live Session',
                        course: 'Machine Learning Basics',
                        date: 'Today',
                        time: '3:00 PM - 4:30 PM',
                        tutor: 'Dr. Alan Smith',
                        type: 'Live Class'
                      },
                      { 
                        title: 'Group Study: JavaScript Fundamentals',
                        course: 'Web Development Bootcamp',
                        date: 'Tomorrow',
                        time: '10:00 AM - 12:00 PM',
                        tutor: 'Peer Group',
                        type: 'Group Study'
                      },
                      { 
                        title: '1:1 Mentoring Session',
                        course: 'Career Development',
                        date: 'Friday, May 15',
                        time: '2:30 PM - 3:30 PM',
                        tutor: 'Jane Cooper',
                        type: 'Mentoring'
                      }
                    ].map((session, i) => (
                      <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b">
                        <div className="flex gap-4 items-start">
                          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                            <Calendar className="h-6 w-6 text-secondary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{session.title}</h4>
                            <p className="text-sm text-muted-foreground">{session.course}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-3 w-3" />
                              <span className="text-xs">{session.date}, {session.time}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Users className="h-3 w-3" />
                              <span className="text-xs">With {session.tutor}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Badge variant={
                            session.type === 'Live Class' ? 'default' :
                            session.type === 'Group Study' ? 'secondary' : 'outline'
                          }>
                            {session.type}
                          </Badge>
                          <AnimatedButton size="sm" variant={session.date === 'Today' ? 'accent' : 'outline'}>
                            {session.date === 'Today' ? 'Join Now' : 'Add to Calendar'}
                          </AnimatedButton>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="assignments" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Assignments</CardTitle>
                  <CardDescription>Track your progress on course assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { 
                        title: 'Machine Learning Model Implementation',
                        course: 'Machine Learning Basics',
                        due: 'Tomorrow',
                        status: 'In Progress',
                        completion: 60
                      },
                      { 
                        title: 'Responsive Website Project',
                        course: 'Web Development Bootcamp',
                        due: '3 days left',
                        status: 'Not Started',
                        completion: 0
                      },
                      { 
                        title: 'Data Analysis Report',
                        course: 'Data Science with Python',
                        due: '5 days left',
                        status: 'In Progress',
                        completion: 25
                      },
                      { 
                        title: 'Neural Networks Quiz',
                        course: 'Machine Learning Basics',
                        due: 'Completed',
                        status: 'Graded: 92%',
                        completion: 100
                      }
                    ].map((assignment, i) => (
                      <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b">
                        <div className="flex gap-4 items-start">
                          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                            <BookOpen className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{assignment.title}</h4>
                            <p className="text-sm text-muted-foreground">{assignment.course}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-3 w-3" />
                              <span className="text-xs">Due: {assignment.due}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {assignment.completion === 100 ? (
                                <Badge className="bg-green-500">{assignment.status}</Badge>
                              ) : (
                                <Badge variant={assignment.status === 'In Progress' ? 'secondary' : 'outline'}>
                                  {assignment.status}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div>
                          {assignment.completion < 100 ? (
                            <AnimatedButton size="sm" variant={assignment.due === 'Tomorrow' ? 'accent' : 'outline'}>
                              {assignment.completion > 0 ? 'Continue' : 'Start Assignment'}
                            </AnimatedButton>
                          ) : (
                            <AnimatedButton size="sm" variant="outline">View Feedback</AnimatedButton>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Learning Progress</CardTitle>
                    <CardDescription>Your weekly learning activity</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BarChart className="mx-auto h-12 w-12 opacity-50" />
                      <p>Progress chart visualization would appear here</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>Your earned badges and rewards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'Perfect Attendance', description: 'Attended 7 classes in a row', icon: <Medal className="h-5 w-5 text-yellow-500" /> },
                        { name: 'Fast Learner', description: 'Completed 3 modules ahead of schedule', icon: <Clock className="h-5 w-5 text-blue-500" /> },
                        { name: 'Helpful Peer', description: 'Answered 15 questions in the forum', icon: <MessageSquare className="h-5 w-5 text-green-500" /> }
                      ].map((achievement, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                            {achievement.icon}
                          </div>
                          <div>
                            <p className="font-medium">{achievement.name}</p>
                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentDashboard;
