import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Inbox,
  FileCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';

interface StatsCardsProps {
  stats: {
    pending: number;
    underReview: number;
    approved: number;
    rejected: number;
    escalated: number;
    total: number;
  };
  role: string;
}

export function StatsCards({ stats, role }: StatsCardsProps) {
  const cards = [
    {
      title: 'Pending',
      value: stats.pending,
      description: 'Awaiting review',
      icon: Inbox,
      variant: 'default' as const,
    },
    {
      title: 'Under Review',
      value: stats.underReview,
      description: 'In progress',
      icon: FileCheck,
      variant: 'secondary' as const,
    },
    {
      title: 'Approved',
      value: stats.approved,
      description: 'Completed',
      icon: CheckCircle2,
      variant: 'default' as const,
    },
    {
      title: 'Rejected',
      value: stats.rejected,
      description: 'Declined',
      icon: XCircle,
      variant: 'destructive' as const,
    },
  ];

  if (role === 'ops_head' || role === 'operations') {
    cards.push({
      title: 'Escalated',
      value: stats.escalated,
      description: 'Requires attention',
      icon: AlertTriangle,
      variant: 'destructive' as const,
    });
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <Icon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {card.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}


