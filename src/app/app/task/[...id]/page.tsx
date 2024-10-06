import TaskMain from '@/components/Tasks/TasksMain';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/model/User';
import { getServerSession } from 'next-auth';

const Page = async () => {
  const session = await getServerSession();
  const email = session?.user?.email;
  await dbConnect();
  const user = await UserModel.findOne({
    email,
  });

  return <TaskMain userLevel={user.level} />;
};

export default Page;
