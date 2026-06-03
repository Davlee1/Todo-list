import { useSearchParams } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import TodoList from "../features/TodoList/TodoList.jsx";
import TodoForm from "../features/TodoForm.jsx";
import TodosViewForm from "../features/TodosViewForm.jsx";
import styles from "./TodosPage.module.css";
import styled from "styled-components";

const OrangeLine = styled.div`
  background-color: #ee6c4d;
  height: 8px;
`;

const TodosPage = function ({
  addTodo,
  isSaving,
  todoList,
  isLoading,
  onCompleteTodo,
  onUpdateTodo,
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();

  const itemsPerPage = 10;
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const indexOfFirstTodo = itemsPerPage * (currentPage - 1);
  let totalPages = Math.ceil(
    todoList.filter((x) => {
      return x.isCompleted === false;
    }).length / itemsPerPage
  );
  if (totalPages == 0) {
    totalPages = 1;
  }
  const filteredTodoList = todoList
    .slice(indexOfFirstTodo, indexOfFirstTodo + itemsPerPage)
    .filter((x) => {
      return x.isCompleted === false;
    });
  if (totalPages) {
    useEffect(() => {
      const evalCurrentPage = () => {
        if (!Number.isInteger(currentPage) || currentPage < 1) {
          navigate("/");
        }
      };
      evalCurrentPage();
    }, [currentPage, totalPages, navigate]);
  }

  const handlePreviousPage = () => {
    const previouspage = currentPage - 1;
    if (previouspage > 1) {
      setSearchParams({ page: previouspage });
    } else {
      setSearchParams({ page: "1" });
    }
  };

  const handleNextPage = () => {
    const nextpage = currentPage + 1;
    if (nextpage <= totalPages) {
      setSearchParams({ page: nextpage });
    }
  };

  return (
    <div className={styles.TodosPage}>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />

      <TodoList
        todoList={filteredTodoList}
        isLoading={isLoading}
        onCompleteTodo={onCompleteTodo}
        onUpdateTodo={onUpdateTodo}
      />
      <OrangeLine />

      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />
      <div className={styles.paginationControls}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          &nbsp;Page {currentPage} of {totalPages} &nbsp;
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};
export default TodosPage;
