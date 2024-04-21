import { FaCheckCircle, FaEllipsisV, FaBan, FaPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { KanbasState } from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./index.css";
import QuestionEditor from "./QuestionEditor";
import { setQuestions } from "./questionsReducer";
import { updateQuiz, setQuiz } from "../quizReducer";
import * as client from "./client";
import * as quizClient from "../client";

function Questions() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();

  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const questionList = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
  );
  const [initialState, setInitialState] = useState({ ...questionList });
  const dispatch = useDispatch();

  const handleQuestionsClick = (event: any) => {
    event.preventDefault(); // Prevent default link behavior (navigation)
  };

  const handleCancel = async () => {
    const newQuestionList = { ...initialState };
    const quizQuestionList = await client.findQuestionsForQuiz(quizId);
    const newQuestionArray = Object.values(newQuestionList);

    quizQuestionList.forEach((question: any) => {
      let found = false;
      for (let i = 0; i < newQuestionArray.length; i++) {
        if (newQuestionArray[i]._id === question._id) {
          found = true;
          break;
        }
      }
      if (!found) {
        client
          .deleteQuestion(question._id)
          .then(() => {
            console.log(`Deleted question with ID ${question._id}`);
          })
          .catch((error) => {
            console.error(
              `Error deleting question with ID ${question._id}: ${error}`
            );
          });
      }
    });

    dispatch(setQuestions(Object.values(initialState)));
  };

  const handleSavePublish = async () => {
    await handleSave();
    const updatedQuiz = { ...quiz, isPublish: true };
    dispatch(setQuiz({ ...quiz, isPublish: updatedQuiz.isPublish }));
    quizClient.updateQuiz(updatedQuiz).then((updatedQuiz: any) => {
      dispatch(updateQuiz(updatedQuiz));
    });
  };

  const handleSave = async () => {
    let totalPoints = 0;
    const quizQuestionList = await client.findQuestionsForQuiz(quizId);
    quizQuestionList.forEach((question: any) => {
      totalPoints += question.points;
    });
    const updatedQuiz = { ...quiz, points: totalPoints };
    console.log(quiz);
    dispatch(updateQuiz(updatedQuiz));
    dispatch(setQuiz(updatedQuiz));
    quizClient.updateQuiz(updatedQuiz);
  };

  useEffect(() => {
    client
      .findQuestionsForQuiz(quizId)
      .then((questions) => dispatch(setQuestions(questions)));
  }, [quizId]);

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

export default Questions;
