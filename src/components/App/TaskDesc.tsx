'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Task {
  id?: string | number;
  title?: string;
  description?: string;
  learningTip?: string;
  learning_tip?: string; // API might use snake_case
  reward?: string;
}

const TaskDesc = ({ task }: { task: Task }) => {
  if (!task) {
    return <div>Select a task to view details</div>;
  }

  // Log to ensure we're getting data
  console.log("Rendering task details:", task?.title);

  // Normalize properties to handle API response format
  const learningTip = task.learningTip || task.learning_tip || '';
  // Ensure ID is a string and exists
  const taskId = String(task.id || '');

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">{task.title || 'Task Title'}</h2>
      <p className="mb-6">{task.description || 'No description available.'}</p>
      
      {learningTip && (
        <div className="mb-6">
          <h3 className="mb-2 font-semibold">✨ Learning tip</h3>
          <p className="text-sm">{learningTip}</p>
        </div>
      )}
      
      {task.reward && (
        <div className="mb-8">
          <h3 className="mb-2 font-semibold">⭐ Reward</h3>
          <p className="text-sm">{task.reward}</p>
        </div>
      )}
      
      {/* Use task ID from the task object itself */}
      <Link href={`/app/task/${taskId}`} passHref>
        <button 
          onClick={(e) => {
            console.log(`Navigating to task detail page for task: ${taskId}`);
            // If you need to prevent default, do it here
          }}
          className="w-full rounded-full bg-green-500 px-4 py-3 font-bold text-white transition duration-300 hover:bg-green-600"
        >
          Start task {taskId}
        </button>
      </Link>
    </div>
  );
};

export default TaskDesc;
