'use client';

interface Task {
  id: string | number;
  title: string;
  description?: string;
  learningTip?: string;
  learning_tip?: string; // API might use snake_case
  reward?: string;
  progress?: number;
  // Add API fields
  type?: string;
  lessons?: any[];
  quiz?: any[];
}

interface TasksListProps {
  tasks: Task[];
  activeTask: Task;
  setActiveTask: (task: Task) => void;
}

const TasksList = ({ tasks, activeTask, setActiveTask }: TasksListProps) => {
  // Normalize task properties (handle both camelCase and snake_case)
  const normalizeTask = (task: Task) => {
    return {
      ...task,
      id: String(task.id), // Ensure ID is a string
      learningTip: task.learningTip || task.learning_tip || '',
      progress: typeof task.progress === 'number' ? task.progress : 0,
    };
  };

  // Debug log to see what's happening
  console.log('TasksList rendered with tasks:', tasks?.length);
  console.log('Active task ID:', activeTask?.id);

  // Ensure we always have an array to map over
  const tasksToRender = Array.isArray(tasks) ? tasks : [];

  return (
    <div className="space-y-6">
      {tasksToRender.length === 0 ? (
        <div className="rounded-lg bg-gray-100 p-4 text-center text-gray-600">
          No tasks available
        </div>
      ) : (
        tasksToRender.map((task, index) => {
          const normalizedTask = normalizeTask(task);
          const isActive = String(activeTask?.id) === String(task.id);

          return (
            <div
              key={task.id}
              className={`relative cursor-pointer rounded-lg border-2 p-4 transition ${
                isActive
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-purple-300'
              }`}
              onClick={() => setActiveTask(task)}
            >
              <div className="absolute -left-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-purple-600 text-xs text-white">
                {index + 1}
              </div>

              <div className="ml-2">
                <h3 className="mb-2 font-semibold">{task.title}</h3>

                <div className="mb-1 flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{normalizedTask.progress}%</span>
                </div>

                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${normalizedTask.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TasksList;
