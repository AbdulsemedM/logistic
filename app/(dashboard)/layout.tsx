import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Sidebar } from '@/components/navigation/Sidebar';
import { Header } from '@/components/navigation/Header';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar user={user} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header user={user} />
        <div className="relative">
          <div className="absolute right-6 top-2 text-xs text-slate-500 z-10">
            Last updated: Just now
          </div>
        </div>
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 dark:bg-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
}

