import React, { useState, useEffect, ForwardedRef } from "react";
import {
  FaCaretDown,
  FaCheckCircle,
  FaEllipsisV,
  FaPlus,
  FaPlusCircle,
  FaBan,
} from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import { IoRocketOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { KanbasState } from "../../store";
import {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setInitialQuiz,
  setQuizzes,
} from "./quizReducer";
import * as client from "./client";
import { Dropdown } from "react-bootstrap";
import "./index.css";

function Quizzes() {
  const { courseId } = useParams();

  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );

  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Get today's date in "YYYY-MM-DD" format
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getAvailabilityStatus = (quiz: any) => {
    const currentDate = getCurrentDate();
    const availableDate =
      quiz.availableDate === null
        ? ""
        : new Date(quiz.availableDate).toISOString().split("T")[0];
    if (currentDate > quiz.availableUntilDate) {
      return "Closed";
    } else if (currentDate >= quiz.availableDate) {
      return "Available";
    } else {
      return `Not available until ${availableDate}`;
    }
  };

  const newQuiz = {
    _id: "",
    name: "New Quiz",
    course: "",
    description: "New Description",
    points: 0,
    type: "Graded Quiz",
    group: "Quizzes",
    time: 20,
    attemptTimes: null,
    questions: null,
    availableDate: null,
    availableUntilDate: null,
    dueDate: null,
    accessCode: "",
    isShuffle: true,
    isMultipleAttempts: false,
    isOneQuestionAtaTime: true,
    isWebcam: false,
    isLockQuestionAfterAnswer: false,
    isPublish: false,
    showCorrectAnswers: "Immediately",
  };

  const handleCreateQuiz = () => {
    dispatch(setInitialQuiz());
    client.createQuiz(courseId, newQuiz).then((quiz) => {
      dispatch(addQuiz(quiz));
      dispatch(setQuiz(quiz));
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/Detail/${quiz._id}`);
    });
  };

  const handlePublishClick = (quiz: any) => {
    const updatedQuiz = { ...quiz, isPublish: !quiz.isPublish };
    client.updateQuiz(updatedQuiz);
    dispatch(setQuiz({ ...quiz, isPublish: updatedQuiz.isPublish }));
    dispatch(updateQuiz(updatedQuiz));
  };

  const handleEdit = (quiz: any) => {
    dispatch(setQuiz(quiz));
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/Detail/${quiz._id}`);
  };

  const handleDeleteQuiz = (quizId: string) => {
    client.deleteQuiz(quizId).then((status) => {
      dispatch(deleteQuiz(quizId));
    });
  };

  useEffect(() => {
    client
      .findQuizzesForCourse(courseId)
      .then((quizzes) => dispatch(setQuizzes(quizzes)));
  }, [courseId]);

  interface CustomToggleProps {
    onClick: React.MouseEventHandler<HTMLDivElement>;
  }

  const CustomToggle = React.forwardRef(
    ({ onClick }: CustomToggleProps, ref: ForwardedRef<HTMLDivElement>) => (
      <div
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        <FaEllipsisV className="ms-2" />
      </div>
    )
  );

  return (
    <>
      <div className="row">
        <div className="col">
          <input className="form-control w-25" placeholder="Search for Quiz" />
        </div>
        <div className="col-auto">
          <div className="float-end">
            <button className="btn btn-danger m-1" onClick={handleCreateQuiz}>
              <FaPlus className="me-2 mb-1" />
              <span>Quiz</span>
            </button>
            <button className="btn btn-light m-1">
              <FaEllipsisV className="mb-1" />
            </button>
          </div>
        </div>
      </div>
      <hr />

      {quizList.length === 0 && (
        <h1>
          Quiz List is Empty. Please Click '+ Quiz' button to add quizzes.
        </h1>
      )}

      {quizList.length !== 0 && (
        <ul className="list-group wd-modules">
          <li className="list-group-item">
            <div>
              <GoTriangleDown className="me-2" /> Assignment Quizzes
            </div>
            <ul className="list-group">
              {quizList
                .filter((quiz) => quiz.course === courseId)
                .map((quiz) => (
                  <li key={quiz._id} className="list-group-item">
                    <div className="d-flex align-items-center">
                      <IoRocketOutline
                        style={{ color: "green" }}
                        className="m-2"
                      />

                      <div>
                        <Link
                          to={`/Kanbas/Courses/${courseId}/Quizzes/Detail/${quiz._id}`}
                          className="wd-assignment-link"
                          onClick={() => dispatch(setQuiz(quiz))}
                          style={{ display: "block", marginBottom: "5px" }}
                        >
                          {quiz.name}
                        </Link>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {quiz.availableDate && (
                            <p
                              style={{ fontSize: "10px", marginRight: "10px" }}
                            >
                              {getAvailabilityStatus(quiz) === "Closed" &&
                                "Closed"}
                              {getAvailabilityStatus(quiz) === "Available" &&
                                "Available"}
                              {getAvailabilityStatus(quiz).startsWith(
                                "Not available"
                              ) && getAvailabilityStatus(quiz)}
                            </p>
                          )}
                          <p style={{ fontSize: "10px", marginRight: "10px" }}>
                            Due:{" "}
                            {quiz.dueDate &&
                              new Date(quiz.dueDate)
                                .toISOString()
                                .split("T")[0]}{" "}
                          </p>
                          <p style={{ fontSize: "10px", marginRight: "10px" }}>
                            {quiz.points} pts
                          </p>
                          <p style={{ fontSize: "10px" }}>
                            {quiz.questions} Questions
                          </p>
                        </div>
                      </div>

                      <span className="ms-auto d-flex align-items-center">
                        <span
                          onClick={() => handlePublishClick(quiz)}
                          className="ms-2"
                          style={{ cursor: "pointer" }}
                        >
                          {quiz.isPublish ? (
                            <FaCheckCircle className="text-success" />
                          ) : (
                            <FaBan />
                          )}
                        </span>

                        <Dropdown
                          className="ms-2"
                          style={{ cursor: "pointer" }}
                        >
                          <Dropdown.Toggle
                            as={CustomToggle}
                            variant="light"
                            id="dropdown-basic"
                          />
                          <Dropdown.Menu>
                            <Dropdown.Item
                              className="dropdown-item"
                              onClick={() => handleEdit(quiz)}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="dropdown-item"
                              onClick={() => handleDeleteQuiz(quiz._id)}
                            >
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="dropdown-item"
                              onClick={() => handlePublishClick(quiz)}
                            >
                              {quiz.isPublish ? "Unpublish" : "Publish"}
                            </Dropdown.Item>
                            <Dropdown.Item className="dropdown-item">
                              Copy (Optional)
                            </Dropdown.Item>
                            <Dropdown.Item className="dropdown-item">
                              Sort (Optional)
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      )}
    </>
  );
}

export default Quizzes;
