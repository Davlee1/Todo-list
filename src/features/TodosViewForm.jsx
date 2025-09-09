const TodosViewForm = function ({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const preventRefresh = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <form onSubmit={preventRefresh}>
        <div>
          <label>Search todos: </label>
          <input
            type="text"
            value={queryString}
            onChange={(e) => {
              setQueryString(e.target.value);
            }}
          />
          <button
            type="button"
            onSubmit={() => {
              setQueryString("");
            }}
          >
            Clear
          </button>
        </div>
        <div>
          <label>Sort by: </label>
          <select
            onChange={(event) => {
              console.log(event.target.value);
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
