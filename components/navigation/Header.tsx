'use client';

import type { User } from '@/lib/types/user';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Bell, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Header({ user }: { user: User }) {
  const router = useRouter();
  const roleLabels: Record<string, string> = {
    branch_officer: 'Branch Officer',
    operations: 'Operations',
    ops_head: 'Approver',
    admin: 'Admin',
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center gap-6 flex-1">
        <h2 className="text-lg font-bold">Dashboard Overview</h2>
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search applications..."
              className="pl-10 rounded-lg border-slate-200 bg-slate-50"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Bell className="h-5 w-5 text-slate-600 cursor-pointer hover:text-slate-900" />
        <Badge className="bg-primary text-primary-foreground px-3 py-1">
          {roleLabels[user.role] || user.role}
        </Badge>
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-slate-900">{user.name}</span>
          {user.branch && (
            <span className="text-xs text-slate-600">{user.branch}</span>
          )}
        </div>
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="h-9 w-9 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
