import React, { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { updateQuiz, setQuiz } from "./quizReducer";
import { FaCheckCircle, FaEllipsisV, FaBan } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import "./QuizDetail.css";
import * as client from "./client";

function QuizDetail() {
  const { courseId } = useParams();

  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  const dispatch = useDispatch();

  const handlePublishClick = () => {
    const updatedQuiz = { ...quiz, isPublish: !quiz.isPublish };
    dispatch(setQuiz({ ...quiz, isPublish: updatedQuiz.isPublish }));
    client.updateQuiz(updatedQuiz).then((updatedQuiz) => {
      dispatch(updateQuiz(updatedQuiz));
    });
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="float-end">
            <button
              className={`btn ${
                quiz.isPublish ? "btn-success" : "btn-secondary"
              } m-1`}
              onClick={handlePublishClick}
            >
              {quiz.isPublish ? (
                <>
                  <FaCheckCircle className="me-2" />
                  <span className="wd-assignment-editor-span">Published</span>
                </>
              ) : (
                <>
                  <FaBan className="me-2" />
                  <span className="wd-assignment-editor-span text-muted">
                    Unpublished
                  </span>
                </>
              )}
            </button>

            <Link
              to={`/Kanbas/Courses/${courseId}/Quizzes/Preview/${quiz._id}`}
              onClick={() => dispatch(setQuiz(quiz))}
            >
              <button className="btn btn-light m-1">
                <span className="wd-assignment-editor-span">Preview</span>
              </button>
            </Link>

            <Link
              to={`/Kanbas/Courses/${courseId}/Quizzes/Editor/${quiz._id}`}
              onClick={() => dispatch(setQuiz(quiz))}
            >
              <button className="btn btn-light m-1">
                <TiPencil className="me-2 flipped-icon" />
                <span className="wd-assignment-editor-span">Edit</span>
              </button>
            </Link>
            <button className="btn btn-light m-1">
              <FaEllipsisV />
            </button>
          </div>
        </div>
      </div>

      <hr />

      <h1>{quiz.name}</h1>

      <div className="col-12">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-4 text-center">
              <strong className="align-items-center float-end">
                Quiz Type
              </strong>
            </div>
            <div className="col">
              <div className="input-group">{quiz.type}</div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-4 text-center">
              <strong className="align-items-center float-end">Points</strong>
            </div>
            <div className="col">
              <div className="input-group">{quiz.points}</div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-4 text-center">
              <strong className="align-items-center float-end">
                Assignment Group
              </strong>
            </div>
            <div className="col">
              <div className="input-group">{quiz.group}</div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-4 text-center">
              <strong className="align-items-center float-end">
                Shuﬄe Answers
              </strong>
            </div>
            <div className="col">
              <div className="input-group">{quiz.isShuffle ? "Yes" : "No"}</div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-4 text-center">
              <strong className="align-items-center float-end">
                Time Limit
              </strong>
            </div>
            <div className="col">
              <div className="input-group">
                {quiz.time} {quiz.time ? "Minutes" : ""}
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-4 text-center">
              <strong className="align-items-center float-end">
                Multiple Attempts
              </strong>
            </div>
            <div className="col">
              <div className="input-group">
                {quiz.isMultipleAttempts ? "Yes" : "No"}
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-4 text-center">
              <strong className="align-items-center float-end">
                Show Correct Answers
              </strong>
            </div>
            <div className="col">
              <div className="input-group">{quiz.showCorrectAnswers}</div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-4 text-center">
              <strong className="align-items-center float-end">
                Access Code
              </strong>
            </div>
            <div className="col">
              <div className="input-group">{quiz.accessCode}</div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-4 text-center">
              <strong className="align-items-center float-end">
                One Question at a Time
              </strong>
            </div>
            <div className="col">
              <div className="input-group">
                {quiz.isOneQuestionAtaTime ? "Yes" : "No"}
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-4 text-center">
              <strong className="align-items-center float-end">
                Webcam Required
              </strong>
            </div>
            <div className="col">
              <div className="input-group">{quiz.isWebcam ? "Yes" : "No"}</div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-4 text-center">
              <strong className="align-items-center float-end">
                Lock Questions After Answering
              </strong>
            </div>
            <div className="col">
              <div className="input-group">
                {quiz.isLockQuestionAfterAnswer ? "Yes" : "No"}
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-4 text-center">
              <strong className="align-items-center float-end">Due date</strong>
            </div>
            <div className="col">
              <div className="input-group">
                {new Date(quiz.dueDate).toISOString().split("T")[0]}
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-4 text-center">
              <strong className="align-items-center float-end">
                Available date
              </strong>
            </div>
            <div className="col">
              <div className="input-group">
                {new Date(quiz.availableDate).toISOString().split("T")[0]}
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-4 text-center">
              <strong className="align-items-center float-end">
                Until date
              </strong>
            </div>
            <div className="col">
              <div className="input-group">
                {new Date(quiz.availableUntilDate).toISOString().split("T")[0]}
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className="col-12">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <table className="table">
                <thead>
                  <tr>
                    <th>Due</th>
                    <th>For</th>
                    <th>Available from</th>
                    <th>Until</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {new Date(quiz.dueDate).toISOString().split("T")[0]}
                    </td>
                    <td>Everyone</td>
                    <td>
                      {new Date(quiz.availableDate).toISOString().split("T")[0]}
                    </td>
                    <td>
                      {
                        new Date(quiz.availableUntilDate)
                          .toISOString()
                          .split("T")[0]
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizDetail;
