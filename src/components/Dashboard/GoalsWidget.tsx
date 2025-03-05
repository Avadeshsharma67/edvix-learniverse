
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface Goal {
  id: string;
  title: string;
  progress: number;
  dueDate?: string;
  isCompleted: boolean;
}

interface GoalsWidgetProps {
  goals: Goal[];
  isLoading?: boolean;
  onAddGoal?: () => void;
}

const GoalsWidget = ({ goals, isLoading = false, onAddGoal }: GoalsWidgetProps) => {
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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  if (isLoading) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <div className="h-5 w-40 bg-muted rounded animate-pulse"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-48 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 w-10 bg-muted rounded animate-pulse"></div>
                </div>
                <div className="h-2 bg-muted rounded animate-pulse"></div>
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
          <Target className="mr-2 h-5 w-5 text-primary" />
          Learning Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {goals.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">No goals set yet</p>
            </div>
          ) : (
            goals.map((goal) => (
              <motion.div 
                key={goal.id} 
                className="space-y-2"
                variants={item}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {goal.isCompleted ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Target className="h-4 w-4 text-blue-500" />
                    )}
                    <span className={`text-sm font-medium ${goal.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                      {goal.title}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {goal.dueDate && !goal.isCompleted && (
                      <Badge variant="outline" className="flex items-center text-xs">
                        <Clock className="mr-1 h-3 w-3" />
                        {goal.dueDate}
                      </Badge>
                    )}
                    <span className="text-sm font-medium">
                      {goal.progress}%
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={goal.progress} className="h-2" />
                  <motion.div 
                    className={`absolute top-0 h-2 rounded-full ${goal.isCompleted ? 'bg-green-500/30' : 'bg-primary/30'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full" 
          size="sm"
          onClick={onAddGoal}
        >
          Add New Goal
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GoalsWidget;
