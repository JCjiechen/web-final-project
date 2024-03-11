import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { LabState } from "../../../store";

function TodoForm() {
  const { todo } = useSelector((state: LabState) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <li className="list-group-item">
      <button
        className="btn btn-success m-1"
        onClick={() => dispatch(addTodo(todo))}
      >
        Add
      </button>
      <button
        className="btn btn-warning m-1"
        onClick={() => dispatch(updateTodo(todo))}
      >
        Update
      </button>
      <input
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
    </li>
  );
}

export default TodoForm;
