import Link from 'next/link';
import { useEffect, useState } from 'react';

const TaskDesc = ({
  task,
}: {
  task: {
    id: string;
    description: string;
    learningTip: string;
    reward: string;
  };
}) => {
  const [userLevel, setUserLevel] = useState(0);
  useEffect(() => {
    const fetchUserLevel = async () => {
      const response = await fetch('/api/user-level');
      const data = await response.json();
      setUserLevel(data.level);
    };
    fetchUserLevel();
  }, []);
  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">Task {task.id}</h2>
      <p className="mb-6">{task.description}</p>
      <div className="mb-6">
        <h3 className="mb-2 font-semibold">✨ Learning tip</h3>
        <p className="text-sm">{task.learningTip}</p>
      </div>
      <div className="mb-8">
        <h3 className="mb-2 font-semibold">⭐ Reward</h3>
        <p className="text-sm"> {task.reward}</p>
      </div>
      <Link href={userLevel >= parseInt(task.id) ? '/app' : '/app/task/' + task.id}>
        <button
          className={
            'w-full rounded-full px-4 py-3 font-bold text-white transition duration-300 ' +
            (userLevel >= parseInt(task.id)
              ? ' pointer-events-none cursor-not-allowed bg-gray-300 text-black'
              : ' cursor-pointer bg-green-500 hover:bg-green-600')
          }
        >
          Start task {task.id} {userLevel >= parseInt(task.id) && '(Completed)'}
        </button>
      </Link>
    </>
  );
};

export default TaskDesc;
