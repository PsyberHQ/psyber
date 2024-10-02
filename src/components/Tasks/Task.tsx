import Image from 'next/image';
import Link from 'next/link';
import { Result } from 'postcss';
import React, { useState } from 'react';
import { start } from 'repl';

const LessonHeader = ({ title, currentPart, totalParts, startLesson }: any) => (
  <div className="absolute inset-0 flex h-full flex-col items-center gap-8 rounded-lg bg-[#7047A3] p-20 text-white">
    <div className="flex justify-center">
      <Image
        src="/book.png"
        alt="Book"
        width={121}
        height={121}
        className="size-20 w-fit object-contain"
      />
    </div>
    <div>
      <h1 className="mb-2 text-center text-3xl font-bold">
        Lesson
        <span className="font-bold"> {currentPart}</span>
      </h1>
      <h2 className="mb-2 text-center text-2xl font-bold">{title}</h2>
    </div>
    <div className="mt-4 h-2.5 w-full rounded-full bg-purple-400">
      <div
        className="h-2.5 rounded-full bg-green-500"
        style={{ width: `${(currentPart / totalParts) * 100}%` }}
      ></div>
      <button
        onClick={startLesson}
        className="mt-4 w-full rounded-full bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
      >
        Continue
      </button>
    </div>
  </div>
);

const LessonContent = ({ lesson, index, handleNextContent }: any) => (
  <div className="absolute inset-0 flex h-full flex-col items-center gap-8 rounded-lg">
    <div className="w-full bg-[#F47C92] px-10 py-6 text-white">
      <h2 className="mb-2 text-2xl font-bold">Lesson: {index + 1}</h2>
    </div>
    <div className="overflow-scroll px-10 pb-10">
      {lesson.content.map(
        (
          content: {
            heading: string;
            content: string;
          },
          index: number
        ) => (
          <div key={index} className="mb-4">
            <h2 className="mb-4 text-xl font-bold">{content.heading}</h2>
            <p className="mb-4">{content.content}</p>
          </div>
        )
      )}
      <button
        onClick={handleNextContent}
        className="mt-4 w-full rounded-full bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
      >
        'Next'
      </button>
    </div>
  </div>
);

const QuizIntro = ({ onStart }: { onStart: () => void }) => (
  <div className="absolute inset-0 flex h-full flex-col items-center gap-8 rounded-lg bg-[#7047A3] p-20 text-white">
    <div className="flex justify-center">
      <Image
        src="/book.png"
        alt="Book"
        width={121}
        height={121}
        className="size-20 w-fit object-contain"
      />
    </div>
    <div>
      <h1 className="mb-2 text-center text-3xl font-bold">Quiz Time</h1>
    </div>
    <div>
      <h1 className="font-bold">Instructions:</h1>
      <ol className="pl-6" style={{ listStyleType: 'disc' }}>
        <li>Please read each question carefully and select the best answer.</li>
        <li>There are a total of 3 questions.</li>
        <li>You will receive instant feedback after each question.</li>
      </ol>
    </div>
    <button
      onClick={onStart}
      className="w-full rounded-full bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
    >
      Start Quiz
    </button>
  </div>
);

const Quiz = ({ quiz, nextQues }: any) => {
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [options, setOptions] = useState(quiz.options);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const onAnswer = (answerId: number) => {
    setIsCorrect(answerId === quiz.correctAnswer);
    setShowResult(true);
    setSelectedOption(answerId);
  };

  return (
    <div className="absolute inset-0 flex h-full flex-col items-center gap-8 rounded-lg bg-white">
      {showResult ? (
        <div
          className={`mb-4 w-full py-8 text-center text-white ${isCorrect ? 'bg-[#16C86D]' : 'bg-[#E93052]'}`}
        >
          <p className="mb-2 text-xl font-bold">
            {isCorrect ? "Wohoo! That's correct" : "That's incorrect!"}
          </p>
        </div>
      ) : (
        <>
          <Image
            src="/mediBrain.png"
            alt="Book"
            width={521}
            height={521}
            className="size-24 w-fit object-contain"
          />
        </>
      )}
      <div className="p-6">
        <h2 className="mb-4 text-xl font-bold">{quiz.question}</h2>
        {options.map((option: { id: number; content: string }) => (
          <button
            key={option.id}
            onClick={() => onAnswer(option.id)}
            className={`mb-2 w-full rounded-full p-3 text-left ${
              showResult && option.id === quiz.correctAnswer
                ? 'bg-green-500 text-white'
                : selectedOption === option.id
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100'
            }`}
            disabled={showResult}
          >
            {option.content}
          </button>
        ))}
        <button
          onClick={() => {
            if (showResult) {
              setShowResult(false);
              nextQues();
              setSelectedOption(null);
            }
          }}
          className="mt-4 w-full rounded-full bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const EndResult = () => {
  const [showToken, setShowToken] = useState(false);
  const [showEndScreen, setShowEndScreen] = useState(false);
  if (showEndScreen) {
    return (
      <div className="absolute inset-0 flex h-full flex-col items-center gap-8 rounded-lg p-20">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/mediBrain.png"
            alt="Book"
            width={521}
            height={521}
            className="size-24 w-fit object-contain pl-2"
          />
          <p>Hurrayy</p>
        </div>
        <div>
          <h1 className="mb-2 text-center text-3xl font-bold">You’re progressing wonderfully!</h1>
          <p className="text-center text-[#F47C92]">
            You have the power to unlock the web3 world. Every challenge makes you stronger!
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/LoadingGreenBars.png"
            alt="Book"
            width={521}
            height={521}
            className="w-20 object-contain"
          />
          <Link href="/app">
            <button className="mt-10 w-full rounded-full bg-green-500 px-4 py-2 text-white hover:bg-green-600">
              I'm ready for the next task!
            </button>
          </Link>
        </div>
      </div>
    );
  }
  if (showToken) {
    return (
      <div className="absolute inset-0 flex h-full flex-col items-center gap-8 rounded-lg p-20">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/mediBrain.png"
            alt="Book"
            width={521}
            height={521}
            className="size-24 w-fit object-contain pl-2"
          />
          <p>Hurrayy</p>
        </div>
        <div>
          <h1 className="mb-2 text-center text-3xl font-bold">50</h1>
        </div>
        <div>
          <h1 className="mb-2 text-center text-3xl font-bold">Token collected</h1>
          <button
            onClick={() => setShowEndScreen(true)}
            className="mt-10 w-full rounded-full bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 flex h-full flex-col items-center gap-8 rounded-lg p-20">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/mediBrain.png"
          alt="Book"
          width={521}
          height={521}
          className="size-24 w-fit object-contain pl-2"
        />
        <p>Hurrayy</p>
      </div>
      <div>
        <h1 className="mb-2 text-center text-3xl font-bold">Quiz Completed</h1>
      </div>
      <div>
        <h1 className="mb-2 text-center text-3xl font-bold">
          Great job! you've completed your first task!
        </h1>
        <button
          onClick={() => setShowToken(true)}
          className="mt-10 w-full rounded-full bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const Task = ({
  task,
}: {
  task: {
    id: number;
    lessons: {
      title: string;
      content: {
        heading: string;
        content: string;
      }[];
    }[];
    quiz: {
      question: string;
      options: {
        id: number;
        content: string;
      }[];
      correctAnswer: number;
    }[];
  };
}) => {
  const totallessons = task.lessons.length;
  const [showLessonHeader, setShowLessonHeader] = useState(true);
  const [currLesson, setCurrLesson] = useState(0);
  const [showLessonContent, setShowLessonContent] = useState(false);

  const [showQuizIntro, setShowQuizIntro] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [showResult, setShowResult] = useState(false);

  const startLesson = () => {
    setShowLessonHeader(false);
    setShowLessonContent(true);
  };

  const handleNextContent = () => {
    if (currLesson < totallessons - 1) {
      setCurrLesson(currLesson + 1);
      setShowLessonContent(false);
      setShowLessonHeader(true);
    } else {
      console.log('Lesson completed');
      setShowLessonContent(false);
      setShowLessonHeader(false);
      setShowQuizIntro(true);
    }
  };

  const handleStartQuiz = () => {
    setShowQuizIntro(false);
    setCurrentQuestionIndex(0);
    setShowQuiz(true);
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      {showLessonHeader && (
        <LessonHeader
          title={task.lessons[currLesson].title}
          currentPart={currLesson + 1}
          totalParts={totallessons}
          startLesson={startLesson}
        />
      )}
      {showLessonContent && (
        <LessonContent
          lesson={task.lessons[currLesson]}
          index={currLesson}
          handleNextContent={handleNextContent}
        />
      )}

      {showQuizIntro && <QuizIntro onStart={handleStartQuiz} />}
      {showQuiz && (
        <Quiz
          quiz={task.quiz[currentQuestionIndex]}
          nextQues={() => {
            if (currentQuestionIndex < task.quiz.length - 1) {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
              setShowQuiz(false);
              setShowResult(true);
            }
          }}
        />
      )}
      {showResult && <EndResult />}
    </div>
  );
};

export default Task;
