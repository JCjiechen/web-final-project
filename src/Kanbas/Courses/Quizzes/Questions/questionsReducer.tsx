import { createSlice } from "@reduxjs/toolkit";

type Choice = {
  text: string;
  isCorrect: boolean;
};

type Answer = {
  text: string;
  isCaseSensitive: boolean;
};

const initialState = {
  questions: [] as { _id: string; name: string; description: string }[],
  question: {
    _id: "",
    name: "New Question",
    quizId: "",
    instruction: "New Instruction",
    points: 0,
    type: "Multiple Choice",
    isEdit: false,
    MCQchoice: [] as Choice[],
    answerForTF: false,
    answerForBlank: [] as Answer[],
  },
  editingQuestion: {
    _id: "",
    name: "New Question",
    quizId: "",
    instruction: "New Instruction",
    points: 0,
    type: "Multiple Choice",
    isEdit: false,
    MCQchoice: [] as Choice[],
    answerForTF: false,
    answerForBlank: [] as Answer[],
  },
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action) => {
      state.questions = [...state.questions, action.payload];
    },
    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter(
        (question) => question._id !== action.payload
      );
    },
    updateQuestion: (state, action) => {
      state.questions = state.questions.map((question) => {
        if (question._id === action.payload._id) {
          return action.payload;
        } else {
          return question;
        }
      });
    },
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setInitialQuestion: (state) => {
      state.question = initialState.question; // Reset to initial state
    },
    setEditingQuestion: (state, action) => {
      state.editingQuestion = action.payload;
    },
  },
});

export const {
  addQuestion,
  deleteQuestion,
  updateQuestion,
  setQuestion,
  setQuestions,
  setInitialQuestion,
  setEditingQuestion,
} = questionsSlice.actions;
export default questionsSlice.reducer;
