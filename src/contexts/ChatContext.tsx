import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  avatar: string;
  role: 'tutor' | 'student';
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
  participants: User[];
  messages: Message[];
  lastActive: Date;
};

interface ChatContextType {
  currentUser: User | null;
  conversations: Conversation[];
  activeConversation: Conversation | null;
  setActiveConversation: (conversation: Conversation | null) => void;
  sendMessage: (text: string) => void;
  setCurrentUser: (user: User) => void;
  getUnreadCount: (conversationId: string) => number;
  markAsRead: (conversationId: string) => void;
  initializeChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Sample data
const tutors: User[] = [
  { id: 't1', name: 'Dr. Emily Johnson', avatar: '/placeholder.svg', role: 'tutor' },
  { id: 't2', name: 'Prof. Michael Chen', avatar: '/placeholder.svg', role: 'tutor' },
  { id: 't3', name: 'Dr. Sophia Rodriguez', avatar: '/placeholder.svg', role: 'tutor' },
];

const students: User[] = [
  { id: 's1', name: 'Alex Thompson', avatar: '/placeholder.svg', role: 'student' },
  { id: 's2', name: 'Jamie Wilson', avatar: '/placeholder.svg', role: 'student' },
  { id: 's3', name: 'Taylor Smith', avatar: '/placeholder.svg', role: 'student' },
  { id: 's4', name: 'Jordan Lee', avatar: '/placeholder.svg', role: 'student' },
];

// Initial conversations
const sampleConversations: Conversation[] = [
  {
    id: 'c1',
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

  const initializeChat = () => {
    console.log('Chat initialized');
  };

  const sendMessage = (text: string) => {
    if (!currentUser || !activeConversation) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date(),
      read: false,
    };

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === activeConversation.id) {
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
      (conv) => conv.id === activeConversation.id
    );
    
    if (updatedActiveConv) {
      setActiveConversation(updatedActiveConv);
    }

    // Simulate response after delay (for demo purposes)
    if (currentUser.role === 'student') {
      simulateTutorResponse(activeConversation.id);
    } else {
      simulateStudentResponse(activeConversation.id);
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
  };

  // Keep active conversation in sync with conversations state
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
