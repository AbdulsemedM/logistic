import { getCurrentUser, requireRole } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { RequestTable } from '@/components/requests/RequestTable';
import requestsData from '@/lib/mock-data/requests.json';
import type { TravelCardRequest } from '@/lib/types/request';

async function getOperationsRequests() {
  const requests = requestsData as TravelCardRequest[];
  // Operations can see all requests that are not pending (submitted by branch officers)
  return requests.filter((req) => req.status !== 'pending');
}

export default async function OperationsPage() {
  const user = await requireRole(['operations', 'ops_head']);
  const requests = await getOperationsRequests();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Operations Review</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Review requests for compliance and AML checks
        </p>
      </div>

      <RequestTable requests={requests} />
    </div>
  );
}










