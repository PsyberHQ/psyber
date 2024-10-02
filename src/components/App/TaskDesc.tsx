import Link from 'next/link';

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
      <Link href={'/app/task/' + task.id}>
        <button className="w-full rounded-full bg-green-500 px-4 py-3 font-bold text-white transition duration-300 hover:bg-green-600">
          Start task {task.id}
        </button>
      </Link>
    </>
  );
};

export default TaskDesc;
