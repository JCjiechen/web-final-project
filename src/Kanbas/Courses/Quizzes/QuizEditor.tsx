import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaCheckCircle, FaEllipsisV, FaBan } from "react-icons/fa";
import "./QuizEditor.css";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { addQuiz, updateQuiz, setQuiz } from "./quizReducer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as client from "./client";

function QuizzEditor() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const dispatch = useDispatch();

  // Create a temporary state for storing the initial state
  const initialState = { ...quiz };

  const handleDetailsClick = (event: any) => {
    event.preventDefault(); // Prevent default link behavior (navigation)
  };

  const handleUpdateQuiz = async () => {
    const status = await client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };

  const handleSave = () => {
    const existingQuiz = quizList.find((a) => a._id === quiz._id);
    if (existingQuiz) {
      handleUpdateQuiz();
    }
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/Detail/${quiz._id}`);
  };

  const handleSavePublish = async () => {
    const existingQuiz = quizList.find((a) => a._id === quiz._id);
    if (existingQuiz) {
      const newQuiz = { ...quiz, isPublish: true };
      const status = await client.updateQuiz(newQuiz);
      dispatch(updateQuiz(newQuiz));
      dispatch(setQuiz(newQuiz));
    }
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  };

  const handleCancel = () => {
    // Reset state to initial state
    dispatch(setQuiz({ ...initialState }));
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
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
          <li className="nav-item selected">
            <Link
              to="/"
              className="nav-link selected"
              onClick={handleDetailsClick}
            >
              Details
            </Link>
          </li>
          <li className="nav-item not-selected">
            <Link
              to={`/Kanbas/Courses/${courseId}/Quizzes/Editor/${quiz._id}/questions`}
              className="nav-link selected"
            >
              Questions
            </Link>
          </li>
        </ul>
      </div>
      <br />

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <label htmlFor="wd-quiz-name" className="form-label">
              Quiz Name
            </label>
            <input
              type="text"
              className="form-control mb-3"
              id="wd-quiz-name"
              value={quiz.name}
              onChange={(e) =>
                dispatch(setQuiz({ ...quiz, name: e.target.value }))
              }
            />
            <label htmlFor="wd-quiz-description" className="form-label">
              Quiz Description
            </label>
            <ReactQuill
              id="wd-quiz-description"
              className="mb-3"
              value={quiz.description}
              onChange={(value) =>
                dispatch(setQuiz({ ...quiz, description: value }))
              }
            />
          </div>

          <div className="col-12">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-2 text-center">
                  <label className="form-label align-items-center float-end">
                    Quiz Type
                  </label>
                </div>
                <div className="col">
                  <select
                    className="form-select mb-3"
                    onChange={(e) =>
                      dispatch(setQuiz({ ...quiz, type: e.target.value }))
                    }
                  >
                    <option>Graded Quiz</option>
                    <option>Practice Quiz</option>
                    <option>Graded Survey</option>
                    <option>Ungraded Survey</option>
                  </select>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-2 text-center">
                  <label className="form-label align-items-center float-end">
                    Points
                  </label>
                </div>
                <div className="col">
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      className="form-control"
                      value={quiz.points}
                      min="0"
                      max="100"
                      onChange={(e) =>
                        dispatch(
                          setQuiz({
                            ...quiz,
                            points: e.target.value,
                          })
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-2 text-center">
                  <label className="form-label align-items-center float-end">
                    Assignment Group
                  </label>
                </div>
                <div className="col">
                  <select
                    className="form-select mb-3"
                    onChange={(e) =>
                      dispatch(setQuiz({ ...quiz, group: e.target.value }))
                    }
                  >
                    <option>Quizzs</option>
                    <option>Exams</option>
                    <option>Assignments</option>
                    <option>Project</option>
                  </select>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-2 text-end">
                  <label htmlFor="shuffleAnswers" className="form-label">
                    Shuffle Answers
                  </label>
                </div>
                <div className="col mb-3">
                  <input
                    type="checkbox"
                    id="shuffleAnswers"
                    checked={quiz.isShuffle}
                    onChange={(e) =>
                      dispatch(
                        setQuiz({ ...quiz, isShuffle: e.target.checked })
                      )
                    }
                  />
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-2 text-end">
                  <label htmlFor="timeLimit" className="form-label">
                    Time Limit (Minutes)
                  </label>
                </div>
                <div className="col">
                  <input
                    type="number"
                    id="timeLimit"
                    className="form-control mb-3"
                    value={quiz.time}
                    onChange={(e) =>
                      dispatch(setQuiz({ ...quiz, time: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-2 text-end">
                  <label htmlFor="multiAttempt" className="form-label">
                    Multiple Attempts
                  </label>
                </div>
                <div className="col mb-3">
                  <input
                    type="checkbox"
                    id="multiAttempt"
                    checked={quiz.isMultipleAttempts}
                    onChange={(e) =>
                      dispatch(
                        setQuiz({
                          ...quiz,
                          isMultipleAttempts: e.target.checked,
                        })
                      )
                    }
                  />
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-2 text-center">
                  <label
                    htmlFor="showCorrectAnswers"
                    className="form-label align-items-center float-end"
                  >
                    Show Correct Answers
                  </label>
                </div>
                <div className="col">
                  <select
                    className="form-select mb-3"
                    id="showCorrectAnswers"
                    onChange={(e) =>
                      dispatch(
                        setQuiz({ ...quiz, showCorrectAnswers: e.target.value })
                      )
                    }
                  >
                    <option>Immediately</option>
                    <option>After Due</option>
                    <option>Never</option>
                  </select>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-2 text-center">
                  <label
                    htmlFor="accessCode"
                    className="form-label align-items-center float-end"
                  >
                    Access Code
                  </label>
                </div>
                <div className="col">
                  <input
                    className="form-control mb-3"
                    id="accessCode"
                    onChange={(e) =>
                      dispatch(setQuiz({ ...quiz, accessCode: e.target.value }))
                    }
                  ></input>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-2 text-end">
                  <label htmlFor="oneQuestion" className="form-label">
                    One Question at a Time
                  </label>
                </div>
                <div className="col mb-3">
                  <input
                    type="checkbox"
                    id="oneQuestion"
                    checked={quiz.isOneQuestionAtaTime}
                    onChange={(e) =>
                      dispatch(
                        setQuiz({
                          ...quiz,
                          isOneQuestionAtaTime: e.target.checked,
                        })
                      )
                    }
                  />
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-2 text-end">
                  <label htmlFor="webcam" className="form-label">
                    Webcam Required
                  </label>
                </div>
                <div className="col mb-3">
                  <input
                    type="checkbox"
                    id="webcam"
                    checked={quiz.isWebcam}
                    onChange={(e) =>
                      dispatch(setQuiz({ ...quiz, isWebcam: e.target.checked }))
                    }
                  />
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-2 text-end">
                  <label htmlFor="lockQuestion" className="form-label">
                    Lock Questions After Answering
                  </label>
                </div>
                <div className="col mb-3">
                  <input
                    type="checkbox"
                    id="lockQuestion"
                    checked={quiz.isLockQuestionAfterAnswer}
                    onChange={(e) =>
                      dispatch(
                        setQuiz({
                          ...quiz,
                          isLockQuestionAfterAnswer: e.target.checked,
                        })
                      )
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-2">
                  <label className="form-label float-end mt-2">Assign</label>
                </div>
                <div className="col rounded p-3 border m-2">
                  <div className="container">
                    <div className="row">
                      <div>
                        <label className="form-label">Assign to</label>
                        <input
                          type="text"
                          className="form-control mb-3"
                          name="wd-assign-to"
                          value="Everyone"
                        />

                        <label className="form-label">Due</label>
                        <input
                          type="date"
                          className="form-control mb-3"
                          name="wd-due-date"
                          value={
                            quiz.dueDate
                              ? new Date(quiz.dueDate)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            dispatch(
                              setQuiz({
                                ...quiz,
                                dueDate: e.target.value,
                              })
                            )
                          }
                        />

                        <div className="row">
                          <div className="col-md-6">
                            <label className="form-label">Available From</label>
                            <input
                              type="date"
                              className="form-control mb-3"
                              name="wd-available-from"
                              value={
                                quiz.availableDate
                                  ? new Date(quiz.availableDate)
                                      .toISOString()
                                      .split("T")[0]
                                  : ""
                              }
                              onChange={(e) =>
                                dispatch(
                                  setQuiz({
                                    ...quiz,
                                    availableDate: e.target.value,
                                  })
                                )
                              }
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">Until</label>
                            <input
                              type="date"
                              className="form-control mb-3"
                              name="wd-available-until"
                              value={
                                quiz.availableUntilDate
                                  ? new Date(quiz.availableUntilDate)
                                      .toISOString()
                                      .split("T")[0]
                                  : ""
                              }
                              onChange={(e) =>
                                dispatch(
                                  setQuiz({
                                    ...quiz,
                                    availableUntilDate: e.target.value,
                                  })
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="col-12 btn btn-light btn-block">
                    <i className="fa fa-plus m-2" aria-hidden="true"></i>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              Notify users this quiz has changed
            </label>
          </div>
        </div>
        <div className="col-auto">
          <div className="float-end m-2">
            <button onClick={handleCancel} className="btn btn-light">
              Cancel
            </button>
            <button onClick={handleSavePublish} className="btn btn-light m-1">
              Save & Publish
            </button>
            <button onClick={handleSave} className="btn btn-danger m-1">
              Save
            </button>
          </div>
        </div>
      </div>

      <hr />
    </>
  );
}

export default QuizzEditor;
