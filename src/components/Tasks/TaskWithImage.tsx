import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import WalletBtn from '../WalletBtn';
import { useWallet } from '@solana/wallet-adapter-react';
import { LessonType, TaskWithImageType } from '@/Types/Task';
import TaskEndOk from './TaskEndOk';

const LessonHeader = ({
  lesson,
  currentPart,
  totalParts,
  startLesson,
}: {
  lesson: LessonType;
  currentPart: number;
  totalParts: number;
  startLesson: () => void;
}) => (
  <div className="absolute inset-0 flex h-full flex-col items-center gap-8 rounded-lg bg-[#7047A3] p-20 text-white">
    <div className="flex justify-center">
      <Image
        src={lesson.specialImage || '/book.png'}
        alt="Book"
        width={521}
        height={521}
        className="size-20 w-fit object-contain"
      />
    </div>
    <div>
      <h1 className="font-gliker mb-2 text-center text-3xl">
        Lesson
        <span className="font-bold"> {currentPart}</span>
      </h1>
      <h2 className="font-gliker mb-2 text-center text-2xl">{lesson.title}</h2>
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
        <button onClick={startLesson} className="green-btn mt-10">
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
}) => {
  const [idx, setIdx] = useState(0);
  return (
    <div className="absolute inset-0 flex h-full flex-col items-center gap-8 rounded-lg">
      <div className="flex w-full items-center justify-between bg-[#F47C92] px-10 py-6 text-white">
        <h2 className="font-gliker mb-2 text-2xl">
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
              src={lesson.content[idx].image || ''}
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
            className="green-btn mt-4"
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
      <h1 className="font-gliker mb-2 text-center text-3xl">
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
      onClick={() => {
        onClick();
      }}
    >
      <button className="w-fit rounded-xl bg-white px-4 py-2 font-bold text-black shadow-lg shadow-green-600 hover:bg-white/90">
        Go To Solflare
      </button>
    </Link>
  </div>
);

const SolflareConnect = ({ onConnected, taskId }: { taskId: number; onConnected: () => void }) => {
  const [connectwallet, setConnectWallet] = useState(false);
  const wallet = useWallet();

  useEffect(() => {
    const updateUser = async () => {
      try {
        const a = await fetch('/api/user-level', {
          method: 'POST',
          body: JSON.stringify({ taskId, walletAddress: wallet?.publicKey?.toBase58() }),
        });
        const b = await a.json();
        if (b.redirect) {
          window.location.href = '/app';
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    const doIT = async () => {
      if (wallet.connected) {
        await updateUser();
        onConnected();
      }
    };
    doIT();
  }, [onConnected, taskId, wallet]);

  return (
    <div className="absolute inset-0 flex h-full flex-col items-center gap-8 overflow-scroll rounded-lg bg-[#7047A3] p-6 text-white md:p-20">
      <div>
        <h1 className="font-gliker mb-2 text-center text-3xl">
          Welcome back! Ready to connect your solflare wallet?
        </h1>
      </div>
      <div>
        <h1 className="font-bold">
          You{"'"}re just a step away from fully integrating your solflare wallet with psyber.{' '}
        </h1>
        <ol className="pl-6" style={{ listStyleType: 'disc' }}>
          <li>
            Click {'"'}connect wallet{'"'} to get started.
          </li>
          <li>Choose solflare from the available wallet options.</li>
          <li>Authorize the connection with solflare, and you{"'"}re all set!</li>
        </ol>
      </div>
      {connectwallet ? (
        <div className="py mt-10 w-fit rounded-xl px-4">
          <WalletBtn />
        </div>
      ) : (
        <button
          onClick={() => {
            setConnectWallet(true);
          }}
          className="mt-10 w-fit rounded-xl bg-white px-4 py-2 font-bold text-black shadow-lg shadow-green-600 hover:bg-white/90"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

const TaskWithImage = ({ task }: { task: TaskWithImageType }) => {
  const totallessons = task.lessons.length;
  const [showLessonHeader, setShowLessonHeader] = useState(true);
  const [currLesson, setCurrLesson] = useState(0);
  const [showLessonContent, setShowLessonContent] = useState(false);
  const [showSolflareRedirect, setShowSolflareRedirect] = useState(false);
  const [showSolflareConnect, setShowSolflareConnect] = useState(false);
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
      setShowSolflareRedirect(true);
    }
  };

  const handleShowConnect = () => {
    setShowSolflareRedirect(false);
    setShowSolflareConnect(true);
  };

  const handleOnConnected = async () => {
    setShowSolflareConnect(false);
    setShowResult(true);
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      {showLessonHeader && (
        <LessonHeader
          lesson={task.lessons[currLesson]}
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
      {showSolflareConnect && (
        <SolflareConnect onConnected={handleOnConnected} taskId={task.index} />
      )}
      {showResult && <TaskEndOk tokens={Number(task.reward.split(' ')[0])} />}
    </div>
  );
};

export default TaskWithImage;
