import React, { useState } from "react";
import {
  FaCaretDown,
  FaCheckCircle,
  FaEllipsisV,
  FaPlus,
  FaPlusCircle,
} from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteAssignment,
  setAssignment,
  setInitialAssignment,
} from "./assignmentsReducer";
import { KanbasState } from "../../store";

function Assignments() {
  const { courseId } = useParams();
  const assignmentList = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignments
  );
  const dispatch = useDispatch();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = (assignmentId: String) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to remove the assignment?"
    );
    if (shouldDelete) {
      dispatch(deleteAssignment(assignmentId));
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <input
            className="form-control w-25"
            placeholder="Search for Assignments"
          />
        </div>
        <div className="col-auto">
          <div className="float-end">
            <button className="btn btn-light m-1">
              <FaPlus className="me-2 mb-1" />
              <span>Group</span>
            </button>
            <Link
              to={`/Kanbas/Courses/${courseId}/Assignments/AddAssignment`}
              onClick={() => dispatch(setInitialAssignment())}
            >
              <button className="btn btn-danger m-1">
                <FaPlus className="me-2 mb-1" />
                <span>Assignment</span>
              </button>
            </Link>
            <button className="btn btn-light m-1">
              <FaEllipsisV className="mb-1" />
            </button>
          </div>
        </div>
      </div>
      <hr />

      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> ASSIGNMENTS
            <span className="float-end">
              <span
                className="border border-secondary p-1 me-2"
                style={{ borderRadius: "15px" }}
              >
                40% of Total
              </span>
              <FaCheckCircle className="text-success" />
              <FaCaretDown className="ms-2" />
              <FaPlusCircle className="ms-2" />
              <FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList
              .filter((assignment) => assignment.course === courseId)
              .map((assignment) => (
                <li key={assignment._id} className="list-group-item">
                  <div className="d-flex align-items-center">
                    <FaEllipsisV className="me-2" />
                    <TfiWrite className=" text-success me-2" />
                    <div>
                      <Link
                        to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                        className="wd-assignment-link"
                        onClick={() => dispatch(setAssignment(assignment))}
                      >
                        {assignment.title}
                      </Link>
                      <p style={{ fontSize: "10px" }}>
                        Start Date: {assignment.availableFromDate} | End Date:{" "}
                        {assignment.availableUntilDate} | Description:{" "}
                        {assignment.description}
                      </p>
                      <p style={{ fontSize: "10px" }}>
                        Due Date: {assignment.dueDate} at 11:59pm |{" "}
                        {assignment.points} pts
                      </p>
                    </div>
                    <span className="ms-auto">
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => handleDelete(assignment._id)}
                      >
                        Delete
                      </button>
                      <FaCheckCircle className="text-success ms-2" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </>
  );
}

export default Assignments;
