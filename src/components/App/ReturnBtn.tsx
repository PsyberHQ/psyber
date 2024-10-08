'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ReturnBtn = () => {
  const router = usePathname();
  const mount = router !== '/app' && router !== '/app/login';

  if (!mount) return null;

  return (
    <Link href="/app">
      <div className="fixed bottom-6 left-6 cursor-pointer text-white">
        <span className="flex items-center justify-center gap-2">
          <Image src="/returnIcon.png" alt="Logo" width={372} height={472} className="size-4" />
          return to home
        </span>
      </div>
    </Link>
  );
};

export default ReturnBtn;
