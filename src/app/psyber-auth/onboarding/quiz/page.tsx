'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { usePsyberAuth } from '@/contexts/PsyberAuthContext';
import { quizService } from '@/lib/api/services/quizService';
import LoaderComp from '@/components/LoaderComp';

export default function PsyberQuizPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currQuesNum, setCurrQuesNum] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  // Updated structure to include id field
  const [answers, setAnswers] = useState<{id: number; answer: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [postAns, setPostAns] = useState(false);
  const [submitted, setSubmitted] = useState<any | null>(null);
  
  const { user } = usePsyberAuth();
  const router = useRouter();

  // Fetch questions from API
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const data = await quizService.getInitQuizQuestions();
        setQuestions(data);
        setLoading(false);
      } catch (err: any) {
        setError('Failed to load questions. Please try again later.');
        setLoading(false);
      }
    }
    
    fetchQuestions();
  }, []);

  // Handle submitting answers when all questions are answered
  useEffect(() => {
    const handleFinish = async () => {
      try {
        setSubmitLoading(true);
        // Log the answers before submission to debug
        console.log("Submitting answers:", answers);
        
        const result = await quizService.submitInitQuiz({
          userEmail: user?.email,
          answers: answers,
        });
        setSubmitted(result);
      } catch (err: any) {
        console.error("Quiz submission error:", err);
        setError('Failed to submit quiz. Please try again.');
      } finally {
        setSubmitLoading(false);
      }
    };
    
    if (postAns) handleFinish();
  }, [postAns, answers, user?.email]);

  const handleAnswer = (text: string) => {
    setSelectedAnswer(text);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      // Include question ID with the answer
      // Use currQuesNum + 1 as the ID since array is 0-based but IDs typically start at 1
      setAnswers([...answers, { 
        id: currQuesNum + 1, 
        answer: selectedAnswer 
      }]);
    }

    if (currQuesNum < questions.length - 1) {
      setCurrQuesNum(currQuesNum + 1);
      setSelectedAnswer(null);
    } else {
      setPostAns(true);
    }
  };

  const handleSkip = () => {
    if (currQuesNum < questions.length - 1) {
      setCurrQuesNum(currQuesNum + 1);
      setSelectedAnswer(null);
    } else {
      setPostAns(true);
    }
  };

  if (loading || submitLoading) {
    return <LoaderComp text={submitLoading ? 'Submitting your answers...' : 'Loading questions...'} />;
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="rounded-md bg-red-50 p-4 text-red-700">
          <h2 className="mb-2 text-xl font-semibold">Error</h2>
          <p>{error}</p>
          <button
            onClick={() => router.push('/psyber-auth/onboarding')}
            className="mt-4 rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Back to Onboarding
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-[812px] p-6 pt-0 xs:p-10 xs:pt-0 md:p-20 md:pt-0">
        <div className="flex w-full items-center justify-center">
          <Image
            src="/mediBrain.png"
            alt="Meditating Brain"
            className="mx-auto w-36"
            height={972}
            width={1148}
          />
        </div>
        <div className="space-x-5">
          <h2 className="mb-6 text-center font-semibold">Your web 3.0 readiness level is</h2>
          <div className="space-y-4">
            <p className="text-center text-3xl font-gliker font-bold">&quot;{submitted.badge}&quot;</p>
            <p className="text-center text-[#F47C92]">{submitted.comment}</p>
            <p className="text-center text-slate-400">what this means for you</p>
            <p className="text-center text-xl font-semibold text-gray-800">{submitted.comment2}</p>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <Link href="/app">
              <button className="green-btn !py-3">Start your journey</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="p-6 text-center text-xl">No questions available.</div>;
  }

  return (
    <div className="p-10 !py-6 md:p-20">
      <div className="flex">
        <div className="w-fit">
          <Image
            src="/mediBrain.png"
            alt="Meditating Brain"
            className="mx-auto w-36"
            height={972}
            width={1148}
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Let{"'"}s Get Started on Your Web 3.0 Journey
          </h1>
          <h2 className="text-gray-600">
            First, let{"'"}s assess your readiness to ensure you get the most out of this experience
          </h2>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center justify-center">
        <div className="flex w-fit flex-col space-y-4">
          <h2 className="mb-6 text-center text-xl font-semibold">
            #{currQuesNum + 1} {questions[currQuesNum]?.question}
          </h2>
          {questions[currQuesNum]?.options.map((option: any, index: number) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.text)}
              className={`rounded-full px-4 py-3 text-center shadow-md transition-colors ${
                selectedAnswer === option.text
                  ? 'bg-[#7047A3] text-white'
                  : 'border border-[#F47C92] hover:bg-gray-100'
              }`}
            >
              {option.text}
            </button>
          ))}

          <div className="mt-10 flex w-full justify-between">
            <button
              onClick={handleSkip}
              className="rounded-full bg-gray-200 px-6 py-2 transition-colors hover:bg-gray-300"
            >
              Skip
            </button>
            <button
              disabled={
                selectedAnswer === null && currQuesNum < questions.length - 1 ? true : false
              }
              onClick={handleNext}
              className="green-btn"
            >
              {currQuesNum < questions.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}