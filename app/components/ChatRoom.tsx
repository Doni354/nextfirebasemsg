'use client';

import { useEffect, useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";

export default function ChatRoom() {
  const messagesRef = collection(db, "messages");
  const messagesQuery = query(messagesRef, orderBy("createdAt"), limit(100));

  const [messagesSnapshot] = useCollection(messagesQuery);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesSnapshot]);

  const user = auth.currentUser;
  if (!user) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messagesSnapshot?.docs.map((doc) => (
            <ChatMessage
                key={doc.id}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                message={doc.data() as any}
                currentUser={user} />
        ))}
        <div ref={scrollRef} />
      </div>
      <MessageInput />
    </div>
  );
}
