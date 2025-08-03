{/*extract from TodoList.jsx*/}
const TodoForm = function (){
    return(
        <>
        <form>
            <label htmlFor="todoTitle">
            Todo
            <input type="text" id="todoTitle"/>
            <button >Add Todo</button>
            </label>
            
        </form>  
        </>
    )
}

export default TodoForm