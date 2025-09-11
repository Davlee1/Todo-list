import { useState } from "react";
import { useEffect } from "react";

const TodosViewForm = function ({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setQueryString]);

  const preventRefresh = (event) => {
    event.preventDefault(debounce);
  };
  return (
    <>
      <form onSubmit={preventRefresh}>
        <div>
          <label>Search todos: </label>
          <input
            type="text"
            value={localQueryString}
            onChange={(e) => {
              setLocalQueryString(e.target.value);
            }}
          />
          <button
            type="button"
            onSubmit={() => {
              setLocalQueryString("");
            }}
          >
            Clear
          </button>
        </div>
        <div>
          <label>Sort by: </label>
          <select
            onChange={(event) => {
              setSortField(event.target.value);
            }}
            value={sortField}
          >
            <option value="title">Title</option>
            <option value="timeCreated">Time added</option>
          </select>

          <label> Direction: </label>
          <select
            onChange={(event) => {
              setSortDirection(event.target.value);
            }}
            value={sortDirection}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </form>
    </>
  );
};

export default TodosViewForm;
