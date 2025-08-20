import { useState } from 'react';
import "./App.css";
import "./TodoList.jsx";
import TodoList from "./TodoList.jsx";
import TodoForm from "./TodoForm.jsx";

function App() {
  const [todoList, setTodoList] = useState([]);
  let addTodo = (title) => {
    const newTodo = {title: title,id: Date.now()}
    setTodoList([...todoList, newTodo]);
  }
  return (
    <>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo}/>
      
      <TodoList todoList={todoList}/>
    </>
  );
}

export default App;
