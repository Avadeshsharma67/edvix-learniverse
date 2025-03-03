
import React, { useState, useEffect, useRef } from 'react';
import { Send, ChevronLeft, PlusCircle, Smile, Paperclip, Image, Mic, Check, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}

interface ChatInterfaceProps {
  conversationId?: string;
  onBack?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ conversationId, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const { conversations, activeConversation, setActiveConversation, sendMessage, getMessages, markAsRead, getConversation } = useChat();
  const [chatPartner, setChatPartner] = useState<{id: string, name: string, status?: string, lastSeen?: Date} | null>(null);
  
  // Find the first conversation if none is specified
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
    // Scroll to bottom on new messages
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Mark messages as read when the chat interface is opened
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

  const getMessageStatus = (message: ChatMessage) => {
    // Only show status for messages sent by current user
    if (message.senderId !== 'me') return null;
    
    const status = message.status || 'sent';
    
    switch(status) {
      case 'sent':
        return <Check className="h-3.5 w-3.5 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="h-3.5 w-3.5 text-muted-foreground" />;
      case 'read':
        return <CheckCheck className="h-3.5 w-3.5 text-blue-500" />;
      default:
        return null;
    }
  };

  const formatMessageTime = (date: Date) => {
    return format(date, 'h:mm a');
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    
    // Simulate "typing" indicator
    if (e.target.value && !isTyping) {
      setIsTyping(true);
    } else if (!e.target.value) {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-4 flex items-center bg-card shadow-sm">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        <Avatar className="h-10 w-10 border-2 border-primary/10">
          <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
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
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900/30 p-4">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="flex justify-center items-center h-32 text-muted-foreground text-sm">
                No messages yet. Start a conversation!
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex flex-col max-w-[75%]",
                    message.senderId === 'me' ? 'ml-auto' : 'mr-auto'
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-2.5 rounded-2xl relative",
                      message.senderId === 'me'
                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                        : 'bg-white dark:bg-slate-800 text-foreground shadow-sm rounded-tl-none'
                    )}
                  >
                    {message.text}
                  </div>
                  <div className={cn(
                    "flex items-center mt-1 text-xs text-muted-foreground",
                    message.senderId === 'me' ? 'justify-end mr-1' : 'ml-1'
                  )}>
                    <span>{formatMessageTime(message.timestamp)}</span>
                    {message.senderId === 'me' && (
                      <span className="ml-1">{getMessageStatus(message)}</span>
                    )}
                  </div>
                </div>
              ))
            )}
            {isTyping && chatPartner && (
              <div className="flex max-w-[75%] mr-auto">
                <div className="px-4 py-2.5 bg-white dark:bg-slate-800 text-foreground shadow-sm rounded-2xl rounded-tl-none">
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

      {/* Input */}
      <div className="border-t p-3 bg-card">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <PlusCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
          <div className="flex-1 relative rounded-full bg-background">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Smile className="h-5 w-5 text-muted-foreground cursor-pointer" />
            </div>
            <Input
              placeholder="Type your message here"
              value={newMessage}
              onChange={handleTyping}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
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
            variant="primary" 
            size="icon" 
            className="rounded-full h-11 w-11 bg-primary hover:bg-primary/90 transition-colors" 
            onClick={handleSendMessage}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
