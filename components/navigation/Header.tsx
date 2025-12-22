import type { User } from '@/lib/types/user';
import { Badge } from '@/components/ui/badge';

export function Header({ user }: { user: User }) {
  const roleLabels: Record<string, string> = {
    branch_officer: 'Branch Officer',
    operations: 'Operations',
    ops_head: 'Operations Head',
    admin: 'Admin',
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Welcome, {user.name}</h2>
        <Badge variant="secondary">{roleLabels[user.role] || user.role}</Badge>
        {user.branch && (
          <span className="text-sm text-slate-600 dark:text-slate-400">{user.branch}</span>
        )}
      </div>
    </header>
  );
}
