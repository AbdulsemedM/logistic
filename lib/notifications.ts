import { toast } from 'sonner';

export function showNotification(
  type: 'success' | 'error' | 'warning' | 'info',
  message: string,
  title?: string
) {
  switch (type) {
    case 'success':
      toast.success(title || 'Success', { description: message });
      break;
    case 'error':
      toast.error(title || 'Error', { description: message });
      break;
    case 'warning':
      toast.warning(title || 'Warning', { description: message });
      break;
    case 'info':
      toast.info(title || 'Info', { description: message });
      break;
  }
}

export function notifyRequestSubmitted(requestId: string) {
  showNotification('success', `Request ${requestId} has been submitted successfully.`);
}

export function notifyRequestRejected(requestId: string) {
  showNotification('error', `Request ${requestId} has been rejected.`);
}

export function notifyRequestApproved(requestId: string) {
  showNotification('success', `Request ${requestId} has been approved.`);
}

export function notifyRequestEscalated(requestId: string) {
  showNotification('warning', `Request ${requestId} has been escalated for review.`);
}










