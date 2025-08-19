"use client"

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import UserProfile from "./UserProfile"
import LogoutButton from "./LogoutButton"
import { Settings, HelpCircle } from "lucide-react"
import RecentChat from "./RecentChat";
import NewChatButton from "./NewChatButton"; // 👈 import komponen baru

export default function Sidebar() {
  const [user] = useAuthState(auth);

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <NewChatButton /> {/* 👈 panggil di sini */}
      </div>

      <RecentChat />

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-700 space-y-3">
        {/* Settings and Help */}
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-left">
            <Settings className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Settings</span>
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-left">
            <HelpCircle className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Help & Support</span>
          </button>
        </div>

        {/* User Profile */}
        {user && <UserProfile user={user} />}

        {/* Logout Button */}
        <LogoutButton />
      </div>
    </aside>
  )
}
