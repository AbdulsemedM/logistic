'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import type { TravelCardRequest } from '@/lib/types/request';

interface ComplianceChecklistProps {
  request: TravelCardRequest;
}

interface ComplianceItem {
  id: string;
  label: string;
  status: 'pass' | 'fail' | 'pending';
  description: string;
}

export function ComplianceChecklist({ request }: ComplianceChecklistProps) {
  const complianceItems: ComplianceItem[] = [
    {
      id: 'kyc',
      label: 'KYC Documents',
      status: request.documents.some((d) => d.type === 'kyc' && d.verified) ? 'pass' : 'pending',
      description: 'Know Your Customer documents verified',
    },
    {
      id: 'passport',
      label: 'Passport',
      status: request.documents.some((d) => d.type === 'passport' && d.verified) ? 'pass' : 'pending',
      description: 'Valid passport document provided',
    },
    {
      id: 'visa',
      label: 'Visa',
      status: request.documents.some((d) => d.type === 'visa' && d.verified) ? 'pass' : 'pending',
      description: 'Valid visa document provided',
    },
    {
      id: 'account',
      label: 'Account Verification',
      status: request.accountInfo ? 'pass' : 'pending',
      description: 'Bank account information verified',
    },
    {
      id: 'balance',
      label: 'Balance Requirements',
      status: request.accountInfo.sixMonthAverage > 5000 ? 'pass' : 'fail',
      description: '6-month average balance meets requirements',
    },
    {
      id: 'travel_reason',
      label: 'Travel Reason',
      status: request.travelReason.length > 10 ? 'pass' : 'pending',
      description: 'Travel reason provided and valid',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pass':
        return <Badge variant="default" className="bg-green-600">Pass</Badge>;
      case 'fail':
        return <Badge variant="destructive">Fail</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-3">
      {complianceItems.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(item.status)}
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                </div>
              </div>
              {getStatusBadge(item.status)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}










