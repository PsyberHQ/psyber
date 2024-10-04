'use client';

import { useEffect, useRef } from 'react';

const TasksList = ({
  tasks,
  setCurrentTask,
  currentTaskToDo,
}: {
  tasks: {
    id: string;
    title: string;
    description: string;
    learningTip: string;
    reward: string;
    progress: number;
  }[];
  setCurrentTask: (index: number) => void;
  currentTaskToDo: number;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  console.log('ref', ref);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [currentTaskToDo]);

  return (
    <>
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="relative mx-auto mb-12 mt-5 max-w-[30vw] cursor-pointer"
          onClick={() => setCurrentTask(index)}
          ref={index === currentTaskToDo ? ref : null}
        >
          <div
            className={
              'absolute -left-[1px] bottom-0 top-0 w-0 border-r-[3px] border-dashed' +
              (index <= currentTaskToDo ? ' border-green-300' : ' border-gray-300')
            }
          ></div>
          <div
            className={`absolute left-[-8px] top-0 h-4 w-4 rounded-full ${
              index <= currentTaskToDo ? 'bg-green-500' : 'bg-gray-300'
            }`}
          ></div>
          <div className="relative ml-8 max-w-[30vw]">
            <div className="rounded-3xl border border-[#DCD8D2] bg-[#FCFAF8] p-10 shadow-sm">
              <div className="absolute -top-1/2 left-1/2 mr-4 flex w-fit -translate-x-1/2 translate-y-[100%] items-center justify-center rounded-2xl bg-[#F47C92] p-3 text-white">
                <span className="text-3xl font-bold">{task.id}</span>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="pt-4 text-xl font-semibold text-purple-700">{task.title}</h2>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Progress</p>
                  <p className="mt-1 text-sm text-gray-600">{task.progress}%</p>
                </div>

                <div className="h-2.5 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2.5 rounded-full bg-green-500"
                    style={{ width: `${task.progress + 10 > 100 ? 100 : task.progress + 10}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TasksList;
