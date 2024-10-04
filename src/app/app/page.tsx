import TaskParent from '@/components/App/TaskParent';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/model/User';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
const initTasks = [
  {
    id: '01',
    title: 'Introduction to blockchain & web 3.0',
    description:
      'Learn how blockchain works, the differences between web2 and web3, and why web3 gives you more control over your data.',
    learningTip:
      "Remember, the goal is to understand the 'why' behind web3. This will be your foundation for the tasks ahead.",
    reward: '50 tokens',
    progress: 0,
  },
  {
    id: '02',
    title: 'Introduction to Digital Wallets',
    description:
      'Learn about digital wallets, why they are important in web 3.0, and how they differ from traditional online accounts in web 2.0.',
    learningTip:
      'Focus on understanding why digital wallets are essential in web 3.0; this will help you see how they provide more control and security for your digital assets.',
    reward: '50 tokens',
    progress: 0,
  },
  {
    id: '03',
    title: 'Introduction to solflare',
    description:
      'Learn about digital wallets, why they are important in web 3.0, and how they differ from traditional online accounts in web 2.0',
    learningTip:
      'Focus on understanding why digital wallets are essential in web 3.0. this will help you see how they provide more control and security for your digital assets.',
    reward: '100 tokens',
    progress: 0,
  },
  {
    id: '04',
    title: 'Participate in a DAO',
    description:
      'Join a Decentralized Autonomous Organization and take part in community decision-making.',
    learningTip:
      'Observe how decisions are made in a decentralized manner and consider proposing an idea.',
    reward: '150 tokens',
    progress: 0,
  },
  {
    id: '05',
    title: 'Create and mint your first NFT',
    description: 'Design and mint your own Non-Fungible Token on a blockchain network.',
    learningTip: 'Think about what makes your NFT unique and valuable to potential collectors.',
    reward: '200 tokens',
    progress: 0,
  },
];
const Page = async () => {
  const session = await getServerSession();
  const email = session?.user?.email;
  await dbConnect();
  const user = await UserModel.findOne({
    email,
  });
  if (!user?.badge || user?.badge === '') {
    redirect('/app/onboarding');
  }
  const userLevel = user.level;
  return (
    <div className="hide-scrollbar grid max-h-[70vh] min-w-[60vw] max-w-[80vw] grid-cols-10 overflow-scroll">
      <TaskParent
        initTasks={initTasks.map((task, index) => {
          return {
            ...task,
            progress: userLevel > index ? 100 : 0,
          };
        })}
        currentTaskToDo={userLevel}
      />
    </div>
  );
};

export default Page;
