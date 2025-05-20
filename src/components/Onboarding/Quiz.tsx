'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { InitQuizQuestionsType } from '@/model/InitQuiz';
import LoaderComp from '../LoaderComp';

const Quiz = () => {
  const session = useSession();
  const [questions, setQuestions] = useState<InitQuizQuestionsType[]>([]);
  const [currQuesNum, setCurrQuesNum] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setanswers] = useState<
    {
      index: number;
      answer: string;
    }[]
  >([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitted, setSubmitted] = useState<{
    badge: string;
    comment: string;
    comment2: string;
    message: string;
    userId: string;
  } | null>(null);
  const [postAns, setPostAns] = useState(false);

  const handleAnswer = (text: string) => {
    setSelectedAnswer(text);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setanswers([...answers, { index: currQuesNum + 1, answer: selectedAnswer }]);
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

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('/api/init-quiz');
      const data = await response.json();
      setQuestions(data.questions);
    };
    if (questions.length === 0) fetchQuestions();
    const handleFinish = async () => {
      try {
        setSubmitLoading(true);
        const response = await fetch('/api/init-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: session.data?.user?.email,
            answers,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setSubmitted(data);
        } else if (data.redirect && response.status === 400 && data.error) {
          window.location.href = '/app';
        }
      } catch (error) {
        console.error('Error saving quiz result:', error);
      } finally {
        setSubmitLoading(false);
      }
    };
    if (postAns) handleFinish();
  }, [answers, postAns, questions, session.data?.user?.email]);

  if (submitLoading) {
    return <div className='md:p-24 p-20 rounded-[20px] md:text-3xl text-2xl'>Loading...</div>;
  }

  if (submitted) {
    return (
      <div className="mx-auto w-fit max-w-lg md:p-10 p-6 md:px-[4vw] px-[3vw]">
        {/* <h2 className="mb-6 text-center text-xl font-semibold">Quiz Completed!</h2> */}
        <div className="space-y-4">
          <p className='md:text-xl text-base text-neutral-700'>You web 3.0 readiness level is</p>
          <p className="text-center md:text-4xl text-2xl">&quot;{submitted.badge}&quot;</p><br />
          <p className="text-center text-[#F47C92]">{submitted.comment}</p>
          <p className='text-neutral-700 w-fit m-auto mb-3'>what this means for you</p>
          <p className="text-center w-fit m-auto md:text-xl text-base">{submitted.comment2}</p>
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

  return (
    <div className="mx-auto w-fit max-w-lg py-6 px-4 rounded-[16px]">
      <h2 className="mb-6 text-center text-xl font-semibold">
        #{currQuesNum + 1} {questions[currQuesNum].question}
      </h2>
      <div className="space-y-4">
        {questions[currQuesNum].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option.points)}
            className={`w-full rounded-full px-4 py-3 text-center transition-colors ${
              selectedAnswer === option.points
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={handleSkip}
          className="rounded-full bg-gray-200 px-6 py-2 font-bold transition-colors hover:bg-gray-300"
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          className="rounded-full bg-green-500 font-bold px-6 py-2 text-white transition-colors hover:bg-green-600"
        >
          {currQuesNum < questions.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
