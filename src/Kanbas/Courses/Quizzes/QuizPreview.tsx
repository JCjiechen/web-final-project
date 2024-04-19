import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setQuiz } from "./quizReducer";
import { setQuestions } from "./Questions/questionsReducer";
import * as client from "./client";
import * as questionClient from "./Questions/client";
import { KanbasState } from "../../store";
import { TiPencil } from "react-icons/ti";
import { FiAlertCircle } from "react-icons/fi";
import { FaRegQuestionCircle } from "react-icons/fa";
import "./QuizPreview.css";

const QuizPreview = () => {
  const { courseId, quizId } = useParams();

  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  const questionList = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
  );
  const dispatch = useDispatch();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);

  const currentQuestion = questionList.find(
    (question) => questionList.indexOf(question) + 1 === currentQuestionIndex
  );

  const navigate = useNavigate();

  function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    minutes = parseInt(minutes.toString(), 10);
    const amPm = hours >= 12 ? "pm" : "am";
    hours %= 12;
    hours = hours || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedTime = hours + ":" + formattedMinutes + " " + amPm;
    return formattedTime;
  }
  const currentTime = getCurrentTime();

  const handleButtonClick = (direction: any) => {
    if (direction === "before" && currentQuestionIndex > 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (
      direction === "next" &&
      currentQuestionIndex < questionList.length
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const navigateToQuizDetail = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/Detail/${quizId}`);
  };

  const navigateToQuizEditor = () => {
    dispatch(setQuiz(quiz));
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/Editor/${quizId}`);
  };

  useEffect(() => {
    client.findQuizById(quizId).then((Quiz) => {
      dispatch(setQuiz(Quiz));
    });
    questionClient.findQuestionsForQuiz(quizId).then((questions) => {
      dispatch(setQuestions(questions));
    });
  }, [quizId]);

  return (
    <>
      <h1>{quiz.name}</h1>
      <div className="alert alert-danger" role="alert">
        <FiAlertCircle className="mb-1 me-2" />
        This is a preview of the published version of the quiz
      </div>
      <p>Started: {new Date(quiz.availableDate).toISOString().split("T")[0]}</p>
      <h1>Quiz Instructions</h1>
      <hr />

      {/* question content start */}
      <div className="row w-100">
        <div className="mb-4 col-10">
          {questionList.length > 0 && (
            <div className="question-container">
              <div className="w-100">
                <div className="question-info">
                  <div className="col">Question {currentQuestionIndex}</div>
                  <div className="col text-end">
                    {currentQuestion.points} pts
                  </div>
                </div>
                <hr className="divider" />
                <div>
                  <div className="mx-2">{currentQuestion.instruction}</div>
                  {currentQuestion.type === "Multiple Choice" && (
                    <>
                      <div>
                        {currentQuestion.MCQchoice.map(
                          (choice: any, index: any) => (
                            <div className="ms-2 mb-1" key={index}>
                              <input
                                type="radio"
                                id={`choice-${index}`}
                                name="mcq-choice"
                                value={choice.text}
                                checked={choice.isCorrect}
                              />
                              <label
                                className="ms-2"
                                htmlFor={`choice-${index}`}
                              >
                                {choice.text}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </>
                  )}
                  {currentQuestion.type === "True/False" && (
                    <>
                      <div className="form-check ms-2 mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="answer"
                          id="trueOption"
                          value="true"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="trueOption"
                        >
                          True
                        </label>
                      </div>
                      <div className="form-check ms-2 mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="answer"
                          id="falseOption"
                          value="false"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="falseOption"
                        >
                          False
                        </label>
                      </div>
                    </>
                  )}
                  {currentQuestion.type === "Fill in the blank" && (
                    <>
                      <div>
                        {currentQuestion.answerForBlank.map(
                          (answer: any, index: any) => (
                            <div key={index} className="input-box ms-2 mb-2">
                              <input type="text" className="gray-input" />{" "}
                              {answer.isCaseSensitive && "(Case Sensitive)"}
                            </div>
                          )
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {questionList.length > 0 && (
            <div className="text-end w-100">
              {currentQuestionIndex !== 1 && (
                <button
                  className="btn btn-light ms-3 w-90"
                  onClick={() => handleButtonClick("before")}
                >
                  Before
                </button>
              )}
              {currentQuestionIndex !== questionList.length && (
                <button
                  className="btn btn-light ms-3 w-90"
                  onClick={() => handleButtonClick("next")}
                >
                  Next
                </button>
              )}
            </div>
          )}

          {questionList.length === 0 && (
            <>
              <h2>No Questions</h2>
              <br />
              <br />
              <br />
              <br />
            </>
          )}
        </div>

        <div className="mb-4 col-2">
          <h6>Questions:</h6>
          {questionList.map((q, index) => (
            <div
              key={index}
              className={`previewQuestionLink ${
                index + 1 === currentQuestionIndex ? "active" : ""
              }`}
              onClick={() => {
                setCurrentQuestionIndex(index + 1);
              }}
            >
              <FaRegQuestionCircle className="mb-1 me-2" />
              {`Question ${index + 1}`}
            </div>
          ))}
        </div>
      </div>

      {/* question content end */}

      <div className="border text-end w-100">
        Quiz saved at {currentTime}
        <button
          onClick={navigateToQuizDetail}
          className="btn btn-light ms-4 m-3"
        >
          Submit Quiz
        </button>
      </div>

      <div className="mt-4 d-flex">
        <button
          className="btn btn-light d-flex align-items-center flex-grow-1"
          onClick={navigateToQuizEditor}
        >
          <TiPencil className="flipped-icon mt-2 mb-2 me-2" />
          <span className="mt-2 mb-2">Keep Editing This Quiz</span>
        </button>
      </div>
    </>
  );
};

export default QuizPreview;
