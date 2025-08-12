"use client";

import { MessageSquare } from "lucide-react";

export default function RecentChat() {
  const recentChats = [
    "How to improve my React app?",
    "Firebase authentication setup",
    "UI design best practices",
    "Database optimization tips",
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-2">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Recent Chats
        </div>

        {recentChats.map((chat, i) => (
          <button
            key={i}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-left"
          >
            <MessageSquare className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300 truncate">{chat}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
