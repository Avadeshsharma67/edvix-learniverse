
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FileText, Book, Video, Link as LinkIcon, Download, Upload, Plus, File, ExternalLink, Search } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'document' | 'book' | 'video' | 'link' | 'other';
  course: string;
  dateAdded: Date;
  url: string;
  description?: string;
  fileSize?: string;
}

const TutorResources = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 'r1',
      title: 'Advanced Mathematics Lecture Notes',
      type: 'document',
      course: 'Advanced Mathematics',
      dateAdded: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      url: '#',
      description: 'Complete lecture notes for the semester',
      fileSize: '2.4 MB'
    },
    {
      id: 'r2',
      title: 'Physics 101 Textbook',
      type: 'book',
      course: 'Physics 101',
      dateAdded: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      url: '#',
      description: 'Digital version of the course textbook'
    },
    {
      id: 'r3',
      title: 'Data Science Workshop Recording',
      type: 'video',
      course: 'Data Science Workshop',
      dateAdded: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      url: 'https://example.com/video',
      description: 'Recording of the workshop session on data visualization',
      fileSize: '450 MB'
    },
    {
      id: 'r4',
      title: 'Useful Research Papers',
      type: 'link',
      course: 'Advanced Mathematics',
      dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      url: 'https://example.com/papers',
      description: 'Collection of relevant research papers'
    }
  ]);
  
  const [newResource, setNewResource] = useState<Omit<Resource, 'id' | 'dateAdded'>>({
    title: '',
    type: 'document',
    course: '',
    url: '',
    description: '',
    fileSize: ''
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

  const handleAddResource = () => {
    const id = Math.random().toString(36).substring(2, 11);
    const resourceWithId = { 
      ...newResource, 
      id, 
      dateAdded: new Date() 
    };
    setResources([...resources, resourceWithId]);
    setIsModalOpen(false);
    
    toast({
      title: "Resource added",
      description: `${newResource.title} has been added to your resources.`,
    });
    
    // Reset form
    setNewResource({
      title: '',
      type: 'document',
      course: '',
      url: '',
      description: '',
      fileSize: ''
    });
  };

  const getFilteredResources = () => {
    if (!searchQuery) return resources;
    
    return resources.filter(resource => 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'book':
        return <Book className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'link':
        return <LinkIcon className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  const filteredResources = getFilteredResources();

  return (
    <DashboardLayout title="Resources">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search resources..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
                <DialogDescription>
                  Add a new learning resource for your students
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Resource Title</Label>
                  <Input 
                    id="title" 
                    value={newResource.title}
                    onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                    placeholder="Enter resource title" 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="resourceType">Resource Type</Label>
                  <Select 
                    value={newResource.type} 
                    onValueChange={(value: 'document' | 'book' | 'video' | 'link' | 'other') => 
                      setNewResource({...newResource, type: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select resource type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="book">Book</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="course">Course</Label>
                  <Input 
                    id="course" 
                    value={newResource.course}
                    onChange={(e) => setNewResource({...newResource, course: e.target.value})}
                    placeholder="Which course is this for?" 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="url">URL or File Path</Label>
                  <Input 
                    id="url" 
                    value={newResource.url}
                    onChange={(e) => setNewResource({...newResource, url: e.target.value})}
                    placeholder="Enter URL or path" 
                  />
                </div>
                
                {(newResource.type === 'document' || newResource.type === 'video') && (
                  <div className="grid gap-2">
                    <Label htmlFor="fileSize">File Size (Optional)</Label>
                    <Input 
                      id="fileSize" 
                      value={newResource.fileSize || ''}
                      onChange={(e) => setNewResource({...newResource, fileSize: e.target.value})}
                      placeholder="e.g. 2.4 MB" 
                    />
                  </div>
                )}
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter resource description"
                    value={newResource.description || ''}
                    onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={handleAddResource}>Add Resource</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Learning Resources</CardTitle>
                <CardDescription>
                  All materials you've shared with your students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Resource</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResources.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                          No resources found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredResources.map(resource => (
                        <TableRow key={resource.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-muted rounded">
                                {getTypeIcon(resource.type)}
                              </div>
                              <div>
                                <div className="font-medium">{resource.title}</div>
                                {resource.description && (
                                  <div className="text-sm text-muted-foreground">{resource.description}</div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{resource.course}</Badge>
                          </TableCell>
                          <TableCell>
                            {resource.dateAdded.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Open</span>
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
          
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>
                  PDFs, Word documents, spreadsheets, and other files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredResources
                    .filter(resource => resource.type === 'document')
                    .map(resource => (
                      <Card key={resource.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-muted rounded">
                              <FileText className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-medium">{resource.title}</h3>
                              <p className="text-xs text-muted-foreground">
                                {resource.fileSize}
                              </p>
                            </div>
                          </div>
                          {resource.description && (
                            <p className="text-sm text-muted-foreground mb-3">
                              {resource.description}
                            </p>
                          )}
                        </CardContent>
                        <CardFooter className="flex justify-between bg-muted/50 p-3">
                          <span className="text-xs text-muted-foreground">
                            {resource.course}
                          </span>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="videos">
            <Card>
              <CardHeader>
                <CardTitle>Videos</CardTitle>
                <CardDescription>
                  Lecture recordings and educational videos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredResources
                    .filter(resource => resource.type === 'video')
                    .map(resource => (
                      <Card key={resource.id}>
                        <div className="aspect-video bg-muted flex items-center justify-center">
                          <Video className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-1">{resource.title}</h3>
                          {resource.description && (
                            <p className="text-sm text-muted-foreground mb-2">
                              {resource.description}
                            </p>
                          )}
                          <div className="flex justify-between items-center mt-2">
                            <Badge variant="outline">{resource.course}</Badge>
                            <Button size="sm">
                              <ExternalLink className="h-3 w-3 mr-2" />
                              Watch
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="links">
            <Card>
              <CardHeader>
                <CardTitle>Links</CardTitle>
                <CardDescription>
                  External resources and reference materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredResources
                    .filter(resource => resource.type === 'link')
                    .map(resource => (
                      <div key={resource.id} className="flex items-center border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="mr-4 p-2 bg-muted rounded">
                          <LinkIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{resource.title}</h3>
                          {resource.description && (
                            <p className="text-sm text-muted-foreground">
                              {resource.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {resource.course}
                          </p>
                        </div>
                        <Button size="sm">
                          <ExternalLink className="h-3 w-3 mr-2" />
                          Visit
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TutorResources;
