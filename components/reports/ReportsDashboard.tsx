'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ReportFilters } from '@/components/reports/ReportFilters';
import { ExportButton } from '@/components/reports/ExportButton';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';
import type { TravelCardRequest } from '@/lib/types/request';

interface ReportsDashboardProps {
  data: {
    today: {
      approved: number;
      rejected: number;
    };
    total: {
      approved: number;
      rejected: number;
      pending: number;
      escalated: number;
    };
    requests: TravelCardRequest[];
  };
}

export function ReportsDashboard({ data }: ReportsDashboardProps) {
  const [filteredRequests, setFilteredRequests] = useState(data.requests);

  return (
    <div className="space-y-6">
      {/* Today's Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Today's Approved
            </CardTitle>
            <CardDescription>Requests approved today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.today.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              Today's Rejected
            </CardTitle>
            <CardDescription>Requests rejected today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.today.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* Total Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Total Statistics</CardTitle>
          <CardDescription>Overall request statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Approved</p>
                <p className="text-2xl font-bold">{data.total.approved}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <XCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium">Rejected</p>
                <p className="text-2xl font-bold">{data.total.rejected}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold">{data.total.pending}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-sm font-medium">Escalated</p>
                <p className="text-2xl font-bold">{data.total.escalated}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Export */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Request Details</CardTitle>
              <CardDescription>Filter and export request data</CardDescription>
            </div>
            <ExportButton requests={filteredRequests} />
          </div>
        </CardHeader>
        <CardContent>
          <ReportFilters
            requests={data.requests}
            onFilterChange={setFilteredRequests}
          />
          <div className="mt-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Showing {filteredRequests.length} of {data.requests.length} requests
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}










