'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AuditLog } from '@/lib/types/audit';
import { Clock, User, FileText } from 'lucide-react';

interface ActivityLogProps {
  logs: AuditLog[];
  userId?: string;
}

export function ActivityLog({ logs, userId }: ActivityLogProps) {
  const filteredLogs = userId
    ? logs.filter((log) => log.userId === userId)
    : logs;

  const recentLogs = filteredLogs
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  if (recentLogs.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-slate-600 dark:text-slate-400">
          No activity logs available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          {userId ? 'User Activity' : 'Recent Activity'}
        </CardTitle>
        <CardDescription>
          {userId ? 'Activity log for this user' : 'Latest system activities'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 border-b border-slate-200 pb-3 last:border-0 dark:border-slate-800"
            >
              <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-2">
                <FileText className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{log.userName}</span>
                  <Badge variant="outline" className="text-xs">
                    {log.userRole.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                  {log.action.replace('_', ' ')} - {log.resourceType}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}










