import TaskMain from '@/components/Tasks/TasksMain';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/model/User';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const session = await getServerSession();
  const email = session?.user?.email;
  await dbConnect();
  const { level } = await UserModel.findOne({
    email,
  });
  const taskNumber = Number(params.id);

  if (!(level + 1 == taskNumber)) {
    redirect('/app');
  }

  return <TaskMain />;
};

export default Page;
