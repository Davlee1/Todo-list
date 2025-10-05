import { useReducer, useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import "./App.css";
import "./features/TodoList/TodoList.jsx";
import TodoList from "./features/TodoList/TodoList.jsx";
import TodoForm from "./features/TodoForm.jsx";
import TodosViewForm from "./features/TodosViewForm.jsx";
import styles from "./App.module.css";
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from "./reducers/todos.reducer";

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
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);

  const encodeUrl = useCallback(() => {
    let searchQuery = queryString;
    if (searchQuery) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}${searchQuery}`;

    return encodeURI(`${url}?${sortQuery}`);
  }, [sortField, sortDirection, queryString]);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });
      const options = { method: "GET", headers: { Authorization: token } };
      try {
        const resp = await fetch(encodeUrl(), options);

        if (!resp.ok) {
          throw new Error(resp.message);
        }
        const { records } = await resp.json();

        dispatch({ type: todoActions.loadTodos, records: records });
      } catch {
        dispatch({ type: todoActions.setLoadError, error: Error.message });
      } finally {
        dispatch({ type: todoActions.endRequest });
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
      dispatch({ type: todoActions.fetchTodos });
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
      const { records } = await resp.json();

      dispatch({ type: todoActions.addTodo, records: records });
      
    } catch {
      dispatch({ type: todoActions.setLoadError, error: Error.message });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  //===================completeTodo=====================================================
  const completeTodo = async (x) => {
    
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
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch {
      dispatch({ type: todoActions.setLoadError, error: Error.message });
      dispatch({ type: todoActions.revertTodo, editedTodo: x});
    } finally {
      setIsSaving(false);
    }

    dispatch({ type: todoActions.completeTodo, editedTodo: x });
   
  };

  //=================================updateTodo================================================
  const updateTodo = async (x) => {
    const payload = {
      records: [
        {
          id: x.id,
          fields: {
            title: x.title,
            isCompleted: x.isCompleted,
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
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch {
      dispatch({ type: todoActions.setLoadError, error: Error.message });
      dispatch({ type: todoActions.revertTodo, editedTodo: x });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
    dispatch({ type: todoActions.updateTodo, editedTodo: x });
    
  };

  //======================return statement=======================================================
  return (
    <div className={styles.App}>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving} />

      <TodoList
        todoList={todoState.todoList}
        isLoading={todoState.isLoading}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
      {errorMessage !== "" && (
        <div id="error">
          <hr />
          <p>{todoState.errorMessage}</p>
          <form>
            <button onClick={dispatch({ type: todoActions.clearError })}>
              dismiss
            </button>
          </form>
        </div>
      )}

      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />
    </div>
  );
}

export default App;
