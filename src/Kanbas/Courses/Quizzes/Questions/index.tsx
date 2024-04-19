import { FaCheckCircle, FaEllipsisV, FaBan, FaPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { KanbasState } from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./index.css";
import QuestionEditor from "./QuestionEditor";

function Questions() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const dispatch = useDispatch();

  const handleQuestionsClick = (event: any) => {
    event.preventDefault(); // Prevent default link behavior (navigation)
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="float-end">
            <button className="btn btn-light m-1">Points {quiz.points}</button>
            <button
              className={`btn ${
                quiz.isPublish ? "btn-success" : "btn-light"
              } m-1`}
            >
              {quiz.isPublish ? (
                <>
                  <FaCheckCircle className="me-2" />
                  <span>Published</span>
                </>
              ) : (
                <>
                  <FaBan className="me-2" />
                  <span>Not Published</span>
                </>
              )}
            </button>
            <button className="btn btn-light m-1">
              <FaEllipsisV />
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              to={`/Kanbas/Courses/${courseId}/Quizzes/Editor/${quiz._id}`}
              className="nav-link red-link"
            >
              Details
            </Link>
          </li>

          <li className="nav-item selected">
            <Link
              to="/"
              className="nav-link selected"
              onClick={handleQuestionsClick}
            >
              Questions
            </Link>
          </li>
        </ul>
      </div>
      <br />

      <QuestionEditor />

      <hr />

      <div className="row align-items-center">
        <div className="col">
          <div className="form-check m-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="displayCheckbox"
            />
            <label className="form-check-label" htmlFor="displayCheckbox">
              Notify users his quiz has changed
            </label>
          </div>
        </div>
        <div className="col-auto">
          <div className="float-end m-2">
            <button className="btn btn-light">
              {/* <button onClick={handleCancel} className="btn btn-light"> */}
              Cancel
            </button>
            <button className="btn btn-light m-1">
              {/* <button onClick={handleSavePublish} className="btn btn-light m-1"> */}
              Save & Publish
            </button>
            <button className="btn btn-danger m-1">
              {/* <button onClick={handleSave} className="btn btn-danger m-1"> */}
              Save
            </button>
          </div>
        </div>
      </div>

      <hr />
    </>
  );
}

export default Questions;
