'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import type { AMLFlag } from '@/lib/types/request';

interface AMLFlagsProps {
  flags: AMLFlag[];
}

const severityConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; variant: 'default' | 'secondary' | 'destructive' | 'outline'; color: string }> = {
  low: {
    icon: Info,
    variant: 'outline',
    color: 'text-primary',
  },
  medium: {
    icon: AlertTriangle,
    variant: 'secondary',
    color: 'text-yellow-600',
  },
  high: {
    icon: AlertCircle,
    variant: 'destructive',
    color: 'text-secondary',
  },
  critical: {
    icon: AlertCircle,
    variant: 'destructive',
    color: 'text-red-600',
  },
};

export function AMLFlags({ flags }: AMLFlagsProps) {
  const sortedFlags = [...flags].sort((a, b) => {
    const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });

  return (
    <div className="space-y-3">
      {sortedFlags.map((flag) => {
        const config = severityConfig[flag.severity] || severityConfig.low;
        const Icon = config.icon;

        return (
          <Card key={flag.id} className="border-l-4 border-l-secondary">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <Icon className={`h-5 w-5 mt-0.5 ${config.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{flag.type}</p>
                      <Badge variant={config.variant} className="capitalize">
                        {flag.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{flag.description}</p>
                    <p className="text-xs text-slate-500 mt-2">
                      Detected: {new Date(flag.detectedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}










