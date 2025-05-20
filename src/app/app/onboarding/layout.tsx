import { UserModel } from '@/model/User';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  const email = session?.user?.email;
  const user = await UserModel.findOne({
    email,
  });
  if (user?.badge && user?.badge !== '') {
    redirect('/app');
  }
  return <>{children}</>;
};

export default Layout;
