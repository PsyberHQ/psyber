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

  if (submitLoading || !questions.length) {
    return (
      <LoaderComp text={submitLoading ? 'Submitting your answers...' : 'Loading questions...'} />
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
          {questions[currQuesNum]?.options.map((option, index) => (
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
};

export default Quiz;
