"use client";

import Image from "next/image";
import { User } from "firebase/auth";

type Props = {
  user: User;
};

export default function UserProfile({ user }: Props) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
      <Image
        src={user.photoURL || "/placeholder.svg?height=32&width=32&query=user+avatar"}
        alt="Profile"
        width={32}
        height={32}
        className="rounded-full ring-2 ring-gray-600"
        unoptimized
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">
          {user.displayName || "User"}
        </p>
        <p className="text-xs text-gray-400 truncate">{user.email}</p>
      </div>
    </div>
  );
}
