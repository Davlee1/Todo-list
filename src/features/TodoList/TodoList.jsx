{
  /*extract from TodoList.jsx*/
}
import TodoListItem from "./TodoListItem.jsx";

function TodoList({ todoList, onCompleteTodo, onUpdateTodo }) {
  const completeTodo = onCompleteTodo;

  const filteredTodoList = todoList.filter((x) => {
    return x.isCompleted === false;
  });

  return filteredTodoList.length === 0 ? (
    <p>Add todo above to get started</p>
  ) : (
    <u>
      {filteredTodoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} onCompleteTodo={completeTodo} onUpdateTodo={onUpdateTodo}/>
      ))}{" "}
    </u>
  );
}

export default TodoList;
