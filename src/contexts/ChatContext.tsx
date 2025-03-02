import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

type User = {
  id: string;
  name: string;
  avatar: string;
  role: 'tutor' | 'student';
  email?: string; 
};

type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  read: boolean;
};

type Conversation = {
  id: string;
  userIds: string[]; // For easier lookup of conversation participants
  name: string;
  participants: User[];
  messages: Message[];
  lastActive: Date;
};

interface ChatContextType {
  currentUser: User | null;
  conversations: Conversation[];
  activeConversation: Conversation | null;
  setActiveConversation: (conversation: Conversation | null) => void;
  sendMessage: (conversationId: string, text: string) => Promise<void>;
  setCurrentUser: (user: User) => void;
  getUnreadCount: (conversationId: string) => number;
  markAsRead: (conversationId: string) => void;
  initializeChat: () => void;
  totalUnreadMessages: number;
  getMessages: (conversationId: string) => Promise<Message[]>;
  getConversation: (conversationId: string) => Promise<Conversation | null>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Sample data
const tutors: User[] = [
  { id: 't1', name: 'Dr. Emily Johnson', avatar: '/placeholder.svg', role: 'tutor', email: 'emily@example.com' },
  { id: 't2', name: 'Prof. Michael Chen', avatar: '/placeholder.svg', role: 'tutor', email: 'michael@example.com' },
  { id: 't3', name: 'Dr. Sophia Rodriguez', avatar: '/placeholder.svg', role: 'tutor', email: 'sophia@example.com' },
];

const students: User[] = [
  { id: 's1', name: 'Alex Thompson', avatar: '/placeholder.svg', role: 'student', email: 'alex@example.com' },
  { id: 's2', name: 'Jamie Wilson', avatar: '/placeholder.svg', role: 'student', email: 'jamie@example.com' },
  { id: 's3', name: 'Taylor Smith', avatar: '/placeholder.svg', role: 'student', email: 'taylor@example.com' },
  { id: 's4', name: 'Jordan Lee', avatar: '/placeholder.svg', role: 'student', email: 'jordan@example.com' },
];

// Initial conversations
const sampleConversations: Conversation[] = [
  {
    id: 'c1',
    userIds: ['t1', 's1'],
    name: 'Alex Thompson',
    participants: [tutors[0], students[0]],
    lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    messages: [
      {
        id: 'm1',
        senderId: 't1',
        text: 'Hello Alex, how is your project coming along?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: true,
      },
      {
        id: 'm2',
        senderId: 's1',
        text: "Hi Dr. Johnson, I've completed the first part but have questions about the methodology.",
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        read: true,
      },
    ],
  },
  {
    id: 'c2',
    userIds: ['t2', 's2'],
    name: 'Jamie Wilson',
    participants: [tutors[1], students[1]],
    lastActive: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    messages: [
      {
        id: 'm3',
        senderId: 't2',
        text: 'Jamie, your latest assignment looks good. Can we discuss your approach?',
        timestamp: new Date(Date.now() - 1000 * 60 * 120),
        read: false,
      },
    ],
  },
  {
    id: 'c3',
    userIds: ['t3', 's3'],
    name: 'Taylor Smith',
    participants: [tutors[2], students[2]],
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    messages: [
      {
        id: 'm4',
        senderId: 't3',
        text: 'Taylor, your progress in this course has been impressive.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        read: true,
      },
      {
        id: 'm5',
        senderId: 's3',
        text: 'Thank you, Dr. Rodriguez! I find the subject fascinating.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.9),
        read: true,
      },
    ],
  },
  {
    id: 'c4',
    userIds: ['t1', 's4'],
    name: 'Jordan Lee',
    participants: [tutors[0], students[3]],
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    messages: [
      {
        id: 'm6',
        senderId: 's4',
        text: "Dr. Johnson, can we reschedule tomorrow's session?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        read: true,
      },
      {
        id: 'm7',
        senderId: 't1',
        text: 'Sure, Jordan. How about Friday at 2 PM instead?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4.9),
        read: false,
      },
    ],
  },
];

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(sampleConversations);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);
  const { toast } = useToast();

  const initializeChat = () => {
    if (!currentUser) {
      console.log('Chat not initialized: No current user');
      return;
    }
    
    console.log(`Chat initialized for ${currentUser.name}`);
    calculateTotalUnread();
    
    // Find first conversation for current user and set as active if none is selected
    if (!activeConversation) {
      const firstConversation = conversations.find(
        conv => conv.participants.some(p => p.id === currentUser.id)
      );
      if (firstConversation) {
        setActiveConversation(firstConversation);
        markAsRead(firstConversation.id);
      }
    }
  };

  const calculateTotalUnread = () => {
    if (!currentUser) return;
    
    const total = conversations.reduce((acc, conv) => {
      const unread = conv.messages.filter(
        m => m.senderId !== currentUser.id && !m.read
      ).length;
      return acc + unread;
    }, 0);
    
    setTotalUnreadMessages(total);
  };

  const sendMessage = async (conversationId: string, text: string) => {
    if (!currentUser) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date(),
      read: false,
    };

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastActive: new Date(),
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    
    // Update active conversation
    const updatedActiveConv = updatedConversations.find(
      (conv) => conv.id === conversationId
    );
    
    if (updatedActiveConv) {
      setActiveConversation(updatedActiveConv);
    }

    // Show toast for sent message
    toast({
      title: "Message sent",
      description: "Your message has been delivered",
      duration: 1500,
    });

    // Simulate response after delay (for demo purposes)
    if (currentUser.role === 'student') {
      simulateTutorResponse(conversationId);
    } else {
      simulateStudentResponse(conversationId);
    }
  };

  const simulateTutorResponse = (conversationId: string) => {
    setTimeout(() => {
      const conversation = conversations.find((c) => c.id === conversationId);
      if (!conversation) return;

      const tutor = conversation.participants.find((p) => p.role === 'tutor');
      if (!tutor) return;

      const responses = [
        "Great question! Let me explain that concept in more detail.",
        "I've reviewed your work, and I have some suggestions for improvement.",
        "You're making excellent progress. Let's discuss next steps.",
        "That's an interesting approach. Have you considered alternative methods?",
        "I'll share some additional resources that might help with this topic."
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const newMessage: Message = {
        id: `m${Date.now()}`,
        senderId: tutor.id,
        text: randomResponse,
        timestamp: new Date(),
        read: false,
      };

      setConversations((prevConversations) =>
        prevConversations.map((conv) => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastActive: new Date(),
            };
          }
          return conv;
        })
      );
      
      // Show notification for new message
      if (currentUser && currentUser.role === 'student') {
        toast({
          title: `New message from ${tutor.name}`,
          description: randomResponse.substring(0, 60) + (randomResponse.length > 60 ? '...' : ''),
          duration: 3000,
        });
      }
      
      calculateTotalUnread();
    }, 2000 + Math.random() * 2000); // Random delay between 2-4 seconds
  };

  const simulateStudentResponse = (conversationId: string) => {
    setTimeout(() => {
      const conversation = conversations.find((c) => c.id === conversationId);
      if (!conversation) return;

      const student = conversation.participants.find((p) => p.role === 'student');
      if (!student) return;

      const responses = [
        "Thank you for explaining that! I understand better now.",
        "I'll work on implementing your suggestions.",
        "Could you provide some more examples on this topic?",
        "I've been struggling with this concept. Your explanation helps a lot.",
        "I'll review the resources you shared and follow up with any questions."
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const newMessage: Message = {
        id: `m${Date.now()}`,
        senderId: student.id,
        text: randomResponse,
        timestamp: new Date(),
        read: false,
      };

      setConversations((prevConversations) =>
        prevConversations.map((conv) => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastActive: new Date(),
            };
          }
          return conv;
        })
      );
      
      // Show notification for new message
      if (currentUser && currentUser.role === 'tutor') {
        toast({
          title: `New message from ${student.name}`,
          description: randomResponse.substring(0, 60) + (randomResponse.length > 60 ? '...' : ''),
          duration: 3000,
        });
      }
      
      calculateTotalUnread();
    }, 2000 + Math.random() * 2000); // Random delay between 2-4 seconds
  };

  const getUnreadCount = (conversationId: string) => {
    if (!currentUser) return 0;
    
    const conversation = conversations.find((c) => c.id === conversationId);
    if (!conversation) return 0;
    
    return conversation.messages.filter(
      (m) => m.senderId !== currentUser.id && !m.read
    ).length;
  };

  const markAsRead = (conversationId: string) => {
    if (!currentUser) return;
    
    setConversations((prevConversations) =>
      prevConversations.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: conv.messages.map((msg) => {
              if (msg.senderId !== currentUser.id) {
                return { ...msg, read: true };
              }
              return msg;
            }),
          };
        }
        return conv;
      })
    );
    
    calculateTotalUnread();
  };

  const getMessages = async (conversationId: string): Promise<Message[]> => {
    const conversation = conversations.find(c => c.id === conversationId);
    return conversation?.messages || [];
  };

  const getConversation = async (conversationId: string): Promise<Conversation | null> => {
    return conversations.find(c => c.id === conversationId) || null;
  };

  useEffect(() => {
    if (activeConversation) {
      const updatedActiveConv = conversations.find(
        (conv) => conv.id === activeConversation.id
      );
      if (updatedActiveConv) {
        setActiveConversation(updatedActiveConv);
      }
    }
  }, [conversations, activeConversation]);

  useEffect(() => {
    calculateTotalUnread();
  }, [conversations, currentUser]);

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        conversations,
        activeConversation,
        setActiveConversation,
        sendMessage,
        setCurrentUser,
        getUnreadCount,
        markAsRead,
        initializeChat,
        totalUnreadMessages,
        getMessages,
        getConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export { tutors, students };
