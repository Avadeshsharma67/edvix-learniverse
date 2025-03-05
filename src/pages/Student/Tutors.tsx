
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MessageSquare, Calendar, Star, Info } from 'lucide-react';
import { tutors } from '@/contexts/ChatContext';
import { useChat } from '@/contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';

const TutorCard = ({ tutor, onMessageClick, onViewProfile }: any) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/10">
              <AvatarImage src={tutor.avatar || "/placeholder.svg"} alt={tutor.name} />
              <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{tutor.name}</CardTitle>
              <CardDescription>
                {tutor.specialty || 'Mathematics & Physics'}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < (tutor.rating || 4)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {tutor.bio || 'Experienced tutor specializing in helping students master complex concepts through personalized learning approaches.'}
        </p>
        <div className="flex flex-wrap gap-1 mt-3">
          {(tutor.subjects || ['Mathematics', 'Physics', 'Computer Science']).map(
            (subject: string) => (
              <Badge key={subject} variant="outline" className="bg-muted/50">
                {subject}
              </Badge>
            )
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => onViewProfile(tutor)}
        >
          <Info className="mr-2 h-4 w-4" />
          Profile
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => onMessageClick(tutor)}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Message
        </Button>
      </CardFooter>
    </Card>
  );
};

const StudentTutors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTutor, setSelectedTutor] = useState<any>(null);
  const [registeredTutors, setRegisteredTutors] = useState<any[]>([]);
  const { startNewConversation } = useChat();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch registered users
  useEffect(() => {
    // Get registered tutors from localStorage
    const fetchRegisteredTutors = () => {
      const registeredUsers = [];
      // Check locally stored users
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('currentUser')) {
          try {
            const userData = JSON.parse(localStorage.getItem(key) || '');
            if (userData && userData.role === 'tutor') {
              registeredUsers.push(userData);
            }
          } catch (error) {
            console.error('Error parsing user data:', error);
          }
        }
      }
      
      // Combine with predefined tutors to ensure we have tutors to display
      // Don't add duplicates
      const existingIds = new Set(registeredUsers.map(user => user.id));
      const combinedTutors = [
        ...registeredUsers,
        ...tutors.filter(tutor => !existingIds.has(tutor.id))
      ];
      
      setRegisteredTutors(combinedTutors);
    };

    fetchRegisteredTutors();
    
    // Set up listener for storage events to detect user changes
    const handleStorageChange = () => {
      fetchRegisteredTutors();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleMessageClick = (tutor: any) => {
    startNewConversation(tutor);
    toast({
      title: "Conversation started",
      description: `You can now chat with ${tutor.name}`,
    });
    navigate('/students/messages');
  };

  const handleViewProfile = (tutor: any) => {
    setSelectedTutor(tutor);
  };

  // Add more details to tutors for display
  const enhanceTutor = (tutor: any, index: number) => ({
    ...tutor,
    rating: 4 + (index % 2 ? 0.5 : 0),
    specialty: tutor.specialty || ['Mathematics & Physics', 'Literature & History', 'Computer Science', 'Biology & Chemistry', 'Languages'][index % 5],
    subjects: tutor.subjects || [
      ['Mathematics', 'Physics', 'Calculus'],
      ['Literature', 'History', 'Essay Writing'],
      ['Computer Science', 'Programming', 'Web Development'],
      ['Biology', 'Chemistry', 'Lab Sciences'],
      ['Spanish', 'French', 'ESL']
    ][index % 5],
    bio: tutor.bio || [
      'Experienced tutor with a PhD in Physics, specializing in making complex concepts accessible to students of all levels.',
      'Passionate about literature and history with 10+ years of teaching experience. Focus on critical thinking and analytical skills.',
      'Software engineer and educator helping students master programming concepts and build real-world projects.',
      'Biology researcher with a talent for explaining scientific concepts clearly. Specializing in pre-med preparation.',
      'Multilingual educator with expertise in language acquisition and cultural context. Personalized lesson plans for all levels.'
    ][index % 5],
    availability: tutor.availability || ['Weekdays evenings', 'Weekends', 'Flexible schedule', 'Mornings only', 'Afternoons and evenings'][index % 5],
    education: tutor.education || ['PhD, MIT', 'Masters, Stanford', 'PhD, Berkeley', 'Masters, Harvard', 'PhD, Oxford'][index % 5]
  });

  const enhancedTutors = registeredTutors.map((tutor, index) => enhanceTutor(tutor, index));

  const filteredTutors = enhancedTutors.filter((tutor) =>
    tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (tutor.specialty && tutor.specialty.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (tutor.subjects && tutor.subjects.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <DashboardLayout title="Find Tutors">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, subject, or specialty..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none">
              Filter
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none">
              Sort
            </Button>
          </div>
        </div>

        {filteredTutors.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No tutors found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map((tutor) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                onMessageClick={handleMessageClick}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>
        )}

        <Dialog open={!!selectedTutor} onOpenChange={() => setSelectedTutor(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Tutor Profile</DialogTitle>
              <DialogDescription>View tutor details and availability</DialogDescription>
            </DialogHeader>
            
            {selectedTutor && (
              <div className="space-y-4 mt-2">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary/10">
                    <AvatarImage src={selectedTutor.avatar || "/placeholder.svg"} alt={selectedTutor.name} />
                    <AvatarFallback>{selectedTutor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="text-xl font-bold">{selectedTutor.name}</h3>
                    <p className="text-muted-foreground">{selectedTutor.specialty}</p>
                    <div className="flex items-center mt-1">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < selectedTutor.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      <span className="ml-1 text-sm text-muted-foreground">
                        ({selectedTutor.rating}/5)
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">About</h4>
                  <p className="text-sm text-muted-foreground">{selectedTutor.bio}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Education</h4>
                  <p className="text-sm text-muted-foreground">{selectedTutor.education}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Subjects</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedTutor.subjects && selectedTutor.subjects.map((subject: string) => (
                      <Badge key={subject} variant="outline">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Availability</h4>
                  <p className="text-sm text-muted-foreground">{selectedTutor.availability}</p>
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      handleMessageClick(selectedTutor);
                      setSelectedTutor(null);
                    }}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      navigate('/students/calendar');
                      setSelectedTutor(null);
                    }}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default StudentTutors;
