import { getCurrentUser } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { RequestDetail } from '@/components/requests/RequestDetail';
import requestsData from '@/lib/mock-data/requests.json';
import type { TravelCardRequest } from '@/lib/types/request';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

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

  // Format application ID (e.g., TC-2023-8492)
  const formatApplicationId = (id: string) => {
    // Convert req-1 to TC-2023-8492 format
    const year = new Date().getFullYear();
    const num = id.replace('req-', '');
    return `TC-${year}-${num.padStart(4, '0')}`;
  };

  const applicationId = formatApplicationId(request.id);
  const submittedDate = new Date(request.submittedAt);
  const submittedBy = request.history.find((h) => h.action === 'submitted')?.userName || 'Unknown';

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Link href="/dashboard" className="hover:text-slate-900">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/requests" className="hover:text-slate-900">Applications</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-900 font-medium">{applicationId}</span>
      </div>

      <RequestDetail 
        request={request} 
        userRole={user.role}
        applicationId={applicationId}
        submittedDate={submittedDate}
        submittedBy={submittedBy}
      />
    </div>
  );
}










