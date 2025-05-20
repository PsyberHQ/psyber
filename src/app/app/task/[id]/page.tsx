'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Task from '@/components/Tasks/Task';
import LoaderComp from '@/components/LoaderComp';
import apiClient from '@/lib/api/client';
import { Endpoints } from '@/lib/api/config';
import { fullTasks } from '@/lib/const/fullTasks';

const TaskDetailPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  // Debug logging
  useEffect(() => {
    console.log(`TaskDetailPage: Displaying task with ID: ${id}`);
  }, [id]);
  
  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        console.log(`TaskDetailPage: Fetching task with ID: ${id}`);
        
        // Try to fetch from API first
        try {
          const tasks = await apiClient.get(Endpoints.FULL_TASKS);
          
          if (tasks && Array.isArray(tasks)) {
            // Convert both to strings for comparison
            const foundTask = tasks.find(t => String(t.id) === String(id));
            
            if (foundTask) {
              console.log("TaskDetailPage: Found task in API response:", foundTask.title);
              console.log("Task data:", JSON.stringify(foundTask, null, 2));
              setTask(foundTask);
              setLoading(false);
              return;
            } else {
              console.warn(`Task with ID ${id} not found in API response`);
            }
          }
        } catch (apiError) {
          console.error("Failed to fetch from API, using fallback data", apiError);
        }
        
        // If API fails or task not found, try fallback data
        if (Array.isArray(fullTasks)) {
          // Convert both to strings for comparison
          const fallbackTask = fullTasks.find(t => String(t.id) === String(id));
          
          if (fallbackTask) {
            console.log("TaskDetailPage: Using fallback task data:", fallbackTask.title);
            setTask(fallbackTask);
            setLoading(false);
            return;
          } else {
            console.warn(`Task with ID ${id} not found in fallback data`);
          }
        }
        
        // If all else fails, throw error
        throw new Error(`Task with ID ${id} not found`);
      } catch (err: any) {
        console.error("Error fetching task:", err);
        setError(err.message || "Failed to load task");
        setLoading(false);
      }
    };
    
    fetchTask();
  }, [id]);
  
  if (loading) {
    return (
      <div className="p-4 min-h-screen flex items-center justify-center">
        <LoaderComp text="Loading task content..." />
      </div>
    );
  }
  
  if (error || !task) {
    return (
      <div className="p-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-red-100 p-6 text-center">
          <h2 className="mb-2 text-xl font-bold text-red-800">Task not found</h2>
          <p className="text-red-600">{error || "The requested task could not be loaded"}</p>
          <button
            onClick={() => router.push('/app')}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  console.log("Rendering task component with task:", task);
  
  return (
    <div className="p-4 min-h-screen">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <Task task={task} />
      </div>
    </div>
  );
};

export default TaskDetailPage;