import React, { useState, useEffect } from "react";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

function WorkingWithArrays() {
  const API = `${API_BASE}/a5/todos`;
  const [todo, setTodo] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const postTodo = async () => {
    const response = await axios.post(API, todo);
    setTodos([...todos, response.data]);
  };

  const deleteTodo = async (todo: { id: any }) => {
    try {
      const response = await axios.delete(`${API}/${todo.id}`);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  const updateTodo = async () => {
    try {
      const response = await axios.put(`${API}/${todo.id}`, todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
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
      <br />
      <textarea
        value={todo.description}
        onChange={(e) =>
          setTodo({
            ...todo,
            description: e.target.value,
          })
        }
      />
      <br />
      <input
        value={todo.due}
        type="date"
        onChange={(e) =>
          setTodo({
            ...todo,
            due: e.target.value,
          })
        }
      />
      <br />
      <label>
        <input
          value={todo.completed.toString()}
          type="checkbox"
          onChange={(e) =>
            setTodo({
              ...todo,
              completed: e.target.checked,
            })
          }
        />
        Completed
      </label>
      <br />
      <button className="btn btn-warning me-2" onClick={postTodo}>
        Post Todo
      </button>
      <button className="btn btn-warning me-2" onClick={updateTodo}>
        Update Todo
      </button>

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
      {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">{errorMessage}</div>
      )}
      <ul className="list-group">
        {todos.map((todo) => (
          <li className="list-group-item" key={todo.id}>
            <input
              className="m-2"
              checked={todo.completed}
              type="checkbox"
              readOnly
            />
            {todo.title}
            <p className="m-2">Description: {todo.description}</p>
            <p className="m-2">Due: {todo.due}</p>
            <button
              className="btn btn-danger me-2"
              onClick={() => removeTodo(todo)}
            >
              Remove
            </button>
            <button
              className="btn btn-warning me-2"
              onClick={() => fetchTodoById(todo.id)}
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo)}
              className="btn btn-danger me-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkingWithArrays;
