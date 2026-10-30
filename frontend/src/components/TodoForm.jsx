import React, { useEffect, useState } from "react";
import axios from "axios";

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

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
      setTodos(response.data);
    } catch (error) {
      console.log("Error Fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
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
        <div className="">
          {todos.length === 0 ? (
            <div>
              <h1 className=""></h1>
            </div>
          ) : (
            <div>
              {todos.map((todo) => (
                <div className="" key={todo.__id}>
                  {todo.text}
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
