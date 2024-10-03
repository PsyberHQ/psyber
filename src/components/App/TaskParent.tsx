'use client';
import Image from 'next/image';
import TasksList from './TasksList';
import TaskDesc from './TaskDesc';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
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
    title: 'Create your first wallet',
    description:
      'Set up a digital wallet to store and manage your cryptocurrencies and digital assets.',
    learningTip: 'Security is key. Make sure to safely store your recovery phrase!',
    reward: '75 tokens',
    progress: 0,
  },
  {
    id: '03',
    title: 'Explore decentralized applications (dApps)',
    description:
      'Discover and interact with various dApps to understand their functionalities and benefits.',
    learningTip:
      'Try out different types of dApps to get a broad understanding of their potential.',
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
const TaskParent = () => {
  const [tasks] = useState(initTasks);
  const [currentTask, setCurrentTask] = useState(0);
  const session = useSession();
  const firstName = session?.data?.user?.name?.split(' ')[0];
  return (
    <>
      <div className="col-span-6 flex flex-wrap items-start justify-start p-10 bg-blue-400">
        <div className="sticky left-0 top-0 z-50 mb-10 flex h-fit w-fit m-auto flex-wrap items-center  border-red-300 border-2 rounded-lg bg-white p-4">
          <div className="">
            <Image
              src="/mediBrain.png"
              alt="Meditating Brain"
              className="md:w-20 w-18"
              height={972}
              width={1148}
            />
          </div>
          <div className='w-fit m-auto'>
            <h1 className="md:text-3xl text-xl font-bold text-gray-800">Hi {firstName}</h1>
            <p className="text-gray-600 md:text-base text-sm">Here are your tasks for today</p>
          </div>
        </div>
        <div className="h-min w-full">
          <TasksList tasks={tasks} setCurrentTask={setCurrentTask} />
        </div>
      </div>

      <div className="col-span-4 bg-[#7047A3] text-white">
        <div className="sticky top-0 h-fit p-10">
          <TaskDesc task={tasks[currentTask]} />
        </div>
      </div>
    </>
  );
};

export default TaskParent;
