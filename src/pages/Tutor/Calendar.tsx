
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Clock, Users, CalendarIcon, PlusCircle } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'class' | 'office-hours' | 'meeting';
  participants: string[];
  description?: string;
}

const TutorCalendar = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Advanced Mathematics Class',
      date: new Date(),
      startTime: '14:30',
      endTime: '16:00',
      type: 'class',
      participants: ['All enrolled students'],
      description: 'Regular class session covering linear algebra.'
    },
    {
      id: '2',
      title: 'Office Hours',
      date: new Date(),
      startTime: '10:00',
      endTime: '12:00',
      type: 'office-hours',
      participants: ['Any student'],
      description: 'Drop-in hours for questions and consultations.'
    },
    {
      id: '3',
      title: 'Meeting with Alex Thompson',
      date: new Date(Date.now() + 86400000), // Tomorrow
      startTime: '13:00',
      endTime: '13:30',
      type: 'meeting',
      participants: ['Alex Thompson'],
      description: 'Discussion about the research project.'
    }
  ]);
  
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    title: '',
    date: new Date(),
    startTime: '',
    endTime: '',
    type: 'class',
    participants: [],
    description: ''
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAddEvent = () => {
    const id = Math.random().toString(36).substring(2, 11);
    const newEventWithId = { ...newEvent, id };
    setEvents([...events, newEventWithId]);
    setIsModalOpen(false);
    
    toast({
      title: "Event added",
      description: `${newEvent.title} has been added to your calendar.`,
    });
    
    // Reset form
    setNewEvent({
      title: '',
      date: new Date(),
      startTime: '',
      endTime: '',
      type: 'class',
      participants: [],
      description: ''
    });
  };

  const getEventsForSelectedDate = () => {
    if (!date) return [];
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const selectedDateEvents = getEventsForSelectedDate();

  return (
    <DashboardLayout title="Calendar">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Schedule</CardTitle>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>
                    Create a new event in your calendar
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input 
                      id="title" 
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      placeholder="Enter event title" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Date</Label>
                      <div className="border rounded-md p-2">
                        <Calendar
                          mode="single"
                          selected={newEvent.date}
                          onSelect={(date) => date && setNewEvent({...newEvent, date})}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="eventType">Event Type</Label>
                        <Select 
                          value={newEvent.type} 
                          onValueChange={(value: 'class' | 'office-hours' | 'meeting') => 
                            setNewEvent({...newEvent, type: value})
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="class">Class</SelectItem>
                            <SelectItem value="office-hours">Office Hours</SelectItem>
                            <SelectItem value="meeting">Meeting</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input 
                          id="startTime" 
                          type="time"
                          value={newEvent.startTime}
                          onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="endTime">End Time</Label>
                        <Input 
                          id="endTime" 
                          type="time"
                          value={newEvent.endTime}
                          onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="participants">Participants</Label>
                    <Input 
                      id="participants" 
                      placeholder="e.g., All students, Alex Thompson"
                      value={newEvent.participants.join(', ')}
                      onChange={(e) => setNewEvent({
                        ...newEvent, 
                        participants: e.target.value.split(',').map(p => p.trim()).filter(Boolean)
                      })}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Enter event details"
                      value={newEvent.description || ''}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddEvent}>Add Event</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="mx-auto"
              />
              
              <div>
                <h3 className="text-lg font-medium mb-4">
                  {date ? date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  }) : 'No date selected'}
                </h3>
                
                <div className="space-y-4">
                  {selectedDateEvents.length === 0 ? (
                    <p className="text-muted-foreground text-center py-6">
                      No events scheduled for this day
                    </p>
                  ) : (
                    selectedDateEvents.map(event => (
                      <div 
                        key={event.id} 
                        className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{event.title}</h4>
                          <Badge variant={
                            event.type === 'class' ? 'default' : 
                            event.type === 'office-hours' ? 'secondary' : 
                            'outline'
                          }>
                            {event.type === 'office-hours' ? 'Office Hours' : 
                             event.type === 'class' ? 'Class' : 'Meeting'}
                          </Badge>
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {event.startTime} - {event.endTime}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {event.participants.join(', ')}
                          </div>
                        </div>
                        {event.description && (
                          <p className="text-sm mt-2">{event.description}</p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-6">
                {events
                  .sort((a, b) => {
                    // First by date
                    const dateCompare = a.date.getTime() - b.date.getTime();
                    if (dateCompare !== 0) return dateCompare;
                    
                    // Then by start time if same date
                    return a.startTime.localeCompare(b.startTime);
                  })
                  .map(event => (
                    <div key={event.id} className="border-b pb-4 last:border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`h-3 w-3 rounded-full ${
                          event.type === 'class' ? 'bg-primary' : 
                          event.type === 'office-hours' ? 'bg-secondary' : 
                          'bg-muted-foreground'
                        }`} />
                        <h4 className="font-medium">{event.title}</h4>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {event.date.toLocaleDateString('en-US', { 
                          weekday: 'short',
                          month: 'short', 
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.startTime} - {event.endTime}
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TutorCalendar;
