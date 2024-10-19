import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import WalletBtn from '../WalletBtn';
import { useWallet } from '@solana/wallet-adapter-react';
import { TaskWithImageType } from '@/Types/Task';
import TaskEndOk from './TaskEndOk';
import LessonContent from './common/LessonContent';
import LessonIntro from './common/LessonIntro';

const SolflareRedirect = ({ onClick }: { onClick: () => void }) => (
  <div className="flex h-full flex-col items-center gap-8 rounded-lg bg-[#7047A3] p-20 text-white">
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
      <h1 className="mb-2 text-center font-gliker text-3xl">
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
    <div className="flex h-full flex-col items-center gap-8 overflow-scroll rounded-lg bg-[#7047A3] p-6 text-white md:p-20">
      <div>
        <h1 className="mb-2 text-center font-gliker text-3xl">
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
        <LessonIntro
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
      {showResult && (
        <TaskEndOk
          endMessage="Congratulations! You have completed the Wallet Connection task."
          tokens={Number(task.reward.split(' ')[0])}
        />
      )}
    </div>
  );
};

export default TaskWithImage;
