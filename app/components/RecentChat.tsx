"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";

type ChatEntry = {
  chatId: string;
  createdAt: number; // pakai epoch biar gampang sort
};

export default function RecentChat() {
  const [user] = useAuthState(auth);
  const [chatList, setChatList] = useState<ChatEntry[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    // Ambil pesan dengan sorting DESC (baru → lama)
    const q = query(
      collection(db, "messages"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatsMap = new Map<string, ChatEntry>();

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const chatId = data.chatId as string;
        const createdAt = data.createdAt?.seconds || 0;

        // karena query sudah DESC, cukup simpan chatId pertama kali muncul
        if (!chatsMap.has(chatId)) {
          chatsMap.set(chatId, { chatId, createdAt });
        }
      });

      // Hasil akhirnya DESC
      setChatList(Array.from(chatsMap.values()));
    });

    return () => unsubscribe();
  }, [user]);

  const handleClick = (chatId: string) => {
    router.push(`/dashboard?id=${chatId}`);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
      <div className="space-y-2">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Recent Chats
        </div>

        {chatList.map((chat, i) => (
          <button
            key={i}
            onClick={() => handleClick(chat.chatId)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-left"
          >
            <span className="text-sm text-gray-300 truncate">{chat.chatId}</span>
          </button>
        ))}

        {chatList.length === 0 && (
          <p className="text-sm text-gray-500">Belum ada chat</p>
        )}
      </div>
    </div>
  );
}
