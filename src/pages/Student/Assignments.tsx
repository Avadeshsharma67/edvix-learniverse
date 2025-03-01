
import React from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface Assignment {
  id: number;
  title: string;
  course: string;
  courseId: number;
  dueDate: string;
  status: string;
  submittedDate?: string;
  grade?: string;
  feedback?: string;
}

const StudentAssignments = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [assignments, setAssignments] = React.useState<Assignment[]>([
    { id: 1, title: 'Calculus Problem Set', course: 'Advanced Mathematics', courseId: 1, dueDate: '2023-05-20', status: 'pending' },
    { id: 2, title: 'Physics Lab Report', course: 'Physics Fundamentals', courseId: 2, dueDate: '2023-05-18', status: 'pending' },
    { id: 3, title: 'Literary Analysis Essay', course: 'English Literature', courseId: 3, dueDate: '2023-05-15', status: 'submitted', submittedDate: '2023-05-14' },
    { id: 4, title: 'Midterm Assignment', course: 'Advanced Mathematics', courseId: 1, dueDate: '2023-04-10', status: 'graded', submittedDate: '2023-04-09', grade: 'A', feedback: 'Excellent work on the complex integration problems.' },
    { id: 5, title: 'Research Project Outline', course: 'Physics Fundamentals', courseId: 2, dueDate: '2023-04-05', status: 'graded', submittedDate: '2023-04-04', grade: 'B+', feedback: 'Good start, but needs more detail on the methodology section.' },
  ]);
  const [selectedAssignment, setSelectedAssignment] = React.useState<Assignment | null>(null);
  const [submissionText, setSubmissionText] = React.useState('');

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

  const handleSubmit = () => {
    if (!selectedAssignment) return;
    
    // Update the assignment status to submitted
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === selectedAssignment.id 
          ? { 
              ...assignment, 
              status: 'submitted',
              submittedDate: new Date().toISOString().split('T')[0]
            } 
          : assignment
      )
    );
    
    toast({
      title: "Assignment Submitted",
      description: "Your assignment has been submitted successfully.",
    });
    
    setSubmissionText('');
    setSelectedAssignment(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'submitted':
        return <Badge>Submitted</Badge>;
      case 'graded':
        return <Badge variant="secondary">Graded</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && status === 'pending';
  };

  return (
    <DashboardLayout title="Assignments">
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Assignments</CardTitle>
              <CardDescription>
                Assignments that require your attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              {assignments.filter(a => a.status === 'pending').length > 0 ? (
                <div className="space-y-4">
                  {assignments
                    .filter(a => a.status === 'pending')
                    .map(assignment => (
                      <div key={assignment.id} className="flex flex-wrap md:flex-nowrap items-center justify-between p-4 border rounded-lg">
                        <div className="w-full md:w-auto mb-2 md:mb-0">
                          <h3 className="font-medium">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">{assignment.course}</p>
                          <div className="flex items-center mt-1">
                            <p className="text-sm mr-2">
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </p>
                            {isOverdue(assignment.dueDate, assignment.status) && (
                              <Badge variant="destructive">Overdue</Badge>
                            )}
                          </div>
                        </div>
                        <div className="w-full md:w-auto flex justify-end">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                onClick={() => setSelectedAssignment(assignment)}
                                className="w-full md:w-auto"
                              >
                                Submit Assignment
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Submit Assignment</DialogTitle>
                                <DialogDescription>
                                  {assignment.title} - {assignment.course}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="submission">Your Submission</Label>
                                  <Textarea
                                    id="submission"
                                    placeholder="Type your submission here or describe what you're uploading..."
                                    className="min-h-[150px]"
                                    value={submissionText}
                                    onChange={(e) => setSubmissionText(e.target.value)}
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="file">Attach Files (optional)</Label>
                                  <div className="flex items-center justify-center w-full">
                                    <label
                                      htmlFor="file"
                                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted/50"
                                    >
                                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                          className="w-8 h-8 mb-3 text-gray-500"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                          ></path>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500">
                                          <span className="font-semibold">Click to upload</span> or
                                          drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          PDF, DOCX, XLSX, or ZIP (MAX. 10MB)
                                        </p>
                                      </div>
                                      <input id="file" type="file" className="hidden" />
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit" onClick={handleSubmit}>
                                  Submit Assignment
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium mb-2">No pending assignments</h3>
                  <p className="text-muted-foreground">
                    You're all caught up! Check back later for new assignments.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="submitted">
          <Card>
            <CardHeader>
              <CardTitle>Submitted Assignments</CardTitle>
              <CardDescription>
                Assignments you've completed and are waiting to be graded
              </CardDescription>
            </CardHeader>
            <CardContent>
              {assignments.filter(a => a.status === 'submitted').length > 0 ? (
                <div className="space-y-4">
                  {assignments
                    .filter(a => a.status === 'submitted')
                    .map(assignment => (
                      <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{assignment.title}</h3>
                            {getStatusBadge(assignment.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{assignment.course}</p>
                          <p className="text-sm">
                            Submitted on: {new Date(assignment.submittedDate || '').toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="outline">View Submission</Button>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium mb-2">No submitted assignments</h3>
                  <p className="text-muted-foreground">
                    You haven't submitted any assignments yet.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="graded">
          <Card>
            <CardHeader>
              <CardTitle>Graded Assignments</CardTitle>
              <CardDescription>
                Assignments that have been reviewed and graded
              </CardDescription>
            </CardHeader>
            <CardContent>
              {assignments.filter(a => a.status === 'graded').length > 0 ? (
                <div className="space-y-4">
                  {assignments
                    .filter(a => a.status === 'graded')
                    .map(assignment => (
                      <div key={assignment.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{assignment.title}</h3>
                            {getStatusBadge(assignment.status)}
                          </div>
                          <div className="font-bold text-lg">
                            Grade: {assignment.grade}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{assignment.course}</p>
                        <p className="text-sm mb-4">
                          Submitted on: {new Date(assignment.submittedDate || '').toLocaleDateString()}
                        </p>
                        <div className="bg-muted p-3 rounded-md">
                          <p className="font-medium mb-1">Feedback:</p>
                          <p>{assignment.feedback}</p>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button variant="outline">View Submission</Button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium mb-2">No graded assignments</h3>
                  <p className="text-muted-foreground">
                    None of your assignments have been graded yet.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default StudentAssignments;
