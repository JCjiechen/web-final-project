import React, { useState } from "react";
function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const [module, setModule] = useState({
    id: 2,
    name: "NodeJS Module",
    description: "Create a NodeJS server with ExpressJS",
    course: "First Course",
  });
  const ASSIGNMENT_URL = "http://localhost:4000/a5/assignment";
  const MODULE_URL = "http://localhost:4000/a5/module";

  return (
    <div>
      <h3>Working With Objects</h3>
      {/* Assignment */}
      <h4>Retrieving Objects</h4>
      <a
        className="btn btn-primary me-2"
        href="http://localhost:4000/a5/assignment"
      >
        Get Assignment
      </a>
      <h4>Retrieving Properties</h4>
      <a
        className="btn btn-primary me-2"
        href="http://localhost:4000/a5/assignment/title"
      >
        Get Title
      </a>
      <h4>Modifying Properties</h4>
      <input
        className="me-2"
        type="text"
        onChange={(e) =>
          setAssignment({
            ...assignment,
            title: e.target.value,
          })
        }
        value={assignment.title}
      />
      <a
        className="btn btn-primary me-2"
        href={`${ASSIGNMENT_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>

      {/* Module */}
      <h4>Module</h4>
      <a className="btn btn-primary me-2 mb-2" href={`${MODULE_URL}`}>
        Get Module
      </a>
      <a className="btn btn-danger me-2 mb-2" href={`${MODULE_URL}/name`}>
        Get Module Name
      </a>
      <br />
      <input
        className="me-2"
        type="text"
        onChange={(e) =>
          setModule({
            ...module,
            name: e.target.value,
          })
        }
        value={module.name}
      />
      <a
        className="btn btn-primary me-2"
        href={`${MODULE_URL}/name/${module.name}`}
      >
        Update Module Name
      </a>

      <input
        className="me-2"
        type="text"
        onChange={(e) =>
          setModule({
            ...module,
            description: e.target.value,
          })
        }
        value={module.description}
      />
      <a
        className="btn btn-primary me-2"
        href={`${MODULE_URL}/description/${module.description}`}
      >
        Update Module Description
      </a>

      {/* Edit Assignment */}
      <h4>Modifying Assignment Score</h4>
      <input
        className="me-2"
        type="number"
        onChange={(e) =>
          setAssignment({
            ...assignment,
            score: parseInt(e.target.value),
          })
        }
        value={assignment.score}
      />
      <a
        className="btn btn-primary me-2"
        href={`${ASSIGNMENT_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>

      <h4>Modifying Assignment Completed</h4>
      <input
        id="assignment-completed"
        className="me-2"
        type="checkbox"
        onChange={(e) =>
          setAssignment({
            ...assignment,
            completed: e.target.checked,
          })
        }
        checked={assignment.completed}
      />
      <label htmlFor="assignment-completed"> Assignment Completed</label>
      <a
        className="btn btn-primary me-2 ms-2"
        href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>
    </div>
  );
}
export default WorkingWithObjects;
