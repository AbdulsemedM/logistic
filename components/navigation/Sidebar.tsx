'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { User } from '@/lib/types/user';
import {
  LayoutDashboard,
  Inbox,
  FileCheck,
  AlertCircle,
  BarChart3,
  Users,
  FileText,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['branch_officer', 'operations', 'ops_head', 'admin'],
  },
  {
    title: 'Request Inbox',
    href: '/requests',
    icon: Inbox,
    roles: ['branch_officer', 'operations'],
  },
  {
    title: 'Operations',
    href: '/operations',
    icon: FileCheck,
    roles: ['operations'],
  },
  {
    title: 'Escalated Requests',
    href: '/ops-head/pending',
    icon: AlertCircle,
    roles: ['ops_head'],
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: BarChart3,
    roles: ['operations', 'ops_head', 'admin'],
  },
  {
    title: 'User Management',
    href: '/admin/users',
    icon: Users,
    roles: ['admin'],
  },
  {
    title: 'Audit Logs',
    href: '/admin/audit-logs',
    icon: FileText,
    roles: ['admin'],
  },
];

export function Sidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const router = useRouter();

  const filteredNavItems = navItems.filter((item) => item.roles.includes(user.role));

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="flex h-16 items-center border-b border-slate-200 px-6 dark:border-slate-800">
        <h1 className="text-xl font-bold">Travler Card</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground dark:bg-primary/20 dark:text-primary'
                  : 'text-slate-600 hover:bg-primary/10 hover:text-primary dark:text-slate-400 dark:hover:bg-primary/10 dark:hover:text-primary'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
