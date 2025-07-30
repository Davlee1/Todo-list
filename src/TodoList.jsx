{/*extract from TodoList.jsx*/}


const TodoList = function (){
    const todos = [
    { id: 1, title: "thing 1" },
    { id: 2, title: "thing b" },
    { id: 3, title: "objective □" },
  ];
    return (
    <div>
      
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList