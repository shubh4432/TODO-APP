"use client";
// LoginPage.tsx
// LoginPage.tsx
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/Contexts/UserContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser, isLoggedIn } = useContext(UserContext);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform authentication logic (e.g., validate username and password)
    if (username === "admin" && password === "password") {
      // Set the user information in the context
      setUser({ username });
      router.push("/dashboard");
      // No need to redirect here, UserProvider will handle it
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(to right, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1)), url('/background-image.jpg')",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      }}
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <h1 className="text-3xl font-bold mb-8">Login Page</h1>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
