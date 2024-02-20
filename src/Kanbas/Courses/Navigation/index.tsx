import { Link, useLocation } from "react-router-dom";
import "./index.css";

function CourseNavigation() {
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom Meetings",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
    "Panopto Video",
    "Discussions",
    "Announcements",
    "Pages",
    "Files",
    "Outcomes",
    "Collaborations",
    "Syllabus",
    "Settings",
  ];
  const { pathname } = useLocation();
  return (
    <div className="col-auto d-none d-md-block">
      <p style={{ fontSize: "10px" }}>202430_2 Spring 2024</p>
      <ul className="wd-navigation">
        {links.map((link, index) => (
          <li
            key={index}
            className={
              pathname.includes(removeEmptySpaces(link)) ? "wd-active" : ""
            }
          >
            <Link to={removeEmptySpaces(link)}>{link}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function removeEmptySpaces(inputString: string): string {
  return inputString.replace(/\s/g, "");
}

export default CourseNavigation;
