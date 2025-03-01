
import React from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const StudentCalendar = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

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

  // Mock upcoming sessions
  const upcomingSessions = [
    { 
      id: 1, 
      title: 'Calculus Tutoring', 
      tutor: 'Dr. Emily Johnson', 
      date: new Date(Date.now() + 86400000), // Tomorrow
      duration: 60 
    },
    { 
      id: 2, 
      title: 'Physics Problem Solving', 
      tutor: 'Dr. Michael Rodriguez', 
      date: new Date(Date.now() + 86400000 * 3), // 3 days from now
      duration: 90 
    },
  ];

  const handleBookSession = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
      title: "Session Booked",
      description: "Your tutoring session has been scheduled. Check your email for confirmation.",
    });
  };

  return (
    <DashboardLayout title="Calendar">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Session Calendar</CardTitle>
              <CardDescription>View and manage your tutoring schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <div className="mt-6">
                <h3 className="font-medium mb-2">Sessions on {date?.toLocaleDateString()}</h3>
                {upcomingSessions.filter(session => 
                  session.date.toDateString() === date?.toDateString()
                ).length > 0 ? (
                  <div className="space-y-2">
                    {upcomingSessions
                      .filter(session => session.date.toDateString() === date?.toDateString())
                      .map(session => (
                        <div key={session.id} className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <p className="font-medium">{session.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {session.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {session.duration} min
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm">Join</Button>
                            <Button size="sm" variant="outline">Reschedule</Button>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <p className="text-muted-foreground">No sessions scheduled for this day</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Your scheduled tutoring sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                  {upcomingSessions.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingSessions.map((session) => (
                        <div key={session.id} className="rounded-lg border p-3">
                          <h4 className="font-medium">{session.title}</h4>
                          <p className="text-sm text-muted-foreground">with {session.tutor}</p>
                          <p className="text-sm">
                            {session.date.toLocaleDateString()} at {session.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                          <p className="text-sm">{session.duration} minutes</p>
                          <div className="mt-2 flex justify-end space-x-2">
                            <Button size="sm" variant="outline">Cancel</Button>
                            <Button size="sm">Join</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">No upcoming sessions</p>
                  )}
                </TabsContent>
                <TabsContent value="past">
                  <p className="text-center text-muted-foreground">No past sessions</p>
                </TabsContent>
              </Tabs>
              
              <div className="mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Book New Session</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Book a Tutoring Session</DialogTitle>
                      <DialogDescription>
                        Choose a tutor, date, and time for your session
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleBookSession}>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="tutor">Select Tutor</Label>
                          <select 
                            id="tutor"
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                          >
                            <option value="1">Dr. Emily Johnson - Mathematics</option>
                            <option value="2">Dr. Michael Rodriguez - Physics</option>
                            <option value="3">Dr. Sarah Williams - Literature</option>
                          </select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input id="subject" placeholder="e.g. Calculus Help, Essay Review" />
                        </div>
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
                          <Label htmlFor="duration">Duration (minutes)</Label>
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
                          <Label htmlFor="notes">Session Notes (optional)</Label>
                          <textarea 
                            id="notes"
                            className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            placeholder="Tell your tutor what you need help with..."
                          ></textarea>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Book Session</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentCalendar;
