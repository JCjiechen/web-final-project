import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { assignments } from "../../Database";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import "./Editor.css";

function AssignmentEditor() {
  const { assignmentId } = useParams();
  const assignment = assignments.find(
    (assignment) => assignment._id === assignmentId
  );
  const { courseId } = useParams();
  const navigate = useNavigate();
  const handleSave = () => {
    console.log("Actually saving assignment TBD in later assignments");
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="float-end">
            <button className="btn btn-light text-success m-1">
              <FaCheckCircle className="text-success me-2" />
              <span className="wd-assignment-editor-span">Published</span>
            </button>
            <button className="btn btn-light m-1">
              <FaEllipsisV />
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <label htmlFor="wd-assignment-name" className="form-label">
              Assignment Name
            </label>
            <input
              type="text"
              className="form-control mb-3"
              id="wd-assignment-name"
              value={assignment?.title}
            />
            <textarea className="form-control mb-3">
              This is the assignment description
            </textarea>
          </div>

          <div className="col-12">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-2 text-center">
                  <label className="form-label align-items-center float-end">
                    Points
                  </label>
                </div>
                <div className="col">
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      className="form-control"
                      value="100"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-2 text-center">
                  <label className="form-label align-items-center float-end">
                    Assignment Group
                  </label>
                </div>
                <div className="col">
                  <select className="form-select mb-3">
                    <option>Assignments</option>
                  </select>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-2 text-center">
                  <label className="form-label align-items-center float-end">
                    Submission Type
                  </label>
                </div>
                <div className="col">
                  <select className="form-select mb-3">
                    <option>Online</option>
                  </select>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-2">
                  <label className="form-label float-end">
                    Display Grade as
                  </label>
                </div>
                <div className="col">
                  <select className="form-select mb-3">
                    <option>Percentage</option>
                  </select>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="displayCheckbox"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="displayCheckbox"
                    >
                      Do not count this assignment towards the final grade
                    </label>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-2">
                  <label className="form-label float-end mt-2">Assign</label>
                </div>
                <div className="col rounded p-3 border m-2">
                  <div className="container">
                    <div className="row">
                      <div>
                        <label className="form-label">Assign to</label>
                        <input
                          type="text"
                          className="form-control mb-3"
                          name="wd-assign-to"
                          value="Everyone"
                        />

                        <label className="form-label">Due</label>
                        <input
                          type="date"
                          className="form-control mb-3"
                          name="wd-due-date"
                          value="2021-01-01"
                        />

                        <div className="row">
                          <div className="col-md-6">
                            <label className="form-label">Available From</label>
                            <input
                              type="date"
                              className="form-control mb-3"
                              name="wd-available-from"
                              value="2021-01-01"
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">Until</label>
                            <input
                              type="date"
                              className="form-control mb-3"
                              name="wd-available-until"
                              value="2021-01-01"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="col-12 btn btn-light btn-block">
                    <i className="fa fa-plus m-2" aria-hidden="true"></i>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="row align-items-center">
        <div className="col">
          <div className="form-check m-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="displayCheckbox"
            />
            <label className="form-check-label" htmlFor="displayCheckbox">
              Do not count this assignment towards the final grade
            </label>
          </div>
        </div>
        <div className="col-auto">
          <div className="float-end m-2">
            <Link
              to={`/Kanbas/Courses/${courseId}/Assignments`}
              className="btn btn-light"
            >
              Cancel
            </Link>
            <button onClick={handleSave} className="btn btn-danger m-1">
              Save
            </button>
          </div>
        </div>
      </div>

      <hr />
    </>
  );
}

export default AssignmentEditor;
