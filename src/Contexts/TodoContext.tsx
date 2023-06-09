"use client";
import React, { useState, createContext, useEffect, ReactNode } from "react";

export interface Todo {
  name: string;
  complete: boolean;
  subtasks: Subtask[];
}

export interface Subtask {
  name: string;
  complete: boolean;
}

export const TodoContext = createContext<[Todo[], React.Dispatch<React.SetStateAction<Todo[]>>]>([[], () => {}]);

type TodoProviderProps = {
  children: ReactNode;
};

const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const todoStore = localStorage.getItem("todoStore");
    if (todoStore) {
      setTodos(JSON.parse(todoStore));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoStore", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={[todos, setTodos]}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
