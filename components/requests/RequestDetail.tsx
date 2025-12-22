'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ActionButtons } from '@/components/requests/ActionButtons';
import { AMLFlags } from '@/components/operations/AMLFlags';
import { ComplianceChecklist } from '@/components/operations/ComplianceChecklist';
import type { TravelCardRequest } from '@/lib/types/request';
import { 
  User, 
  Plane, 
  FileText, 
  AlertTriangle, 
  CheckSquare, 
  TrendingUp,
  Calendar,
  MapPin,
  UserCheck,
  ExternalLink
} from 'lucide-react';

interface RequestDetailProps {
  request: TravelCardRequest;
  userRole: string;
  applicationId: string;
  submittedDate: Date;
  submittedBy: string;
}

const statusLabels: Record<string, string> = {
  pending: 'Pending Operations Review',
  under_review: 'Under Review',
  approved: 'Approved',
  rejected: 'Rejected',
  escalated: 'Escalated',
};

const getInitials = (name: string) => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const getAvatarColor = (name: string) => {
  const colors = [
    'bg-primary',
    'bg-secondary',
    'bg-purple-600',
    'bg-pink-600',
    'bg-indigo-600',
    'bg-teal-600',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const formatDate = (date: Date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const calculateBudget = (request: TravelCardRequest): number => {
  if (request.accountInfo?.sixMonthAverage) {
    return request.accountInfo.sixMonthAverage * 0.34;
  }
  return 4250.0;
};

const calculateBudgetPercentage = (budget: number): number => {
  // Mock calculation - 75% of quarterly allowance
  return 75;
};

export function RequestDetail({ request, userRole, applicationId, submittedDate, submittedBy }: RequestDetailProps) {
  const budget = calculateBudget(request);
  const budgetPercentage = calculateBudgetPercentage(budget);
  const travelStart = new Date(request.travelDate);
  const travelEnd = new Date(request.returnDate);
  const duration = Math.ceil((travelEnd.getTime() - travelStart.getTime()) / (1000 * 60 * 60 * 24));

  // Mock AML flags if none exist
  const amlFlags = request.amlFlags && request.amlFlags.length > 0 
    ? request.amlFlags 
    : [
        {
          id: 'flag-1',
          severity: 'medium' as const,
          type: 'Transaction Volume Spike',
          description: "Requested budget is 40% higher than user's average.",
          detectedAt: new Date().toISOString(),
        },
        {
          id: 'flag-2',
          severity: 'low' as const,
          type: 'Cross-Border Alert',
          description: 'Destination flagged for recent regulatory changes.',
          detectedAt: new Date().toISOString(),
        },
      ];

  return (
    <div className="space-y-6">
      {/* Application Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Application #{applicationId}</h1>
          <Badge className="bg-primary/20 text-primary border-0 mb-2">
            {statusLabels[request.status] || request.status}
          </Badge>
          <p className="text-sm text-slate-600 mt-2">
            Reviewing application submitted on {formatDate(submittedDate)} by {submittedBy}
          </p>
        </div>
        {(userRole === 'operations' || userRole === 'ops_head') && 
         (request.status === 'pending' || request.status === 'under_review' || request.status === 'escalated') && (
          <div className="flex flex-col gap-2">
            <ActionButtons requestId={request.id} currentStatus={request.status} />
          </div>
        )}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="col-span-2 space-y-6">
          {/* Applicant Details Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-slate-600" />
                <CardTitle className="text-lg font-semibold">Applicant Details</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                View Full Profile
                <ExternalLink className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className={`h-20 w-20 rounded-full ${getAvatarColor(request.applicantName)} flex items-center justify-center text-white font-semibold text-xl mb-4`}>
                  {getInitials(request.applicantName)}
                </div>
                <div className="space-y-2 text-center">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Full Name</p>
                    <p className="text-base font-semibold text-slate-900">{request.applicantName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Department</p>
                    <p className="text-sm text-slate-700">Global Sales</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Employee ID</p>
                    <p className="text-sm text-slate-700">EMP-{request.id.replace('req-', '').padStart(5, '0')}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Manager</p>
                    <div className="flex items-center justify-center gap-1">
                      <UserCheck className="h-3 w-3 text-slate-500" />
                      <p className="text-sm text-slate-700">Lisa Ray</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trip Information Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-slate-600" />
                <CardTitle className="text-lg font-semibold">Trip Information</CardTitle>
              </div>
              <div className="flex items-center gap-1 text-sm text-slate-600">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(travelStart)} - {formatDate(travelEnd)}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Destination</p>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <p className="text-sm text-slate-900">{request.destination}</p>
                </div>
                <p className="text-xs text-slate-600 mt-1">High Risk Zone: No</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Estimated Budget</p>
                <p className="text-2xl font-bold text-primary mb-2">${budget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</p>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-1">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${budgetPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-600">{budgetPercentage}% of quarterly allowance used</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Class</p>
                  <p className="text-sm text-slate-900">Business</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Duration</p>
                  <p className="text-sm text-slate-900">{duration} Days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Justification Card */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-3">
              <FileText className="h-5 w-5 text-slate-600" />
              <CardTitle className="text-lg font-semibold">Business Justification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 leading-relaxed">{request.travelReason}</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* AML Risk Detected Card */}
          <Card className="border-secondary/30">
            <CardHeader className="flex flex-row items-center gap-2 pb-3">
              <AlertTriangle className="h-5 w-5 text-secondary" />
              <CardTitle className="text-lg font-semibold">AML Risk Detected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                This application has flagged {amlFlags.length} potential risk{amlFlags.length > 1 ? 's' : ''} in the automated screening process.
              </p>
              <div className="space-y-3">
                {amlFlags.map((flag) => (
                  <div key={flag.id} className="flex items-start gap-2 p-3 bg-secondary/10 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-1">{flag.type}</p>
                      <p className="text-xs text-slate-600">{flag.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compliance Checklist Card */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-3">
              <CheckSquare className="h-5 w-5 text-slate-600" />
              <CardTitle className="text-lg font-semibold">Compliance Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">KYC Verification</span>
                  </div>
                  <span className="text-xs font-semibold text-green-600">PASS</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">Corporate Policy</span>
                  </div>
                  <span className="text-xs font-semibold text-green-600">PASS</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 text-xs font-bold">✗</span>
                    </div>
                    <span className="text-sm font-medium text-red-600">Receipt History</span>
                  </div>
                  <span className="text-xs font-semibold text-red-600">MISSING</span>
                </div>
                <p className="text-xs text-slate-600 mt-3">
                  User has 2 pending receipts from previous trip (TC-2023-8110).
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Workflow Card */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-3">
              <TrendingUp className="h-5 w-5 text-slate-600" />
              <CardTitle className="text-lg font-semibold">Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-xs font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Submitted</p>
                    <p className="text-xs text-slate-600">{formatDate(submittedDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-xs font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Operations Review</p>
                    <p className="text-xs text-slate-600">In Progress</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <span className="text-slate-400 text-xs font-bold">3</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-500">Approval</p>
                    <p className="text-xs text-slate-400">Pending</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}










