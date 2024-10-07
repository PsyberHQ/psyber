import { ContentType, LessonType, QuizType, TaskWithLessonQuizType } from '@/Types/Task';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import TaskEndOk from './TaskEndOk';

const LessonHeader = ({
  title,
  currentPart,
  totalParts,
  startLesson,
}: {
  title: string;
  currentPart: number;
  totalParts: number;
  startLesson: () => void;
}) => (
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
      <h1 className="font-gliker mb-2 text-center text-3xl">
        Lesson
        <span className="font-bold"> {currentPart}</span>
      </h1>
      <h2 className="font-gliker mb-2 text-center text-3xl">{title}</h2>
    </div>
    <div className="mt-4 w-full">
      <div className="flex gap-1">
        {Array.from({ length: totalParts }).map((_, index) => (
          <div
            key={index}
            className={`h-2.5 w-full rounded-full ${index < currentPart ? 'bg-green-500' : 'bg-white'}`}
          />
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button onClick={startLesson} className="green-btn mt-10 w-fit">
          Continue
        </button>
      </div>
    </div>
  </div>
);

const LessonContent = ({
  lesson,
  index,
  handleNextContent,
}: {
  lesson: LessonType;
  index: number;
  handleNextContent: () => void;
}) => (
  <div className="absolute inset-0 flex h-full flex-col items-center gap-8 rounded-lg">
    <div className="w-full bg-[#F47C92] px-10 py-6 text-white">
      <h2 className="font-gliker mb-2 text-2xl">Lesson: {index + 1}</h2>
    </div>
    <div className="overflow-scroll px-10 pb-10">
      {lesson.content.map((content: ContentType, idx) => (
        <div key={idx} className="mb-4">
          <h2 className="mb-4 text-xl font-bold">{content.heading}</h2>
          <p className="mb-4">{content.content}</p>
        </div>
      ))}
      <div className="flex w-full items-center justify-center gap-4 rounded-t-lg bg-white">
        <button
          onClick={handleNextContent}
          className="mt-4 w-fit rounded-full bg-green-500 p-4 px-5 py-3 font-bold text-white hover:bg-green-600"
        >
          Next
        </button>
      </div>
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
      <h1 className="font-gliker mb-2 text-center text-3xl">Quiz Time</h1>
    </div>
    <div>
      <h1 className="font-bold">Instructions:</h1>
      <ol className="pl-6" style={{ listStyleType: 'disc' }}>
        <li>Please read each question carefully and select the best answer.</li>
        <li>There are a total of 3 questions.</li>
        <li>You will receive instant feedback after each question.</li>
      </ol>
    </div>
    <button onClick={onStart} className="green-btn w-fit">
      Start Quiz
    </button>
  </div>
);

const Quiz = ({ quiz, nextQues }: { quiz: QuizType; nextQues: () => void }) => {
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [options, setOptions] = useState(quiz.options);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    setOptions(quiz.options);
  }, [quiz]);

  const onAnswer = (answerId: number) => {
    setIsCorrect(answerId === quiz.correctAnswer);
    setShowResult(true);
    setSelectedOption(answerId);
  };

  return (
    <div className="absolute inset-0 flex h-full flex-col items-center rounded-lg bg-white">
      {showResult ? (
        <div
          className={`mb-4 flex w-full items-center justify-center gap-2 py-8 text-center text-white ${isCorrect ? 'bg-[#16C86D]' : 'bg-[#E93052]'}`}
        >
          {isCorrect ? (
            <Image
              src="/checkIcon.png"
              alt="check"
              width={521}
              height={521}
              className="w-12 object-contain"
            />
          ) : (
            <Image
              src="/cross.png"
              alt="cross"
              width={521}
              height={521}
              className="w-12 object-contain"
            />
          )}
          <p className="font-gliker text-xl md:text-3xl">
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
      <div className="flex h-full flex-col items-center justify-between p-20 pt-10">
        <div className="">
          <h2 className="mb-4 text-xl font-bold">{quiz.question}</h2>
          <div className="flex flex-col items-center justify-center space-y-4">
            {options.map((option: { id: number; content: string }) => (
              <button
                key={option.id}
                onClick={() => onAnswer(option.id)}
                className={`w-full rounded-full px-6 py-3 text-center shadow-md ${
                  showResult && option.id === quiz.correctAnswer
                    ? 'bg-green-500 text-white'
                    : selectedOption === option.id
                      ? 'bg-red-500 text-white'
                      : 'border border-[#F47C92] hover:bg-gray-100'
                }`}
                disabled={showResult}
              >
                {option.content}
              </button>
            ))}
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              if (showResult) {
                setShowResult(false);
                nextQues();
                setSelectedOption(null);
              }
            }}
            className="mt-4 w-fit rounded-full bg-[#7047A3] px-8 py-3 font-bold text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const TaskSimpleLessonQuiz = ({ task }: { task: TaskWithLessonQuizType }) => {
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

  const handleNextQuestion = () => {
    if (currentQuestionIndex < task.quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowQuiz(false);
      setShowResult(true);
    }
  };

  useEffect(() => {
    const updateProgress = async () => {
      try {
        await fetch('/api/user-level', {
          method: 'POST',
          body: JSON.stringify({ taskId: task.index }),
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };
    if (showResult) updateProgress();
  }, [showResult, task.index]);

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
      {showQuiz && <Quiz quiz={task.quiz[currentQuestionIndex]} nextQues={handleNextQuestion} />}
      {showResult && <TaskEndOk tokens={Number(task.reward.split(' ')[0])} />}
    </div>
  );
};

export default TaskSimpleLessonQuiz;
