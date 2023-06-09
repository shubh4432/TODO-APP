"use client";
import { TodoContext } from "@/Contexts/TodoContext";
import React, { useContext, useEffect, useState } from "react";

const TodoFooter = () => {
  const [todos, setTodos] = useContext(TodoContext);
  const [checkAll, setCheckAll] = useState(false);

  const handleCheckAll = () => {
    const newTodos = todos.map((todo) => ({
      ...todo,
      complete: !checkAll,
    }));
    setTodos(newTodos);
    setCheckAll(!checkAll);
  };

  const deleteTodo = () => {
    const newTodos = todos.filter((todo) => {
      return todo.complete === false;
    });
    setTodos(newTodos);
    setCheckAll(false);
  };

  return (
    <>
      {todos.length === 0 ? (
        <h2 className="text-center text-white text-xl mt-8">Congratulations you have nothing left TODO! </h2>
      ) : (
        <div className="flex justify-between items-center mt-4 text-white">
          <label className="cursor-pointer" htmlFor="all">
            <input
              type="checkbox"
              name="all"
              id="all"
              onClick={handleCheckAll}
              checked={checkAll}
            />
            ALL
          </label>
          <p className="text-white">
            You have {todos.filter((todo) => todo.complete === false).length} to
            do
          </p>
          <button className="bg-red-500 p-1" id="delete" onClick={deleteTodo}>
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default TodoFooter;
