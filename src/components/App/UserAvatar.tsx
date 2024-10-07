'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Session } from 'next-auth';
import SignOutBtn from './SignOutBtn';

const UserAvatar = ({ session }: { session: Session | null }) => {
  const ref = useRef<HTMLDetailsElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref?.current?.open && !ref.current.contains(e?.target as Node)) {
        ref.current.open = false;
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
