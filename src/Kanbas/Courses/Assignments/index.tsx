import React from "react";
import {
  FaCaretDown,
  FaCheckCircle,
  FaEllipsisV,
  FaPlusCircle,
} from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import AssignmentButtons from "./AssignmentButtons";
import "./index.css";

function Assignments() {
  const { courseId } = useParams();
  const assignmentList = assignments.filter(
    (assignment) => assignment.course === courseId
  );

  return (
    <>
      <AssignmentButtons />
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
            {assignmentList.map((assignment) => (
              <li className="list-group-item">
                <div className="d-flex align-items-center">
                  <FaEllipsisV className="me-2" />
                  <TfiWrite className=" text-success me-2" />
                  <div>
                    <Link
                      to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                      className="wd-assignment-link"
                    >
                      {assignment.title}
                    </Link>
                    <p style={{ fontSize: "10px" }}>
                      Week 0 - SETUP - Week starting on Monday September 5th
                      (9/5/2022) Module |
                    </p>
                    <p style={{ fontSize: "10px" }}>
                      Due Sep 18, 2022 at 11:59pm | 100 pts
                    </p>
                  </div>
                  <span className="ms-auto">
                    <FaCheckCircle className="text-success" />
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
