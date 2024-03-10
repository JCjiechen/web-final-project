import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as db from "../Database";

function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <hr />
      <h5>Course</h5>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="courseName">Course Name</label>
            <input
              id="courseName"
              value={course.name}
              className="form-control"
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="courseNumber">Course Number</label>
            <input
              id="courseNumber"
              value={course.number}
              className="form-control"
              onChange={(e) => setCourse({ ...course, number: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              value={course.startDate}
              className="form-control"
              type="date"
              onChange={(e) =>
                setCourse({ ...course, startDate: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              id="endDate"
              value={course.endDate}
              className="form-control"
              type="date"
              onChange={(e) =>
                setCourse({ ...course, endDate: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="float-end">
            <button className="btn btn-success mt-2" onClick={addNewCourse}>
              Add
            </button>
            <button
              className="btn btn-warning mt-2 ms-2"
              onClick={updateCourse}
            >
              Update
            </button>
          </div>
        </div>
      </div>

      <hr />

      <h2>Published Courses ({courses.length})</h2>

      <hr />

      <div className="row">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mt-2">
          {courses.map((course) => (
            <div
              key={course._id}
              className="col d-flex justify-content-center align-items-center mb-4"
              style={{ width: 300 }}
            >
              <div className="card" style={{ width: 270 }}>
                <img
                  src={`/images/${course.image}`}
                  className="card-img-top"
                  style={{ height: 150 }}
                  alt={course.name}
                />
                <div className="card-body">
                  <Link
                    className="card-title"
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    style={{
                      textDecoration: "none",
                      color: "navy",
                      fontWeight: "bold",
                    }}
                  >
                    {course.number} {course.name}
                  </Link>
                  <p className="card-text">
                    Start Date: {course.startDate}
                    <br />
                    End Date: {course.endDate}
                  </p>
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className="btn btn-primary"
                  >
                    Go
                  </Link>
                  <button
                    className="btn btn-warning ms-2"
                    onClick={(event) => {
                      event.preventDefault();
                      setCourse(course);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
