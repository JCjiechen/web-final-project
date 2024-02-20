import {
  FaBan,
  FaCheckCircle,
  FaFileImport,
  FaArrowCircleRight,
  FaBullseye,
  FaChartBar,
  FaBullhorn,
  FaBell,
  FaInfoCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import "./CourseStatus.css";

function CourseStatus() {
  return (
    <div className="d-none col-lg-4 d-lg-block" style={{ marginLeft: "20px" }}>
      <h4>Course Status</h4>
      <button className="btn btn-secondary m-1">
        <FaBan className="wd-course-status-icon" />
        <span className="wd-course-status-button">Unpublish</span>
      </button>

      <button className="btn btn-success m-1">
        <FaCheckCircle className="wd-course-status-icon" />
        <span className="wd-course-status-button">Publish</span>
      </button>

      <div>
        <button className="btn btn-light m-1">
          <FaFileImport className="wd-course-status-icon" />
          <span className="wd-course-status-button">
            Import Existing Content
          </span>
        </button>
        <br />
        <button className="btn btn-light m-1">
          <FaArrowCircleRight className="wd-course-status-icon" />
          <span className="wd-course-status-button">Import From Commons</span>
        </button>
        <br />
        <button className="btn btn-light m-1">
          <FaBullseye className="wd-course-status-icon" />
          <span className="wd-course-status-button">Choose Home Page</span>
        </button>
        <br />
        <button className="btn btn-light m-1">
          <FaChartBar className="wd-course-status-icon" />
          <span className="wd-course-status-button"> View Course Stream</span>
        </button>
        <br />
        <button className="btn btn-light m-1">
          <FaBullhorn className="wd-course-status-icon" />
          <span className="wd-course-status-button"> New Announcement</span>
        </button>
        <br />
        <button className="btn btn-light m-1">
          <FaChartBar className="wd-course-status-icon" />
          <span className="wd-course-status-button"> New Analytics</span>
        </button>
        <br />
        <button className="btn btn-light m-1">
          <FaBell className="wd-course-status-icon" />
          <span className="wd-course-status-button">
            View Course Notifications
          </span>
        </button>
        <br />
      </div>
      <br />

      <div>
        <h4 style={{ display: "inline" }}>Todo</h4>
        <hr />
        <ul className="wd-course-home-todo">
          <li>
            <Link to={""}>
              <FaInfoCircle className="m-2" />
              <span className="wd-course-status-button">
                Grade A1 HTML + ENV
              </span>
              <RxCross2 className="float-end wd-course-home-todo-cross-icon" />
              <p>100 points</p>
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <div className="row">
          <div className="col">
            <h4 style={{ display: "inline" }}>Coming Up</h4>
          </div>
          <div className="col-auto">
            <div className="float-end">
              <Link to={""} style={{ color: "rgb(181, 40, 40)" }}>
                <FaCalendarAlt className="wd-course-status-icon" />
                <span className="wd-course-status-button">View Calendar</span>
              </Link>
            </div>
          </div>
        </div>
        <hr />
        <ul className="wd-course-home-coming-up">
          <li>
            <Link to={""}>
              <FaCalendarAlt className="m-2 wd-course-home-coming-up-icon" />
              <span className="wd-course-status-button">Lecture</span>
              <p>CS4550.12631.202410 Sep 7 at 11:45am</p>
            </Link>
          </li>
          <li>
            <Link to={""}>
              <FaCalendarAlt className="m-2 wd-course-home-coming-up-icon" />
              <span className="wd-course-status-button">Lecture</span>
              <p>CS4550.12631.202410 Sep 11 at 11:45am</p>
            </Link>
          </li>
          <li>
            <Link to={""}>
              <FaCalendarAlt className="m-2 wd-course-home-coming-up-icon" />
              <span className="wd-course-status-button">Lecture</span>
              <p>CS5610 06 SP23 Sep 11 at 6pm</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CourseStatus;
