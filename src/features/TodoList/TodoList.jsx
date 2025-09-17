{
  /*extract from TodoList.jsx*/
}
import TodoListItem from "./TodoListItem.jsx";
import styles from "./TodoList.module.css";



function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const completeTodo = onCompleteTodo;

  const filteredTodoList = todoList.filter((x) => {
    return x.isCompleted === false;
  });

  return filteredTodoList.length === 0 ? (
    isLoading ? (
      <p className={styles.Prelist}>Todo list loading...</p>
    ) : (
      <p className={styles.Prelist}>Add a Todo to get started</p>
    )
  ) : (
    <ul className={styles.TodoList}>
      {filteredTodoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={completeTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}{" "}
    </ul>
  );
}

export default TodoList;
