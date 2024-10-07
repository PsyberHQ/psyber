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
      <div className="col-span-6 flex flex-col items-start justify-start p-10">
        <div className="sticky left-0 top-0 z-50 -ml-3 mb-10 flex h-min w-[100%] items-center rounded-lg bg-white pl-10">
          <div className="mr-4">
            <Image
              src="/mediBrain.png"
              alt="Meditating Brain"
              className="w-24"
              height={972}
              width={1148}
            />
          </div>
          <div>
            <h1 className="font-gliker text-3xl font-normal text-gray-800">Hi {firstName}</h1>
            <p className="text-gray-600">Here are your tasks for today</p>
          </div>
        </div>
        <div className="h-min w-full">
          <TasksList
            currentTaskToDo={currentTaskToDo}
            tasks={tasks}
            setCurrentTask={setCurrentTask}
          />
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
