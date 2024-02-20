import { assignments, enrollments, grades, users } from "../../Database";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import {
  FaFileImport,
  FaFileExport,
  FaEllipsisV,
  FaSearch,
  FaCaretDown,
  FaFilter,
} from "react-icons/fa";

function Grades() {
  const { courseId } = useParams();
  const as = assignments.filter((assignment) => assignment.course === courseId);
  const es = enrollments.filter((enrollment) => enrollment.course === courseId);

  return (
    <div className="container-fluid">
      <div className="row m-2">
        <div className="col">
          <div className="float-end">
            <button className="btn btn-light m-1">
              <FaFileImport className="me-2" />
              <span className="wd-grades-span">Import</span>
            </button>
            <button
              className="btn btn-light dropdown-toggle m-1"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaFileExport className="me-2" />
              <span className="wd-grades-span">Export</span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item active" to={""}>
                  Export
                </Link>
              </li>
            </ul>
            <button className="btn btn-light m-1">
              <FaEllipsisV />
            </button>
          </div>
        </div>
      </div>

      <div className="row m-2">
        <div className="col-6">
          <div>Student Names</div>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="search"
              className="form-control"
              placeholder="Search Students"
            />
            <span className="input-group-text">
              <FaCaretDown />
            </span>
          </div>
        </div>
        <div className="col-6">
          <div>Assignment Names</div>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="search"
              className="form-control"
              placeholder="Search Assignments"
            />
            <span className="input-group-text">
              <FaCaretDown />
            </span>
          </div>
        </div>
      </div>

      <div className="row m-2">
        <button className="btn btn-light m-2 col-auto">
          <FaFilter className="me-2" />
          <span className="wd-grades-span">Apply Filters</span>
        </button>
      </div>

      <div className="row m-2">
        <div className="col">
          <div className="table-responsive wd-grades-table">
            <table
              className="table table-striped w-100 text-center table-responsive wd-grades-table-layout"
              border={1}
            >
              <thead>
                <th>Student Name</th>
                {as.map((assignment) => (
                  <th key={assignment.title}>{assignment.title}</th>
                ))}
              </thead>
              <tbody>
                {es.map((enrollment) => {
                  const user = users.find(
                    (user) => user._id === enrollment.user
                  );
                  return (
                    <tr key={enrollment.user}>
                      <td>
                        {user?.firstName} {user?.lastName}
                      </td>
                      {assignments.map((assignment) => {
                        const grade = grades.find(
                          (grade) =>
                            grade.student === enrollment.user &&
                            grade.assignment === assignment._id
                        );
                        if (grade) {
                          return <td>{grade?.grade}</td>;
                        } else {
                          return null;
                        }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grades;
