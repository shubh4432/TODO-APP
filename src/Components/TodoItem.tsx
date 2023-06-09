// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { TodoContext } from "@/Contexts/TodoContext";
import React, { useContext, useState } from "react";
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillDelete,
} from "react-icons/ai";

type Subtask = {
  name: string;
  complete: boolean;
};

type TodoItemProps = {
  todo: {
    name: string;
    complete: boolean;
    subtasks: Subtask[];
  };
  id: any;
  checkComplete: (id: number) => void;
  handleEditTodos: (editValue: string, id: number) => void;
  handleAddSubtaskProp: (id: number, subtask: Subtask) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  id,
  checkComplete,
  handleEditTodos,
  handleAddSubtaskProp,
}) => {
  const [todos, setTodos] = useContext(TodoContext);
  const [onEdit, setOnEdit] = useState(false);
  const [editValue, setEditValue] = useState(todo.name);
  const [editSubtaskValue, setEditSubtaskValue] = useState("");
  const [subtaskValue, setSubtaskValue] = useState<{
    name: string;
    complete: boolean;
  }>();
  const [displaySubtask, setDisplaySubtask] = useState(false);
  const [editSubtaskIndex, setEditSubtaskIndex] = useState(-1);

  const ButtonClass =
    "rounded bg-[#FFA500] hover:bg-[#FFA500] text-white py-2 px-4";

  const handleOnEdit = () => {
    setOnEdit(true);
  };

  const handleSave = (id: number) => {
    setOnEdit(false);
    if (editValue) {
      handleEditTodos(editValue, id);
    } else {
      setEditValue(todo.name);
    }
  };

  const handleDisplaySubtask = () => {
    setDisplaySubtask(!displaySubtask);
  };

  const addNewSubtask = (e: any) => {
    e.preventDefault();
    if (editSubtaskValue) {
      const newSubtask: Subtask = {
        name: editSubtaskValue,
        complete: false,
      };
      const updatedTodo = {
        ...todo,
        subtasks: [...todo.subtasks, newSubtask],
      };
      handleAddSubtaskProp(id, newSubtask);
      setTodos([...todos.filter((t) => t.name !== todo.name), updatedTodo]);
      setEditSubtaskValue("");
    }
  };

  const handleSubtaskComplete = (subtaskId: number) => {
    const updatedSubtasks = todo.subtasks.map((subtask, index) => {
      if (index === subtaskId) {
        return {
          ...subtask,
          complete: !subtask.complete,
        };
      }
      return subtask;
    });
    const updatedTodo = {
      ...todo,
      subtasks: updatedSubtasks,
    };
    setTodos([...todos.filter((t) => t.name !== todo.name), updatedTodo]); // Update the todo in the context
  };

  const handleSubtaskEdit = (index: number) => {
    setEditSubtaskIndex(index);
  };

  const handleSubtaskSave = (index: number) => {
    if (editSubtaskValue) {
      const updatedSubtasks = todo.subtasks.map((subtask, i) => {
        if (i === index) {
          return {
            ...subtask,
            name: editSubtaskValue,
          };
        }
        return subtask;
      });
      const updatedTodo = {
        ...todo,
        subtasks: updatedSubtasks,
      };
      setTodos([...todos.filter((t) => t.name !== todo.name), updatedTodo]);
      setEditSubtaskIndex(-1);
    }
  };

  const handleSubtaskDelete = (index: number) => {
    const updatedSubtasks = todo.subtasks.filter((_, i) => i !== index);
    const updatedTodo = {
      ...todo,
      subtasks: updatedSubtasks,
    };
    setTodos([...todos.filter((t) => t.name !== todo.name), updatedTodo]);
  };

  if (onEdit) {
    return (
      <ul className="p-1 rounded border-solid border-2 border-stone-300">
        {/* Render todo item */}
        <li className="mb-2.5 mt-2.5  flex justify-between items-center capitalize">
          <input
            type="text"
            id="editValue"
            value={editValue}
            className="flex-3 focus:outline-none border border-b-4"
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button className={ButtonClass} onClick={() => handleSave(id)}>
            Save
          </button>
        </li>
      </ul>
    );
  } else {
    return (
      <ul className="p-1 rounded border-solid border-2 border-stone-300">
        {/* Render todo item */}
        <li
          className={`mb-2.5 mt-2.5 flex justify-between items-center capitalize ${
            todo.complete ? "" : ""
          }`}
        >
          <label htmlFor={`todo-${id}`}>
            <input
              type="checkbox"
              id={`todo-${id}`}
              checked={todo.complete}
              onChange={() => checkComplete(id)}
              className="mr-2"
            />
            <span className={` ${todo.complete ? "line-through" : ""}`}>{todo.name}</span>
          </label>
          <div className="flex align-center">
            <AiFillPlusCircle
              className="mr-2 mt-1"
              size={25}
              onClick={handleDisplaySubtask}
            />
            <button
              type="submit"
              className={ButtonClass}
              onClick={handleOnEdit}
            >
              Edit
            </button>
          </div>
        </li>

        {/* Render input field for adding new subtask */}
        {displaySubtask && (
          <form onSubmit={addNewSubtask}>
            <div className="flex justify-between">
              <input
                type="text"
                value={editSubtaskValue}
                className="border border-stone-300 rounded-sm focus:outline-none p-1"
                onChange={(e) => setEditSubtaskValue(e.target.value)}
                placeholder="Add a subtask"
              />
              <div className="flex align center">
                <AiFillMinusCircle className="mr-2 mt-1" size={25} onClick={handleDisplaySubtask}/>
                <button className={ButtonClass}>Add Subtask</button>
              </div>
            </div>
          </form>
        )}

        {/* Render subtasks */}
        {todo.subtasks.length > 0 && (
          <ul className="pl-6">
            {todo.subtasks.map((subtask, index) => (
              <li
                key={index}
                className={`mb-2.5 mt-2.5  flex justify-between items-center capitalize ${
                  subtask.complete ? "" : ""
                }`}
              >
                {editSubtaskIndex === index ? (
                  <>
                    <input
                      type="text"
                      className="flex-3 focus:outline-none border border-b-4"
                      value={editSubtaskValue}
                      onChange={(e) => setEditSubtaskValue(e.target.value)}
                    />
                    <div className="flex align-center">
                      <AiFillDelete
                        className="mr-2 cursor-pointer"
                        color="red"
                        size={25}
                        onClick={() => handleSubtaskDelete(index)}
                        title="Delete subtask"
                      />
                      <button
                        type="submit"
                        className={ButtonClass}
                        onClick={() => handleSubtaskSave(index)}
                      >
                        Save
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <label htmlFor={`${id}-subtask-${index}`}>
                      <input
                        type="checkbox"
                        id={`${id}-subtask-${index}`}
                        checked={subtask.complete}
                        onChange={() => handleSubtaskComplete(id)}
                        className="mr-2"
                      />
                      <span className={`${subtask.complete ? "line-through" : ""}`}>{subtask.name}</span>
                    </label>
                    <div className="flex align-center">
                      <AiFillDelete
                        className="mr-2 cursor-pointer"
                        color="red"
                        size={25}
                        onClick={() => handleSubtaskDelete(index)}
                        title="Delete subtask"
                      />
                      <button
                        type="submit"
                        className={ButtonClass}
                        onClick={() => handleSubtaskEdit(index)}
                      >
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </ul>
    );
  }
};

export default TodoItem;
