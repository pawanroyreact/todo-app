import React, { useEffect, useState } from "react";
import { MdModeEditOutline, MdOutlineDone } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import axios from "axios";

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post("/api/todos", { text: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.log("Error sdding new task:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.log("Error Fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditedText(todo.text);
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`, {
        text: editedText,
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setEditingTodo(null);
    } catch (error) {
      console.log("Error Updating Todo", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log("Error Deleting Todo:", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((todo) => todo._id === id);
      const response = await axios.patch(`/api/todos/${id}`, {
        completed: !todo.completed,
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.log("Error toggling todo", error);
    }
  };
  return (
    <section className="bg-linear-to-br from-gray-200 to-gray-400 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Task Manager
        </h1>
        <hr className="text-amber-300 mb-8" />

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border p-2 rounded-lg border-gray-200 shadow-sm"
        >
          <input
            type="text"
            placeholder="what need to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className=" flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-340 "
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer border-none rounded-lg text-white px-3 py-2 font-medium"
          >
            Add Task
          </button>
        </form>

        {/* Tasks List */}
        <div className="mt-4">
          {todos.length === 0 ? (
            <div>
              <h1 className=""></h1>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {todos.map((todo) => (
                <div className="" key={todo._id}>
                  {editingTodo === todo._id ? (
                    <div className="flex items-center gap-x-3">
                      <input
                        className="flex-1 p-3 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner"
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                      <div className="flex gap-x-2">
                        <button
                          onClick={() => saveEdit(todo._id)}
                          className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
                        >
                          <MdOutlineDone />
                        </button>
                        <button
                          className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                          onClick={() => setEditingTodo(null)}
                        >
                          <IoClose />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-4 overflow-hidden">
                          <button
                            onClick={() => toggleTodo(todo._id)}
                            className={`shrink-0 h-6 w-6 border rounded-full flex justify-center items-center ${todo.completed ? "bg-green-500 border-green-600" : "border-gray-300 hover:border-blue-400"}`}
                          >
                            {todo.completed && <MdOutlineDone />}
                          </button>

                          <span className="text-gray-800 font-medium truncate">
                            {todo.text}
                          </span>
                        </div>
                        <div className="flex gap-x-2">
                          <button
                            className="p-2 text-blue-500 hover:text-blue-600 rounded-lg hover:bg-blue-100 duration-200 cursor-pointer"
                            onClick={() => startEditing(todo)}
                          >
                            <MdModeEditOutline />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo._id)}
                            className="p-2 text-red-500 hover:text-red-600 rounded-lg hover:bg-red-100 duration-200 cursor-pointer"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TodoForm;
