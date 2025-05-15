import apiClient from '../client';
import { Endpoints } from '../config';

/**
 * Quiz and task service for managing learning content and assessments
 */
export const quizService = {
  /**
   * Get initialization quiz questions
   */
  async getInitQuizQuestions(): Promise<any[]> {
    return await apiClient.get<any[]>(Endpoints.INIT_QUIZ);
  },

  /**
   * Submit initialization quiz answers
   * @param data Object containing userEmail and answers
   */
  async submitInitQuiz(data: { 
    userEmail?: string | null; 
    answers: {id: number; answer: string}[] 
  }): Promise<any> {
    console.log("Quiz service submitting data:", data);
    return await apiClient.post(Endpoints.INIT_QUIZ, data);
  },

  /**
   * Get full task list with lessons and quizzes
   */
  async getFullTasks(): Promise<any[]> {
    return await apiClient.get<any[]>(Endpoints.FULL_TASKS);
  }
};