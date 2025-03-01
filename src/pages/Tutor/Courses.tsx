
import React from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle, Book } from 'lucide-react';

const TutorCourses = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect if not authenticated or not a tutor
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (currentUser?.role !== 'tutor') {
      navigate('/students');
      return;
    }
  }, [isAuthenticated, currentUser, navigate]);

  // Mock course data
  const courses = [
    {
      id: 1,
      title: 'Introduction to Mathematics',
      description: 'Basic concepts of algebra, geometry, and calculus',
      studentsEnrolled: 12,
      startDate: '2023-01-15',
    },
    {
      id: 2,
      title: 'Advanced Physics',
      description: 'Classical mechanics, thermodynamics, and quantum physics',
      studentsEnrolled: 8,
      startDate: '2023-02-10',
    },
    {
      id: 3,
      title: 'Data Structures & Algorithms',
      description: 'Fundamental data structures and algorithmic techniques',
      studentsEnrolled: 15,
      startDate: '2023-03-05',
    },
  ];

  return (
    <DashboardLayout title="Courses">
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold">My Courses</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Course
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Book className="mr-2 h-5 w-5 text-primary" />
                {course.title}
              </CardTitle>
              <CardDescription>
                Started: {new Date(course.startDate).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{course.description}</p>
              <div className="text-sm text-muted-foreground">
                {course.studentsEnrolled} students enrolled
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm">
                  Manage Course
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default TutorCourses;
