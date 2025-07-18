'use client';

import Image from "next/image";
import { User } from "firebase/auth";

type Props = {
  user: User;
};

export default function UserProfile({ user }: Props) {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={user.photoURL || "/default-avatar.png"}
        alt="Profile"
        width={80}
        height={80}
        className="rounded-full"
        unoptimized
      />
      <p className="mt-4 font-semibold text-center">{user.displayName}</p>
      <p className="text-sm text-gray-500 text-center">{user.email}</p>
    </div>
  );
}
