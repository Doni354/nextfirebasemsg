"use client"

import Image from "next/image"
import type { User } from "firebase/auth"
import { Timestamp } from "firebase/firestore"
import { motion } from "framer-motion"
import React from "react"

type Props = {
  message: {
    text: string;
    uid: string;
    photoURL: string;
    displayName: string;
    createdAt: Timestamp;
    chatId?: string; // tambahin
    status?: "sent" | "delivered";
  };
  currentUser: User;
};


function ChatMessageComponent({ message, currentUser }: Props) {
  const isOwnMessage = message.uid === currentUser.uid

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-start gap-3 ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}
    >
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

      <div className={`flex flex-col max-w-xs lg:max-w-md ${isOwnMessage ? "items-end" : "items-start"}`}>
        <div className={`flex items-center gap-2 mb-1 ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>
          <span className="text-sm font-medium text-gray-300">{isOwnMessage ? "You" : message.displayName}</span>
          <span className="text-xs text-gray-500">
            {message.createdAt?.toDate
              ? message.createdAt.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : ""}
          </span>
        </div>

        <div
          className={`px-4 py-3 rounded-2xl ${
            isOwnMessage ? "bg-blue-600 text-white rounded-br-md" : "bg-gray-700 text-gray-100 rounded-bl-md"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
          {isOwnMessage && (
            <span className="block mt-1 text-[10px] text-gray-200 opacity-70">
              {message.status === "delivered" ? "✓✓ Delivered" : "✓ Sent"}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Optimasi avatar & re-render
export default React.memo(ChatMessageComponent)
