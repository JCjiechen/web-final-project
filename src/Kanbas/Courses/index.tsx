import { Navigate, Route, Routes, useParams } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import "./index.css";
import BreadcrumbBar from "./BreadcrumbBar";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import { useState, useEffect } from "react";
import axios from "axios";
import Quizzes from "./Quizzes";
import QuizDetail from "./Quizzes/QuizDetail";
import QuizEditor from "./Quizzes/QuizEditor";
import Questions from "./Quizzes/Questions";
import QuizPreview from "./Quizzes/QuizPreview";
const API_BASE = process.env.REACT_APP_API_BASE;

function Courses() {
  const { courseId } = useParams();
  const COURSES_API = `${API_BASE}/api/courses`;
  const [course, setCourse] = useState<any>({ _id: "" });
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}`);
    setCourse(response.data);
  };

  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);

  return (
    <>
      {/* Breadcrumb bar */}
      <div className="d-none d-md-flex col-md-auto d-flex flex-row align-items-center mt-2">
        <BreadcrumbBar />
      </div>
      <hr className="d-none d-md-flex" />

      <div className="row">
        {/* Course Navigation */}
        <CourseNavigation />

        {/* Course Content */}
        <div className="col col col-lg overflow-y-scroll">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="ZoomMeetings" element={<h1>Zoom Meetings</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<AssignmentEditor />}
            />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/Detail/:quizId" element={<QuizDetail />} />
            <Route path="Quizzes/Editor/:quizId" element={<QuizEditor />} />
            <Route path="Quizzes/Preview/:quizId" element={<QuizPreview />} />
            <Route
              path="Quizzes/Editor/:quizId/questions"
              element={<Questions />}
            />
            <Route path="Grades" element={<Grades />} />
            <Route path="People" element={<h1>People</h1>} />
            <Route path="PanoptoVideo" element={<h1>Panopto Video</h1>} />
            <Route path="Discussions" element={<h1>Discussions</h1>} />
            <Route path="Announcements" element={<h1>Announcements</h1>} />
            <Route path="Pages" element={<h1>Pages</h1>} />
            <Route path="Files" element={<h1>Files</h1>} />
            <Route path="Outcomes" element={<h1>Outcomes</h1>} />
            <Route path="Collaborations" element={<h1>Collaborations</h1>} />
            <Route path="Syllabus" element={<h1>Syllabus</h1>} />
            <Route path="Settings" element={<h1>Settings</h1>} />
          </Routes>
        </div>
      </div>
    </>
  );
}
export default Courses;
