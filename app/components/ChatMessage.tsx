"use client"

import Image from "next/image"
import type { User } from "firebase/auth"
import { Timestamp } from "firebase/firestore";


type Props = {
  message: {
    text: string
    uid: string
    photoURL: string
    displayName: string
    createdAt: Timestamp
  }
  currentUser: User
}

export default function ChatMessage({ message, currentUser }: Props) {
  const isOwnMessage = message.uid === currentUser.uid

  return (
    <div className={`flex items-start gap-3 ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Image
          src={message.photoURL || "/placeholder.svg?height=40&width=40"}
          alt={message.displayName || "User"}
          width={40}
          height={40}
          className="rounded-full ring-2 ring-gray-600"
          unoptimized
        />
      </div>

      {/* Message Content */}
      <div className={`flex flex-col max-w-xs lg:max-w-md ${isOwnMessage ? "items-end" : "items-start"}`}>
        {/* User Name and Time */}
        <div className={`flex items-center gap-2 mb-1 ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>
          <span className="text-sm font-medium text-gray-300">{isOwnMessage ? "You" : message.displayName}</span>
          <span className="text-xs text-gray-500">
            {message.createdAt?.toDate
              ? message.createdAt.toDate().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </span>

        </div>

        {/* Message Bubble */}
        <div
          className={`px-4 py-3 rounded-2xl ${
            isOwnMessage ? "bg-blue-600 text-white rounded-br-md" : "bg-gray-700 text-gray-100 rounded-bl-md"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
        </div>
      </div>
    </div>
  )
}
