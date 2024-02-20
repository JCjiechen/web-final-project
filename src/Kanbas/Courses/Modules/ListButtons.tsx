import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ListButtons.css";

function ListButtons() {
  return (
    <>
      <div className="row">
        <div className="col"></div>
        <div className="col-auto">
          <div className="float-end">
            <button className="btn btn-light m-2">Collapse All</button>
            <button className="btn btn-light m-2">View Progress</button>
            <button
              className="btn btn-light dropdown-toggle m-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaCheckCircle className="text-success wd-listbuttons-check-icon" />
              Publish All
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={""}>
                  Publish All
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={""}>
                  Unpublish All
                </Link>
              </li>
            </ul>
            <button className="btn m-2 wd-listbuttons-module-button">
              <FaPlusCircle className="wd-listbuttons-plus-icon" />
              Module
            </button>
            <button className="btn btn-light">
              <FaEllipsisV className="mt-1 mb-1" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListButtons;
