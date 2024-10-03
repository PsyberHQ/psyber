'use client';

const TasksList = ({
  tasks,
  setCurrentTask,
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
}) => {
  return (
    <>
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="relative mx-auto mb-12 mt-5 max-w-[30vw] cursor-pointer"
          onClick={() => setCurrentTask(index)}
        >
          <div
            className={
              'absolute -left-[2px] bottom-0 top-0 w-0 border-[3px] border-dotted' +
              (index === 0 ? ' border-green-300' : ' border-gray-300')
            }
          ></div>
          <div
            className={`absolute left-[-8px] top-0 h-4 w-4 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-gray-300'}`}
          ></div>
          <div className="relative ml-8 w-[300px] border-2 border-blue-700 ">
            <div className="rounded-3xl border-2 border-blue-700  bg-[#FCFAF8] md:p-4 p-2 shadow-sm">
              <div className="absolute -top-1/2 left-1/2 mr-4 flex w-fit -translate-x-1/2 translate-y-[100%] items-center justify-center rounded-2xl bg-[#F47C92] p-3 text-white">
                <span className="md:text-3xl text-2xl font-bold">{task.id}</span>
              </div>
              <div className="flex flex-col gap-3 border-2 border-yellow-500">
                <h2 className="pt-4 md:text-xl text-lg font-semibold text-purple-700">{task.title}</h2>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Progress</p>
                  <p className="mt-1 text-sm text-gray-600">{task.progress}%</p>
                </div>

                <div className="h-2.5 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2.5 rounded-full bg-green-500"
                    style={{ width: `${task.progress + 10}%` }}
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
