import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });

  const navigate = useNavigate();

  const signin = async () => {
    await client.signin(credentials);
    navigate("/Kanbas/Account/Profile");
  };

  return (
    <div className="container">
      <h1>Sign in</h1>
      <div className="form-group col-6">
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
      </div>
      <div className="form-group col-6">
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
      </div>
      <button className="btn btn-primary me-2" onClick={signin}>
        Sign in
      </button>

      <Link className="btn btn-warning me-2" to="/Kanbas/Account/signup">
        Sign up
      </Link>
    </div>
  );
}
