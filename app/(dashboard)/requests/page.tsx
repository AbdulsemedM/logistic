import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { RequestTable } from '@/components/requests/RequestTable';
import requestsData from '@/lib/mock-data/requests.json';
import type { TravelCardRequest } from '@/lib/types/request';
import { Button } from '@/components/ui/button';
import { Download, Plus } from 'lucide-react';
import Link from 'next/link';

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
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Request Inbox</h1>
          <p className="text-slate-600 mt-1">
            Manage, review, and track travel card application requests.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </div>
      </div>

      <RequestTable requests={requests} />
    </div>
  );
}










