import { getCurrentUser, requireRole } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { EscalatedRequests } from '@/components/ops-head/EscalatedRequests';
import requestsData from '@/lib/mock-data/requests.json';
import type { TravelCardRequest } from '@/lib/types/request';

async function getEscalatedRequests() {
  const requests = requestsData as TravelCardRequest[];
  return requests.filter((req) => req.status === 'escalated');
}

export default async function OpsHeadPendingPage() {
  const user = await requireRole(['ops_head']);
  const requests = await getEscalatedRequests();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Escalated Requests</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Review escalated requests requiring final decision
        </p>
      </div>

      <EscalatedRequests requests={requests} />
    </div>
  );
}
