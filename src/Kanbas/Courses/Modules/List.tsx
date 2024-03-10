import React, { useState } from "react";
import "./List.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useLocation, useParams } from "react-router";
import ListButtons from "./ListButtons";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
} from "./modulesReducer";
import { KanbasState } from "../../store";

function ModuleList() {
  const { courseId } = useParams();
  const { pathname } = useLocation();
  const moduleList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );
  const dispatch = useDispatch();
  const [selectedModule, setSelectedModule] = useState(moduleList[0]);

  return (
    <div
      className={`col-12 ${
        pathname.includes("Modules") ? "col-lg-12" : "col-lg-8"
      }`}
    >
      <ListButtons />
      <hr />

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="moduleName">Module Name</label>
            <input
              id="moduleName"
              className="form-control"
              value={module.name}
              onChange={(e) =>
                dispatch(setModule({ ...module, name: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="moduleDescription">Module Description</label>
            <textarea
              id="moduleDescription"
              className="form-control"
              value={module.description}
              onChange={(e) =>
                dispatch(setModule({ ...module, description: e.target.value }))
              }
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="float-end">
            <button
              className="btn btn-success mt-2"
              onClick={() =>
                dispatch(addModule({ ...module, course: courseId }))
              }
            >
              Add
            </button>
            <button
              className="btn btn-warning mt-2 ms-2"
              onClick={() => dispatch(updateModule(module))}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <hr />

      <ul className="list-group wd-modules">
        {moduleList
          .filter((module) => module.course === courseId)
          .map((module) => (
            <li
              key={module._id}
              className="list-group-item"
              onClick={() => setSelectedModule(module)}
            >
              <div>
                <FaEllipsisV className="me-2" />
                {module.name}
                <span className="float-end">
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => dispatch(deleteModule(module._id))}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning ms-2"
                    onClick={() => dispatch(setModule(module))}
                  >
                    Edit
                  </button>
                  <FaCheckCircle className="text-success ms-2" />
                  <IoMdArrowDropdown />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </div>

              {selectedModule._id === module._id && (
                <ul className="list-group">
                  {module.lessons?.map(
                    (lesson: {
                      _id: React.Key | null | undefined;
                      name: string;
                    }) => (
                      <li key={lesson._id} className="list-group-item">
                        <FaEllipsisV className="me-2" />
                        {lesson.name}
                        <span className="float-end">
                          <FaCheckCircle className="text-success" />
                          <FaEllipsisV className="ms-2" />
                        </span>
                      </li>
                    )
                  )}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
export default ModuleList;
