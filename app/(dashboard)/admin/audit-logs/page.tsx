import { getCurrentUser, requireRole } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AuditLogTable } from '@/components/admin/AuditLogTable';
import auditLogsData from '@/lib/mock-data/audit-logs.json';
import type { AuditLog } from '@/lib/types/audit';

async function getAuditLogs() {
  return auditLogsData as AuditLog[];
}

export default async function AuditLogsPage() {
  const user = await requireRole(['admin']);
  const auditLogs = await getAuditLogs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Audit Logs</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Comprehensive activity log of all system actions
        </p>
      </div>

      <AuditLogTable auditLogs={auditLogs} />
    </div>
  );
}










