
import React from 'react';
import { FileText, Camera, Video, Paperclip, Map, ContactIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AttachmentMenuProps {
  onSelect: (type: string) => void;
}

interface AttachmentOption {
  icon: React.ReactNode;
  label: string;
  type: string;
  color: string;
}

export const AttachmentMenu: React.FC<AttachmentMenuProps> = ({ onSelect }) => {
  const attachmentOptions: AttachmentOption[] = [
    { 
      icon: <FileText className="h-4 w-4" />, 
      label: 'Document', 
      type: 'document',
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950 dark:text-blue-300'
    },
    { 
      icon: <Camera className="h-4 w-4" />, 
      label: 'Photo', 
      type: 'photo',
      color: 'text-green-500 bg-green-50 dark:bg-green-950 dark:text-green-300'
    },
    { 
      icon: <Video className="h-4 w-4" />, 
      label: 'Video', 
      type: 'video',
      color: 'text-red-500 bg-red-50 dark:bg-red-950 dark:text-red-300'
    },
    { 
      icon: <ContactIcon className="h-4 w-4" />, 
      label: 'Contact', 
      type: 'contact',
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950 dark:text-purple-300'
    },
    { 
      icon: <Map className="h-4 w-4" />, 
      label: 'Location', 
      type: 'location',
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950 dark:text-amber-300'
    },
    { 
      icon: <Paperclip className="h-4 w-4" />, 
      label: 'File', 
      type: 'file',
      color: 'text-gray-500 bg-gray-50 dark:bg-gray-800 dark:text-gray-300'
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {attachmentOptions.map((option) => (
        <Button
          key={option.type}
          variant="ghost"
          className="flex flex-col items-center justify-center h-20 rounded-lg hover:bg-muted p-2"
          onClick={() => onSelect(option.type)}
        >
          <div className={`rounded-full p-2 mb-1 ${option.color}`}>
            {option.icon}
          </div>
          <span className="text-xs">{option.label}</span>
        </Button>
      ))}
    </div>
  );
};
