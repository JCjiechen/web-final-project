import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as { _id: string; title: string; description: string }[],
  quiz: {
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
  },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizzes = [...state.quizzes, action.payload];
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === action.payload._id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    setInitialQuiz: (state, action) => {
      return {
        ...state,
        quiz: {
          ...initialState.quiz,
          _id: action.payload._id,
          course: action.payload.course,
        },
      };
    },
  },
});

export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setInitialQuiz,
  setQuizzes,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
