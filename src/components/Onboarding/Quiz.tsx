'use client';
import React, { useState } from 'react';
import questions from '@/lib/const/initQuizQuestions';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Quiz = () => {
  const session = useSession();
  const [currQuesNum, setCurrQuesNum] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitted, setSubmitted] = useState<{
    score: number;
    badge: string;
    comment: string;
    comment2: string;
    message: string;
    userId: string;
  } | null>(null);

  const handleAnswer = (points: number) => {
    setSelectedAnswer(points);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setScore(score + selectedAnswer);
    }

    if (currQuesNum < questions.length - 1) {
      setCurrQuesNum(currQuesNum + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz completed, handle finish here
      handleFinish();
    }
  };

  const handleSkip = () => {
    if (currQuesNum < questions.length - 1) {
      setCurrQuesNum(currQuesNum + 1);
      setSelectedAnswer(null);
    } else {
      handleFinish();
    }
  };

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
          score,
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
        <Link href="/app">
          <button className="button">Start your journey</button>
        </Link>
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
