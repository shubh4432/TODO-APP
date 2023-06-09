import React, { useContext, useState } from "react";
import { TodoContext } from "@/Contexts/TodoContext";

const TodoForm = () => {
  const [todos, setTodos] = useContext(TodoContext);
  const [todoName, setTodoName] = useState("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    setTodos([...todos, { name: todoName, complete: false, subtasks: [] }]);
    setTodoName("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value);
  };

  console.log(todos)
  return (
    <div className="flex flex-col">
      <form autoComplete="off" onSubmit={addTodo}>
        <div className="flex justify-between mb-4">
          <input
            className="flex-3 focus:outline-none border border-b-4"
            type="text"
            name="todos"
            id="todos"
            placeholder="Create your tasks"
            value={todoName}
            onChange={handleChange}
          />
          <button className="p-2 bg-[#555555] flex items-center text-white" type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
