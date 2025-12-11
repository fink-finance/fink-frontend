'use client';

import Link from 'next/link';
import Image from 'next/image';

export const UserProfileIcon = () => {
  return (
    <Link
      href="/profile"
      className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
    >
      {/* aumentei de h-10 w-10 para h-13 w-13 (~52px) */}
      <div className="h-13 w-13 overflow-hidden rounded-full border border-zinc-200">
        <Image
          src="/images/profile/Foto Gabriel.jpg"
          alt="Foto de perfil"
          width={46}
          height={46}
          className="h-full w-full object-cover"
        />
      </div>
    </Link>
  );
};
