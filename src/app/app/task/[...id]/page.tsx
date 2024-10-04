'use client';
import TaskSimpleLessonQuiz from '@/components/Tasks/TaskSimpleLessonQuiz';
import Fulltasks from '@/lib/const/fullTasks';
import { useParams } from 'next/navigation';

const Page = () => {
  const { id } = useParams();
  const taskNumber = parseInt(id as string);
  console.log('taskNumber', taskNumber);

  return (
    <div className="relative flex min-h-[70vh] min-w-[60vw] items-center justify-center">
      {taskNumber >= 1 && taskNumber <= Fulltasks.length ? (
        <TaskSimpleLessonQuiz task={Fulltasks[taskNumber - 1]} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-800">Task not found</h1>
          <p className="text-gray-600">The task you are looking for does not exist.</p>
        </div>
      )}
    </div>
  );
};

export default Page;
