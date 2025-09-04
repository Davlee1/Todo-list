import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import "./features/TodoList/TodoList.jsx";
import TodoList from "./features/TodoList/TodoList.jsx";
import TodoForm from "./features/TodoForm.jsx";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const options = { method: "GET", headers: { Authorization: token } };
      try {
        const resp = await fetch(url, options);
        if (!resp.ok) {
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

  const completeTodo = async (x) => {
    const originalTodo = todoList.find((todo) => todo.id === x.id);
    const payload = {
      records: [
        {
          id: x.id,
          fields: {
            title: x.title,
            isCompleted: true,
          },
        },
      ],
    };

    const options = {
      method: "PATCH",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch {
      console.log(ErrorEvent.message);
      setErrorMessage(`${Error.message}. Reverting todo...`);
      const revertedTodos = originalTodo;
      setTodoList([...revertedTodos]);
    } finally {
      setIsSaving(false);
    }

    /*const updatedTodos = todoList.map((x) => {
      if (x.id === id) {
        return { ...x, isCompleted: true };
      }
      return x;
    });
    setTodoList(updatedTodos);*/
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: "PATCH",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch {
      console.log(ErrorEvent.message);
      setErrorMessage(`${Error.message}. Reverting todo...`);
      const revertedTodos = originalTodo;
      setTodoList([...revertedTodos]);
    } finally {
      setIsSaving(false);
    }

    //old version of update todos
    /*const updatedTodos = todoList.map((x) => {
      if (x.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return x;
    });
    setTodoList(updatedTodos);*/
  };

  // unused/broken version to implement error message display
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
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
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
