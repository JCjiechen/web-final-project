import { FaEllipsisV, FaPlus } from "react-icons/fa";

function AssignmentButtons() {
  return (
    <div className="row">
      <div className="col">
        <input
          className="form-control w-25"
          placeholder="Search for Assignments"
        />
      </div>

      <div className="col-auto">
        <div className="float-end">
          <button className="btn btn-light m-1">
            <FaPlus className="me-2 mb-1" />
            <span>Group</span>
          </button>
          <button className="btn btn-danger m-1">
            <FaPlus className="me-2 mb-1" />
            <span>Assignment</span>
          </button>
          <button className="btn btn-light m-1">
            <FaEllipsisV className="mb-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignmentButtons;
