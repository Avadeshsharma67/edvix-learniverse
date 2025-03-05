
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ChevronRight, Users, Clock, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Activity {
  type: 'student' | 'session' | 'message' | 'review';
  content: string;
  time: string;
  actionText?: string;
  actionPath?: string;
}

interface TutorActivityWidgetProps {
  activities: Activity[];
  isLoading?: boolean;
}

const TutorActivityWidget = ({ activities, isLoading = false }: TutorActivityWidgetProps) => {
  const navigate = useNavigate();

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'student':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'session':
        return <Calendar className="h-4 w-4 text-green-500" />;
      case 'message':
        return <TrendingUp className="h-4 w-4 text-amber-500" />;
      case 'review':
        return <Clock className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <div className="h-5 w-40 bg-muted rounded animate-pulse"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 pb-3 border-b last:border-0 last:pb-0">
                <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
                  <div className="h-3 w-24 bg-muted rounded animate-pulse"></div>
                </div>
                <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div 
              key={index}
              className="flex items-center gap-3 pb-3 border-b last:border-0 last:pb-0"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-2 rounded-full bg-primary/10">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm">{activity.content}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              {activity.actionText && activity.actionPath && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate(activity.actionPath as string)}
                  className="text-xs"
                >
                  {activity.actionText}
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorActivityWidget;
