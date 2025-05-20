'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import TasksList from './TasksList';
import TaskDesc from './TaskDesc';
import { usePsyberAuth } from '@/contexts/PsyberAuthContext';
import apiClient from '@/lib/api/client';
import { Endpoints } from '@/lib/api/config';
import LoaderComp from '@/components/LoaderComp';
import { fullTasks } from '@/lib/const/fullTasks';

// Default tasks as fallback if API fails
const defaultTasks = [
	{
		id: '01',
		title: 'Introduction to blockchain & web 3.0',
		description:
			'Learn how blockchain works, the differences between web2 and web3, and why web3 gives you more control over your data.',
		learningTip:
			"Remember, the goal is to understand the 'why' behind web3. This will be your foundation for the tasks ahead.",
		reward: '50 tokens',
		progress: 0,
	},
	{
		id: '02',
		title: 'NFTs - More Than Just Digital Art',
		description:
			'Discover how NFTs work and their potential uses beyond digital art, from real estate to identity verification.',
		learningTip:
			'Think of NFTs as digital certificates of authenticity and ownership that can be applied to almost anything.',
		reward: '75 tokens',
		progress: 0,
	},
	{
		id: '03',
		title: 'Smart Contracts Explained Simply',
		description:
			'Learn how smart contracts automate agreements without middlemen, making transactions more efficient and secure.',
		learningTip:
			'Imagine smart contracts as digital vending machines: they execute automatically when certain conditions are met.',
		reward: '100 tokens',
		progress: 0,
	},
];

interface TaskParentProps {
	initialTasks?: any[]; // Accept initial tasks from parent component
}

const TaskParent = ({ initialTasks }: TaskParentProps) => {
	const [tasks, setTasks] = useState<any[]>(initialTasks || defaultTasks);
	const [activeTask, setActiveTask] = useState<any>(
		initialTasks?.[0] || defaultTasks[0]
	);
	const [loading, setLoading] = useState(!initialTasks); // Only loading if no initial tasks
	const [apiError, setApiError] = useState<string | null>(null);
	const { user, refreshUser } = usePsyberAuth();

	// Debug log to see what's happening
	useEffect(() => {
		console.log('TaskParent mounted with tasks:', tasks?.length);
		console.log('Active task:', activeTask?.title);
	}, [tasks, activeTask]);

	useEffect(() => {
		// Update state if initialTasks change
		if (initialTasks && initialTasks.length > 0) {
			console.log('Setting tasks from initialTasks:', initialTasks.length);
			setTasks(initialTasks);
			setActiveTask(initialTasks[0]);
			setLoading(false);
		}
	}, [initialTasks]);

	useEffect(() => {
		// Only fetch tasks if no initialTasks were provided
		const fetchTasks = async () => {
			try {
				setLoading(true);
				setApiError(null);

				// Try to get tasks from the API
				const response = await apiClient.get(Endpoints.FULL_TASKS);
				console.log('API response received:', response);

				if (response && Array.isArray(response) && response.length > 0) {
					console.log('Setting tasks from API:', response.length);
					setTasks(response);
					setActiveTask(response[0]);
				} else {
					console.warn('API response is not in expected format:', response);
					throw new Error('Invalid API response format');
				}
			} catch (error: any) {
				console.error('Error fetching tasks:', error);
				setApiError(error.message || 'Failed to load tasks from API');

				// Use fallback tasks
				console.log('Using fallback task data');

				// Try to use imported fallback data if available
				if (
					typeof fullTasks !== 'undefined' &&
					Array.isArray(fullTasks) &&
					fullTasks.length > 0
				) {
					setTasks(fullTasks);
					setActiveTask(fullTasks[0]);
				} else {
					// Otherwise use our default
					setTasks(defaultTasks);
					setActiveTask(defaultTasks[0]);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchTasks();
	}, []);

	if (loading) {
		return <LoaderComp text="Loading tasks..." />;
	}

	return (
		<div className="grid grid-cols-10 gap-5">
			<div className="col-span-10 md:col-span-4">
				<div className="sticky top-0">
					<div className="mb-6 flex items-center justify-center gap-4">
						<Image
							src="/mediBrain.png"
							alt="Meditating Brain"
							className="w-12 h-12"
							height={48}
							width={48}
						/>
						<div>
							<h2 className="text-xl font-bold">
								Hi {user?.name?.split(' ')[0] || 'User'}
							</h2>
							<p className="text-sm text-gray-600">
								Here are your tasks for today
							</p>
						</div>
					</div>

					{apiError && (
						<div className="mb-4 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-700">
							<p className="font-bold">Note:</p>
							<p>
								Using offline task data because we couldn't connect to the
								server.
							</p>
							<button
								onClick={() => refreshUser()}
								className="mt-2 text-blue-600 underline"
							>
								Refresh connection
							</button>
						</div>
					)}

					<TasksList
						tasks={tasks}
						activeTask={activeTask}
						setActiveTask={setActiveTask}
					/>
				</div>
			</div>

			<div className="col-span-10 md:col-span-6 rounded-xl bg-[#7047A3] text-white p-6">
				<TaskDesc task={activeTask} />
			</div>
		</div>
	);
};

export default TaskParent;
