"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (username === "admin" && password === "admin123") {
      router.push("/admin/dashboard");
    } else {
      alert("Invalid login");
    }

  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-3xl font-bold mb-6">
        Admin Login
      </h1>

      <div className="flex flex-col gap-4 w-80">

        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>

      </div>

    </main>
  );
}