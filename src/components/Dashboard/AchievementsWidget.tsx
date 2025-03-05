
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Sparkles, Star, Trophy, Zap, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: 'star' | 'trophy' | 'zap' | 'book' | 'award';
  points: number;
  isNew?: boolean;
}

interface AchievementsWidgetProps {
  achievements: Achievement[];
  isLoading?: boolean;
}

const AchievementsWidget = ({ achievements, isLoading = false }: AchievementsWidgetProps) => {
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
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  const getIcon = (iconType: string) => {
    switch(iconType) {
      case 'star':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'trophy':
        return <Trophy className="h-5 w-5 text-amber-500" />;
      case 'zap':
        return <Zap className="h-5 w-5 text-indigo-500" />;
      case 'book':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'award':
      default:
        return <Award className="h-5 w-5 text-purple-500" />;
    }
  };

  if (isLoading) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <div className="h-5 w-40 bg-muted rounded animate-pulse"></div>
          </CardTitle>
          <div className="h-4 w-60 bg-muted rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-muted animate-pulse"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-40 bg-muted rounded animate-pulse"></div>
                  <div className="h-3 w-full bg-muted rounded animate-pulse"></div>
                  <div className="flex justify-between">
                    <div className="h-3 w-20 bg-muted rounded animate-pulse"></div>
                    <div className="h-5 w-12 bg-muted rounded-full animate-pulse"></div>
                  </div>
                </div>
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
          Achievements
        </CardTitle>
        <CardDescription>Your learning milestones and rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px]">
          <motion.div 
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {achievements.length === 0 ? (
              <div className="text-center py-8">
                <Award className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">No achievements yet</p>
              </div>
            ) : (
              achievements.map((achievement) => (
                <motion.div 
                  key={achievement.id} 
                  className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors relative"
                  variants={item}
                >
                  {achievement.isNew && (
                    <motion.div 
                      className="absolute -top-1 -right-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      <Badge className="bg-yellow-500 text-xs px-2 py-0.5 flex items-center">
                        <Sparkles className="h-3 w-3 mr-1" />
                        New
                      </Badge>
                    </motion.div>
                  )}
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {getIcon(achievement.icon)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">{achievement.date}</span>
                      <Badge variant="outline" className="text-xs">
                        +{achievement.points} points
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AchievementsWidget;
