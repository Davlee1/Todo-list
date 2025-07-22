import "./App.css";

function App() {
  const todos = [
    { id: 1, title: "thing 1" },
    { id: 2, title: "thing b" },
    { id: 3, title: "objective □" },
  ];

  return (
    <div>
      <h1>My Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
