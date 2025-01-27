import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "../Nav";
import Courses from "./Courses";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { useState, useEffect } from "react";
import CourseStatus from "./Courses/Home/CourseStatus";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";
import Account from "./Acount";
const API_BASE = process.env.REACT_APP_API_BASE;
axios.defaults.withCredentials = true;

function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);

  const [course, setCourse] = useState({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
  });

  const COURSES_API = `${API_BASE}/api/courses`;

  const axiosWithCredentials = axios.create({
    withCredentials: true,
  });

  // const findAllCourses = async () => {
  //   const response = await axios.get(COURSES_API);
  //   setCourses(response.data);
  // };
  const findAllCourses = async () => {
    const response = await axiosWithCredentials.get(`${COURSES_API}`);
    setCourses(response.data);
    return response.data;
  };

  // const addNewCourse = async () => {
  //   const response = await axios.post(COURSES_API, course);
  //   setCourses([...courses, response.data]);
  // };
  const addNewCourse = async () => {
    const response = await axiosWithCredentials.post(`${COURSES_API}`, course);
    setCourses([...courses, response.data]);
  };

  // const deleteCourse = async (courseId: string) => {
  //   const response = await axios.delete(`${COURSES_API}/${courseId}`);
  //   setCourses(courses.filter((c) => c._id !== courseId));
  // };
  const deleteCourse = async (course: any) => {
    const response = await axiosWithCredentials.delete(
      `${COURSES_API}/${course._id}`
    );
    setCourses(courses.filter((c) => c._id !== course._id));
    return response.data;
  };

  // const updateCourse = async () => {
  //   const response = await axios.put(`${COURSES_API}/${course._id}`, course);
  //   setCourses(
  //     courses.map((c) => {
  //       if (c._id === course._id) {
  //         return course;
  //       }
  //       return c;
  //     })
  //   );
  // };
  const updateCourse = async () => {
    const response = await axiosWithCredentials.put(
      `${COURSES_API}/${course._id}`,
      course
    );
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        }
        return c;
      })
    );
  };

  useEffect(() => {
    findAllCourses();
  }, []);

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
                <Route path="/Account/*" element={<Account />} />
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
                <Route path="Courses/:courseId/*" element={<Courses />} />
              </Routes>
            </div>
          </div>
        </div>
      </>
    </Provider>
  );
}
export default Kanbas;
