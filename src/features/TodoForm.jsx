import { useRef } from "react";
import { useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel.jsx";

const TodoForm = function ({ onAddTodo, isSaving }) {
  const [workingTodoTitle, setWorkingTodo] = useState("");

  const todoTitleInput = useRef("");

  const handleAddTodo = (event) => {
    event.preventDefault();

    onAddTodo(workingTodoTitle);
    setWorkingTodo("");
    todoTitleInput.current.focus();
  };

  return (
    <>
      <form onSubmit={handleAddTodo}>
        <TextInputWithLabel
          elementId="todoTitle"
          label="Todo"
          onChange={(event) => {
            return setWorkingTodo(event.target.value);
          }}
          ref={todoTitleInput}
          value={workingTodoTitle}
        />
        <button disabled={workingTodoTitle.trim() === ""}>
          {isSaving ? "Saving..." : "Add Todo"}
        </button>
      </form>
    </>
  );
};

export default TodoForm;
