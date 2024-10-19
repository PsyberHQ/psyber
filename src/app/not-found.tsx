import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import AppLayout from './app/layout';
import Image from 'next/image';

const NotFoundPage = async () => {
  const path = headers().get('x-pathname');

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center gap-4 overflow-y-scroll p-6 text-center md:p-10">
        <Image
          src="/mediBrain.png"
          height={1200}
          width={1200}
          alt="medi brain logo"
          className="mx-auto w-40 md:w-48"
        />
        <div className="space-y-4">
          <h1 className="font-gliker text-4xl font-bold text-gray-800 sm:text-6xl">404</h1>
          <p className="text-base text-gray-600 sm:text-xl">
            Oops! The page you{"'"}re looking for at <span className="text-red-600">{path}</span>{' '}
            doesn{"'"}t exist.
          </p>
          <p className="text-lg text-gray-500">
            It seems you{"'"}ve found a glitch in the matrix...
          </p>
        </div>

        <Link href="/app">
          <div className="green-btn mt-6 py-8 text-xl font-semibold">Return Home</div>
        </Link>
      </div>
    </AppLayout>
  );
};

export default NotFoundPage;
