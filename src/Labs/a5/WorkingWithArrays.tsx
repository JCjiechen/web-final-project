import React, { useState } from "react";

function WorkingWithArrays() {
  const API = "http://localhost:4000/a5/todos";
  const [todo, setTodo] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });

  return (
    <div>
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a className="btn btn-primary me-2" href={API}>
        Get Todos
      </a>
      <h4>Retrieving an Item from an Array by ID</h4>
      <a className="btn btn-primary me-2 mb-2" href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>
      <br />
      <input
        className="me-2 mb-2"
        value={todo.id}
        onChange={(e) =>
          setTodo({
            ...todo,
            id: parseInt(e.target.value),
          })
        }
      />
      <br />
      <input
        className="me-2 mb-2"
        type="text"
        value={todo.title}
        onChange={(e) =>
          setTodo({
            ...todo,
            title: e.target.value,
          })
        }
      />

      <h3>Updating an Item in an Array</h3>
      <a
        className="btn btn-primary me-2"
        href={`${API}/${todo.id}/title/${todo.title}`}
      >
        Update Title to {todo.title}
      </a>

      <h3>Filtering Array Items</h3>
      <a className="btn btn-primary me-2" href={`${API}?completed=true`}>
        Get Completed Todos
      </a>

      <h3>Creating new Items in an Array</h3>
      <a className="btn btn-primary me-2" href={`${API}/create`}>
        Create Todo
      </a>

      <h3>Deleting from an Array</h3>
      <a className="btn btn-primary me-2" href={`${API}/${todo.id}/delete`}>
        Delete Todo with ID = {todo.id}
      </a>

      <h3>Updating Todo Description</h3>
      <input
        className="me-2 mb-2"
        type="text"
        value={todo.description}
        onChange={(e) =>
          setTodo({
            ...todo,
            description: e.target.value,
          })
        }
      />
      <a
        className="btn btn-primary me-2"
        href={`${API}/${todo.id}/description/${todo.description}`}
      >
        Update Todo {todo.id} Description to {todo.description}
      </a>

      <h3>Updating Todo Completion</h3>
      <input
        id="arrays-todo-completed"
        className="me-2 mb-2"
        type="checkbox"
        checked={todo.completed}
        onChange={(e) =>
          setTodo({
            ...todo,
            completed: e.target.checked,
          })
        }
      />
      <label htmlFor="arrays-todo-completed">Completed</label>
      <a
        className="btn btn-primary me-2 ms-2"
        href={`${API}/${todo.id}/completed/${todo.completed}`}
      >
        Update Todo {todo.id} Completion to {todo.completed.toString()}
      </a>
      <hr />
    </div>
  );
}

export default WorkingWithArrays;
