import { getCurrentUser, requireRole } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { OperationsDetail } from '@/components/operations/OperationsDetail';
import requestsData from '@/lib/mock-data/requests.json';
import type { TravelCardRequest } from '@/lib/types/request';

async function getRequest(id: string): Promise<TravelCardRequest | null> {
  const requests = requestsData as TravelCardRequest[];
  return requests.find((r) => r.id === id) || null;
}

export default async function OperationsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireRole(['operations', 'ops_head']);
  const { id } = await params;
  const request = await getRequest(id);

  if (!request) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Operations Review</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Compliance checks and AML review
        </p>
      </div>

      <OperationsDetail request={request} userRole={user.role} />
    </div>
  );
}










