//import { useRef } from "react";
import { useState } from "react";

const TodoForm = function ({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodo] = useState("");

  //const todoTitleInput = useRef("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    
    onAddTodo(workingTodoTitle);
    setWorkingTodo("");
    //todoTitleInput.current.focus(); //do i still need this here?
  };

  return (
    <>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">
          Todo
          <input
            name="title"
            type="text"
            id="todoTitle"
            //ref={todoTitleInput}
            value={workingTodoTitle}
            onChange={(event) => {
              return setWorkingTodo(event.target.value);
            }}
          />
          <button disabled={workingTodoTitle===""}>Add Todo</button>
        </label>
      </form>
    </>
  );
};

export default TodoForm;
