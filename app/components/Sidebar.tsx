'use client';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import UserProfile from "./UserProfile";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
  const [user] = useAuthState(auth);

  return (
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
      <div>
        {user && <UserProfile user={user} />}
      </div>
      <LogoutButton />
    </aside>
  );
}
