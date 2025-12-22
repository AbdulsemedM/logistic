'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/EmptyState';
import type { TravelCardRequest } from '@/lib/types/request';
import { AlertTriangle, Eye } from 'lucide-react';

interface EscalatedRequestsProps {
  requests: TravelCardRequest[];
}

export function EscalatedRequests({ requests }: EscalatedRequestsProps) {
  if (requests.length === 0) {
    return (
      <EmptyState
        title="No escalated requests"
        description="There are no escalated requests pending review at this time."
      />
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id} className="border-orange-200 dark:border-orange-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  {request.applicantName}
                </CardTitle>
                <CardDescription>Request ID: {request.id}</CardDescription>
              </div>
              <Badge variant="destructive">Escalated</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">Destination</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{request.destination}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Travel Date</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {new Date(request.travelDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {request.escalationReason && (
                <div className="rounded-lg bg-orange-50 dark:bg-orange-950 p-3">
                  <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                    Escalation Reason:
                  </p>
                  <p className="text-sm text-orange-800 dark:text-orange-200 mt-1">
                    {request.escalationReason}
                  </p>
                </div>
              )}
              {request.amlFlags && request.amlFlags.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">AML Flags: {request.amlFlags.length}</p>
                  <div className="flex gap-2">
                    {request.amlFlags.map((flag) => (
                      <Badge key={flag.id} variant="destructive" className="capitalize">
                        {flag.severity}: {flag.type}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-end">
                <Link href={`/operations/${request.id}`}>
                  <Button>
                    <Eye className="h-4 w-4 mr-2" />
                    Review Request
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}










