import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import "./features/TodoList/TodoList.jsx";
import TodoList from "./features/TodoList/TodoList.jsx";
import TodoForm from "./features/TodoForm.jsx";

function App() {
  const [todoList, setTodolist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      let options = { method: "GET", headers: { Authorization: token } };
      try {
        const resp = await fetch(url, options);
        if (resp.ok === false) {
          throw new Error(resp.message);
        }

        const { records } = await response.json();
        setTodolist(
          records.map((record) => {
            const todo = {
              id: record.id,
              ...record.fields,
            };
            if (!todo.isCompleted) {
              todo.isCompleted = false;
            }
            return todo;
          })
        );
      } catch {
        setErrorMessage(Error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

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

  const updateTodo = (editedTodo) => {
    const updatedTodos = todoList.map((x) => {
      if (x.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return x;
    });
    setTodoList(updatedTodos);
  };

  /*
  function ShowErrorMessage() {
    if (errorMessage !== "") {
      <div>
        <hr />
        <p>errorMessage</p>
        <form>
          <button onClick={setErrorMessage("")}>dismiss</button>
        </form>
      </div>
    }
  };
  */

  return (
    <>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} />
      <br />
      <TodoList
        todoList={todoList}
        isLoading={isLoading}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
      {errorMessage !== "" && (
        <div>
          <hr />
          <p>errorMessage</p>
          <form>
            <button onClick={setErrorMessage("")}>dismiss</button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
