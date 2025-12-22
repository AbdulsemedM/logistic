export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  resourceType: 'request' | 'user' | 'system';
  resourceId: string;
  details: Record<string, unknown>;
  ipAddress?: string;
  timestamp: string;
}










