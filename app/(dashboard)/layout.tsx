import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { DashboardProviders } from './DashboardProviders';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect('/login');

  const role = session?.user?.role ?? 'editor'; //duda aqui

  return (
    <DashboardProviders>
      <DashboardLayout role={role}>{children}</DashboardLayout>
    </DashboardProviders>
  );
}
