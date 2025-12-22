import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { RequestTable } from '@/components/requests/RequestTable';
import requestsData from '@/lib/mock-data/requests.json';
import type { TravelCardRequest } from '@/lib/types/request';

async function getRequests(userRole: string) {
  const requests = requestsData as TravelCardRequest[];
  
  if (userRole === 'branch_officer') {
    // Branch officers see requests they submitted
    return requests.filter((req) => 
      req.history.some((h) => h.role === 'branch_officer')
    );
  }
  
  // Operations and others see all requests
  return requests;
}

export default async function RequestsPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }

  const requests = await getRequests(user.role);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Request Inbox</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage and review travel card requests
        </p>
      </div>

      <RequestTable requests={requests} />
    </div>
  );
}










