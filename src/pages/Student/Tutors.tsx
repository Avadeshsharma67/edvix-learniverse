
import React from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, MessageCircle, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const StudentTutors = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  // Mock tutors data
  const tutors = [
    {
      id: 1,
      name: 'Dr. Emily Johnson',
      avatar: '/placeholder.svg',
      specialization: 'Mathematics',
      subjects: ['Calculus', 'Algebra', 'Statistics'],
      rating: 4.9,
      reviews: 128,
      price: '$45/hour',
      availability: 'Mon-Fri, 2PM-8PM',
      bio: 'Mathematics professor with 10+ years of experience teaching algebra, calculus, and geometry to students of all levels.',
    },
    {
      id: 2,
      name: 'Dr. Michael Rodriguez',
      avatar: '/placeholder.svg',
      specialization: 'Physics',
      subjects: ['Mechanics', 'Thermodynamics', 'Quantum Physics'],
      rating: 4.8,
      reviews: 97,
      price: '$50/hour',
      availability: 'Tue-Sat, 10AM-6PM',
      bio: 'Physics PhD with extensive experience helping students understand complex concepts in classical and modern physics.',
    },
    {
      id: 3,
      name: 'Dr. Sarah Williams',
      avatar: '/placeholder.svg',
      specialization: 'Literature',
      subjects: ['Essay Writing', 'Literary Analysis', 'Creative Writing'],
      rating: 4.7,
      reviews: 85,
      price: '$40/hour',
      availability: 'Mon-Thu, 3PM-9PM',
      bio: 'English Literature professor specializing in essay development, critical reading skills, and creative writing techniques.',
    },
  ];

  const handleBookSession = (tutorId: number) => {
    toast({
      title: "Session Requested",
      description: "Your tutoring session request has been sent.",
    });
  };

  const handleMessageTutor = (tutorId: number) => {
    navigate('/students/messages');
  };

  return (
    <DashboardLayout title="Tutors">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Find a Tutor</h2>
            <p className="text-muted-foreground">Connect with expert tutors in your subject area</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-5 h-5 my-auto text-muted-foreground left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Input
                type="text"
                placeholder="Search by name or subject..."
                className="pl-10 w-full sm:w-64"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <Card key={tutor.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={tutor.avatar} alt={tutor.name} />
                      <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{tutor.name}</CardTitle>
                      <CardDescription>{tutor.specialization}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{tutor.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {tutor.subjects.map((subject, index) => (
                    <Badge key={index} variant="outline" className="font-normal">
                      {subject}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-sm line-clamp-3">{tutor.bio}</p>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{tutor.price}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{tutor.reviews} reviews</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => handleMessageTutor(tutor.id)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Session
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Book a Session with {tutor.name}</DialogTitle>
                      <DialogDescription>
                        Fill out the details to request a tutoring session
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="date">Date</Label>
                          <Input id="date" type="date" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="time">Time</Label>
                          <Input id="time" type="time" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="duration">Duration</Label>
                        <select 
                          id="duration"
                          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        >
                          <option value="30">30 minutes</option>
                          <option value="60" selected>60 minutes</option>
                          <option value="90">90 minutes</option>
                          <option value="120">120 minutes</option>
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="topic">Topic/Subject</Label>
                        <Input id="topic" placeholder="e.g. Calculus help, Essay review" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="message">Message for tutor</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Describe what you need help with..."
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => handleBookSession(tutor.id)}>Request Session</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentTutors;
