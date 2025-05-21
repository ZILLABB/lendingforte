'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center hover:opacity-90 transition-opacity"
      aria-label="LendingForte"
    >
      <div className="relative overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-600 p-0.5 shadow-lg">
        <div className="h-9 w-9 sm:h-10 sm:w-10 relative overflow-hidden">
          <Image
            src="/images/lendingforte/logod.png"
            alt="LendingForte Logo"
            width={40}
            height={40}
            className="w-full h-full rounded-full bg-gray-900"
            priority
          />
        </div>
      </div>
      <span className="ml-2 sm:ml-3 text-base sm:text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        LendingForte
      </span>
    </Link>
  );
}
