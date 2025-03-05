
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Users, Clock, CreditCard, TrendingUp } from 'lucide-react';

interface TutorActivityProps {
  stats: {
    totalStudents: number;
    hoursCompleted: number;
    earnings: number;
    bookingRate: number;
  };
  isLoading?: boolean;
}

const TutorActivityWidget = ({ stats, isLoading = false }: TutorActivityProps) => {
  const metrics = [
    {
      icon: <Users className="h-5 w-5 text-blue-500" />,
      label: "Students",
      value: stats.totalStudents,
    },
    {
      icon: <Clock className="h-5 w-5 text-green-500" />,
      label: "Hours",
      value: `${stats.hoursCompleted}`,
    },
    {
      icon: <CreditCard className="h-5 w-5 text-purple-500" />,
      label: "Earnings",
      value: `$${stats.earnings}`,
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-amber-500" />,
      label: "Booking Rate",
      value: `${stats.bookingRate}%`,
    },
  ];

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
            <div className="h-2 w-full bg-muted rounded animate-pulse"></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
                  <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-muted rounded animate-pulse"></div>
                </div>
              ))}
            </div>
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
          Tutoring Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Booking Rate</span>
              <span className="font-medium">{stats.bookingRate}%</span>
            </div>
            <Progress value={stats.bookingRate} className="h-2" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {metrics.map((metric, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center text-center space-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="p-2 rounded-full bg-primary/10">
                  {metric.icon}
                </div>
                <span className="text-xs text-muted-foreground">{metric.label}</span>
                <span className="text-sm font-medium">{metric.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorActivityWidget;
