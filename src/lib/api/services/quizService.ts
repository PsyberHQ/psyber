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
   * @param answersList Array of question objects, potentially with id or index
   */
  async submitInitQuiz(answersList: {id?: number; index?: number; answer: string}[]): Promise<any> {
    console.log("[quizService/submitInitQuiz] Received answersList:", JSON.parse(JSON.stringify(answersList)));

    const cleanAnswers = answersList.map((item, idx) => {
      let idToUse: number;
      if (typeof item.id === 'number') {
        idToUse = item.id;
      } else if (typeof item.index === 'number') {
        // This case should ideally not happen if PsyberQuizPage is correct
        console.warn(`[quizService/submitInitQuiz] Item at original index ${idx} had 'index' key (${item.index}) instead of 'id'. Using 'index' value as 'id'.`);
        idToUse = item.index; // Assuming the value of 'index' is the intended 0-based ID
      } else {
        // Fallback if neither id nor index is a number. This is an error state.
        console.error(`[quizService/submitInitQuiz] Item at original index ${idx} is missing a usable 'id' or 'index'. Defaulting to array index ${idx}. Item:`, JSON.parse(JSON.stringify(item)));
        idToUse = idx; // Use array index as a last resort, assuming 0-based.
      }
      return {
        id: idToUse,
        answer: String(item.answer) // Ensure answer is a string
      };
    });

    console.log("[quizService/submitInitQuiz] Submitting cleaned answers:", { answers: cleanAnswers });
    return await apiClient.post(Endpoints.INIT_QUIZ, { answers: cleanAnswers });
  },

  /**
   * Get full task list with lessons and quizzes
   */
  async getFullTasks(): Promise<any[]> {
    return await apiClient.get<any[]>(Endpoints.FULL_TASKS);
  }
};