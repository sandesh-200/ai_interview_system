import {
  createSlice,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

import type { InterviewSessionState } from "./interviewSessionTypes";
import { startInterview } from "./interviewSessionThunk";

const initialState: InterviewSessionState = {
  session: null,
  currentQuestion: null,

  loading: false,
  submitting: false,

  error: null,
};

const interviewSessionSlice = createSlice({
  name: "interviewSession",
  initialState,
  reducers: {
    clearSession(state) {
      state.session = null;
      state.currentQuestion = null;
    },

    clearCurrentQuestion(state) {
      state.currentQuestion = null;
    },

    clearInterviewSessionError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // Fulfilled
    builder.addCase(
      startInterview.fulfilled,
      (state, action) => {
        state.loading = false;
        state.session = action.payload;
      }
    );

    // Pending
    builder.addMatcher(
      isPending(startInterview),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    // Rejected
    builder.addMatcher(
      isRejected(startInterview),
      (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );
  },
});

export const {
  clearSession,
  clearCurrentQuestion,
  clearInterviewSessionError,
} = interviewSessionSlice.actions;

export default interviewSessionSlice.reducer;