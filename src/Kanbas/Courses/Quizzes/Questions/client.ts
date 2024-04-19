import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const QUIZZES_API = `${API_BASE}/api/quizzes`;
const QUESSTIONS_API = `${API_BASE}/api/questions`;
axios.defaults.withCredentials = true;
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const findQuestionsForQuiz = async (quizId: any) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/questions`
  );
  return response.data;
};

export const findQuestionById = async (questionId: any) => {
  const response = await axiosWithCredentials.get(
    `${QUESSTIONS_API}/${questionId}`
  );
  return response.data;
};

export const createQuestion = async (quizId: any, question: any) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (questionId: any) => {
  const response = await axiosWithCredentials.delete(
    `${QUESSTIONS_API}/${questionId}`
  );
  return response.data;
};

export const deleteQuestionsByQuizId = async (quizId: any) => {
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}/questions`
  );
  return response.data;
};

export const updateQuestion = async (question: any) => {
  const response = await axiosWithCredentials.put(
    `${QUESSTIONS_API}/${question._id}`,
    question
  );
  return response.data;
};
