import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";

export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const signup = async () => {
    try {
      await client.signup(user);
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container">
      <h1>Sign up</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="form-group col-6">
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) =>
            setUser({
              ...user,
              username: e.target.value,
            })
          }
        />
      </div>
      <div className="form-group col-6">
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) =>
            setUser({
              ...user,
              password: e.target.value,
            })
          }
        />
      </div>
      <button className="btn btn-primary me-2" onClick={signup}>
        Sign up
      </button>
    </div>
  );
}
