'use client';

import type { HistoryEntry } from '@/lib/types/request';
import { CheckCircle2, XCircle, Clock, AlertCircle, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HistoryTimelineProps {
  history: HistoryEntry[];
}

const actionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  submitted: FileText,
  approved: CheckCircle2,
  rejected: XCircle,
  recommendation_added: FileText,
  escalated: AlertCircle,
  reviewed: Clock,
};

const actionColors: Record<string, string> = {
  submitted: 'text-primary',
  approved: 'text-green-600',
  rejected: 'text-red-600',
  recommendation_added: 'text-purple-600',
  escalated: 'text-secondary',
  reviewed: 'text-yellow-600',
};

export function HistoryTimeline({ history }: HistoryTimelineProps) {
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  if (sortedHistory.length === 0) {
    return <p className="text-sm text-slate-600 dark:text-slate-400">No history available</p>;
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800" />
      <div className="space-y-6">
        {sortedHistory.map((entry, index) => {
          const Icon = actionIcons[entry.action] || FileText;
          const iconColor = actionColors[entry.action] || 'text-slate-600';

          return (
            <div key={entry.id} className="relative flex gap-4">
              <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-slate-950 ${iconColor}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{entry.userName}</p>
                    <Badge variant="outline" className="text-xs">
                      {entry.role.replace('_', ' ')}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    {new Date(entry.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                  {entry.action.replace('_', ' ')}
                </p>
                {entry.comment && (
                  <p className="text-sm text-slate-700 dark:text-slate-300 italic">
                    "{entry.comment}"
                  </p>
                )}
                {entry.status && (
                  <Badge variant="outline" className="mt-2">
                    Status: {entry.status.replace('_', ' ')}
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}










