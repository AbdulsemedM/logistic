'use client';

import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { X, CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface BannerProps {
  type: NotificationType;
  title: string;
  message?: string;
  onDismiss?: () => void;
  autoDismiss?: boolean;
  duration?: number;
}

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100',
  error: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100',
  warning: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100',
  info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100',
};

export function Banner({
  type,
  title,
  message,
  onDismiss,
  autoDismiss = true,
  duration = 5000,
}: BannerProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoDismiss && visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        onDismiss?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoDismiss, duration, onDismiss, visible]);

  if (!visible) return null;

  const Icon = icons[type];

  return (
    <Alert className={cn('relative', styles[type])}>
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 mt-0.5" />
        <div className="flex-1">
          <AlertTitle>{title}</AlertTitle>
          {message && <AlertDescription className="mt-1">{message}</AlertDescription>}
        </div>
        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => {
              setVisible(false);
              onDismiss();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Alert>
  );
}










