'use client';
import Image from 'next/image';
import TasksList from './TasksList';
import TaskDesc from './TaskDesc';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const TaskParent = ({
  initTasks,
  currentTaskToDo,
}: {
  initTasks: {
    id: string;
    title: string;
    description: string;
    learningTip: string;
    reward: string;
    progress: number;
  }[];
  currentTaskToDo: number;
}) => {
  const [tasks] = useState(initTasks);
  const [currentTask, setCurrentTask] = useState(currentTaskToDo ? currentTaskToDo : 0);
  const session = useSession();
  const firstName = session?.data?.user?.name?.split(' ')[0];
  return (
    <>
      <div className="hide-scrollbar col-span-6 flex h-full flex-col items-start justify-start overflow-y-scroll p-6 !pt-0 md:p-10">
        <div className="sticky left-0 right-0 top-0 z-50 mb-10 w-full bg-white pt-6">
          <div className="flex items-center">
            <div className="mr-4">
              <Image
                src="/mediBrain.png"
                alt="Meditating Brain"
                className="w-24"
                height={972}
                width={1148}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-gliker text-3xl font-normal text-gray-800">Hi {firstName}</h1>
              <p className="text-gray-600 max-md:hidden">Here are your tasks for today</p>
            </div>
          </div>
          <p className="text-center text-gray-600 md:hidden">Here are your tasks for today</p>
        </div>
        <TasksList
          currentTaskToDo={currentTaskToDo}
          tasks={tasks}
          setCurrentTask={setCurrentTask}
        />
      </div>

      <div className="hide-scrollbar col-span-4 h-full overflow-y-scroll bg-[#7047A3] text-white">
        <div className="sticky top-0 h-fit p-6 md:p-10">
          <TaskDesc task={tasks[currentTask]} />
        </div>
      </div>
    </>
  );
};

export default TaskParent;
