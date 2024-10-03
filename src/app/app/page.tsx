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
    <div className="p-4 grid h-full max-h-[70vh] bg-red-400 xl:min-w-[60vw]  min-w-full  xl:max-w-[80vw] md:max-w-[95vw] grid-cols-10 overflow-scroll hide-scrollbar">
      <TaskParent />
    </div>
  );
};

export default Page;
