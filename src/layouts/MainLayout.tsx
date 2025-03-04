import {
  AlignJustify,
  BarChart2,
  Bell,
  Book,
  Calendar,
  CheckSquare,
  Compass,
  Headphones,
  HelpCircle,
  Home,
  List,
  MessageSquare,
  Plus,
  Settings,
  Shield,
  User,
  Users,
} from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Sidebar */}
      <div className="w-64 border-r border-zinc-200 dark:border-zinc-700 hidden md:block">
        <div className="p-4">
          <Link to="/" className="flex items-center text-lg font-semibold">
            <img src="/logo.svg" alt="EdVix Logo" className="h-8 w-auto mr-2" />
            EdVix
          </Link>
        </div>
        <ul className="space-y-2 p-4">
          <li>
            <Link to="/" className="hover:text-primary flex items-center">
              <Home className="h-5 w-5 mr-2" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/students" className="hover:text-primary flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span>Students</span>
            </Link>
          </li>
          <li>
            <Link to="/tutors" className="hover:text-primary flex items-center">
              <User className="h-5 w-5 mr-2" />
              <span>Tutors</span>
            </Link>
          </li>
          <li>
            <Link to="/courses" className="hover:text-primary flex items-center">
              <Book className="h-5 w-5 mr-2" />
              <span>Courses</span>
            </Link>
          </li>
          <li>
            <Link to="/chat" className="hover:text-primary flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              <span>Chat</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/logs" className="hover:text-primary flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span>Auth Logs</span>
            </Link>
          </li>
        </ul>
        <div className="border-t border-zinc-200 dark:border-zinc-700 p-4">
          <Link to="/settings" className="hover:text-primary flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            <span>Settings</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button className="md:hidden mr-3">
              <AlignJustify className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-5 w-5" />
            <img
              src="/placeholder.svg"
              alt="User Avatar"
              className="h-8 w-8 rounded-full"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-zinc-100 dark:bg-zinc-900/50">
          <div className="container mx-auto p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
