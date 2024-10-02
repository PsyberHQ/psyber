import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  if (!session) {
    redirect('/app/login');
  }
  return <>{children}</>;
};

export default Layout;
