import TaskParent from '@/components/App/TaskParent';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/model/User';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await getServerSession();
  if (!session) redirect('/app/login');
  const email = session?.user?.email;
  await dbConnect();
  const user = await UserModel.findOne({
    email,
  });
  if (!user?.badge || user?.badge === '') {
    redirect('/app/onboarding');
  }

  return (
    <div className="grid h-full max-h-[70vh] min-w-[60vw] max-w-[80vw] grid-cols-10 overflow-scroll hide-scrollbar">
      <TaskParent />
    </div>
  );
};

export default Page;
