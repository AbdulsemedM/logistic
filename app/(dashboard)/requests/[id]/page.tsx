import { getCurrentUser } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { RequestDetail } from '@/components/requests/RequestDetail';
import requestsData from '@/lib/mock-data/requests.json';
import type { TravelCardRequest } from '@/lib/types/request';

async function getRequest(id: string, userRole: string): Promise<TravelCardRequest | null> {
  const requests = requestsData as TravelCardRequest[];
  const request = requests.find((r) => r.id === id);
  
  if (!request) {
    return null;
  }

  // Branch officers can only see requests they submitted
  if (userRole === 'branch_officer') {
    const canView = request.history.some((h) => h.role === 'branch_officer');
    if (!canView) {
      return null;
    }
  }

  return request;
}

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }

  const { id } = await params;
  const request = await getRequest(id, user.role);

  if (!request) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Request Details</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Review and manage travel card request
        </p>
      </div>

      <RequestDetail request={request} userRole={user.role} />
    </div>
  );
}










