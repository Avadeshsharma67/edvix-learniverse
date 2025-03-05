
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  PlusCircle, 
  Book, 
  Users, 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  Edit,
  Trash2,
  CheckCircle,
  Eye
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TutorCourses = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      status: 'active',
      progress: 75,
      image: 'https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?q=80&w=100&auto=format&fit=crop',
      nextSession: 'Today, 2:30 PM',
    },
    {
      id: 2,
      title: 'Advanced Physics',
      description: 'Classical mechanics, thermodynamics, and quantum physics',
      studentsEnrolled: 8,
      startDate: '2023-02-10',
      status: 'active',
      progress: 45,
      image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=100&auto=format&fit=crop',
      nextSession: 'Tomorrow, 10:00 AM',
    },
    {
      id: 3,
      title: 'Data Structures & Algorithms',
      description: 'Fundamental data structures and algorithmic techniques',
      studentsEnrolled: 15,
      startDate: '2023-03-05',
      status: 'active',
      progress: 60,
      image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=100&auto=format&fit=crop',
      nextSession: 'Wed, June 15, 3:00 PM',
    },
    {
      id: 4,
      title: 'Web Development Fundamentals',
      description: 'HTML, CSS, JavaScript, and responsive design principles',
      studentsEnrolled: 20,
      startDate: '2023-04-10',
      status: 'draft',
      progress: 0,
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=100&auto=format&fit=crop',
      nextSession: null,
    },
    {
      id: 5,
      title: 'Machine Learning Basics',
      description: 'Introduction to machine learning algorithms and applications',
      studentsEnrolled: 0,
      startDate: '2023-05-15',
      status: 'draft',
      progress: 0,
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=100&auto=format&fit=crop',
      nextSession: null,
    }
  ];

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCourses = filteredCourses.filter(course => course.status === 'active');
  const draftCourses = filteredCourses.filter(course => course.status === 'draft');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality is already implemented with the filter above
  };

  return (
    <DashboardLayout title="Courses">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold">My Courses</h2>
            <p className="text-muted-foreground">Manage and monitor your courses</p>
          </div>
          
          <div className="flex gap-3">
            <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-8 w-full md:w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Course
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Course</DialogTitle>
                  <DialogDescription>
                    Fill in the course details to create a new course.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="course-title" className="text-sm font-medium">Course Title</label>
                    <Input id="course-title" placeholder="Enter course title" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="course-desc" className="text-sm font-medium">Description</label>
                    <Input id="course-desc" placeholder="Enter course description" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="start-date" className="text-sm font-medium">Start Date</label>
                    <Input id="start-date" type="date" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {}}>Cancel</Button>
                  <Button onClick={() => {}}>Create Course</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="active" className="mb-8">
          <TabsList>
            <TabsTrigger value="active" className="relative">
              Active Courses
              {activeCourses.length > 0 && (
                <Badge variant="secondary" className="ml-2 absolute -right-2 -top-2">
                  {activeCourses.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="drafts" className="relative">
              Draft Courses
              {draftCourses.length > 0 && (
                <Badge variant="secondary" className="ml-2 absolute -right-2 -top-2">
                  {draftCourses.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden border group hover:shadow-md transition-all">
                  <div className="h-36 overflow-hidden relative">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <Badge className="bg-green-500 hover:bg-green-600 mb-2">Active</Badge>
                        <h3 className="font-bold text-lg line-clamp-1">{course.title}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(course.startDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        {course.studentsEnrolled} students
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>Course progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    {course.nextSession && (
                      <div className="mt-3 flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Next: {course.nextSession}</span>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0 flex justify-between gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="drafts">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {draftCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden border group hover:shadow-md transition-all">
                  <div className="h-36 overflow-hidden relative">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <Badge variant="outline" className="bg-muted/30 hover:bg-muted/40 text-white mb-2">Draft</Badge>
                        <h3 className="font-bold text-lg line-clamp-1">{course.title}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(course.startDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Book className="h-4 w-4 mr-1" />
                        Draft
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0 flex justify-between gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="default" size="sm" className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Publish
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="flex flex-col items-center justify-center border-dashed border-2 h-80">
                <div className="p-6 text-center">
                  <div className="mb-4 rounded-full bg-muted p-4 inline-block">
                    <PlusCircle className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Create New Course</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start building your next course by clicking below
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Create Course</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Create New Course</DialogTitle>
                        <DialogDescription>
                          Fill in the course details to create a new course.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <label htmlFor="course-title-2" className="text-sm font-medium">Course Title</label>
                          <Input id="course-title-2" placeholder="Enter course title" />
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="course-desc-2" className="text-sm font-medium">Description</label>
                          <Input id="course-desc-2" placeholder="Enter course description" />
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="start-date-2" className="text-sm font-medium">Start Date</label>
                          <Input id="start-date-2" type="date" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => {}}>Cancel</Button>
                        <Button onClick={() => {}}>Create Course</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TutorCourses;
