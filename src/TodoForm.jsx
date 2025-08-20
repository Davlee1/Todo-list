import { useRef } from "react";

const TodoForm = function ({onAddTodo}) {
  const todoTitleInput = useRef("");
  
  const handleAddTodo = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    onAddTodo(title);
    event.target.title.value = "";
    todoTitleInput.current.focus();
  };

  return (
    <>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">
          Todo
          <input name="title" type="text" id="todoTitle" ref={todoTitleInput} />
          <button>Add Todo</button>
        </label>
      </form>
    </>
  );
};

export default TodoForm;
