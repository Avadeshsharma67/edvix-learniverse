
import React, { useState } from 'react';
import { useAuth, AuthLogEntry } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Search, Filter, Calendar, User, LogIn, UserPlus, LogOut } from 'lucide-react';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function AuthLogs() {
  const { authLogs } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterMethod, setFilterMethod] = useState<string>('all');

  // Get stats for the dashboard
  const totalLogs = authLogs.length;
  const successfulLogins = authLogs.filter(log => log.action === 'login' && log.success).length;
  const registrations = authLogs.filter(log => log.action === 'register' && log.success).length;
  const phoneAuthCount = authLogs.filter(log => log.method === 'phone' && log.success).length;
  const emailAuthCount = authLogs.filter(log => log.method === 'email' && log.success).length;
  const studentCount = authLogs.filter(log => log.role === 'student' && log.success).length;
  const tutorCount = authLogs.filter(log => log.role === 'tutor' && log.success).length;

  // Filter logs based on search and filters
  const filteredLogs = authLogs.filter(log => {
    // Search term filter
    const searchMatch = 
      log.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userAgent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;

    // Action filter
    const actionMatch = filterAction === 'all' || log.action === filterAction;
    
    // Role filter
    const roleMatch = filterRole === 'all' || log.role === filterRole;
    
    // Method filter
    const methodMatch = filterMethod === 'all' || log.method === filterMethod;

    return searchMatch && actionMatch && roleMatch && methodMatch;
  });

  // Download logs as CSV
  const downloadCSV = () => {
    // Create CSV header
    const headers = [
      'ID', 'Timestamp', 'User ID', 'Action', 'Method', 
      'Role', 'Success', 'User Agent', 'Details'
    ];
    
    // Create CSV rows
    const rows = authLogs.map(log => [
      log.id,
      log.timestamp.toISOString(),
      log.userId || '',
      log.action,
      log.method,
      log.role,
      log.success ? 'Yes' : 'No',
      log.userAgent,
      log.details || ''
    ]);
    
    // Combine header and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `auth_logs_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'login': return <LogIn className="h-4 w-4" />;
      case 'register': return <UserPlus className="h-4 w-4" />;
      case 'logout': return <LogOut className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string, success: boolean) => {
    if (!success) return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    
    switch (action) {
      case 'login': return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case 'register': return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case 'logout': return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Authentication Logs</h1>
        <p className="text-muted-foreground">
          Track and analyze user authentication activities for marketing insights
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Authentications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLogs}</div>
            <p className="text-xs text-muted-foreground">
              {successfulLogins} logins, {registrations} registrations
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Authentication Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xl font-bold">{emailAuthCount}</div>
                <p className="text-xs text-muted-foreground">Email</p>
              </div>
              <div>
                <div className="text-xl font-bold">{phoneAuthCount}</div>
                <p className="text-xs text-muted-foreground">Phone</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">User Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xl font-bold">{studentCount}</div>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
              <div>
                <div className="text-xl font-bold">{tutorCount}</div>
                <p className="text-xs text-muted-foreground">Tutors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalLogs ? Math.round((successfulLogins + registrations) / totalLogs * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Successful auth attempts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={filterAction} onValueChange={setFilterAction}>
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Action</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="login">Login</SelectItem>
              <SelectItem value="register">Register</SelectItem>
              <SelectItem value="logout">Logout</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Role</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="tutor">Tutor</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterMethod} onValueChange={setFilterMethod}>
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Method</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={downloadCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Logs table */}
      <Card>
        <CardHeader>
          <CardTitle>Authentication Logs</CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} of {totalLogs} logs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredLogs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap">
                      {format(log.timestamp, 'MMM dd, yyyy HH:mm:ss')}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={getActionColor(log.action, log.success)}
                      >
                        <span className="flex items-center gap-1">
                          {getActionIcon(log.action)}
                          {log.action.charAt(0).toUpperCase() + log.action.slice(1)}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {log.userId || 'Unknown'}
                    </TableCell>
                    <TableCell className="capitalize">{log.role}</TableCell>
                    <TableCell className="capitalize">{log.method}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {log.details || (log.success ? 'Successful' : 'Failed')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <Search className="h-8 w-8 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No matching logs found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
