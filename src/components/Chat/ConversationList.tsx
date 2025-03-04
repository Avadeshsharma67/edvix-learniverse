
import React, { useState } from 'react';
import { Search, Plus, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useChat } from '@/contexts/ChatContext';
import { tutors, students } from '@/contexts/ChatContext'; // Import tutors and students arrays
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { format } from 'date-fns';

const ConversationList = () => {
  const { 
    conversations, 
    activeConversation, 
    setActiveConversation, 
    getUnreadCount, 
    markAsRead,
    startNewConversation,
    currentUser
  } = useChat();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  
  if (!isAuthenticated) {
    return (
      <div className="p-4 text-center text-muted-foreground text-sm">
        Please log in to view your messages.
      </div>
    );
  }

  const userRole = currentUser?.role || 'student';
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conv => {
    const participantName = conv.name.toLowerCase();
    return participantName.includes(searchQuery.toLowerCase());
  });

  // Separate conversations by role for the new chat dialog
  const availableUsers = userRole === 'student' 
    ? tutors.filter(tutor => !conversations.some(conv => conv.userIds.includes(tutor.id)))
    : students.filter(student => !conversations.some(conv => conv.userIds.includes(student.id)));

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" title="New Conversation">
                <UserPlus className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start a new conversation</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <Input 
                  placeholder={`Search ${userRole === 'student' ? 'tutors' : 'students'}...`}
                  className="mb-4"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ScrollArea className="h-[300px] pr-4">
                  {availableUsers.length === 0 ? (
                    <div className="text-center text-muted-foreground py-4">
                      No more {userRole === 'student' ? 'tutors' : 'students'} available to chat with.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {availableUsers
                        .filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(user => (
                          <div
                            key={user.id}
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                            onClick={() => {
                              startNewConversation(user);
                              setIsNewChatOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <Avatar>
                              <AvatarImage src={user.avatar || '/placeholder.svg'} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.role}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? 'No conversations found' : 'No conversations yet'}
            </div>
          ) : (
            filteredConversations
              .sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime())
              .map((conversation) => {
                const isActive = activeConversation?.id === conversation.id;
                const unreadCount = getUnreadCount(conversation.id);
                const lastMessage = conversation.messages[conversation.messages.length - 1];
                
                return (
                  <div
                    key={conversation.id}
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors",
                      isActive 
                        ? "bg-primary/5 dark:bg-primary/20" 
                        : "hover:bg-muted",
                      unreadCount > 0 && "bg-muted dark:bg-muted"
                    )}
                    onClick={() => {
                      setActiveConversation(conversation);
                      markAsRead(conversation.id);
                    }}
                  >
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src="/placeholder.svg" alt={conversation.name} />
                      <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{conversation.name}</h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {lastMessage ? format(new Date(lastMessage.timestamp), 'h:mm a') : ''}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-muted-foreground truncate max-w-[140px]">
                          {lastMessage ? lastMessage.text : 'No messages yet'}
                        </p>
                        
                        {unreadCount > 0 && (
                          <Badge variant="destructive" className="ml-auto">
                            {unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ConversationList;
