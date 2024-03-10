import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "../Nav";
import Courses from "./Courses";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import * as db from "./Database";
import { useState } from "react";
import CourseStatus from "./Courses/Home/CourseStatus";
import store from "./store";
import { Provider } from "react-redux";

function Kanbas() {
  const [courses, setCourses] = useState<any[]>(db.courses);

  const [course, setCourse] = useState({
    _id: "1234",
    name: "New Course",
    number: "New Number",

    startDate: "2023-09-10",
    endDate: "2023-12-15",
  });

  const addNewCourse = () => {
    setCourses([
      ...courses,
      { ...course, _id: new Date().getTime().toString() },
    ]);
  };

  const deleteCourse = (courseId: any) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = () => {
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  return (
    <Provider store={store}>
      <>
        <Nav />
        <br />
        <div className="container-fluid h-100 w-100">
          <div className="row h-100">
            {/* Kanbas Navigation  */}
            <div
              className="col-auto d-none d-md-block"
              style={{ paddingLeft: "inherit" }}
            >
              <KanbasNavigation />
            </div>

            {/* Routes */}
            <div className="col col-xs-12">
              <Routes>
                <Route path="/" element={<Navigate to="Dashboard" />} />
                <Route path="Account" element={<h1>Account</h1>} />
                <Route
                  path="Dashboard"
                  element={
                    <Dashboard
                      courses={courses}
                      course={course}
                      setCourse={setCourse}
                      addNewCourse={addNewCourse}
                      deleteCourse={deleteCourse}
                      updateCourse={updateCourse}
                    />
                  }
                />
                <Route
                  path="Courses/:courseId/*"
                  element={<Courses courses={courses} />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </>
    </Provider>
  );
}
export default Kanbas;
