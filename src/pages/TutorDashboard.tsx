
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import AnimatedButton from '@/components/AnimatedButton';
import { BarChart, BookOpen, Calendar, Clock, GraduationCap, MessageSquare, Star, Users } from 'lucide-react';

const TutorDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and has the right role
    const user = localStorage.getItem('edvix_user');
    const userType = localStorage.getItem('edvix_user_type');
    
    if (!user) {
      navigate('/login');
    } else if (userType !== 'tutor') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
              <p className="text-muted-foreground">Manage your courses and students</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Badge className="bg-blue-500">Expert Level</Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> 4.9 Rating
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">Currently teaching</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78</div>
                <p className="text-xs text-muted-foreground">Total enrolled</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹24,650</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Teaching Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42.5</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { 
                    title: 'Machine Learning Basics', 
                    students: 28,
                    rating: 4.8,
                    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=240&auto=format&fit=crop',
                    lastUpdated: '2 days ago'
                  },
                  { 
                    title: 'Advanced Data Structures', 
                    students: 24,
                    rating: 4.9,
                    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=240&auto=format&fit=crop',
                    lastUpdated: '1 week ago'
                  },
                  { 
                    title: 'AI for Business Applications', 
                    students: 16,
                    rating: 5.0,
                    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=240&auto=format&fit=crop',
                    lastUpdated: 'Just now'
                  },
                  { 
                    title: 'Data Science with Python', 
                    students: 10,
                    rating: 4.7,
                    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=240&auto=format&fit=crop',
                    lastUpdated: '1 day ago'
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
                      <CardDescription className="flex justify-between">
                        <span>{course.students} students</span>
                        <span className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" /> 
                          {course.rating}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Last updated: {course.lastUpdated}</p>
                      <div className="flex mt-2 gap-2">
                        <Badge variant="outline">Active</Badge>
                        <Badge variant="secondary">{course.students} Enrolled</Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <AnimatedButton variant="accent" className="w-full" withArrow>
                        Manage Course
                      </AnimatedButton>
                    </CardFooter>
                  </Card>
                ))}
                
                <Card className="border-dashed border-2 flex flex-col items-center justify-center h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                      <BookOpen className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-center">Create New Course</CardTitle>
                    <CardDescription className="text-center">Share your knowledge with students</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <AnimatedButton variant="outline" withArrow>
                      Create Course
                    </AnimatedButton>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="schedule" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Classes</CardTitle>
                  <CardDescription>Your scheduled teaching sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { 
                        title: 'Machine Learning Live Session',
                        course: 'Machine Learning Basics',
                        date: 'Today',
                        time: '3:00 PM - 4:30 PM',
                        students: '28 students enrolled',
                        type: 'Live Class'
                      },
                      { 
                        title: '1:1 Student Mentoring',
                        course: 'Advanced Data Structures',
                        date: 'Tomorrow',
                        time: '10:00 AM - 10:30 AM',
                        students: 'With Rahul Sharma',
                        type: 'Mentoring'
                      },
                      { 
                        title: 'Office Hours',
                        course: 'AI for Business Applications',
                        date: 'Friday, May 15',
                        time: '2:30 PM - 4:30 PM',
                        students: 'Open to all students',
                        type: 'Office Hours'
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
                              <span className="text-xs">{session.students}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Badge variant={
                            session.type === 'Live Class' ? 'default' :
                            session.type === 'Mentoring' ? 'secondary' : 'outline'
                          }>
                            {session.type}
                          </Badge>
                          <AnimatedButton size="sm" variant={session.date === 'Today' ? 'accent' : 'outline'}>
                            {session.date === 'Today' ? 'Start Class' : 'Prepare'}
                          </AnimatedButton>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="students" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Students</CardTitle>
                  <CardDescription>Students enrolled in your courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { 
                        name: 'Amit Sharma',
                        email: 'amit.sharma@example.com',
                        course: 'Machine Learning Basics',
                        progress: 72,
                        joined: '3 months ago',
                        image: 'A'
                      },
                      { 
                        name: 'Priya Patel',
                        email: 'priya.patel@example.com',
                        course: 'Advanced Data Structures',
                        progress: 45,
                        joined: '2 weeks ago',
                        image: 'P'
                      },
                      { 
                        name: 'Rahul Sharma',
                        email: 'rahul.s@example.com',
                        course: 'AI for Business Applications',
                        progress: 89,
                        joined: '1 month ago',
                        image: 'R'
                      },
                      { 
                        name: 'Sneha Reddy',
                        email: 'sneha.r@example.com',
                        course: 'Data Science with Python',
                        progress: 96,
                        joined: '5 months ago',
                        image: 'S'
                      }
                    ].map((student, i) => (
                      <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b">
                        <div className="flex gap-4 items-start">
                          <Avatar>
                            <AvatarFallback>{student.image}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <BookOpen className="h-3 w-3" />
                              <span className="text-xs">Enrolled in: {student.course}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-3 w-3" />
                              <span className="text-xs">Joined: {student.joined}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs">Progress</span>
                            <span className="text-xs font-medium">{student.progress}%</span>
                          </div>
                          <Progress value={student.progress} className="h-2 w-32" />
                          <AnimatedButton size="sm" variant="outline" className="mt-2">
                            Message
                          </AnimatedButton>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Course Performance</CardTitle>
                    <CardDescription>Enrollment and engagement metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BarChart className="mx-auto h-12 w-12 opacity-50" />
                      <p>Analytics visualization would appear here</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Student Feedback</CardTitle>
                    <CardDescription>Recent reviews from students</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'Amit S.', rating: 5, comment: 'Excellent explanation of complex topics.' },
                        { name: 'Priya P.', rating: 4, comment: 'Very helpful course content and exercises.' },
                        { name: 'Rahul S.', rating: 5, comment: 'The best instructor I've had so far!' }
                      ].map((review, i) => (
                        <div key={i} className="pb-3 border-b last:border-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{review.name}</p>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>
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

export default TutorDashboard;
