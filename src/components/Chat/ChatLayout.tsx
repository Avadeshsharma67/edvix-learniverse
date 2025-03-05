
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import ConversationList from './ConversationList';
import ChatInterface from './ChatInterface';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const ChatLayout = () => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(true);
  
  return (
    <div className={cn(
      "flex h-full border rounded-lg overflow-hidden",
      isMobile ? "flex-col" : "rounded-lg"
    )}>
      {/* Conversation list sidebar */}
      <div
        className={cn(
          "bg-card shadow-sm",
          isMobile 
            ? showSidebar ? "h-full" : "h-0 overflow-hidden"
            : "w-80 border-r"
        )}
      >
        <ConversationList />
      </div>
      
      {/* Chat interface */}
      <div className={cn(
        "flex-1 flex flex-col",
        isMobile && showSidebar ? "hidden" : "block"
      )}>
        {isMobile ? (
          <ChatInterface 
            onBack={() => setShowSidebar(true)} 
          />
        ) : (
          <ChatInterface />
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
