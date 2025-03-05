
import React from 'react';
import { FileText, Camera, Video, Paperclip, Map, ContactIcon, FileSpreadsheet, Calendar, Music, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AttachmentMenuProps {
  onSelect: (type?: string) => void;
}

interface AttachmentOption {
  icon: React.ReactNode;
  label: string;
  type: string;
  color: string;
  tooltip?: string;
}

export const AttachmentMenu: React.FC<AttachmentMenuProps> = ({ onSelect }) => {
  const attachmentOptions: AttachmentOption[] = [
    { 
      icon: <FileText className="h-4 w-4" />, 
      label: 'Document', 
      type: 'document',
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950 dark:text-blue-300',
      tooltip: 'Share PDF, Word or text documents'
    },
    { 
      icon: <Camera className="h-4 w-4" />, 
      label: 'Photo', 
      type: 'photo',
      color: 'text-green-500 bg-green-50 dark:bg-green-950 dark:text-green-300',
      tooltip: 'Share images from your device'
    },
    { 
      icon: <Video className="h-4 w-4" />, 
      label: 'Video', 
      type: 'video',
      color: 'text-red-500 bg-red-50 dark:bg-red-950 dark:text-red-300',
      tooltip: 'Share video files'
    },
    { 
      icon: <ContactIcon className="h-4 w-4" />, 
      label: 'Contact', 
      type: 'contact',
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950 dark:text-purple-300',
      tooltip: 'Share contact information'
    },
    { 
      icon: <Map className="h-4 w-4" />, 
      label: 'Location', 
      type: 'location',
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950 dark:text-amber-300',
      tooltip: 'Share your current location'
    },
    { 
      icon: <Calendar className="h-4 w-4" />, 
      label: 'Schedule', 
      type: 'schedule',
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950 dark:text-indigo-300',
      tooltip: 'Schedule a meeting'
    },
    { 
      icon: <FileSpreadsheet className="h-4 w-4" />, 
      label: 'Spreadsheet', 
      type: 'spreadsheet',
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300',
      tooltip: 'Share Excel or CSV files'
    },
    { 
      icon: <Music className="h-4 w-4" />, 
      label: 'Audio', 
      type: 'audio',
      color: 'text-pink-500 bg-pink-50 dark:bg-pink-950 dark:text-pink-300',
      tooltip: 'Share audio recordings or music'
    },
    { 
      icon: <Upload className="h-4 w-4" />, 
      label: 'Other', 
      type: 'file',
      color: 'text-gray-500 bg-gray-50 dark:bg-gray-800 dark:text-gray-300',
      tooltip: 'Upload any other file type'
    },
  ];

  return (
    <div className="bg-card border rounded-lg shadow-md p-3 w-[280px]">
      <div className="mb-2 px-1">
        <h3 className="text-sm font-medium">Attach files</h3>
        <p className="text-xs text-muted-foreground">Select the type of content to share</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {attachmentOptions.map((option) => (
          <TooltipProvider key={option.type}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex flex-col items-center justify-center h-[70px] rounded-lg hover:bg-muted p-2"
                  onClick={() => onSelect(option.type)}
                >
                  <div className={`rounded-full p-2 mb-1 ${option.color}`}>
                    {option.icon}
                  </div>
                  <span className="text-xs mt-1">{option.label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{option.tooltip || option.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default AttachmentMenu;
