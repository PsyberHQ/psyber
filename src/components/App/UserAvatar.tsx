'use client';
import Image from 'next/image';
import SignOutBtn from './SignOutBtn';
import { useEffect, useRef } from 'react';
import { Session } from 'next-auth';

const UserAvatar = ({ session }: { session: Session | null }) => {
  const ref = useRef<HTMLDetailsElement | null>(null);
  useEffect(() => {
    document.addEventListener('mousedown', () => {
      if (ref?.current?.open) {
        ref.current.open = false;
      }
    });
  }, []);
  return (
    <details ref={ref} className="relative mr-4">
      <summary className="flex size-12 cursor-pointer items-center">
        <Image
          title="This is Your Profile Image"
          src={session?.user?.image || ''}
          alt="user"
          width={372}
          height={472}
          className="rounded-full"
        />
      </summary>
      <div className="absolute -bottom-12 left-1/2 w-max -translate-x-1/2">
        <SignOutBtn />
      </div>
    </details>
  );
};

export default UserAvatar;
