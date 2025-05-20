'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Component for the lesson header
const LessonHeader = ({ title, currentPart, totalParts, startLesson }: any) => {
  console.log("Rendering LessonHeader:", { title, currentPart, totalParts });
  
  return (
    <div className="flex h-full min-h-[400px] flex-col items-center gap-8 p-8 md:p-12 text-white bg-[#7047A3] rounded-lg">
      <div className="flex justify-center">
        <Image
          src="/mediBrain.png"
          alt="Book"
          width={96}
          height={96}
          className="object-contain"
        />
      </div>
      <div>
        <h1 className="mb-2 text-center text-3xl font-bold">
          Lesson
          <span className="font-bold"> {currentPart}</span>
        </h1>
        <h2 className="mb-2 text-center text-2xl font-bold">{title}</h2>
      </div>
      <div className="mt-4 w-full">
        <div className="h-2.5 w-full rounded-full bg-purple-400">
          <div
            className="h-2.5 rounded-full bg-green-500"
            style={{ width: `${(currentPart / totalParts) * 100}%` }}
          ></div>
        </div>
        <button
          onClick={startLesson}
          className="mt-4 w-full rounded-full bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// Component for lesson content
const LessonContent = ({ lesson, index, handleNextContent }: any) => {
  console.log("Rendering LessonContent:", { lesson, index });
  
  return (
    <div className="flex h-full min-h-[400px] flex-col">
      <div className="w-full bg-[#F47C92] px-10 py-6 text-white">
        <h2 className="mb-2 text-2xl font-bold">Lesson: {index + 1}</h2>
      </div>
      <div className="overflow-auto px-10 py-6 h-full">
        {lesson.content && Array.isArray(lesson.content) ? (
          lesson.content.map(
            (content: any, i: number) => (
              <div key={i} className="mb-6">
                <h2 className="mb-4 text-xl font-bold">{content.heading}</h2>
                <p className="mb-4">{content.content}</p>
              </div>
            )
          )
        ) : (
          <p className="text-gray-500">No content available for this lesson.</p>
        )}
        <button
          onClick={handleNextContent}
          className="mt-4 w-full rounded-full bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Component for quiz introduction
const QuizIntro = ({ onStart }: { onStart: () => void }) => {
  console.log("Rendering QuizIntro");
  
  return (
    <div className="flex h-full min-h-[400px] flex-col items-center gap-8 p-8 md:p-12 text-white bg-[#7047A3] rounded-lg">
      <div className="flex justify-center">
        <Image
          src="/mediBrain.png"
          alt="Book"
          width={96}
          height={96}
          className="object-contain"
        />
      </div>
      <div>
        <h1 className="mb-2 text-center text-3xl font-bold">Quiz Time</h1>
      </div>
      <div>
        <h1 className="font-bold">Instructions:</h1>
        <ol className="pl-6" style={{ listStyleType: 'disc' }}>
          <li>Please read each question carefully and select the best answer.</li>
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
};

// Component for quiz questions
const Quiz = ({ quiz, nextQues }: any) => {
  console.log("Rendering Quiz:", quiz);
  
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Get correct answer ID from correct_option_id (API) or correctAnswer (local)
  const correctAnswerId = quiz.correct_option_id || quiz.correctAnswer;

  const onAnswer = (answerId: number) => {
    setIsCorrect(answerId === correctAnswerId);
    setShowResult(true);
    setSelectedOption(answerId);
  };

  return (
    <div className="flex h-full min-h-[400px] flex-col bg-white">
      {showResult ? (
        <div
          className={`mb-4 w-full py-8 text-center text-white ${isCorrect ? 'bg-[#16C86D]' : 'bg-[#E93052]'}`}
        >
          <p className="mb-2 text-xl font-bold">
            {isCorrect ? "Woohoo! That's correct" : "That's incorrect!"}
          </p>
        </div>
      ) : (
        <div className="flex justify-center pt-6">
          <Image
            src="/mediBrain.png"
            alt="Brain"
            width={96}
            height={96}
            className="object-contain"
          />
        </div>
      )}
      <div className="p-6 w-full">
        <h2 className="mb-4 text-xl font-bold">{quiz.question}</h2>
        {quiz.options && Array.isArray(quiz.options) ? (
          quiz.options.map((option: { id: number; content: string; text?: string }) => (
            <button
              key={option.id}
              onClick={() => onAnswer(option.id)}
              className={`mb-2 w-full rounded-full p-3 text-left ${
                showResult && option.id === correctAnswerId
                  ? 'bg-green-500 text-white'
                  : selectedOption === option.id
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100'
              }`}
              disabled={showResult}
            >
              {option.content || option.text}
            </button>
          ))
        ) : (
          <p className="text-gray-500">No options available for this question.</p>
        )}
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

// Component for end result
const EndResult = () => {
  console.log("Rendering EndResult");
  
  const [showToken, setShowToken] = useState(false);
  const [showEndScreen, setShowEndScreen] = useState(false);
  
  if (showEndScreen) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center gap-8 p-8 md:p-12">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/mediBrain.png"
            alt="Brain"
            width={96}
            height={96}
            className="object-contain"
          />
          <p className="font-bold mt-2">Hurray!</p>
        </div>
        <div>
          <h1 className="mb-2 text-center text-3xl font-bold">You're progressing wonderfully!</h1>
          <p className="text-center text-[#F47C92]">
            You have the power to unlock the web3 world. Every challenge makes you stronger!
          </p>
        </div>
        <Link href="/app">
          <button className="mt-4 w-full rounded-full bg-green-500 px-4 py-2 text-white hover:bg-green-600">
            Back to Tasks
          </button>
        </Link>
      </div>
    );
  }
  
  if (showToken) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center gap-8 p-8 md:p-12">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/mediBrain.png"
            alt="Brain"
            width={96}
            height={96}
            className="object-contain"
          />
          <p className="font-bold mt-2">Hurray!</p>
        </div>
        <div className="text-center">
          <h1 className="mb-2 text-center text-3xl font-bold">50</h1>
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
    <div className="flex h-full min-h-[400px] flex-col items-center gap-8 p-8 md:p-12">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/mediBrain.png"
          alt="Brain"
          width={96}
          height={96}
          className="object-contain"
        />
        <p className="font-bold mt-2">Hurray!</p>
      </div>
      <div className="text-center">
        <h1 className="mb-2 text-center text-3xl font-bold">Quiz Completed</h1>
        <h1 className="mb-2 text-center text-3xl font-bold">
          Great job! You've completed your first task!
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

// Main Task component
interface TaskProps {
  task: {
    id?: number | string;
    title?: string; 
    lessons?: Array<{
      id?: number | string;
      title?: string;
      content?: Array<{
        id?: number | string;
        heading?: string;
        content?: string;
        type?: string;
      }>;
    }>;
    quiz?: Array<{
      id?: number | string;
      question?: string;
      correct_option_id?: number;
      correctAnswer?: number;
      options?: Array<{
        id: number;
        content?: string;
        text?: string;
      }>;
    }>;
  };
}

const Task = ({ task }: TaskProps) => {
  // Debug to see what's being received
  useEffect(() => {
    console.log("Task component received:", task);
    console.log("Lessons:", task?.lessons);
    console.log("Quiz:", task?.quiz);
  }, [task]);

  // Handle case where task is not fully loaded or malformed
  if (!task || !task.lessons || !Array.isArray(task.lessons) || task.lessons.length === 0) {
    return (
      <div className="flex h-full min-h-[400px] w-full flex-col rounded-xl bg-white p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Task Content Unavailable</h2>
        <p className="mb-4">This task doesn't have any content yet or there was an issue loading it.</p>
        <Link href="/app">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Return to Dashboard
          </button>
        </Link>
      </div>
    );
  }

  const totallessons = task.lessons.length;
  const [showLessonHeader, setShowLessonHeader] = useState(true);
  const [showLessonContent, setShowLessonContent] = useState(false);
  const [currLesson, setCurrLesson] = useState(0);

  const [showQuizIntro, setShowQuizIntro] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [showResult, setShowResult] = useState(false);

  const startLesson = () => {
    console.log("Starting lesson");
    setShowLessonHeader(false);
    setShowLessonContent(true);
  };

  const handleNextContent = () => {
    console.log("Next content, current lesson:", currLesson, "total lessons:", totallessons);
    
    if (currLesson < totallessons - 1) {
      setCurrLesson(currLesson + 1);
      setShowLessonContent(false);
      setShowLessonHeader(true);
    } else {
      console.log('Lesson completed');
      setShowLessonContent(false);
      setShowLessonHeader(false);
      
      // Only show quiz intro if we have quiz questions
      if (task.quiz && Array.isArray(task.quiz) && task.quiz.length > 0) {
        setShowQuizIntro(true);
      } else {
        // Skip directly to result if no quiz
        setShowResult(true);
      }
    }
  };

  const handleStartQuiz = () => {
    console.log("Starting quiz");
    setShowQuizIntro(false);
    setCurrentQuestionIndex(0);
    setShowQuiz(true);
  };
  
  console.log("Task state:", { 
    showLessonHeader, 
    showLessonContent, 
    showQuizIntro,
    showQuiz,
    showResult,
    currLesson
  });

  return (
    <div className="w-full min-h-[400px] bg-white rounded-xl overflow-hidden">
      {showLessonHeader && task.lessons[currLesson] && (
        <LessonHeader
          title={task.lessons[currLesson].title || `Lesson ${currLesson + 1}`}
          currentPart={currLesson + 1}
          totalParts={totallessons}
          startLesson={startLesson}
        />
      )}
      
      {showLessonContent && task.lessons[currLesson] && (
        <LessonContent
          lesson={task.lessons[currLesson]}
          index={currLesson}
          handleNextContent={handleNextContent}
        />
      )}

      {showQuizIntro && (
        <QuizIntro onStart={handleStartQuiz} />
      )}
      
      {showQuiz && task.quiz && Array.isArray(task.quiz) && task.quiz.length > 0 && task.quiz[currentQuestionIndex] && (
        <Quiz
          quiz={task.quiz[currentQuestionIndex]}
          nextQues={() => {
            console.log("Next question:", currentQuestionIndex + 1, "of", task.quiz?.length);
            if (currentQuestionIndex < (task.quiz?.length || 0) - 1) {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
              setShowQuiz(false);
              setShowResult(true);
            }
          }}
        />
      )}
      
      {showResult && (
        <EndResult />
      )}
    </div>
  );
};

export default Task;
