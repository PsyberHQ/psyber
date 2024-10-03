'use client';
import Task from '@/components/Tasks/Task';
import Fulltasks from '@/lib/const/fullTasks';
import { useParams } from 'next/navigation';

const Page = () => {
  const { id } = useParams();
  const taskNumber = parseInt(id as string) % 2;
  console.log('taskNumber', taskNumber);

  return (
    <div className="relative flex min-h-[70vh] min-w-[60vw] items-center justify-center">
      <Task task={Fulltasks[0]} />
    </div>
  );
};

export default Page;
