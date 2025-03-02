
import React, { useState, useEffect, useRef } from 'react';
import { Send, ChevronLeft, PlusCircle, Smile, Paperclip, Image, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChat } from '@/contexts/ChatContext';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';

export const ChatInterface = () => {
  const {
    conversations,
    activeConversation,
    setActiveConversation,
    sendMessage,
    currentUser,
    getUnreadCount,
    markAsRead
  } = useChat();
  const [messageText, setMessageText] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    if (activeConversation) {
      markAsRead(activeConversation.id);
    }
  }, [activeConversation]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  useEffect(() => {
    if (activeConversation && !isMobile) {
      inputRef.current?.focus();
    }
  }, [activeConversation, isMobile]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() === '') return;
    
    sendMessage(messageText);
    setMessageText('');
  };

  const getOtherParticipant = (conversationId: string) => {
    if (!currentUser) return null;
    
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return null;
    
    return conversation.participants.find(p => p.id !== currentUser.id);
  };

  const formatTime = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };
  
  const handleAttachment = () => {
    toast({
      title: "Feature coming soon",
      description: "Attachment functionality will be available in the next update",
    });
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-full p-6 text-center">
        <div>
          <h3 className="text-lg font-semibold mb-2">Please select a user role first</h3>
          <p className="text-muted-foreground">Log in as either a student or tutor to access messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] overflow-hidden bg-background rounded-lg border">
      <div 
        className={`w-full md:w-80 border-r ${isMobile && activeConversation ? 'hidden' : 'flex flex-col'}`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold text-lg">Conversations</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => toast({ title: "Coming soon", description: "New conversation feature will be available soon" })}>
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start new conversation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <ScrollArea className="flex-1">
          {conversations
            .filter(conversation => conversation.participants.some(p => p.id === currentUser.id))
            .sort((a, b) => b.lastActive.getTime() - a.lastActive.getTime())
            .map(conversation => {
              const otherParticipant = getOtherParticipant(conversation.id);
              const unreadCount = getUnreadCount(conversation.id);
              
              return (
                <div 
                  key={conversation.id}
                  className={`p-3 flex items-center gap-3 hover:bg-muted/50 cursor-pointer transition-colors
                    ${activeConversation?.id === conversation.id ? 'bg-muted' : ''}
                    ${unreadCount > 0 ? 'bg-muted/30' : ''}`}
                  onClick={() => setActiveConversation(conversation)}
                >
                  <Avatar>
                    <AvatarImage src={otherParticipant?.avatar} alt={otherParticipant?.name || 'User'} />
                    <AvatarFallback>
                      {otherParticipant?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium truncate">{otherParticipant?.name}</span>
                      {unreadCount > 0 && (
                        <Badge variant="default" className="ml-2 bg-accent">
                          {unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm truncate">
                      {conversation.messages[conversation.messages.length - 1]?.text || 'No messages yet'}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(conversation.lastActive)}
                    </span>
                  </div>
                </div>
              );
            })}
        </ScrollArea>
      </div>

      {activeConversation ? (
        <div className={`flex-1 flex flex-col ${isMobile && activeConversation ? 'block' : ''}`}>
          <div className="p-4 border-b flex items-center gap-3">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setActiveConversation(null)}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            <Avatar>
              <AvatarImage 
                src={getOtherParticipant(activeConversation.id)?.avatar} 
                alt={getOtherParticipant(activeConversation.id)?.name || 'User'}
              />
              <AvatarFallback>
                {getOtherParticipant(activeConversation.id)?.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">
                {getOtherParticipant(activeConversation.id)?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {getOtherParticipant(activeConversation.id)?.role === 'tutor' ? 'Tutor' : 'Student'}
              </p>
            </div>
            <div className="hidden md:flex gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => toast({ 
                        title: "Audio call", 
                        description: "Audio call feature coming soon" 
                      })}
                    >
                      <Mic className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Start audio call</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {activeConversation.messages.length === 0 ? (
                <div className="flex justify-center items-center h-32 text-center">
                  <div className="text-muted-foreground">
                    <p>No messages yet</p>
                    <p className="text-sm">Start the conversation by sending a message</p>
                  </div>
                </div>
              ) : (
                activeConversation.messages.map((message, index) => {
                  const isCurrentUser = message.senderId === currentUser.id;
                  const sender = activeConversation.participants.find(p => p.id === message.senderId);
                  
                  const showDateSeparator = index === 0 || (
                    new Date(message.timestamp).toDateString() !== 
                    new Date(activeConversation.messages[index - 1].timestamp).toDateString()
                  );
                  
                  return (
                    <React.Fragment key={message.id}>
                      {showDateSeparator && (
                        <div className="flex items-center py-2">
                          <Separator className="flex-1" />
                          <span className="px-2 text-xs text-muted-foreground">
                            {new Date(message.timestamp).toLocaleDateString()}
                          </span>
                          <Separator className="flex-1" />
                        </div>
                      )}
                      <div 
                        className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`flex items-start max-w-[80%] ${isCurrentUser ? 'flex-row-reverse' : ''}`}
                        >
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={sender?.avatar} alt={sender?.name || 'User'} />
                            <AvatarFallback>
                              {sender?.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div 
                            className={`rounded-lg px-4 py-2 ${
                              isCurrentUser 
                                ? 'bg-accent text-accent-foreground mr-2' 
                                : 'bg-muted ml-2'
                            }`}
                          >
                            <p>{message.text}</p>
                            <p className={`text-xs mt-1 ${
                              isCurrentUser ? 'text-accent-foreground/80' : 'text-muted-foreground'
                            }`}>
                              {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                              {isCurrentUser && (
                                <span className="ml-1">
                                  {message.read ? '• Read' : '• Sent'}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })
              )}
              <div ref={messageEndRef} />
            </div>
          </ScrollArea>

          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button type="button" variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2" side="top" align="start">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={handleAttachment}>
                      <Image className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleAttachment}>
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleAttachment}>
                      <Mic className="h-5 w-5" />
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              
              <input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-muted rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              
              <Button type="button" variant="ghost" size="icon" className="text-muted-foreground" onClick={() => toast({ title: "Emoji", description: "Emoji picker coming soon" })}>
                <Smile className="h-5 w-5" />
              </Button>
              
              <Button type="submit" size="icon" disabled={messageText.trim() === ''}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex-1 hidden md:flex flex-col justify-center items-center p-4 text-center text-muted-foreground">
          <div className="max-w-sm">
            <h3 className="font-semibold text-lg mb-2">Select a conversation</h3>
            <p>Choose a conversation from the list to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};
