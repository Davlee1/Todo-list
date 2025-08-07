{
  /*extract from TodoList.jsx*/
}
import "./TodoListItem.jsx";
import TodoListItem from "./TodoListItem.jsx";

const TodoList = function () {
  const todos = [
    { id: 1, title: "thing 1" },
    { id: 2, title: "thing b" },
    { id: 3, title: "objective □" },
  ];
  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <TodoListItem key={todo.id} name={todo.title} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
