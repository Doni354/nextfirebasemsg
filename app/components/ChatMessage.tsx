'use client';

import Image from "next/image";
import { User } from "firebase/auth";

type Props = {
  message: {
    text: string;
    uid: string;
    photoURL: string;
    displayName: string;
    createdAt: string;
  };
  currentUser: User;
};

export default function ChatMessage({ message, currentUser }: Props) {
  const isOwnMessage = message.uid === currentUser.uid;

  return (
    <div
      className={`flex items-start gap-2 mb-4 ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      {!isOwnMessage && (
        <Image
          src={message.photoURL}
          alt="User"
          width={32}
          height={32}
          className="rounded-full"
          unoptimized
        />
      )}

      <div
        className={`p-3 rounded-2xl max-w-xs ${
          isOwnMessage ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 text-black rounded-bl-none"
        }`}
      >
        <p className="text-sm font-semibold mb-1">{!isOwnMessage && message.displayName}</p>
        <p>{message.text}</p>
      </div>

      {isOwnMessage && (
        <Image
          src={message.photoURL}
          alt="User"
          width={32}
          height={32}
          className="rounded-full"
          unoptimized
        />
      )}
    </div>
  );
}
