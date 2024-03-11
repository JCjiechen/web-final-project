import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  const dispatch = useDispatch();
  return (
    <li key={todo.id} className="list-group-item">
      <button
        className="btn btn-danger m-1"
        onClick={() => dispatch(deleteTodo(todo.id))}
      >
        Delete
      </button>
      <button
        className="btn btn-primary m-1"
        onClick={() => dispatch(setTodo(todo))}
      >
        Edit
      </button>
      {todo.title}
    </li>
  );
}

export default TodoItem;
