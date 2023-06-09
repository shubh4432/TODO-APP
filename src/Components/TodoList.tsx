"use client";
import React, { useContext, useEffect } from "react";
import TodoItem from "../Components/TodoItem";
import { Subtask, TodoContext } from "@/Contexts/TodoContext";

const TodoList = () => {
  const [todos, setTodos] = useContext(TodoContext);

  const switchComplete = (id: number) => {
    const newTodos = [...todos];
    newTodos.forEach((todo, index) => {
      if (index === id) {
        todo.complete = !todo.complete;
      }
    });
    setTodos(newTodos);
  };

  const handleEditTodos = (editValue: string, id: number) => {
    const newTodos = [...todos];
    newTodos.forEach((todo, index) => {
      if (index === id) {
        todo.name = editValue;
      }
    });
    setTodos(newTodos);
  };

  const handleAddSubtask = (id: number, subtask: Subtask) => {
    const newTodos = [...todos];
    newTodos.forEach((todo, index) => {
      if (index === id) {
        todo.subtasks.push(subtask);
      }
    });
    setTodos(newTodos);
  };

  useEffect(() => {
    todos.forEach((todo) => {
      console.log(todo.name);
    });
  }, []);

  return (
    <>
      {todos.map((todo, index) => (
        <div className="py-1" key={index}>
          <TodoItem
            todo={todo}
            id={index}
            checkComplete={switchComplete}
            handleEditTodos={handleEditTodos}
            handleAddSubtaskProp={handleAddSubtask}
          />
        </div>
      ))}
    </>
  );
};

export default TodoList;
