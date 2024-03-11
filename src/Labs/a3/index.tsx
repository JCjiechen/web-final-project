import Add2 from "./Add2";
import Classes from "./Classes";
import ConditionalOutput from "./ConditionalOutput";
import Highlight from "./Highlight";
import JavaScript from "./JavaScript/JavaScript";
import PathParameters from "./routing/PathParameters";
import Styles from "./Styles";
import TodoItem from "./todo/TodoItem";
import TodoList from "./todo/TodoList";
import { useSelector } from "react-redux";
import { LabState } from "../store";

function Assignment3() {
  const { todos } = useSelector((state: LabState) => state.todosReducer);
  return (
    <div className="container">
      <h1>Assignment 3</h1>
      <ul className="list-group">
        {todos.map((todo) => (
          <li className="list-group-item" key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
      <TodoList /> <br />
      <TodoItem />
      <Add2 a={3} b={4} /> <br />
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione
        eaque illo minus cum, saepe totam vel nihil repellat nemo explicabo
        excepturi consectetur. Modi omnis minus sequi maiores, provident
        voluptates.
      </Highlight>
      <ConditionalOutput />
      <Styles />
      <Classes />
      <JavaScript />
      <PathParameters />
    </div>
  );
}
export default Assignment3;
