
import React, { useState, useEffect, useRef } from 'react';
import { Send, ChevronLeft, PlusCircle, Smile, Paperclip, Image, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  conversationId?: string;
  onBack?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ conversationId, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const { conversations, activeConversation, setActiveConversation, sendMessage, getMessages, markAsRead, getConversation } = useChat();
  const [собеседник, setСобеседник] = useState<{id: string, name: string} | null>(null);
  
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
          setСобеседник({id: conversation.userIds[0], name: conversation.name});
        }
      } else if (activeConversation) {
        setСобеседник({
          id: activeConversation.userIds[0],
          name: activeConversation.name
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
        await sendMessage(targetConversationId, newMessage);
        setNewMessage('');
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-4 flex items-center">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        <div className={cn("ml-3 flex-1", !onBack && "ml-0")}>
          <div className="font-semibold">{собеседник?.name || 'Unknown'}</div>
          <div className="text-sm text-muted-foreground">Online</div>
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <ScrollArea className="h-full">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex flex-col",
                  message.senderId === 'me' ? 'items-end' : 'items-start'
                )}
              >
                <div
                  className={cn(
                    "px-4 py-2 rounded-xl inline-block",
                    message.senderId === 'me'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  )}
                >
                  {message.text}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {message.senderId === 'me' ? 'You' : 'Them'} • {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <PlusCircle className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type your message here"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Smile className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Image className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Mic className="h-5 w-5" />
            </Button>
            <Button variant="default" size="icon" onClick={handleSendMessage}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
