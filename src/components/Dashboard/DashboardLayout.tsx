
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  FileText,
  Settings,
  Users,
  GraduationCap,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useChat } from '@/contexts/ChatContext';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const location = useLocation();
  const { currentUser } = useChat();
  const role = currentUser?.role || 'student';

  const tutorNavItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/tutors' },
    { name: 'Messages', icon: MessageSquare, path: '/tutors/messages' },
    { name: 'Calendar', icon: Calendar, path: '/tutors/calendar' },
    { name: 'Resources', icon: FileText, path: '/tutors/resources' },
    { name: 'Students', icon: Users, path: '/tutors/students' },
    { name: 'Courses', icon: BookOpen, path: '/tutors/courses' },
    { name: 'Settings', icon: Settings, path: '/tutors/settings' },
  ];

  const studentNavItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/students' },
    { name: 'Messages', icon: MessageSquare, path: '/students/messages' },
    { name: 'Calendar', icon: Calendar, path: '/students/calendar' },
    { name: 'Courses', icon: BookOpen, path: '/students/courses' },
    { name: 'Assignments', icon: FileText, path: '/students/assignments' },
    { name: 'Tutors', icon: GraduationCap, path: '/students/tutors' },
    { name: 'Settings', icon: Settings, path: '/students/settings' },
  ];

  const navItems = role === 'tutor' ? tutorNavItems : studentNavItems;

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
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>

        {currentUser && (
          <div className="p-4 border-t mt-auto">
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
          {currentUser && (
            <Avatar>
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          )}
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
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {currentUser && (
            <div className="p-4 border-t mt-auto">
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
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="hidden md:block p-6 border-b bg-background sticky top-0 z-10">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};
