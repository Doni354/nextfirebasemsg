'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-10 bg-white rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <button
          onClick={signInWithGoogle}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Login dengan Google
        </button>
      </div>
    </main>
  );
}
