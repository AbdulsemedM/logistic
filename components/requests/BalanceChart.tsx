'use client';

interface BalanceChartProps {
  data: { month: string; balance: number }[];
}

export function BalanceChart({ data }: BalanceChartProps) {
  const maxBalance = Math.max(...data.map((d) => d.balance));
  const minBalance = Math.min(...data.map((d) => d.balance));
  const range = maxBalance - minBalance || 1;

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-2 h-48">
        {data.map((item, index) => {
          const height = ((item.balance - minBalance) / range) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full h-full flex items-end">
                <div
                  className="w-full bg-primary rounded-t transition-all hover:opacity-80"
                  style={{ height: `${height}%`, minHeight: '4px' }}
                  title={`${item.month}: $${item.balance.toLocaleString()}`}
                />
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short' })}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
        <span>Min: ${minBalance.toLocaleString()}</span>
        <span>Max: ${maxBalance.toLocaleString()}</span>
      </div>
    </div>
  );
}










