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
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import type { RequestStatus } from '@/lib/types/request';

interface ActionButtonsProps {
  requestId: string;
  currentStatus: RequestStatus;
}

export function ActionButtons({ requestId, currentStatus }: ActionButtonsProps) {
  const router = useRouter();
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [escalateOpen, setEscalateOpen] = useState(false);
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

  const handleEscalate = async () => {
    if (!comment.trim()) {
      toast.error('Please provide a reason for escalation');
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Request escalated to Senior Operations');
      setEscalateOpen(false);
      setComment('');
      router.refresh();
    } catch (error) {
      toast.error('Failed to escalate request');
    } finally {
      setLoading(false);
    }
  };

  if (currentStatus === 'approved' || currentStatus === 'rejected') {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => setRejectOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <XCircle className="h-4 w-4 mr-2" />
          X Reject
        </Button>
        <Button
          onClick={() => setEscalateOpen(true)}
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Escalate to Snr. Ops
        </Button>
        <Button
          onClick={() => setApproveOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Approve Application
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
            <Button 
              onClick={handleApprove} 
              disabled={loading || !comment.trim()}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
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
              className="bg-red-600 hover:bg-red-700"
              disabled={loading || !comment.trim()}
            >
              {loading ? 'Rejecting...' : 'Confirm Rejection'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={escalateOpen} onOpenChange={setEscalateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Escalate to Senior Operations</DialogTitle>
            <DialogDescription>
              Please provide a reason for escalating this request.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter escalation reason..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEscalateOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleEscalate}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              disabled={loading || !comment.trim()}
            >
              {loading ? 'Escalating...' : 'Confirm Escalation'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}










