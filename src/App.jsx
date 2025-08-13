import { useState } from 'react';
import "./App.css";
import "./TodoList.jsx";
import TodoList from "./TodoList.jsx";
import TodoForm from "./TodoForm.jsx";

function App() {
  const [newTodo, setNewTodo] = useState("insert random text here");
  return (
    <>
      <h1>My Todos</h1>
      <TodoForm />
      <p>{newTodo}</p>
      <TodoList />
    </>
  );
}

export default App;
