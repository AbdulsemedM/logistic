import { getCurrentUser, requireRole } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ReportsDashboard } from '@/components/reports/ReportsDashboard';
import requestsData from '@/lib/mock-data/requests.json';
import type { TravelCardRequest } from '@/lib/types/request';

async function getReportsData() {
  const requests = requestsData as TravelCardRequest[];
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayApproved = requests.filter((req) => {
    if (req.status !== 'approved' || !req.approvedAt) return false;
    const approvedDate = new Date(req.approvedAt);
    approvedDate.setHours(0, 0, 0, 0);
    return approvedDate.getTime() === today.getTime();
  }).length;

  const todayRejected = requests.filter((req) => {
    if (req.status !== 'rejected' || !req.rejectedAt) return false;
    const rejectedDate = new Date(req.rejectedAt);
    rejectedDate.setHours(0, 0, 0, 0);
    return rejectedDate.getTime() === today.getTime();
  }).length;

  const totalApproved = requests.filter((req) => req.status === 'approved').length;
  const totalRejected = requests.filter((req) => req.status === 'rejected').length;
  const totalPending = requests.filter((req) => req.status === 'pending').length;
  const totalEscalated = requests.filter((req) => req.status === 'escalated').length;

  return {
    today: {
      approved: todayApproved,
      rejected: todayRejected,
    },
    total: {
      approved: totalApproved,
      rejected: totalRejected,
      pending: totalPending,
      escalated: totalEscalated,
    },
    requests,
  };
}

export default async function ReportsPage() {
  const user = await requireRole(['operations', 'ops_head', 'admin']);
  const reportsData = await getReportsData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-slate-600 dark:text-slate-400">
          View daily and total statistics for requests
        </p>
      </div>

      <ReportsDashboard data={reportsData} />
    </div>
  );
}










