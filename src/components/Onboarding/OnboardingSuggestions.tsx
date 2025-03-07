
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, CalendarIcon, Star, UserPlus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

export const tutorSuggestions = [
  {
    id: 't1',
    name: 'Dr. Emma Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    subjects: ['Mathematics', 'Computer Science'],
    rating: 4.9,
    bio: 'PhD in Applied Mathematics with 8+ years of teaching experience. Specializes in calculus, linear algebra, and algorithmic thinking.',
  },
  {
    id: 't2',
    name: 'Prof. Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    subjects: ['Physics', 'Engineering'],
    rating: 4.8,
    bio: 'Engineering professor with expertise in mechanics, thermodynamics, and electronics. Known for making complex concepts simple and relatable.',
  },
  {
    id: 't3',
    name: 'Sarah Williams',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    subjects: ['Literature', 'History'],
    rating: 4.7,
    bio: 'Published author and educator specializing in English literature, creative writing, and historical analysis. Passionate about nurturing critical thinking.',
  },
];

export const studentSuggestions = [
  {
    id: 's1',
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    interests: ['Mathematics', 'Physics'],
    grade: 'College Freshman',
    bio: 'Studying computer science and looking for help with advanced calculus and physics.',
  },
  {
    id: 's2',
    name: 'Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    interests: ['Biology', 'Chemistry'],
    grade: 'High School Senior',
    bio: 'Preparing for pre-med program and need assistance with organic chemistry and molecular biology.',
  },
  {
    id: 's3',
    name: 'Jordan Taylor',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    interests: ['History', 'Political Science'],
    grade: 'College Junior',
    bio: 'Political science major researching historical influences on modern governance systems.',
  },
];

interface OnboardingSuggestionsProps {
  open: boolean;
  onClose: () => void;
}

const OnboardingSuggestions = ({ open, onClose }: OnboardingSuggestionsProps) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>(currentUser?.role === 'tutor' ? 'students' : 'tutors');

  const handleConnect = (person: any) => {
    const name = person.name;
    
    // Depending on the user role and the type of connection
    if (currentUser?.role === 'tutor') {
      toast({
        title: "Connection request sent",
        description: `You'll be notified when ${name} responds to your request.`,
      });
    } else {
      toast({
        title: "Connection request sent",
        description: `You'll be notified when ${name} responds to your request.`,
      });
    }
  };

  const handleMessage = (person: any) => {
    // Store the selection in localStorage to redirect later
    localStorage.setItem('messageRedirect', JSON.stringify(person));
    
    if (currentUser?.role === 'tutor') {
      navigate('/tutors/messages');
    } else {
      navigate('/students/messages');
    }
    
    onClose();
  };

  const handleSchedule = (tutor: any) => {
    // Store the selection in localStorage to redirect later
    localStorage.setItem('scheduleRedirect', JSON.stringify(tutor));
    
    navigate('/students/calendar');
    onClose();
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to EdVix-Learniverse!</DialogTitle>
          <DialogDescription>
            Here are some suggested {currentUser?.role === 'tutor' ? 'students' : 'tutors'} you might want to connect with.
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-auto flex-grow py-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full mb-6">
              {currentUser?.role === 'tutor' ? (
                <>
                  <TabsTrigger value="students" className="flex-1">Suggested Students</TabsTrigger>
                  <TabsTrigger value="discover" className="flex-1">Discover More</TabsTrigger>
                </>
              ) : (
                <>
                  <TabsTrigger value="tutors" className="flex-1">Suggested Tutors</TabsTrigger>
                  <TabsTrigger value="discover" className="flex-1">Discover More</TabsTrigger>
                </>
              )}
            </TabsList>
            
            {currentUser?.role === 'tutor' ? (
              <>
                <TabsContent value="students" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {studentSuggestions.map((student, index) => (
                      <motion.div
                        key={student.id}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Card className="h-full flex flex-col">
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={student.avatar} alt={student.name} />
                                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-lg">{student.name}</CardTitle>
                                  <CardDescription>{student.grade}</CardDescription>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground mb-3">{student.bio}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {student.interests.map((interest) => (
                                <Badge key={interest} variant="outline">{interest}</Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="pt-2 flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleConnect(student)}
                            >
                              <UserPlus className="h-4 w-4 mr-1" />
                              Connect
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleMessage(student)}
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="discover">
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium mb-2">Discover More Students</h3>
                    <p className="text-muted-foreground mb-6">Browse all students based on subjects, grades, and learning needs.</p>
                    <Button 
                      variant="gradient" 
                      size="lg"
                      onClick={() => {
                        navigate('/tutors/students');
                        onClose();
                      }}
                    >
                      Browse All Students
                    </Button>
                  </div>
                </TabsContent>
              </>
            ) : (
              <>
                <TabsContent value="tutors" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tutorSuggestions.map((tutor, index) => (
                      <motion.div
                        key={tutor.id}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Card className="h-full flex flex-col">
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={tutor.avatar} alt={tutor.name} />
                                  <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-lg">{tutor.name}</CardTitle>
                                  <div className="flex items-center mt-1">
                                    {Array(5).fill(0).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${i < Math.floor(tutor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                      />
                                    ))}
                                    <span className="text-xs ml-1 text-muted-foreground">{tutor.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground mb-3">{tutor.bio}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {tutor.subjects.map((subject) => (
                                <Badge key={subject} variant="outline">{subject}</Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="pt-2 flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleMessage(tutor)}
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                            <Button 
                              variant="gradient" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleSchedule(tutor)}
                            >
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              Schedule
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="discover">
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium mb-2">Discover More Tutors</h3>
                    <p className="text-muted-foreground mb-6">Browse all tutors based on subjects, availability, and teaching styles.</p>
                    <Button 
                      variant="gradient" 
                      size="lg"
                      onClick={() => {
                        navigate('/students/tutors');
                        onClose();
                      }}
                    >
                      Browse All Tutors
                    </Button>
                  </div>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
        
        <DialogFooter className="flex-shrink-0 flex justify-between items-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onClose()}
          >
            Skip for now
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={() => {
              if (currentUser?.role === 'tutor') {
                navigate('/tutors');
              } else {
                navigate('/students');
              }
              onClose();
            }}
          >
            Go to Dashboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingSuggestions;
