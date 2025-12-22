'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { RequestStatus } from '@/lib/types/request';

interface ActionButtonsProps {
  requestId: string;
  currentStatus: RequestStatus;
}

export function ActionButtons({ requestId, currentStatus }: ActionButtonsProps) {
  const router = useRouter();
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    if (!comment.trim()) {
      toast.error('Please provide a comment');
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Request approved successfully');
      setApproveOpen(false);
      setComment('');
      router.refresh();
    } catch (error) {
      toast.error('Failed to approve request');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!comment.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Request rejected');
      setRejectOpen(false);
      setComment('');
      router.refresh();
    } catch (error) {
      toast.error('Failed to reject request');
    } finally {
      setLoading(false);
    }
  };

  if (currentStatus !== 'pending') {
    return null;
  }

  return (
    <>
      <div className="flex gap-4">
        <Button
          onClick={() => setApproveOpen(true)}
          className="flex-1"
          variant="default"
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Approve
        </Button>
        <Button
          onClick={() => setRejectOpen(true)}
          className="flex-1"
          variant="destructive"
        >
          <XCircle className="h-4 w-4 mr-2" />
          Reject
        </Button>
      </div>

      <Dialog open={approveOpen} onOpenChange={setApproveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Request</DialogTitle>
            <DialogDescription>
              Please provide a comment for this approval.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter approval comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApprove} disabled={loading || !comment.trim()}>
              {loading ? 'Approving...' : 'Confirm Approval'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejection.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter rejection reason..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleReject}
              variant="destructive"
              disabled={loading || !comment.trim()}
            >
              {loading ? 'Rejecting...' : 'Confirm Rejection'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}










