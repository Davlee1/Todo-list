import { useState } from 'react';
import "./App.css";
import "./TodoList.jsx";
import TodoList from "./TodoList.jsx";
import TodoForm from "./TodoForm.jsx";

function App() {
  const [newTodo, setTodoList] = useState([]);
  function addTodo(title){
    const newTodo = {title:"",id: Date.now()}
    setTodoList([...TodoList, newTodo]);
  }
  return (
    <>
      <h1>My Todos</h1>
      <TodoForm />
      
      <TodoList />
    </>
  );
}

export default App;
