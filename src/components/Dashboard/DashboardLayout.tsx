
import React, { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  FileText,
  Settings,
  Users,
  GraduationCap,
  BookOpen,
  Bell,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useChat } from '@/contexts/ChatContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, conversations, getUnreadCount } = useChat();
  const { toast } = useToast();
  const [totalUnread, setTotalUnread] = useState(0);
  const role = currentUser?.role || 'student';

  // Calculate total unread messages
  useEffect(() => {
    if (conversations) {
      const total = conversations.reduce((acc, conv) => {
        return acc + getUnreadCount(conv.id);
      }, 0);
      setTotalUnread(total);
    }
  }, [conversations, getUnreadCount]);

  const tutorNavItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/tutors', notification: 0 },
    { name: 'Messages', icon: MessageSquare, path: '/tutors/messages', notification: totalUnread },
    { name: 'Calendar', icon: Calendar, path: '/tutors/calendar', notification: 0 },
    { name: 'Resources', icon: FileText, path: '/tutors/resources', notification: 0 },
    { name: 'Students', icon: Users, path: '/tutors/students', notification: 0 },
    { name: 'Courses', icon: BookOpen, path: '/tutors/courses', notification: 0 },
    { name: 'Settings', icon: Settings, path: '/tutors/settings', notification: 0 },
  ];

  const studentNavItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/students', notification: 0 },
    { name: 'Messages', icon: MessageSquare, path: '/students/messages', notification: totalUnread },
    { name: 'Calendar', icon: Calendar, path: '/students/calendar', notification: 0 },
    { name: 'Courses', icon: BookOpen, path: '/students/courses', notification: 0 },
    { name: 'Assignments', icon: FileText, path: '/students/assignments', notification: 2 },
    { name: 'Tutors', icon: GraduationCap, path: '/students/tutors', notification: 0 },
    { name: 'Settings', icon: Settings, path: '/students/settings', notification: 0 },
  ];

  const navItems = role === 'tutor' ? tutorNavItems : studentNavItems;

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/');
  };

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: totalUnread > 0 
        ? `You have ${totalUnread} unread messages` 
        : "You have no new notifications",
    });
  };

  return (
    <div className="min-h-screen bg-muted/20 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-background border-r h-screen sticky top-0">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-accent">EdVix Dashboard</h1>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link to={item.path} key={item.name}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 font-normal",
                    isActive ? "bg-muted" : ""
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.notification > 0 && (
                    <Badge variant="destructive" className="ml-auto py-0 px-1.5 h-5 min-w-5 flex items-center justify-center">
                      {item.notification}
                    </Badge>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        {currentUser && (
          <div className="p-4 border-t mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback>
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{currentUser.name}</span>
                  <span className="text-sm text-muted-foreground capitalize">{currentUser.role}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <header className="sticky top-0 z-10 md:hidden flex items-center justify-between p-4 border-b bg-background">
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </Button>
          </SheetTrigger>
          <h1 className="text-lg font-semibold">{title}</h1>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleNotificationClick}>
              <div className="relative">
                <Bell className="h-5 w-5" />
                {totalUnread > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {totalUnread}
                  </span>
                )}
              </div>
            </Button>
            
            {currentUser && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-accent">EdVix Dashboard</h1>
          </div>
          
          <nav className="flex-1 py-6 px-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link to={item.path} key={item.name}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 font-normal",
                      isActive ? "bg-muted" : ""
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="flex-1 text-left">{item.name}</span>
                    {item.notification > 0 && (
                      <Badge variant="destructive" className="ml-auto py-0 px-1.5 h-5 min-w-5 flex items-center justify-center">
                        {item.notification}
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {currentUser && (
            <div className="p-4 border-t mt-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{currentUser.name}</span>
                    <span className="text-sm text-muted-foreground capitalize">{currentUser.role}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="hidden md:block p-6 border-b bg-background sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleNotificationClick}>
                <div className="relative">
                  <Bell className="h-5 w-5" />
                  {totalUnread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {totalUnread}
                    </span>
                  )}
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};
