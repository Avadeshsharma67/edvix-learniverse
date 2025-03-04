
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

// Common emoji groups for basic implementation
const emojiGroups = {
  smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙'],
  people: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '👍', '👎'],
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒'],
  food: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🌶️'],
  activities: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁'],
  travel: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🛴', '🚲', '🛵', '🏍️', '🛺', '🚡'],
  objects: ['⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '📷', '📸', '📹', '🎥', '📽️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️'],
  symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❤️‍🔥', '❤️‍🩹', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝'],
};

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  return (
    <div className="p-2">
      <h4 className="font-medium text-sm mb-2">Emoji</h4>
      <Tabs defaultValue="smileys" className="w-full">
        <TabsList className="grid grid-cols-8 h-8">
          <TabsTrigger value="smileys" className="px-1">😀</TabsTrigger>
          <TabsTrigger value="people" className="px-1">👋</TabsTrigger>
          <TabsTrigger value="animals" className="px-1">🐶</TabsTrigger>
          <TabsTrigger value="food" className="px-1">🍎</TabsTrigger>
          <TabsTrigger value="activities" className="px-1">⚽</TabsTrigger>
          <TabsTrigger value="travel" className="px-1">🚗</TabsTrigger>
          <TabsTrigger value="objects" className="px-1">💻</TabsTrigger>
          <TabsTrigger value="symbols" className="px-1">❤️</TabsTrigger>
        </TabsList>
        
        {Object.entries(emojiGroups).map(([category, emojis]) => (
          <TabsContent key={category} value={category} className="mt-2">
            <ScrollArea className="h-44">
              <div className="grid grid-cols-6 gap-1">
                {emojis.map((emoji, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 rounded-md"
                    onClick={() => onEmojiSelect(emoji)}
                  >
                    <span className="text-lg">{emoji}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
