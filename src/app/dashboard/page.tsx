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
    <div 
      className="flex justify-center items-center h-screen"
    >
      <div className="bg-white shadow-xl rounded-lg p-6 w-1/3">
        <TodoProvider>
          <UserProvider>
            <main>
              <h1 className="text-4xl text-[#666666] font-bold mb-4">
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
