'use client';

import { useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function MessageInput() {
  const [text, setText] = useState("");

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || !text.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: text.trim(),
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  return (
    <form onSubmit={sendMessage} className="flex gap-2 p-4 border-t bg-white">
      <input
        type="text"
        className="flex-1 border rounded-full px-4 py-2"
        placeholder="Tulis pesan..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
      >
        Kirim
      </button>
    </form>
  );
}
