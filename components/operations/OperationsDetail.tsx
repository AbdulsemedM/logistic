'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DocumentViewer } from '@/components/documents/DocumentViewer';
import { AccountInfo } from '@/components/requests/AccountInfo';
import { ComplianceChecklist } from '@/components/operations/ComplianceChecklist';
import { AMLFlags } from '@/components/operations/AMLFlags';
import { OperationsActions } from '@/components/operations/OperationsActions';
import { FinalDecision } from '@/components/ops-head/FinalDecision';
import { HistoryTimeline } from '@/components/requests/HistoryTimeline';
import type { TravelCardRequest } from '@/lib/types/request';
import { FileText, AlertTriangle } from 'lucide-react';

interface OperationsDetailProps {
  request: TravelCardRequest;
  userRole: string;
}

const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'outline',
  under_review: 'secondary',
  approved: 'default',
  rejected: 'destructive',
  escalated: 'destructive',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  under_review: 'Under Review',
  approved: 'Approved',
  rejected: 'Rejected',
  escalated: 'Escalated',
};

export function OperationsDetail({ request, userRole }: OperationsDetailProps) {
  return (
    <div className="space-y-6">
      {/* Request Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{request.applicantName}</CardTitle>
              <CardDescription>Request ID: {request.id}</CardDescription>
            </div>
            <Badge variant={statusColors[request.status] || 'outline'}>
              {statusLabels[request.status] || request.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium">Travel Reason:</span>
              <span className="text-sm text-slate-600 dark:text-slate-400">{request.travelReason}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium">Destination:</span>
              <span className="text-sm text-slate-600 dark:text-slate-400">{request.destination}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AML Flags */}
      {request.amlFlags && request.amlFlags.length > 0 && (
        <Card className="border-secondary/30 dark:border-secondary/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-secondary" />
              <CardTitle>AML Flags</CardTitle>
            </div>
            <CardDescription>Anti-Money Laundering risk indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <AMLFlags flags={request.amlFlags} />
          </CardContent>
        </Card>
      )}

      {/* Compliance Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Checks</CardTitle>
          <CardDescription>Review compliance requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <ComplianceChecklist request={request} />
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>KYC, passport, and visa documents</CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentViewer documents={request.documents} />
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Bank account details and 6-month average</CardDescription>
        </CardHeader>
        <CardContent>
          <AccountInfo accountInfo={request.accountInfo} />
        </CardContent>
      </Card>

      {/* Operations Actions */}
      {userRole === 'operations' && request.status !== 'escalated' && (
        <Card>
          <CardContent className="pt-6">
            <OperationsActions requestId={request.id} currentStatus={request.status} />
          </CardContent>
        </Card>
      )}

      {/* Ops Head Final Decision */}
      {userRole === 'ops_head' && request.status === 'escalated' && (
        <Card>
          <CardHeader>
            <CardTitle>Final Decision</CardTitle>
            <CardDescription>Make the final decision on this escalated request</CardDescription>
          </CardHeader>
          <CardContent>
            <FinalDecision requestId={request.id} />
          </CardContent>
        </Card>
      )}

      {/* History Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Submission History</CardTitle>
          <CardDescription>Complete timeline of actions and status changes</CardDescription>
        </CardHeader>
        <CardContent>
          <HistoryTimeline history={request.history} />
        </CardContent>
      </Card>
    </div>
  );
}

