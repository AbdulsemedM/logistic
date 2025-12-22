'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';

interface EscalationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requestId: string;
}

export function EscalationDialog({ open, onOpenChange, requestId }: EscalationDialogProps) {
  const router = useRouter();
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEscalate = async () => {
    if (!reason.trim()) {
      toast.error('Please provide an escalation reason');
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Request escalated to Operations Head');
      setReason('');
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      toast.error('Failed to escalate request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-secondary" />
            <DialogTitle>Escalate Request</DialogTitle>
          </div>
          <DialogDescription>
            Escalate this request to Operations Head for final review. Please provide a detailed reason.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Enter escalation reason (e.g., High-risk transaction pattern, compliance concerns, etc.)..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={5}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleEscalate}
            variant="default"
            disabled={loading || !reason.trim()}
          >
            {loading ? 'Escalating...' : 'Confirm Escalation'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}










