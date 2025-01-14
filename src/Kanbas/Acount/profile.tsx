import * as client from "../../Users/client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
  });

  const navigate = useNavigate();

  const fetchProfile = async () => {
    const account = await client.profile();
    setProfile(account);
  };

  const save = async () => {
    await client.updateUser(profile);
  };

  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="container">
      <h1>Profile</h1>

      <Link
        to="/Kanbas/Account/Admin/Users"
        className="btn btn-warning w-100 mb-2"
      >
        Users
      </Link>

      {profile && (
        <div>
          <input
            className="form-control mb-2"
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
            placeholder="Username"
          />
          <input
            className="form-control mb-2"
            value={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
            placeholder="Password"
          />
          <input
            className="form-control mb-2"
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
            placeholder="First Name"
          />
          <input
            className="form-control mb-2"
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
            placeholder="Last Name"
          />
          <input
            className="form-control mb-2"
            type="date"
            value={profile.dob}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            placeholder="Date of Birth"
          />
          <input
            type="email"
            className="form-control mb-2"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            placeholder="Email"
          />
          <select
            className="form-select mb-2"
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>

          <button className="btn btn-primary w-100 mb-2" onClick={save}>
            Save
          </button>

          <button className="btn btn-danger w-100 mb-2" onClick={signout}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
