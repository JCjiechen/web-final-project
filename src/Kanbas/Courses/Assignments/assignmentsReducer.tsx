import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

const initialState = {
  assignments: assignments,
  assignment: {
    _id: "",
    title: "New Assignment",
    description: "New Description",
    course: "",
    points: 100,
    dueDate: "2024-06-01",
    availableFromDate: "2024-01-01",
    availableUntilDate: "2024-06-01",
  },
};

const assignmentsSlice = createSlice({
  name: "assignmets",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      state.assignments = [
        ...state.assignments,
        { ...action.payload, _id: new Date().getTime().toString() },
      ];
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((assignment) => {
        if (assignment._id === action.payload._id) {
          return action.payload;
        } else {
          return assignment;
        }
      });
    },
    setAssignment: (state, action) => {
      state.assignment = action.payload;
    },
    setInitialAssignment: (state) => {
      state.assignment = initialState.assignment;
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignment,
  setInitialAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
