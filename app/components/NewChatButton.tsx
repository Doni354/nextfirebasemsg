"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"

export default function NewChatButton() {
  const router = useRouter()

  const handleNewChat = () => {
    router.push("/dashboard") // bisa diganti ke /dashboard/[sessionId] nanti
  }

  return (
    <button 
      onClick={handleNewChat}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
    >
      <Plus className="w-4 h-4" />
      <span className="text-sm font-medium">New Chat</span>
    </button>
  )
}
