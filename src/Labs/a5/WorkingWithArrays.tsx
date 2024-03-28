import React, { useState, useEffect } from "react";
import axios from "axios";

function WorkingWithArrays() {
  const API = "http://localhost:4000/a5/todos";
  const [todo, setTodo] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  const [todos, setTodos] = useState<any[]>([]);
  const fetchTodos = async () => {
    const response = await axios.get(API);
    setTodos(response.data);
  };

  const removeTodo = async (todo: { id: any }) => {
    const response = await axios.get(`${API}/${todo.id}/delete`);
    setTodos(response.data);
  };

  const createTodo = async () => {
    const response = await axios.get(`${API}/create`);
    setTodos(response.data);
  };

  const fetchTodoById = async (id: any) => {
    const response = await axios.get(`${API}/${id}`);
    setTodo(response.data);
  };

  const updateTitle = async () => {
    const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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

      <br />
      <br />
      <button className="btn btn-primary m-2" onClick={createTodo}>
        Create Todo
      </button>
      <button className="btn btn-success m-2" onClick={updateTitle}>
        Update Title
      </button>
      <ul className="list-group">
        {todos.map((todo) => (
          <li className="list-group-item" key={todo.id}>
            {todo.title}
            <button
              className="btn btn-danger m-2"
              onClick={() => removeTodo(todo)}
            >
              Remove
            </button>
            <button
              className="btn btn-warning m-2"
              onClick={() => fetchTodoById(todo.id)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}

export default WorkingWithArrays;
