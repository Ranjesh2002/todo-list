import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      let todosFromStorage = localStorage.getItem("todos");
      if (todosFromStorage) {
        setTodos(JSON.parse(todosFromStorage));
      }
    } catch (error) {
      console.error("Failed to load todos:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const togglefinished = () => {
    setshowFinished(!showFinished);
  };

  const handleAdd = () => {
    if (todo.trim().length <= 3) return;
    const newTodo = { id: uuidv4(), todo: todo.trim(), isCompleted: false };
    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd();
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((item) => item.id === id);
    if (todoToEdit) {
      setTodo(todoToEdit.todo);
      setTodos(todos.filter((item) => item.id !== id));
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  // const handleVoiceCommand = () => {
  //   const recognition = new (window.SpeechRecognition ||
  //     window.webkitSpeechRecognition)();
  //   recognition.lang = "en-US";
  //   recognition.start();

  //   recognition.onresult = (event) => {
  //     const speechText = event.results[0][0].transcript;
  //     setTodo(speechText);
  //   };

  //   recognition.onerror = (event) => {
  //     console.error("Speech recognition error:", event.error);
  //   };
  // };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-xl">
          Manage your todos at one place
        </h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a todo</h2>
          <form onSubmit={handleSubmit} className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full border-2 rounded-md p-2"
              placeholder="Enter your todo"
              aria-label="Todo input"
            />
            <button
              type="submit"
              disabled={todo.trim().length <= 3}
              className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md text-sm font-bold disabled:bg-violet-700 mx-2"
            >
              Add
            </button>
            {/* <button
              type="button"
              onClick={handleVoiceCommand}
              className="bg-blue-500 hover:bg-blue-700 p-3 py-1 text-white rounded-md text-sm font-bold"
            >
              🎤 Voice Input
            </button> */}
          </form>
        </div>
        <label className="flex items-center gap-2 my-4">
          <input
            onChange={togglefinished}
            type="checkbox"
            checked={showFinished}
          />
          Show finished
        </label>
        <div className="h-[1px] bg-black w-[90%] mx-auto my-2"></div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No todos to display</div>}
          <AnimatePresence>
            {todos.map(
              (item) =>
                (showFinished || !item.isCompleted) && (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="todo flex justify-between my-3"
                  >
                    <div className="flex gap-5">
                      <input
                        name={item.id.toString()}
                        onChange={handleCheckbox}
                        type="checkbox"
                        checked={item.isCompleted}
                        aria-label={`Mark "${item.todo}" as ${
                          item.isCompleted ? "incomplete" : "complete"
                        }`}
                      />
                      <div className={item.isCompleted ? "line-through" : ""}>
                        {item.todo}
                      </div>
                    </div>
                    <div className="buttons flex h-full">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 text-sm font-bold"
                        aria-label={`Edit "${item.todo}"`}
                      >
                        <FaEdit />
                      </button>
                      <motion.button
                        onClick={() => handleDelete(item.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 text-sm font-bold"
                        aria-label={`Delete "${item.todo}"`}
                      >
                        <MdDeleteForever />
                      </motion.button>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default App;
