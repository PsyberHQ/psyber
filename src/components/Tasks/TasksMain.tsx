'use client';
import LoaderComp from '@/components/LoaderComp';
import TaskSimpleLessonQuiz from '@/components/Tasks/TaskSimpleLessonQuiz';
import TaskWithImage from '@/components/Tasks/TaskWithImage';
import { FulltasksType } from '@/Types/Task';
import { redirect, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const TaskMain = ({ userLevel }: { userLevel: number }) => {
  const { id } = useParams();
  const taskNumber = parseInt(id as string);
  const [Fulltasks, setFulltasks] = useState<FulltasksType[]>([]);

  if (!(userLevel + 1 == taskNumber) || taskNumber <= 0) {
    redirect('/app');
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/full-tasks');
      const data = await response.json();
      setFulltasks(data);
    };
    fetchTasks();
  }, []);

  if (Fulltasks.length == 0) {
    return <LoaderComp text="Loading task..." />;
  }
  const task = Fulltasks[taskNumber - 1];
  if (!task) {
    return (
      <div className="relative flex min-h-[70vh] min-w-[60vw] items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-800">Task not found</h1>
          <p className="text-gray-600">The task you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-[70vh] min-w-[60vw] items-center justify-center">
      {task.type === 'TaskWithLessonQuiz' && <TaskSimpleLessonQuiz task={task} />}
      {task.type === 'TaskWithImage' && <TaskWithImage task={task} />}
    </div>
  );
};

export default TaskMain;
