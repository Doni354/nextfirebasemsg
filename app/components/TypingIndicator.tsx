"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot } from "firebase/firestore"

export default function TypingIndicator({ currentUserUid }: { currentUserUid: string }) {
  const [usersTyping, setUsersTyping] = useState<string[]>([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "typing"), (snapshot) => {
      const typing = snapshot.docs
        .filter(doc => doc.id !== currentUserUid) // pastikan bukan user sendiri
        .map(doc => doc.data().displayName as string)
        .filter(name => !!name) // hanya yang ada displayName
      setUsersTyping(typing)
    })
    return () => unsub()
  }, [currentUserUid])

  if (usersTyping.length === 0) return null

  return (
    <div className="text-sm text-gray-400 italic px-4 pb-2">
      {usersTyping.join(", ")} sedang mengetik...
    </div>
  )
}
