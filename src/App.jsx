import { useState } from "react";
import "./App.css";
import "./features/TodoList/TodoList.jsx";
import TodoList from "./features/TodoList/TodoList.jsx";
import TodoForm from "./features/TodoForm.jsx";

function App() {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (title) => {
    const newTodo = { title: title, id: Date.now(), isCompleted: false };
    setTodoList([...todoList, newTodo]);
  };

  const completeTodo = (id) => {
    const updatedTodos = todoList.map((x) => {
      if (x.id === id) {
        return { ...x, isCompleted: true };
      }
      return x;
    });

    setTodoList(updatedTodos);
  };

  return (
    <>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} />

      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </>
  );
}

export default App;
