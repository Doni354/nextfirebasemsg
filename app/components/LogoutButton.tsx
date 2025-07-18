'use client';

import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
    >
      Logout
    </button>
  );
}
