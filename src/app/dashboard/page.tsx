"use client";
// Dashboard.tsx
// Dashboard.tsx
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/Contexts/UserContext";
import TodoForm from "@/Components/TodoForm";
import TodoList from "@/Components/TodoList";
import { UserProvider } from "@/Contexts/UserContext";
import TodoFooter from "@/Components/TodoFooter";
import TodoProvider from "@/Contexts/TodoContext";

const Dashboard = () => {
  const { isLoggedIn } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
    <div className="bg-white w-[40%] bg-opacity-20 backdrop-filter backdrop-blur-md p-6 rounded-lg shadow-xl">
      <TodoProvider>
        <UserProvider>
          <main>
            <h1 className="text-4xl text-white font-bold mb-4">
              To Do App
            </h1>
            <TodoForm />
            <TodoList />
            <TodoFooter />
          </main>
        </UserProvider>
      </TodoProvider>
    </div>
  </div>
  );
};

export default Dashboard;
