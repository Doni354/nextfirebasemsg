"use client"

import { useEffect, useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy, limit, where } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { useSearchParams } from "next/navigation";

export default function ChatRoom() {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("id"); // ambil chatId dari query param

  const messagesRef = collection(db, "messages");
  const messagesQuery = chatId
    ? query(messagesRef, where("chatId", "==", chatId), orderBy("createdAt"), limit(100))
    : null;

  const [messagesSnapshot] = useCollection(messagesQuery);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesSnapshot]);

  const user = auth.currentUser;
  if (!user) return null;

  return (
    <div className="flex flex-col h-full bg-gray-800">
      {/* Chat Header */}
      <div className="border-b border-gray-700 bg-gray-900 px-6 py-3">
        <h1 className="text-m font-semibold text-white">Global Chat Room</h1>
        <p className="text-sm text-gray-400">{messagesSnapshot?.docs.length || 0} messages</p>
      </div>
      {/* Messages Area */}
<div
  className={`flex-1 min-h-0 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar ${
    messagesSnapshot?.docs.length === 0 ? "pb-0" : "pb-28"
  }`}
>
{(!messagesSnapshot || messagesSnapshot?.docs.length === 0) ? (
  <div className="flex-1 flex items-center justify-center">
    <div className="text-center max-w-md mx-auto translate-y-40">
      {/* Empty State Icon & Text */}
      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-white mb-2">
        No messages yet
      </h3>
      <p className="text-gray-400">
        Start the conversation by sending a message below.
      </p>
    </div>
  </div>
) : (
  messagesSnapshot?.docs.map((doc) => (
    <ChatMessage
      key={doc.id}
      message={doc.data() as any}
      currentUser={user}
    />
  ))
)}


  <div ref={scrollRef} />
  <TypingIndicator currentUserUid={user.uid} />
</div>

      {/* Message Input */}
      <MessageInput />
    </div>
  );

}
