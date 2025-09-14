import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import "./features/TodoList/TodoList.jsx";
import TodoList from "./features/TodoList/TodoList.jsx";
import TodoForm from "./features/TodoForm.jsx";
import TodosViewForm from "./features/TodosViewForm.jsx";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sortField, setSortField] = useState("timeCreated");
  const [queryString, setQueryString] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const encodeUrl = ({ sortField, sortDirection, queryString }) => {
    let searchQuery = queryString;
    if (searchQuery) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}${searchQuery}`;
    
    return encodeURI(`${url}?${sortQuery}`);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const options = { method: "GET", headers: { Authorization: token } };
      try {
        const resp = await fetch(
          encodeUrl({ sortField, sortDirection, queryString }),
          options
        );

        if (!resp.ok) {
          throw new Error(resp.message);
        }

        const { records } = await resp.json();

        setTodoList(
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
  }, [sortDirection, sortField, queryString]);

  //==================Add Todo==========================================================
  const addTodo = async (newTodo) => {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo,
            isCompleted: false,
          },
        },
      ],
    };
    const options = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    try {
      setIsSaving(true);
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );
      if (!resp.ok) {
        throw new Error(resp.message);
      }
      const { records } = await resp.json();
      console.log(records);
      const savedTodo = {
        id: records[0].id,
        ...records[0].fields,
      };
      console.log(records[0].fields);

      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoList([...todoList, savedTodo]);
    } catch {
      console.log(ErrorEvent.message);
      setErrorMessage(Error.message);
    } finally {
      setIsSaving(false);
    }
  };

  //===================completeTodo=====================================================
  const completeTodo = async (x) => {
    const originalTodo = todoList.find((todo) => todo.id === x);
    const payload = {
      records: [
        {
          id: originalTodo.id,
          fields: {
            title: originalTodo.title,
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
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch {
      console.log(ErrorEvent.message);
      setErrorMessage(`${Error.message}. Reverting todo...`);
      const revertedTodos = originalTodo;
      setTodoList(revertedTodos);
    } finally {
      setIsSaving(false);
    }

    const updatedTodos = todoList.map((y) => {
      if (y.id === x) {
        return { ...y, isCompleted: true };
      }
      return y;
    });
    setTodoList(updatedTodos);
  };

  //=================================updateTodo================================================
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
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );
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

    const updatedTodos = todoList.map((x) => {
      if (x.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return x;
    });
    setTodoList(updatedTodos);
  };

  //======================return statement=======================================================
  return (
    <>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      <br />
      <hr />
      <TodoList
        todoList={todoList}
        isLoading={isLoading}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
      {errorMessage !== "" && (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <form>
            <button onClick={setErrorMessage("")}>dismiss</button>
          </form>
        </div>
      )}
      <hr />
      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString }
        setQueryString={setQueryString}
      />
    </>
  );
}

export default App;
