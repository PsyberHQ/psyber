'use client';
import React, { useState } from 'react';
import questions from '@/lib/const/initQuizQuestions';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

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
    return (
      <div className="p-10">
        <div className="flex flex-col items-center justify-center p-6">
          <Image
            src="/Loader.gif"
            alt="Book"
            width={521}
            height={521}
            className="w-16 scale-110 object-contain"
          />
        </div>
        <p className="text-center text-slate-400">Calculating your web 3.0 readiness level....</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto w-fit min-w-[60vw] max-w-lg p-20 pt-10">
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
            <p className="text-center text-3xl font-bold">&quot;{submitted.badge}&quot;</p>
            <p className="text-center text-[#F47C92]">{submitted.comment}</p>
            <p className="text-center text-slate-400">what this means for you</p>
            <p className="text-center text-xl font-semibold text-gray-800">{submitted.comment2}</p>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <Link href="/app">
              <button className="rounded-full bg-green-500 px-6 py-3 text-white shadow-md transition-colors hover:bg-green-600">
                Start your journey
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-fit min-w-[60vw] max-w-lg p-20 pt-10">
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
        <div className="flex w-full flex-col space-y-4">
          <h2 className="mb-6 text-center text-xl font-semibold">
            #{currQuesNum + 1} {questions[currQuesNum].question}
          </h2>
          {questions[currQuesNum].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.points)}
              className={`rounded-full px-4 py-3 text-center shadow-md transition-colors ${
                selectedAnswer === option.points
                  ? 'bg-[#7047A3] text-white'
                  : 'border border-[#F47C92] hover:bg-gray-100'
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={handleSkip}
          className="rounded-full bg-gray-200 px-6 py-2 transition-colors hover:bg-gray-300"
        >
          Skip
        </button>
        <button
          disabled={selectedAnswer === null && currQuesNum < questions.length - 1 ? true : false}
          onClick={handleNext}
          className="rounded-full bg-green-500 px-6 py-2 text-white transition-colors hover:bg-green-600"
        >
          {currQuesNum < questions.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
