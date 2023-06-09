"use client";
// Home.tsx
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/Contexts/UserContext";
import LoginPage from "./Login/page";

const Home = () => {
  const { isLoggedIn } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/Login");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginPage />
    </div>
  );
};

export default Home;
