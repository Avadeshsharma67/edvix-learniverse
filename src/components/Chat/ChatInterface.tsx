
import React, { useState, useEffect, useRef } from 'react';
import { Send, ChevronLeft, PlusCircle, Smile, Paperclip, Image, Mic, Check, CheckCheck, Clock, X, Search, MoreVertical, Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { EmojiPicker } from '@/components/Chat/EmojiPicker';
import { AttachmentMenu } from '@/components/Chat/AttachmentMenu';

interface ChatInterfaceProps {
  conversationId?: string;
  onBack?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ conversationId, onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { 
    conversations, 
    activeConversation, 
    setActiveConversation, 
    sendMessage, 
    getMessages, 
    markAsRead, 
    getConversation 
  } = useChat();
  const [chatPartner, setChatPartner] = useState<{id: string, name: string, status?: string, lastSeen?: Date} | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  
  useEffect(() => {
    if (!conversationId && conversations.length > 0 && !activeConversation) {
      setActiveConversation(conversations[0]);
    }
  }, [conversationId, conversations, activeConversation, setActiveConversation]);

  useEffect(() => {
    const loadMessages = async () => {
      if (conversationId) {
        const initialMessages = await getMessages(conversationId);
        setMessages(initialMessages);
      } else if (activeConversation) {
        setMessages(activeConversation.messages);
      }
    };

    loadMessages();
  }, [conversationId, activeConversation, getMessages]);

  useEffect(() => {
    const loadConversation = async () => {
      if (conversationId) {
        const conversation = await getConversation(conversationId);
        if (conversation) {
          setChatPartner({
            id: conversation.userIds[0], 
            name: conversation.name,
            status: Math.random() > 0.5 ? 'online' : 'offline',
            lastSeen: conversation.lastActive
          });
        }
      } else if (activeConversation) {
        setChatPartner({
          id: activeConversation.userIds[0],
          name: activeConversation.name,
          status: Math.random() > 0.5 ? 'online' : 'offline',
          lastSeen: activeConversation.lastActive
        });
      }
    };

    loadConversation();
  }, [conversationId, activeConversation, getConversation]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (conversationId) {
      markAsRead(conversationId);
    } else if (activeConversation) {
      markAsRead(activeConversation.id);
    }
  }, [conversationId, activeConversation, markAsRead]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const targetConversationId = conversationId || (activeConversation?.id || '');
      if (targetConversationId) {
        setIsTyping(false);
        await sendMessage(targetConversationId, newMessage);
        setNewMessage('');
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleEmojiSelected = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setEmojiPickerOpen(false);
    inputRef.current?.focus();
  };

  const handleAttachmentSelected = (type: string) => {
    console.log(`Attachment of type ${type} selected`);
    setAttachmentMenuOpen(false);
    // This would be expanded with actual attachment functionality
  };

  const toggleSearchMode = () => {
    setSearchMode(!searchMode);
    if (!searchMode) {
      setSearchQuery('');
    }
  };

  const getMessageStatus = (message: any) => {
    if (message.senderId !== 'me') return null;
    
    const status = message.status || 'sent';
    
    switch(status) {
      case 'sent':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Check className="h-3.5 w-3.5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Sent</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case 'delivered':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CheckCheck className="h-3.5 w-3.5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Delivered</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case 'read':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CheckCheck className="h-3.5 w-3.5 text-blue-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Read</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      default:
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Sending...</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
    }
  };

  const formatMessageTime = (date: Date) => {
    return format(date, 'h:mm a');
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    
    if (e.target.value && !isTyping) {
      setIsTyping(true);
    } else if (!e.target.value) {
      setIsTyping(false);
    }
  };

  const getDateSeparator = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return format(date, 'MMMM d, yyyy');
    }
  };

  // Filter messages by search query if search is active
  const filteredMessages = searchMode && searchQuery 
    ? messages.filter(msg => msg.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages;

  // Group messages by date
  const groupedMessages = filteredMessages.reduce((groups: any, message: any) => {
    const date = new Date(message.timestamp);
    const dateStr = date.toDateString();
    
    if (!groups[dateStr]) {
      groups[dateStr] = [];
    }
    
    groups[dateStr].push(message);
    return groups;
  }, {});

  return (
    <div className="flex flex-col h-full">
      <div className="border-b py-2 px-4 flex items-center bg-card shadow-sm sticky top-0 z-10">
        {searchMode ? (
          <div className="flex items-center w-full">
            <Input
              autoFocus
              placeholder="Search in conversation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button variant="ghost" size="icon" onClick={toggleSearchMode} className="ml-2">
              <X className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <>
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            <Avatar className="h-10 w-10 border-2 border-primary/10">
              <AvatarImage src="/placeholder.svg" alt={chatPartner?.name || 'Unknown'} />
              <AvatarFallback>{chatPartner?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className={cn("ml-3 flex-1")}>
              <div className="font-semibold">{chatPartner?.name || 'Unknown'}</div>
              <div className="text-xs text-muted-foreground">
                {chatPartner?.status === 'online' ? (
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
                    Online
                  </span>
                ) : (
                  <span>
                    Last seen {chatPartner?.lastSeen ? formatMessageTime(chatPartner.lastSeen) : 'recently'}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={toggleSearchMode}>
                <Search className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900/30 p-4 bg-[url('/chat-bg.png')] bg-repeat bg-opacity-5">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {filteredMessages.length === 0 ? (
              <div className="flex justify-center items-center h-32 text-muted-foreground text-sm">
                {searchMode ? 'No messages match your search.' : 'No messages yet. Start a conversation!'}
              </div>
            ) : (
              Object.keys(groupedMessages).map((dateStr) => (
                <div key={dateStr}>
                  <div className="flex justify-center mb-4 mt-6">
                    <div className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-medium text-muted-foreground shadow-sm">
                      {getDateSeparator(new Date(dateStr))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {groupedMessages[dateStr].map((message: any, index: number) => {
                      const showAvatar = index === 0 || 
                        groupedMessages[dateStr][index - 1]?.senderId !== message.senderId;
                      
                      const isLastInGroup = index === groupedMessages[dateStr].length - 1 || 
                        groupedMessages[dateStr][index + 1]?.senderId !== message.senderId;
                      
                      return (
                        <div
                          key={message.id}
                          className={cn(
                            "flex",
                            message.senderId === 'me' ? 'justify-end' : 'justify-start',
                            !isLastInGroup ? 'mb-1' : ''
                          )}
                        >
                          {message.senderId !== 'me' && showAvatar && (
                            <Avatar className="h-8 w-8 mr-2 self-end mb-1">
                              <AvatarImage src="/placeholder.svg" alt="Sender" />
                              <AvatarFallback>{chatPartner?.name?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                          )}
                          {message.senderId !== 'me' && !showAvatar && <div className="w-8 mr-2"></div>}
                          
                          <div className={cn(
                            "flex flex-col max-w-[75%]",
                          )}>
                            <div
                              className={cn(
                                "px-4 py-2.5 rounded-lg relative",
                                message.senderId === 'me'
                                  ? 'bg-primary text-primary-foreground rounded-br-none'
                                  : 'bg-white dark:bg-slate-800 text-foreground shadow-sm rounded-bl-none'
                              )}
                            >
                              {message.text}
                            </div>
                            {isLastInGroup && (
                              <div className={cn(
                                "flex items-center mt-1 text-xs text-muted-foreground",
                                message.senderId === 'me' ? 'justify-end mr-1' : 'ml-1'
                              )}>
                                <span>{formatMessageTime(new Date(message.timestamp))}</span>
                                {message.senderId === 'me' && (
                                  <span className="ml-1">{getMessageStatus(message)}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
            
            {isTyping && chatPartner && (
              <div className="flex">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg" alt={chatPartner.name} />
                  <AvatarFallback>{chatPartner?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="px-4 py-2.5 bg-white dark:bg-slate-800 text-foreground shadow-sm rounded-lg rounded-bl-none max-w-[75%]">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-gray-300 animate-pulse"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-300 animate-pulse delay-100"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-300 animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>
        </ScrollArea>
      </div>

      <div className="border-t p-3 bg-card">
        <div className="flex items-center gap-2">
          <Popover open={attachmentMenuOpen} onOpenChange={setAttachmentMenuOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <PlusCircle className="h-5 w-5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="start" alignOffset={-40} side="top" sideOffset={10}>
              <AttachmentMenu onSelect={handleAttachmentSelected} />
            </PopoverContent>
          </Popover>
          
          <div className="flex-1 relative rounded-full bg-background">
            <Popover open={emojiPickerOpen} onOpenChange={setEmojiPickerOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="absolute left-1 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 p-0">
                  <Smile className="h-5 w-5 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2" align="start" alignOffset={-40} side="top" sideOffset={10}>
                <EmojiPicker onEmojiSelect={handleEmojiSelected} />
              </PopoverContent>
            </Popover>
            
            <Input
              ref={inputRef}
              placeholder="Type your message here"
              value={newMessage}
              onChange={handleTyping}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="rounded-full pl-10 pr-20 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 border-muted"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <Paperclip className="h-5 w-5 text-muted-foreground cursor-pointer" />
              <Image className="h-5 w-5 text-muted-foreground cursor-pointer" />
              <Mic className="h-5 w-5 text-muted-foreground cursor-pointer" />
            </div>
          </div>
          <Button 
            variant="default" 
            size="icon" 
            className="rounded-full h-11 w-11 bg-primary hover:bg-primary/90 transition-colors" 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
