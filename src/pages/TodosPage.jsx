import TodoList from "../features/TodoList/TodoList.jsx";
import TodoForm from "../features/TodoForm.jsx";
import TodosViewForm from "../features/TodosViewForm.jsx";
import styles from "./TodosPage.module.css";
import Header from "../shared/Header.jsx";


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



  return (
    <div className={styles.TodosPage}>
      
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />

      <TodoList
        todoList={todoList}
        isLoading={isLoading}
        onCompleteTodo={onCompleteTodo}
        onUpdateTodo={onUpdateTodo}
      />

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
};
export default TodosPage;
