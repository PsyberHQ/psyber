'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePsyberAuth } from '@/contexts/PsyberAuthContext';
import TaskParent from '@/components/App/TaskParent';
import LoaderComp from '@/components/LoaderComp';
import apiClient from '@/lib/api/client';
import { Endpoints } from '@/lib/api/config';

export default function TasksPage() {
  const { user, loading, isAuthenticated, onboardingComplete } = usePsyberAuth();
  const [pageLoading, setPageLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Only run checks once auth context has loaded
    if (!loading) {
      if (!isAuthenticated) {
        console.log("Tasks page: Not authenticated, redirecting to login");
        router.push('/psyber-auth/login');
      } else if (!onboardingComplete && (!user?.level || user?.level === 0) && !user?.is_onboarded) {
        console.log("Tasks page: Not onboarded, redirecting to onboarding");
        router.push('/psyber-auth/onboarding');
      } else {
        // Authentication and onboarding checks passed, fetch tasks
        fetchTasks();
      }
    }
  }, [loading, isAuthenticated, onboardingComplete, user, router]);

  const fetchTasks = async () => {
    try {
      setPageLoading(true);
      const response = await apiClient.get(Endpoints.FULL_TASKS);
      
      if (response && Array.isArray(response) && response.length > 0) {
        console.log("Tasks fetched successfully:", response.length);
        setTasks(response);
      } else {
        throw new Error("Invalid response format from tasks API");
      }
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError(err.message || "Failed to load tasks");
    } finally {
      setPageLoading(false);
    }
  };

  if (loading || pageLoading) {
    return <LoaderComp text="Loading tasks..." />;
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4">
        <div className="rounded-lg bg-red-100 p-6 text-center">
          <h2 className="mb-2 text-xl font-bold text-red-800">Failed to load tasks</h2>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchTasks}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 grid h-full max-h-[80vh] min-w-full max-w-full overflow-auto hide-scrollbar">
      <h1 className="mb-4 text-2xl font-bold">Your Learning Tasks</h1>
      <TaskParent initialTasks={tasks} />
    </div>
  );
}