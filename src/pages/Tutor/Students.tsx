
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Search, ArrowUpDown, MessageSquare, BarChart3, FileText, UserPlus, X, ChevronLeft, Mail } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  courses: {
    id: number;
    name: string;
    progress: number;
    grade?: string;
  }[];
  lastActive: string;
  status: 'active' | 'inactive';
  assignments: {
    id: number;
    title: string;
    course: string;
    dueDate: string;
    status: 'pending' | 'submitted' | 'graded';
    grade?: string;
  }[];
}

const TutorStudents = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const selectedStudentId = searchParams.get('id');
  
  const [students, setStudents] = useState<Student[]>([
    {
      id: 's1',
      name: 'Alex Thompson',
      email: 'alex@example.com',
      avatar: '/placeholder.svg',
      courses: [
        { id: 1, name: 'Advanced Mathematics', progress: 78, grade: 'A-' },
        { id: 3, name: 'Data Science Workshop', progress: 45 }
      ],
      lastActive: '2 hours ago',
      status: 'active',
      assignments: [
        { id: 1, title: 'Mathematical Models Research', course: 'Advanced Mathematics', dueDate: 'Tomorrow', status: 'pending' },
        { id: 4, title: 'Linear Algebra Problem Set', course: 'Advanced Mathematics', dueDate: 'Last week', status: 'graded', grade: 'A' }
      ]
    },
    {
      id: 's2',
      name: 'Jamie Wilson',
      email: 'jamie@example.com',
      avatar: '/placeholder.svg',
      courses: [
        { id: 2, name: 'Physics 101', progress: 62, grade: 'B+' }
      ],
      lastActive: '1 day ago',
      status: 'active',
      assignments: [
        { id: 2, title: 'Physics Lab Report', course: 'Physics 101', dueDate: 'Next week', status: 'submitted' }
      ]
    },
    {
      id: 's3',
      name: 'Taylor Smith',
      email: 'taylor@example.com',
      avatar: '/placeholder.svg',
      courses: [
        { id: 1, name: 'Advanced Mathematics', progress: 91, grade: 'A' },
        { id: 2, name: 'Physics 101', progress: 85, grade: 'A-' }
      ],
      lastActive: '4 hours ago',
      status: 'active',
      assignments: [
        { id: 5, title: 'Physics Experiment Analysis', course: 'Physics 101', dueDate: 'Yesterday', status: 'submitted' },
        { id: 6, title: 'Calculus Final Project', course: 'Advanced Mathematics', dueDate: '3 days ago', status: 'graded', grade: 'A' }
      ]
    },
    {
      id: 's4',
      name: 'Jordan Lee',
      email: 'jordan@example.com',
      avatar: '/placeholder.svg',
      courses: [
        { id: 3, name: 'Data Science Workshop', progress: 45 }
      ],
      lastActive: '3 days ago',
      status: 'inactive',
      assignments: [
        { id: 3, title: 'Data Analysis Project', course: 'Data Science Workshop', dueDate: 'Next month', status: 'pending' }
      ]
    }
  ]);

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

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return null;
    
    return (
      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
    );
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.courses.some(course => course.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (!sortColumn) return 0;

    let comparison = 0;
    
    switch (sortColumn) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'courses':
        comparison = a.courses.length - b.courses.length;
        break;
      case 'progress':
        const avgProgressA = a.courses.reduce((acc, course) => acc + course.progress, 0) / a.courses.length;
        const avgProgressB = b.courses.reduce((acc, course) => acc + course.progress, 0) / b.courses.length;
        comparison = avgProgressA - avgProgressB;
        break;
      case 'lastActive':
        // This is a simplistic comparison, in a real app you would use actual dates
        comparison = a.lastActive.localeCompare(b.lastActive);
        break;
      default:
        return 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const selectedStudent = students.find(student => student.id === selectedStudentId);

  const handleMessageStudent = (studentId: string) => {
    navigate('/tutors/messages');
    toast({
      title: "Chat opened",
      description: "You can now send a message to the student."
    });
  };
  
  const getAverageProgress = (student: Student) => {
    return Math.round(student.courses.reduce((acc, course) => acc + course.progress, 0) / student.courses.length);
  };

  return (
    <DashboardLayout title="Students">
      {selectedStudent ? (
        // Student Detail View
        <div className="space-y-6">
          <Button 
            variant="outline" 
            onClick={() => setSearchParams({})}
            className="mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to All Students
          </Button>
          
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="w-full md:w-1/3">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={selectedStudent.avatar} />
                    <AvatarFallback>
                      {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                  <p className="text-muted-foreground">{selectedStudent.email}</p>
                  <Badge 
                    variant={selectedStudent.status === 'active' ? 'default' : 'secondary'}
                    className="mt-2"
                  >
                    {selectedStudent.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-4">
                    Last active: {selectedStudent.lastActive}
                  </p>
                  
                  <div className="flex gap-2 mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => handleMessageStudent(selectedStudent.id)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button>
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Progress</CardTitle>
                  <CardDescription>
                    Student's progress across all enrolled courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {selectedStudent.courses.map(course => (
                      <div key={course.id} className="space-y-2">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{course.name}</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{course.progress}%</span>
                            {course.grade && (
                              <Badge variant="outline">{course.grade}</Badge>
                            )}
                          </div>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Assignments</CardTitle>
                  <CardDescription>
                    Current and past assignments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Grade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedStudent.assignments.map(assignment => (
                        <TableRow key={assignment.id}>
                          <TableCell className="font-medium">{assignment.title}</TableCell>
                          <TableCell>{assignment.course}</TableCell>
                          <TableCell>{assignment.dueDate}</TableCell>
                          <TableCell>
                            <Badge variant={
                              assignment.status === 'pending' ? 'outline' : 
                              assignment.status === 'submitted' ? 'secondary' : 
                              'default'
                            }>
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {assignment.grade ? assignment.grade : '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        // Students List View
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="relative w-full sm:w-64 md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Students</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                          Student {getSortIcon('name')}
                        </TableHead>
                        <TableHead onClick={() => handleSort('courses')} className="cursor-pointer">
                          Courses {getSortIcon('courses')}
                        </TableHead>
                        <TableHead onClick={() => handleSort('progress')} className="cursor-pointer">
                          Progress {getSortIcon('progress')}
                        </TableHead>
                        <TableHead onClick={() => handleSort('lastActive')} className="cursor-pointer">
                          Last Active {getSortIcon('lastActive')}
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedStudents.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No students found
                          </TableCell>
                        </TableRow>
                      ) : (
                        sortedStudents.map(student => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={student.avatar} />
                                  <AvatarFallback>
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{student.name}</div>
                                  <div className="text-sm text-muted-foreground">{student.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{student.courses.map(c => c.name).join(', ')}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={getAverageProgress(student)} className="h-2 w-24" />
                                <span className="text-sm">{getAverageProgress(student)}%</span>
                              </div>
                            </TableCell>
                            <TableCell>{student.lastActive}</TableCell>
                            <TableCell>
                              <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                                {student.status === 'active' ? 'Active' : 'Inactive'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => setSearchParams({ id: student.id })}
                                >
                                  <Search className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleMessageStudent(student.id)}
                                >
                                  <MessageSquare className="h-4 w-4" />
                                  <span className="sr-only">Message</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="active">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Courses</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedStudents
                        .filter(student => student.status === 'active')
                        .map(student => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={student.avatar} />
                                  <AvatarFallback>
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{student.name}</div>
                                  <div className="text-sm text-muted-foreground">{student.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{student.courses.map(c => c.name).join(', ')}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={getAverageProgress(student)} className="h-2 w-24" />
                                <span className="text-sm">{getAverageProgress(student)}%</span>
                              </div>
                            </TableCell>
                            <TableCell>{student.lastActive}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => setSearchParams({ id: student.id })}
                                >
                                  <Search className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleMessageStudent(student.id)}
                                >
                                  <MessageSquare className="h-4 w-4" />
                                  <span className="sr-only">Message</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="inactive">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Courses</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedStudents
                        .filter(student => student.status === 'inactive')
                        .map(student => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={student.avatar} />
                                  <AvatarFallback>
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{student.name}</div>
                                  <div className="text-sm text-muted-foreground">{student.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{student.courses.map(c => c.name).join(', ')}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={getAverageProgress(student)} className="h-2 w-24" />
                                <span className="text-sm">{getAverageProgress(student)}%</span>
                              </div>
                            </TableCell>
                            <TableCell>{student.lastActive}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => setSearchParams({ id: student.id })}
                                >
                                  <Search className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleMessageStudent(student.id)}
                                >
                                  <MessageSquare className="h-4 w-4" />
                                  <span className="sr-only">Message</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TutorStudents;
