'use client';
import Image from 'next/image';
import { useState } from 'react';

const EndResult = ({ tokens, endMessage }: { tokens: number; endMessage: string }) => {
  const [showToken, setShowToken] = useState(false);
  const [showEndScreen, setShowEndScreen] = useState(false);
  if (showEndScreen) {
    return (
      <div className="flex h-full flex-col items-center gap-8 rounded-lg p-20 pt-10">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/mediBrain.png"
            alt="Book"
            width={521}
            height={521}
            className="size-24 w-fit object-contain pl-2"
          />
          <p>Hurrayy!!</p>
        </div>
        <div>
          <h1 className="mb-2 text-center text-3xl font-bold">You’re progressing wonderfully!</h1>
          <p className="text-center text-[#F47C92]">
            You have the power to unlock the web3 world. Every challenge makes you stronger!
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/Loader.gif"
            alt="Book"
            width={521}
            height={521}
            className="w-16 scale-110 object-contain"
          />
          <button
            onClick={() => {
              window.location.href = '/app';
            }}
            className="green-btn mt-6 w-fit"
          >
            I{"'"}m ready for the next task!
          </button>
        </div>
      </div>
    );
  }
  if (showToken) {
    return (
      <div className="z-0 flex h-full flex-col items-center justify-center rounded-lg p-20 pt-10">
        <Image src="/movingUp.gif" alt="Book" fill={true} className="absolute inset-0 -z-10" />
        <div className="flex flex-col items-center justify-center gap-8">
          <Image
            src="/dollarCoin.gif"
            alt="Book"
            width={521}
            height={521}
            className="size-36 w-fit object-contain pl-2"
          />
          <h1 className="mb-2 text-center font-gliker text-5xl font-bold">{tokens}</h1>
          <h1 className="mb-2 text-center font-gliker text-3xl font-bold">Tokens collected</h1>
          <button onClick={() => setShowEndScreen(true)} className="green-btn w-fit">
            Continue
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col items-center gap-8 rounded-lg bg-white p-20 pt-10">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/mediBrain.png"
          alt="Book"
          width={521}
          height={521}
          className="size-24 w-fit object-contain pl-2"
        />
        <p>Hurrayy!!</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          src="/check.gif"
          alt="Book"
          width={521}
          height={521}
          className="w-20 scale-110 object-contain"
        />
        <h1 className="text-center text-3xl font-bold">
          {endMessage || "You're progressing wonderfully!"}
        </h1>
        <button onClick={() => setShowToken(true)} className="green-btn mt-10 w-fit">
          Continue
        </button>
      </div>
    </div>
  );
};

const TaskEndOk = ({ tokens, endMessage }: { tokens: number; endMessage: string }) => {
  return (
    <div className="relative flex h-full min-h-[70vh] min-w-[60vw] items-center justify-center">
      <EndResult tokens={tokens} endMessage={endMessage} />
    </div>
  );
};

export default TaskEndOk;
