
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MessageSquare, Book, Award, Calendar } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { students } from '@/contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

const StudentCard = ({ student, onMessageClick, onViewProfile }: any) => {
  const courses = student.courses || ['Mathematics 101', 'Physics 202', 'Computer Science 301'];
  const progress = student.progress || Math.floor(Math.random() * 100);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/10">
              <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{student.name}</CardTitle>
              <CardDescription>{student.level || 'Undergraduate'}</CardDescription>
            </div>
          </div>
          <Badge variant={progress > 75 ? "secondary" : progress > 50 ? "default" : "outline"}>
            {progress}% Progress
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Book className="h-4 w-4" />
            <span>Enrolled in {courses.length} courses</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {courses.map((course: string) => (
              <Badge key={course} variant="outline" className="bg-muted/50">
                {course}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onViewProfile(student)}
        >
          <Award className="mr-2 h-4 w-4" /> 
          Progress
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onMessageClick(student)}
        >
          <MessageSquare className="mr-2 h-4 w-4" /> 
          Message
        </Button>
      </CardFooter>
    </Card>
  );
};

const TutorStudents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [registeredStudents, setRegisteredStudents] = useState<any[]>([]);
  const { startNewConversation } = useChat();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch registered users
  useEffect(() => {
    // Get registered students from localStorage
    const fetchRegisteredStudents = () => {
      const registeredUsers = [];
      
      // Check locally stored users
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('currentUser')) {
          try {
            const userData = JSON.parse(localStorage.getItem(key) || '');
            if (userData && userData.role === 'student') {
              registeredUsers.push(userData);
            }
          } catch (error) {
            console.error('Error parsing user data:', error);
          }
        }
      }
      
      // Combine with predefined students to ensure we have students to display
      // Don't add duplicates
      const existingIds = new Set(registeredUsers.map(user => user.id));
      const combinedStudents = [
        ...registeredUsers,
        ...students.filter(student => !existingIds.has(student.id))
      ];
      
      setRegisteredStudents(combinedStudents);
    };

    fetchRegisteredStudents();
    
    // Set up listener for storage events to detect user changes
    const handleStorageChange = () => {
      fetchRegisteredStudents();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const handleMessageClick = (student: any) => {
    startNewConversation(student);
    toast({
      title: "Conversation started",
      description: `You can now chat with ${student.name}`,
    });
    navigate('/tutors/messages');
  };

  const handleViewProfile = (student: any) => {
    navigate(`/tutors/students/profile?id=${student.id}`);
  };

  // Enhance students with additional data
  const enhanceStudent = (student: any, index: number) => ({
    ...student,
    level: student.level || ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'][index % 5],
    courses: student.courses || [
      ['Mathematics 101', 'Physics 202', 'Computer Science 301'],
      ['English Literature', 'History 205', 'Psychology 101'],
      ['Biology 303', 'Chemistry 202', 'Lab Sciences 101'],
      ['Computer Science 101', 'Web Development', 'Data Structures'],
      ['Spanish 202', 'French 101', 'World Languages']
    ][index % 5],
    progress: student.progress || Math.floor(70 + Math.random() * 30),
    gpa: student.gpa || (3 + Math.random()).toFixed(2),
    lastActive: student.lastActive || new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000))
  });

  const enhancedStudents = registeredStudents.map((student, index) => 
    enhanceStudent(student, index)
  );

  // Filter students based on search query
  const filteredStudents = enhancedStudents.filter(
    (student) => student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="My Students">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search students..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Schedule</span>
            </Button>
            <Button className="flex-1 sm:flex-none gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Message All</span>
            </Button>
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No students found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search or adding new students
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onMessageClick={handleMessageClick}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TutorStudents;
