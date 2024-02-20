import React from "react";
import { Link, useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { FaGlasses } from "react-icons/fa";
import "./index.css";
import { courses } from "../../Database";

function BreadcrumbBar() {
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);

  return (
    <>
      <nav aria-label="breadcrumb" className="d-flex align-items-center">
        <HiMiniBars3 className="wd-breadcrumb-bar-icon-color mr-2" />
        <ol className="breadcrumb d-flex align-items-center m-2">
          <li className="breadcrumb-item">
            <Link
              className="wd-breadcrumb-bar-icon-course"
              key={courseId}
              to={""}
            >
              {course?._id} {course?.name}
            </Link>
          </li>
          <span className="divider m-2">{">"}</span>
          {extractCourseNavTabFromUrl(courseId)}
        </ol>
      </nav>
      <div className="ms-auto float-end  align-items-center">
        <Link className="btn btn-light" to={""}>
          <FaGlasses className="m-2" />
          Student View
        </Link>
      </div>
    </>
  );
}

// This function will return the specific tab in the course navigation that the user is currently on. (i.e., Home, Modules, Piazza, etc.)
function extractCourseNavTabFromUrl(courseId: string | undefined) {
  // Get the current url hash
  const url = window.location.hash;
  // Split the url by "/" to get an array of its segments
  const urlSegments = url.split("/");
  // Find the index of the "Courses" segment
  const coursesIndex = urlSegments.findIndex(
    (segment) => segment === "Courses"
  );
  // First check we are in the courses section (i.e., URL has courses in it)
  if (coursesIndex != 1) {
    // There are 3 segments after Courses in URL: courseId, Courses tab name, specific item in tab
    if (coursesIndex + 3 < urlSegments.length) {
      const tabName = urlSegments[coursesIndex + 2];
      const specificItem = urlSegments[coursesIndex + 3];
      return (
        <>
          <li className="breadcrumb-item">
            <Link
              key={tabName}
              className="wd-breadcrumb-bar-red"
              to={`/Kanbas/Courses/${courseId}/Assignments`}
            >
              {tabName}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {specificItem}
          </li>
        </>
      );
    }
    // There are 2 segments after Courses in URL: courseId, Courses tab name
    else if (coursesIndex + 2 < urlSegments.length) {
      const tabName = addSpacesBetweenWords(urlSegments[coursesIndex + 2]);
      return (
        <li className="breadcrumb-item active" aria-current="page">
          {tabName}
        </li>
      );
    }
  }
}

function addSpacesBetweenWords(inputString: string): string {
  return inputString.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export default BreadcrumbBar;
