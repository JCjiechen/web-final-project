import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [] as { _id: string; title: string; description: string }[],
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
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action) => {
      state.assignments = [...state.assignments, action.payload];
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
  setAssignments,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
