import { getCurrentUser, requireRole } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { UserTable } from '@/components/admin/UserTable';
import usersData from '@/lib/mock-data/users.json';
import type { User } from '@/lib/types/user';

async function getUsers() {
  return usersData as User[];
}

export default async function UsersPage() {
  const user = await requireRole(['admin']);
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage branch users, roles, and permissions
        </p>
      </div>

      <UserTable users={users} />
    </div>
  );
}










