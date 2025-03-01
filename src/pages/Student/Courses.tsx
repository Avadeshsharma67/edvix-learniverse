
import React from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const StudentCourses = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
  }, [isAuthenticated, currentUser, navigate]);

  // Mock enrolled courses
  const enrolledCourses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      instructor: 'Dr. Emily Johnson',
      progress: 65,
      nextClass: new Date(Date.now() + 86400000), // Tomorrow
      totalStudents: 24,
      status: 'active',
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      instructor: 'Dr. Michael Rodriguez',
      progress: 42,
      nextClass: new Date(Date.now() + 86400000 * 2), // 2 days from now
      totalStudents: 18,
      status: 'active',
    },
    {
      id: 3,
      title: 'English Literature',
      instructor: 'Dr. Sarah Williams',
      progress: 100,
      totalStudents: 30,
      status: 'completed',
    },
  ];

  // Mock available courses
  const availableCourses = [
    {
      id: 4,
      title: 'Introduction to Computer Science',
      instructor: 'Prof. James Chen',
      price: '$99',
      rating: 4.8,
      students: 253,
      level: 'Beginner',
    },
    {
      id: 5,
      title: 'Data Structures & Algorithms',
      instructor: 'Dr. Anna Lee',
      price: '$129',
      rating: 4.9,
      students: 178,
      level: 'Intermediate',
    },
    {
      id: 6,
      title: 'Creative Writing Workshop',
      instructor: 'Elizabeth Morgan',
      price: '$79',
      rating: 4.7,
      students: 124,
      level: 'All Levels',
    },
  ];

  return (
    <DashboardLayout title="Courses">
      <Tabs defaultValue="enrolled" className="space-y-4">
        <TabsList>
          <TabsTrigger value="enrolled">My Courses</TabsTrigger>
          <TabsTrigger value="available">Available Courses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrolled">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{course.title}</CardTitle>
                    <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                      {course.status === 'active' ? 'In Progress' : 'Completed'}
                    </Badge>
                  </div>
                  <CardDescription>Instructor: {course.instructor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.totalStudents} students</span>
                      </div>
                      
                      {course.status === 'active' && course.nextClass && (
                        <div>
                          Next class: {course.nextClass.toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    {course.status === 'active' ? 'Continue Learning' : 'View Certificate'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {enrolledCourses.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No courses yet</h3>
              <p className="text-muted-foreground mt-1">Browse available courses to get started</p>
              <Button className="mt-4" onClick={() => document.querySelector('[data-value="available"]')?.click()}>
                Explore Courses
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="available">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>Instructor: {course.instructor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Badge variant="outline">{course.level}</Badge>
                    
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.students} enrolled</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1 text-yellow-500" />
                        <span>{course.rating}/5</span>
                      </div>
                    </div>
                    
                    <div className="font-medium text-lg">{course.price}</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Preview</Button>
                  <Button>Enroll Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default StudentCourses;
