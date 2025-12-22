import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import requestsData from '@/lib/mock-data/requests.json';
import type { TravelCardRequest } from '@/lib/types/request';

async function getDashboardStats(userRole: string) {
  const requests = requestsData as TravelCardRequest[];
  
  let filteredRequests = requests;
  if (userRole === 'branch_officer') {
    // Branch officers see requests they submitted
    filteredRequests = requests.filter((req) => 
      req.history.some((h) => h.role === 'branch_officer')
    );
  }

  const pending = filteredRequests.filter((r) => r.status === 'pending').length;
  const underReview = filteredRequests.filter((r) => r.status === 'under_review').length;
  const approved = filteredRequests.filter((r) => r.status === 'approved').length;
  const rejected = filteredRequests.filter((r) => r.status === 'rejected').length;
  const escalated = filteredRequests.filter((r) => r.status === 'escalated').length;

  return {
    pending,
    underReview,
    approved,
    rejected,
    escalated,
    total: filteredRequests.length,
  };
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }

  const stats = await getDashboardStats(user.role);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Overview of your requests and activities
        </p>
      </div>

      <StatsCards stats={stats} role={user.role} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates on requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requestsData.slice(0, 5).map((request: any) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between border-b border-slate-200 pb-3 last:border-0 dark:border-slate-800"
                >
                  <div>
                    <p className="font-medium">{request.applicantName}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {request.destination}
                    </p>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {new Date(request.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a
                href="/requests"
                className="block rounded-lg border border-slate-200 p-3 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
              >
                <p className="font-medium">View Request Inbox</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Review pending requests
                </p>
              </a>
              {user.role === 'operations' && (
                <a
                  href="/operations"
                  className="block rounded-lg border border-slate-200 p-3 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                >
                  <p className="font-medium">Operations Review</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Compliance and AML checks
                  </p>
                </a>
              )}
              {user.role === 'ops_head' && (
                <a
                  href="/ops-head/pending"
                  className="block rounded-lg border border-slate-200 p-3 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                >
                  <p className="font-medium">Escalated Requests</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Review escalated cases
                  </p>
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
