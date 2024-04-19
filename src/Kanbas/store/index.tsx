import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import quizzesReducer from "../Courses/Quizzes/quizReducer";
import questionsReducer from "../Courses/Quizzes/Questions/questionsReducer";

export interface KanbasState {
  modulesReducer: { modules: any[]; module: any };
  assignmentsReducer: { assignments: any[]; assignment: any };
  quizzesReducer: { quizzes: any[]; quiz: any };
  questionsReducer: { questions: any[]; question: any; editingQuestion: any };
}

const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    quizzesReducer,
    questionsReducer,
  },
});

export default store;
