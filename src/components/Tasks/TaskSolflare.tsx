import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

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
      <h1 className="mb-2 text-center text-3xl font-bold">
        Lesson
        <span className="font-bold"> {currentPart}</span>
      </h1>
      <h2 className="mb-2 text-center text-2xl font-bold">{title}</h2>
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
        <button
          onClick={startLesson}
          className="mt-10 w-fit rounded-full bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
        >
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
  lesson: { content: { id: number; type: string; image: string }[]; specialImage?: string };
  index: number;
  handleNextContent: () => void;
}) => {
  const [idx, setIdx] = useState(0);
  return (
    <div className="absolute inset-0 flex h-full flex-col items-center gap-8 rounded-lg">
      <div className="flex w-full items-center justify-between bg-[#F47C92] px-10 py-6 text-white">
        <h2 className="mb-2 text-2xl font-bold">
          {index === 0 ? 'Introduction to Solflare' : 'Steps'}
        </h2>
        {lesson.specialImage && (
          <div className="flex justify-center">
            <Image
              src={lesson.specialImage}
              alt="Special Image"
              width={721}
              height={721}
              className="h-16 w-fit object-contain"
            />
          </div>
        )}
      </div>
      <div className="overflow-scroll px-10 pb-10">
        {lesson.content[idx].type === 'image' && (
          <div className="flex justify-center">
            <Image
              src={lesson.content[idx].image}
              alt="Lesson Image"
              width={1021}
              height={1021}
              className="w-fit object-contain"
            />
          </div>
        )}
        <div className="flex w-full items-center justify-center gap-4 rounded-t-lg bg-white">
          <button
            onClick={() => {
              if (idx == lesson.content.length - 1) {
                handleNextContent();
              } else setIdx(idx + 1);
            }}
            className="mt-4 w-fit rounded-full bg-green-500 p-4 px-5 py-3 font-bold text-white hover:bg-green-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const SolflareRedirect = ({ onClick }: { onClick: () => void }) => (
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
        Ready to create your wallet? Click &apos;Go to solflare&apos; and create one now!
      </h1>
    </div>
    <div>
      <h1 className="font-bold">
        After you&apos;ve created your wallet, return to psyber to continue.
      </h1>
    </div>
    <Link
      target="_blank"
      href="https://chromewebstore.google.com/detail/solflare-wallet/bhhhlbepdkbapadjdnnojkbgioiodbic?pli=1"
    >
      <button
        onClick={() => {
          onClick();
        }}
        className="w-fit rounded-xl bg-white px-4 py-2 font-bold text-black shadow-lg shadow-green-600 hover:bg-white/90"
      >
        Go To Solflare
      </button>
    </Link>
  </div>
);

// const Quiz = ({
//   quiz,
//   nextQues,
// }: {
//   quiz: { question: string; options: { id: number; content: string }[]; correctAnswer: number };
//   nextQues: () => void;
// }) => {
//   const [showResult, setShowResult] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [options, setOptions] = useState(quiz.options);
//   const [selectedOption, setSelectedOption] = useState<number | null>(null);

//   useEffect(() => {
//     setOptions(quiz.options);
//   }, [quiz]);

//   const onAnswer = (answerId: number) => {
//     setIsCorrect(answerId === quiz.correctAnswer);
//     setShowResult(true);
//     setSelectedOption(answerId);
//   };

//   return (
//     <div className="absolute inset-0 flex h-full flex-col items-center rounded-lg bg-white">
//       {showResult ? (
//         <div
//           className={`mb-4 w-full py-8 text-center text-white ${isCorrect ? 'bg-[#16C86D]' : 'bg-[#E93052]'}`}
//         >
//           <p className="mb-2 text-xl font-bold">
//             {isCorrect ? "Wohoo! That's correct" : "That's incorrect!"}
//           </p>
//         </div>
//       ) : (
//         <>
//           <Image
//             src="/mediBrain.png"
//             alt="Book"
//             width={521}
//             height={521}
//             className="size-24 w-fit object-contain"
//           />
//         </>
//       )}
//       <div className="flex h-full flex-col items-center justify-between p-20 pt-10">
//         <div className="">
//           <h2 className="mb-4 text-xl font-bold">{quiz.question}</h2>
//           <div className="flex flex-col items-center justify-center space-y-4">
//             {options.map((option: { id: number; content: string }) => (
//               <button
//                 key={option.id}
//                 onClick={() => onAnswer(option.id)}
//                 className={`w-full rounded-full px-6 py-3 text-center shadow-md ${
//                   showResult && option.id === quiz.correctAnswer
//                     ? 'bg-green-500 text-white'
//                     : selectedOption === option.id
//                       ? 'bg-red-500 text-white'
//                       : 'border border-[#F47C92] hover:bg-gray-100'
//                 }`}
//                 disabled={showResult}
//               >
//                 {option.content}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div>
//           <button
//             onClick={() => {
//               if (showResult) {
//                 setShowResult(false);
//                 nextQues();
//                 setSelectedOption(null);
//               }
//             }}
//             className="mt-4 w-fit rounded-full bg-[#7047A3] px-8 py-3 font-bold text-white"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const EndResult = () => {
//   const [showToken, setShowToken] = useState(false);
//   const [showEndScreen, setShowEndScreen] = useState(false);
//   if (showEndScreen) {
//     return (
//       <div className="absolute inset-0 flex h-full flex-col items-center gap-8 rounded-lg p-20">
//         <div className="flex flex-col items-center justify-center">
//           <Image
//             src="/mediBrain.png"
//             alt="Book"
//             width={521}
//             height={521}
//             className="size-24 w-fit object-contain pl-2"
//           />
//           <p>Hurrayy!!</p>
//         </div>
//         <div>
//           <h1 className="mb-2 text-center text-3xl font-bold">You’re progressing wonderfully!</h1>
//           <p className="text-center text-[#F47C92]">
//             You have the power to unlock the web3 world. Every challenge makes you stronger!
//           </p>
//         </div>
//         <div className="flex flex-col items-center justify-center">
//           <Image
//             src="/LoadingGreenBars.png"
//             alt="Book"
//             width={521}
//             height={521}
//             className="w-20 object-contain"
//           />
//           {/* <Link href="/app"> */}
//           <button
//             onClick={() => {
//               window.location.href = '/app';
//             }}
//             className="mt-10 w-full rounded-full bg-green-500 px-4 py-2 text-white shadow-md hover:bg-green-600"
//           >
//             I{"'"}m ready for the next task!
//           </button>
//           {/* </Link> */}
//         </div>
//       </div>
//     );
//   }
//   if (showToken) {
//     return (
//       <div className="absolute inset-0 flex h-full flex-col items-center gap-8 rounded-lg p-20">
//         <div className="flex flex-col items-center justify-center">
//           <Image
//             src="/mediBrain.png"
//             alt="Book"
//             width={521}
//             height={521}
//             className="size-24 w-fit object-contain pl-2"
//           />
//           <p>Hurrayy!!</p>
//         </div>
//         <div>
//           <h1 className="mb-2 text-center text-3xl font-bold">50</h1>
//         </div>
//         <div>
//           <h1 className="mb-2 text-center text-3xl font-bold">Token collected</h1>
//           <div className="flex flex-col items-center justify-center gap-8">
//             <button
//               onClick={() => setShowEndScreen(true)}
//               className="mt-10 w-fit rounded-full bg-green-500 px-6 py-3 font-bold text-white shadow-md hover:bg-green-600"
//             >
//               Continue
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="absolute inset-0 flex h-full flex-col items-center gap-8 rounded-lg p-20">
//       <div className="flex flex-col items-center justify-center">
//         <Image
//           src="/mediBrain.png"
//           alt="Book"
//           width={521}
//           height={521}
//           className="size-24 w-fit object-contain pl-2"
//         />
//         <p>Hurrayy!!</p>
//       </div>
//       <div>
//         <h1 className="mb-2 text-center text-3xl font-bold">Quiz Completed</h1>
//       </div>
//       <div>
//         <h1 className="mb-2 text-center text-3xl font-bold">
//           Great job! you{"'"}ve completed your first task!
//         </h1>
//         <div className="flex flex-col items-center justify-center gap-8">
//           <button
//             onClick={() => setShowToken(true)}
//             className="mt-10 w-fit rounded-full bg-green-500 px-6 py-3 font-bold text-white shadow-md hover:bg-green-600"
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

const task = {
  id: '03',
  title: 'Solfalre',
  description:
    'Learn about digital wallets, why they are important in web 3.0, and how they differ from traditional online accounts in web 2.0',
  learningTip:
    'Focus on understanding why digital wallets are essential in web 3.0. this will help you see how they provide more control and security for your digital assets.',
  reward: '100 tokens',
  lessons: [
    {
      id: 1,
      title: 'Introduction to solflare',
      specialImage: '/solflareLogo.png',
      content: [
        {
          id: 1,
          type: 'image',
          image: '/solflareLesson1.png',
        },
        {
          id: 2,
          type: 'image',
          image: '/solflareLesson2.png',
        },
        {
          id: 3,
          type: 'image',
          image: '/solflareLesson3.png',
        },
        {
          id: 4,
          type: 'image',
          image: '/solflareLesson4.png',
        },
        {
          id: 5,
          type: 'image',
          image: '/solflareLesson5.png',
        },
        {
          id: 6,
          type: 'image',
          image: '/solflareLesson6.png',
        },
      ],
    },
  ],
};

const TaskSolflare = () => {
  const totallessons = task.lessons.length;
  const [showLessonHeader, setShowLessonHeader] = useState(true);
  const [currLesson, setCurrLesson] = useState(0);
  const [showLessonContent, setShowLessonContent] = useState(false);

  const [showSolflareRedirect, setShowSolflareRedirect] = useState(false);

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
      setShowSolflareRedirect(true);
    }
  };

  const handleShowConnect = () => {
    setShowSolflareRedirect(false);
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

      {showSolflareRedirect && <SolflareRedirect onClick={handleShowConnect} />}
      {/* {showQuiz && <Quiz nextQues={handleNextQuestion} />} */}
      {/* {showResult && <EndResult />} */}
    </div>
  );
};

export default TaskSolflare;
