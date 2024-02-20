import { Link, useLocation } from "react-router-dom";
import "./index.css";
import {
  FaTachometerAlt,
  FaRegUserCircle,
  FaBook,
  FaRegCalendarAlt,
  FaInbox,
  FaClock,
  FaDesktop,
  FaArrowAltCircleRight,
  FaRegQuestionCircle,
} from "react-icons/fa";

function KanbasNavigation() {
  const links = [
    { label: "Account", icon: <FaRegUserCircle className="fs-2" /> },
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
    { label: "Courses", icon: <FaBook className="fs-2" /> },
    { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" /> },
    { label: "Inbox", icon: <FaInbox className="fs-2" /> },
    { label: "History", icon: <FaClock className="fs-2" /> },
    { label: "Studio", icon: <FaDesktop className="fs-2" /> },
    { label: "Commons", icon: <FaArrowAltCircleRight className="fs-2" /> },
    { label: "Help", icon: <FaRegQuestionCircle className="fs-2" /> },
  ];
  const { pathname } = useLocation();

  return (
    <ul className="wd-kanbas-navigation">
      <li>
        <a href="http://northeastern.edu">
          <img width="65" height="65" src="/NEU_Logo.png" alt="NEU Logo" />
        </a>
      </li>
      {links.map((link, index) => (
        <li
          key={index}
          className={pathname.includes(link.label) ? "wd-active" : ""}
        >
          <Link to={`/Kanbas/${link.label}`}>
            <span
              className={
                link.label === "Account"
                  ? "wd-kanbas-navigation-account-icon"
                  : "wd-kanbas-navigation-icon"
              }
            >
              {link.icon}
            </span>{" "}
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default KanbasNavigation;
