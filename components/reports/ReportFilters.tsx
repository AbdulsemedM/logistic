'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { TravelCardRequest } from '@/lib/types/request';

interface ReportFiltersProps {
  requests: TravelCardRequest[];
  onFilterChange: (filtered: TravelCardRequest[]) => void;
}

export function ReportFilters({ requests, onFilterChange }: ReportFiltersProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    let filtered = [...requests];

    if (statusFilter !== 'all') {
      filtered = filtered.filter((req) => req.status === statusFilter);
    }

    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      filtered = filtered.filter((req) => new Date(req.submittedAt) >= fromDate);
    }

    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((req) => new Date(req.submittedAt) <= toDate);
    }

    onFilterChange(filtered);
  }, [statusFilter, dateFrom, dateTo, requests, onFilterChange]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="under_review">Under Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="escalated">Escalated</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="dateFrom">From Date</Label>
        <Input
          id="dateFrom"
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dateTo">To Date</Label>
        <Input
          id="dateTo"
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </div>
    </div>
  );
}










