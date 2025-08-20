"use client";

import type React from "react";
import { useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams, useRouter } from "next/navigation";

export default function MessageInput() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  let chatId = searchParams.get("id");

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || !text.trim() || isLoading) return;

    setIsLoading(true);

    try {
      // generate chatId kalau belum ada
      if (!chatId) {
        chatId = `${uuidv4()}-${Date.now()}`;
        router.push(`/dashboard?id=${chatId}`);
      }

      // generate questionId baru
      const questionId = uuidv4();

      // simpan pesan user
      await addDoc(collection(db, "messages"), {
        text: text.trim(),
        uid: user.uid,
        chatId,
        questionId,
        createdAt: serverTimestamp(),
        role: "user",
      });

      // simpan AI placeholder
      const aiDocRef = await addDoc(collection(db, "messages"), {
        text: "",
        uid: "openai-bot",
        chatId,
        questionId,
        createdAt: serverTimestamp(),
        role: "assistant",
        isLoading: true,
      });

      // 🔥 Panggil Cloud Function
      await fetch(
        "https://us-central1-banded-chimera-444811-a5.cloudfunctions.net/generateAIResponse",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chatId,
            questionId,
            aiDocId: aiDocRef.id,
            userText: text.trim(),
          }),
        }
      );

      // ✅ Reset input & enable lagi
      setText("");
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 pl-64 flex justify-center">
      <form
        onSubmit={sendMessage}
        className="flex items-end gap-2 max-w-3xl mx-auto w-full"
      >
        <div className="flex-1 relative">
          <textarea
            className="w-full bg-[#40414F] text-white placeholder-gray-400 rounded-2xl px-4 py-3 pr-12 resize-none 
                       focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent 
                       transition-all duration-200 text-sm md:text-base max-h-40 overflow-y-auto 
                       chat-input-scrollbar disabled:opacity-50"
            placeholder={
              isLoading
                ? "Mengirim pesan..."
                : "Ketik pertanyaan Anda..."
            }
            value={text}
            disabled={isLoading}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(e);
              }
            }}
            rows={1}
            style={{ minHeight: "44px", height: "auto" }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height =
                Math.min(target.scrollHeight, 160) + "px";
            }}
          />
          <div className="absolute right-2 bottom-2 p-1">
            <button
              type="submit"
              disabled={!text.trim() || isLoading}
              className="flex items-center justify-center w-9 h-9 bg-[#2563EB] hover:bg-[#1D4ED8] 
                         disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full 
                         shadow-md transition-all duration-200"
            >
              ➤
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
