
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Send, PaperclipIcon, Smile } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import EmojiPicker from './EmojiPicker';
import AttachmentMenu from './AttachmentMenu';
import { format } from 'date-fns';

const ChatInterface = () => {
  const { activeConversation, sendMessage, currentUser } = useChat();
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (messageText.trim() && activeConversation) {
      sendMessage(activeConversation.id, messageText.trim());
      setMessageText('');
      
      // Return focus to input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessageText(prev => prev + emoji);
    setShowEmojiPicker(false);
    
    // Return focus to input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!activeConversation) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        <div className="text-center">
          <h3 className="text-lg font-medium">No conversation selected</h3>
          <p>Select a conversation from the sidebar to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="border-b p-3 flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-2">
            <AvatarImage src="/placeholder.svg" alt={activeConversation.name} />
            <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-base">{activeConversation.name}</h3>
            <p className="text-xs text-muted-foreground">
              {activeConversation.isOnline ? 'Online' : 'Last active recently'}
            </p>
          </div>
        </div>
        <div>
          {/* Chat options/actions could go here */}
        </div>
      </div>
      
      {/* Messages area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {activeConversation.messages.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <p>No messages yet</p>
              <p className="text-sm">Start the conversation by sending a message</p>
            </div>
          ) : (
            activeConversation.messages.map((message) => {
              const isCurrentUser = message.senderId === currentUser?.id;
              
              return (
                <div 
                  key={message.id}
                  className={cn(
                    "flex",
                    isCurrentUser ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn("flex max-w-[80%]", isCurrentUser ? "flex-row-reverse" : "flex-row")}>
                    {!isCurrentUser && (
                      <Avatar className={cn("h-8 w-8", isCurrentUser ? "ml-2" : "mr-2")}>
                        <AvatarImage src="/placeholder.svg" alt={activeConversation.name} />
                        <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <div
                        className={cn(
                          "rounded-lg p-3 text-sm shadow-sm",
                          isCurrentUser
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "bg-muted rounded-tl-none"
                        )}
                      >
                        {message.text}
                      </div>
                      <div
                        className={cn(
                          "mt-1 text-xs text-muted-foreground",
                          isCurrentUser ? "text-right" : "text-left"
                        )}
                      >
                        {format(new Date(message.timestamp), 'h:mm a')}
                      </div>
                    </div>
                    {isCurrentUser && (
                      <Avatar className={cn("h-8 w-8", isCurrentUser ? "mr-2" : "ml-2")}>
                        <AvatarImage src={currentUser?.avatar || "/placeholder.svg"} alt="You" />
                        <AvatarFallback>{currentUser?.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              );
            })
          )}
          {/* Dummy div for scrolling to bottom */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Input area */}
      <div className="border-t p-3">
        <form onSubmit={handleSendMessage} className="flex items-end">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="py-6 pr-24"
              autoFocus
            />
            
            <div className="absolute right-2 bottom-1/2 transform translate-y-1/2 flex items-center space-x-1">
              <div className="relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowEmojiPicker(!showEmojiPicker);
                    setShowAttachmentMenu(false);
                  }}
                >
                  <Smile className="h-5 w-5 text-muted-foreground" />
                </Button>
                
                {showEmojiPicker && (
                  <div className="absolute bottom-10 right-0">
                    <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                  </div>
                )}
              </div>
              
              <div className="relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowAttachmentMenu(!showAttachmentMenu);
                    setShowEmojiPicker(false);
                  }}
                >
                  <PaperclipIcon className="h-5 w-5 text-muted-foreground" />
                </Button>
                
                {showAttachmentMenu && (
                  <div className="absolute bottom-10 right-0">
                    <AttachmentMenu />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <Button type="submit" className="ml-2" disabled={!messageText.trim()}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
