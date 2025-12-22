'use client';

import { Card, CardContent } from '@/components/ui/card';
import { BalanceChart } from '@/components/requests/BalanceChart';
import type { AccountInfo as AccountInfoType } from '@/lib/types/request';
import { Building2, CreditCard, TrendingUp } from 'lucide-react';

interface AccountInfoProps {
  accountInfo: AccountInfoType;
}

export function AccountInfo({ accountInfo }: AccountInfoProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <div>
                <p className="text-sm font-medium">Bank</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{accountInfo.bankName}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <div>
                <p className="text-sm font-medium">Account Number</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{accountInfo.accountNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <div>
                <p className="text-sm font-medium">6-Month Average</p>
                <p className="text-lg font-bold">${accountInfo.sixMonthAverage.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Balance Trend</h3>
          <BalanceChart data={accountInfo.monthlyBalances} />
        </CardContent>
      </Card>
    </div>
  );
}










