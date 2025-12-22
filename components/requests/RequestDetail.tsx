'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DocumentViewer } from '@/components/documents/DocumentViewer';
import { AccountInfo } from '@/components/requests/AccountInfo';
import { RecommendationForm } from '@/components/requests/RecommendationForm';
import { ActionButtons } from '@/components/requests/ActionButtons';
import { HistoryTimeline } from '@/components/requests/HistoryTimeline';
import type { TravelCardRequest } from '@/lib/types/request';
import { Calendar, Mail, Phone, MapPin, FileText } from 'lucide-react';

interface RequestDetailProps {
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

export function RequestDetail({ request, userRole }: RequestDetailProps) {
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
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{request.applicantEmail}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{request.applicantPhone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Destination</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{request.destination}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Travel Dates</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {new Date(request.travelDate).toLocaleDateString()} - {new Date(request.returnDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">Travel Reason</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{request.travelReason}</p>
            </div>
          </div>
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

      {/* Recommendations */}
      {userRole === 'branch_officer' && (
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Add your recommendation for this request</CardDescription>
          </CardHeader>
          <CardContent>
            <RecommendationForm requestId={request.id} existingRecommendations={request.recommendations} />
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      {userRole === 'branch_officer' && request.status === 'pending' && (
        <Card>
          <CardContent className="pt-6">
            <ActionButtons requestId={request.id} currentStatus={request.status} />
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










