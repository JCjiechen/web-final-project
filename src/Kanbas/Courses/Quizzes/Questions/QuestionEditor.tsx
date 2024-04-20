import { FaPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import * as client from "./client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { KanbasState } from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import {
  addQuestion,
  setQuestion,
  setQuestions,
  updateQuestion,
  setInitialQuestion,
  setEditingQuestion,
} from "./questionsReducer";
import "./QuestionEditor.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function QuestionEditor() {
  const { courseId, quizId } = useParams();

  const questionList = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
  );
  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );
  const editQuestion = useSelector(
    (state: KanbasState) => state.questionsReducer.editingQuestion
  );
  let initialState = { ...question };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function extractTextFromHtml(htmlString: String) {
    const regex = /<p>(.*?)<\/p>/;
    const match = htmlString.match(regex);
    return match ? match[1] : "";
  }

  type Choice = {
    text: string;
    isCorrect: boolean;
  };
  type Answer = {
    text: string;
    isCaseSensitive: boolean;
  };

  const newQuestion = {
    _id: "",
    name: "New Question",
    quizId: "",
    instruction: "New Instruction",
    points: 0,
    type: "Multiple Choice",
    isEdit: false,
    MCQchoice: [] as Choice[],
    answerForBlank: [] as Answer[],
  };

  const handleCreateQestion = () => {
    dispatch(setInitialQuestion());
    client.createQuestion(quizId, newQuestion).then((newQuestion) => {
      dispatch(addQuestion(newQuestion));
    });
  };

  const handleEditQuestion = (question: any) => {
    initialState = { ...question };
    const newQuestion = { ...question, isEdit: true };
    dispatch(setEditingQuestion(newQuestion));
    dispatch(setQuestion(newQuestion));
    dispatch(updateQuestion(newQuestion));
    client.updateQuestion(newQuestion);
  };

  const handleCancleEditQuestion = () => {
    const newQuestion = { ...initialState, isEdit: false };
    dispatch(setEditingQuestion(newQuestion));
    dispatch(setQuestion(newQuestion));
    dispatch(updateQuestion(newQuestion));
    client.updateQuestion(newQuestion);
  };

  const updatEditedQuestion = () => {
    const newQuestion = {
      ...editQuestion,
      isEdit: false,
      instruction: extractTextFromHtml(editQuestion.instruction),
    };
    dispatch(setQuestion(newQuestion));
    dispatch(updateQuestion(newQuestion));
    client.updateQuestion(newQuestion);
  };

  const handleTypeChange = (editQuestion: any, type: String) => {
    dispatch(
      setEditingQuestion({
        ...editQuestion,
        type: type,
      })
    );
  };

  const handleAnotherAnswer = () => {
    const newChoice = { text: "", isCorrect: false };
    const newQuestion = {
      ...editQuestion,
      MCQchoice: [...editQuestion.MCQchoice, newChoice],
    };
    dispatch(setEditingQuestion(newQuestion));
  };

  const handleAnotherFillInAnswer = () => {
    const newAnswer = { text: "", isCaseSensitive: false };
    const newQuestion = {
      ...editQuestion,
      answerForBlank: [...editQuestion.answerForBlank, newAnswer],
    };
    dispatch(setEditingQuestion(newQuestion));
  };

  const handleRadioChange = (index: number) => {
    const updatedChoices = editQuestion.MCQchoice.map(
      (choice: { text: string; isCorrect: boolean }, i: number) =>
        i === index
          ? { ...choice, isCorrect: true }
          : { ...choice, isCorrect: false }
    );
    const newQuestion = {
      ...editQuestion,
      MCQchoice: updatedChoices,
    };
    dispatch(setEditingQuestion(newQuestion));
  };

  const handleTextChange = (index: number, newText: string) => {
    const updatedChoices = editQuestion.MCQchoice.map(
      (choice: { text: string; isCorrect: boolean }, i: number) =>
        i === index ? { ...choice, text: newText } : choice
    );
    const newQuestion = {
      ...editQuestion,
      MCQchoice: updatedChoices,
    };
    dispatch(setEditingQuestion(newQuestion));
  };

  const handleDeleteChoice = (index: number) => {
    const updatedChoices = editQuestion.MCQchoice.filter(
      (choice: { text: string; isCorrect: boolean }, i: number) => i !== index
    );
    const newQuestion = {
      ...editQuestion,
      MCQchoice: updatedChoices,
    };
    dispatch(setEditingQuestion(newQuestion));
  };

  const handleTFAnswer = (e: any, editQuestion: any) => {
    const selectedValue = e.target.value;
    const newQuestion = {
      ...editQuestion,
      answerForTF: selectedValue === "true",
    };
    dispatch(setEditingQuestion(newQuestion));
  };

  const handleAnswerChange = (index: number, newText: string) => {
    const updatedAnswers = editQuestion.answerForBlank.map(
      (answer: { text: string; isCaseSensitive: boolean }, i: number) =>
        i === index ? { ...answer, text: newText } : answer
    );
    const newQuestion = {
      ...editQuestion,
      answerForBlank: updatedAnswers,
    };
    dispatch(setEditingQuestion(newQuestion));
  };

  const handleCaseSensitiveChange = (index: number, isSensitive: boolean) => {
    const updatedAnswers = editQuestion.answerForBlank.map(
      (answer: { text: string; isCaseSensitive: boolean }, i: number) =>
        i === index ? { ...answer, isCaseSensitive: isSensitive } : answer
    );
    const newQuestion = {
      ...editQuestion,
      answerForBlank: updatedAnswers,
    };
    dispatch(setEditingQuestion(newQuestion));
  };

  const handleDeleteAnswer = (index: number) => {
    const updatedAnswers = editQuestion.answerForBlank.filter(
      (answer: { text: string; isCaseSensitive: boolean }, i: number) =>
        i !== index
    );
    const newQuestion = {
      ...editQuestion,
      answerForBlank: updatedAnswers,
    };
    dispatch(setEditingQuestion(newQuestion));
  };

  useEffect(() => {
    client
      .findQuestionsForQuiz(quizId)
      .then((questions) => dispatch(setQuestions(questions)));
  }, [quizId]);

  return (
    <>
      {questionList.length !== 0 &&
        questionList
          .filter((question) => question.quizId === quizId)
          .map((question) => (
            <>
              <>
                {!question.isEdit && (
                  <>
                    <div className="question-container">
                      <div className="question-info">
                        <div className="col">{question.name}</div>
                        <div className="col text-end">
                          {question.points} pts
                        </div>
                      </div>
                      <hr className="divider" />
                      <div className="question-content">
                        <div className="m-2">{question.instruction}</div>
                        {question.type === "Multiple Choice" && (
                          <>
                            <div>
                              {question.MCQchoice.map(
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
                        {question.type === "True/False" && (
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
                        {question.type === "Fill in multiple blanks" && (
                          <>
                            <div>
                              {question.answerForBlank.map(
                                (answer: any, index: any) => (
                                  <div
                                    key={index}
                                    className="input-box ms-2 mb-2"
                                  >
                                    <input type="text" className="gray-input" />{" "}
                                    {answer.isCaseSensitive &&
                                      "(Case Sensitive)"}
                                  </div>
                                )
                              )}
                            </div>
                          </>
                        )}
                      </div>
                      <hr className="divider" />
                      <div className="row">
                        <div className="col text-end">
                          <button
                            onClick={() => handleEditQuestion(question)}
                            className="btn btn-danger"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
              <>
                {question.isEdit && (
                  <>
                    <div className="question-container">
                      <div className="question-info">
                        <div className="col">
                          <input
                            type="text"
                            className="input-field"
                            value={editQuestion.name}
                            onChange={(e) =>
                              dispatch(
                                setEditingQuestion({
                                  ...editQuestion,
                                  name: e.target.value,
                                })
                              )
                            }
                          ></input>
                          <select
                            defaultValue={editQuestion.type}
                            className="select-field"
                            onChange={(e) =>
                              handleTypeChange(editQuestion, e.target.value)
                            }
                          >
                            <option value="Multiple Choice">
                              Multiple Choice
                            </option>
                            <option value="True/False">True/False</option>
                            <option selected value="Fill in multiple blanks">
                              Fill in multiple blanks
                            </option>
                          </select>
                        </div>
                        <div className="col text-end">
                          pts:{" "}
                          <input
                            type="number"
                            value={editQuestion.points}
                            style={{ width: "50px" }}
                            onChange={(e) =>
                              dispatch(
                                setEditingQuestion({
                                  ...editQuestion,
                                  points: e.target.value,
                                })
                              )
                            }
                          ></input>
                        </div>
                      </div>

                      <hr className="divider" />

                      <div className="question-content">
                        {editQuestion.type === "Multiple Choice" && (
                          <>
                            <p className="m-2">
                              Enter your question and multiple answers, then
                              select the one correct answer.
                            </p>
                            <h3 className="m-2">Question:</h3>
                            <ReactQuill
                              id="wd-quiz-description"
                              value={editQuestion.instruction}
                              onChange={(e) =>
                                dispatch(
                                  setEditingQuestion({
                                    ...editQuestion,
                                    instruction: e,
                                  })
                                )
                              }
                            />
                            <h3 className="m-2">Answer:</h3>
                            <div>
                              {editQuestion.MCQchoice &&
                                editQuestion.MCQchoice.map(
                                  (
                                    choice: {
                                      text: string;
                                      isCorrect: boolean;
                                    },
                                    index: any
                                  ) => (
                                    <div key={index}>
                                      <input
                                        className="ms-2 mb-4"
                                        type="radio"
                                        checked={choice.isCorrect}
                                        onChange={() =>
                                          handleRadioChange(index)
                                        }
                                      />
                                      <input
                                        className="ms-2 mb-4"
                                        type="text"
                                        value={choice.text}
                                        onChange={(e) =>
                                          handleTextChange(
                                            index,
                                            e.target.value
                                          )
                                        }
                                      />
                                      <button
                                        className="btn btn-danger ms-2"
                                        onClick={() =>
                                          handleDeleteChoice(index)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  )
                                )}
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="float-end">
                                  <button
                                    className="btn btn-light text-danger"
                                    onClick={handleAnotherAnswer}
                                  >
                                    <FaPlus className="me-1 mb-1" />
                                    Add Anothe Answer
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {editQuestion.type === "True/False" && (
                          <>
                            <h3 className="m-2">Question:</h3>
                            <ReactQuill
                              id="wd-quiz-description"
                              value={editQuestion.instruction}
                              onChange={(e) =>
                                dispatch(
                                  setEditingQuestion({
                                    ...editQuestion,
                                    instruction: e,
                                  })
                                )
                              }
                            />
                            <h3 className="m-2">Answer:</h3>
                            <div className="form-check ms-2 mb-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="answer"
                                id="trueOption"
                                value="true"
                                onChange={(e) => {
                                  handleTFAnswer(e, editQuestion);
                                }}
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
                                onChange={(e) => {
                                  handleTFAnswer(e, editQuestion);
                                }}
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
                        {editQuestion.type === "Fill in multiple blanks" && (
                          <>
                            <p className="m-2">
                              Enter your question text, then define all possible
                              correct answers for the blank. Students will see
                              the question followed by a small text box to type
                              their answers.
                            </p>
                            <h3 className="m-2">Question:</h3>
                            <ReactQuill
                              id="wd-quiz-description"
                              value={editQuestion.instruction}
                              onChange={(e) =>
                                dispatch(
                                  setEditingQuestion({
                                    ...editQuestion,
                                    instruction: e,
                                  })
                                )
                              }
                            />
                            <h3 className="m-2">Answer:</h3>
                            <div>
                              {editQuestion.answerForBlank &&
                                editQuestion.answerForBlank.map(
                                  (
                                    answer: {
                                      text: string;
                                      isCaseSensitive: boolean;
                                    },
                                    index: any
                                  ) => (
                                    <div key={index} className="ms-2 input-box">
                                      Pssible Answer:
                                      <input
                                        className="ms-2 mb-4"
                                        type="text"
                                        value={answer.text}
                                        onChange={(e) =>
                                          handleAnswerChange(
                                            index,
                                            e.target.value
                                          )
                                        }
                                      />
                                      <input
                                        className="ms-4 mb-4 me-2"
                                        type="checkbox"
                                        defaultChecked={answer.isCaseSensitive}
                                        onChange={(e) =>
                                          handleCaseSensitiveChange(
                                            index,
                                            e.target.checked
                                          )
                                        }
                                      />
                                      Case Sensitive
                                      <button
                                        className="btn btn-danger ms-4"
                                        onClick={() =>
                                          handleDeleteAnswer(index)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  )
                                )}
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="float-end">
                                  <button
                                    className="btn btn-light text-danger"
                                    onClick={handleAnotherFillInAnswer}
                                  >
                                    <FaPlus className="me-1 mb-1" />
                                    Add Anothe Answer
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <hr className="divider" />
                      <div className="row">
                        <div className="col text-end">
                          <button
                            className="btn btn-light me-2"
                            onClick={handleCancleEditQuestion}
                          >
                            Cancle
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={updatEditedQuestion}
                          >
                            Update Question
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            </>
          ))}

      <div className="row align-items-center">
        <div className="col"></div>
        <div className="col-auto">
          <div className="float-end m-2">
            <button onClick={handleCreateQestion} className="btn btn-light">
              <FaPlus className="me-2 mb-1" />
              New Questions
            </button>
            <button className="btn btn-light m-2">
              <FaPlus className="me-2 mb-1" />
              New Question Group
            </button>
            <button className="btn btn-light m-2">
              <FaMagnifyingGlass className="me-2 mb-1" />
              Find Questions
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionEditor;
