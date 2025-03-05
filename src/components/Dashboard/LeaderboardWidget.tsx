
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LeaderEntry {
  id: string;
  name: string;
  avatar: string;
  score: number;
  position: number;
  isCurrentUser?: boolean;
}

interface LeaderboardWidgetProps {
  title: string;
  description: string;
  entries: LeaderEntry[];
  isLoading?: boolean;
  onViewAll?: () => void;
}

const LeaderboardWidget = ({ 
  title, 
  description, 
  entries, 
  isLoading = false,
  onViewAll
}: LeaderboardWidgetProps) => {
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  const getPositionIcon = (position: number) => {
    switch(position) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <Badge variant="outline" className="px-2 py-1 text-xs">{position}</Badge>;
    }
  };
  
  if (isLoading) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <div className="h-6 w-40 bg-muted rounded animate-pulse mb-2"></div>
          <div className="h-4 w-60 bg-muted rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-muted animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                    <div className="h-3 w-16 bg-muted rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="h-6 w-10 bg-muted rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Award className="mr-2 h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px]">
          <motion.div 
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {entries.map((entry) => (
              <motion.div 
                key={entry.id} 
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  entry.isCurrentUser 
                    ? 'bg-primary/10 border border-primary/20' 
                    : 'hover:bg-muted/50'
                }`}
                variants={item}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getPositionIcon(entry.position)}
                  </div>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={entry.avatar} />
                      <AvatarFallback>{entry.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className={`font-medium ${entry.isCurrentUser ? 'text-primary' : ''}`}>
                        {entry.name}
                      </p>
                      {entry.isCurrentUser && (
                        <p className="text-xs text-muted-foreground">You</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="font-semibold">{entry.score}</div>
              </motion.div>
            ))}
          </motion.div>
        </ScrollArea>
      </CardContent>
      {onViewAll && (
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full" 
            size="sm"
            onClick={onViewAll}
          >
            View Complete Leaderboard
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default LeaderboardWidget;
