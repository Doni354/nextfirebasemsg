'use client';

import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react"

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/");
  };
    return (
      <button
  onClick={handleLogout}
  type="button"
  className="relative z-50 w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
>
  <LogOut className="w-4 h-4" />
  <span className="text-sm font-medium">Sign Out</span>
</button>

    )
  }
  
