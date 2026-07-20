import type { InterviewState } from "@/features/interview/interviewTypes";
import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { 
  createInterview, 
  deleteInterview, 
  getAllInterviews, 
  getInterviewById, 
  updateInterview,
  generateInterviewQuestions,
  getInterviewQuestions,
  getAvailableCandidates,
  assignCandidates
} from "./interviewThunk";

const initialState: InterviewState = {
  interviews: [],
  selectedInterview: null,
  questions: [],
  availableCandidates: [],
  assignmentResult: null,
  loading: false,
  generatingId: null,
  error: null,
};

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
  clearSelectedInterview(state) {
    state.selectedInterview = null;
  },

  clearInterviewError(state) {
    state.error = null;
  },

  clearQuestions(state) {
    state.questions = [];
  },

  clearAvailableCandidates(state) {
    state.availableCandidates = [];
  },

  clearAssignmentResult(state) {
    state.assignmentResult = null;
  },
},

  extraReducers: (builder) => {
    //fufilled
    builder.addCase(createInterview.fulfilled, (state, action) => {
      state.loading = false;
      state.interviews.unshift(action.payload);
    });

    builder.addCase(getAllInterviews.fulfilled, (state, action) => {
      state.loading = false;
      state.interviews = action.payload;
    });

    builder.addCase(getInterviewById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedInterview = action.payload;
    });

    builder.addCase(updateInterview.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedInterview = action.payload;

      const index = state.interviews.findIndex(
        (interview) => interview.id === action.payload.id
      );

      if (index !== -1) {
        state.interviews[index] = action.payload;
      }
    });

    builder.addCase(deleteInterview.fulfilled, (state, action) => {
      state.loading = false;
      state.interviews = state.interviews.filter(
        (interview) => interview.id !== action.payload
      );

      if (state.selectedInterview?.id === action.payload) {
        state.selectedInterview = null;
      }
    });

    builder.addCase(
      generateInterviewQuestions.pending,
      (state, action) => {
        state.error = null;
        state.generatingId = action.meta.arg;
      }
    );

    builder.addCase(
      generateInterviewQuestions.fulfilled,
      (state, action) => {
        state.generatingId = null;

        const interview = state.interviews.find(
          (i) => i.id === action.payload
        );

        if (interview) {
          interview.status = "ready";
        }

        if (
          state.selectedInterview?.id === action.payload
        ) {
          state.selectedInterview.status = "ready";
        }
      }
    );

     builder.addCase(
      generateInterviewQuestions.rejected,
      (state, action) => {
        state.generatingId = null;
        state.error =
          action.payload ?? "Failed to generate questions.";
      }
    );

    builder.addCase(
  getInterviewQuestions.fulfilled,
  (state, action) => {
    state.loading = false;
    state.questions = action.payload;
  }
);
  builder.addCase(
  getAvailableCandidates.fulfilled,
  (state, action) => {
    state.loading = false;
    state.availableCandidates = action.payload;
  }
);

builder.addCase(
  assignCandidates.fulfilled,
  (state, action) => {
    state.loading = false;

    state.assignmentResult = action.payload;

    state.availableCandidates =
      state.availableCandidates.filter(
        (candidate) =>
          !action.payload.assigned_candidate_ids.includes(
            candidate.id
          )
      );
  }
);

//matchers

    //pending
    builder.addMatcher(
      isPending(
        createInterview,
        getAllInterviews,
        getInterviewById,
        updateInterview,
        deleteInterview,
        getInterviewQuestions,
        getAvailableCandidates,
        assignCandidates
      ),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    //rejected
    builder.addMatcher(
      isRejected(
        createInterview,
        getAllInterviews,
        getInterviewById,
        updateInterview,
        deleteInterview,
        getInterviewQuestions,
        getAvailableCandidates,
        assignCandidates
      ),
      (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );
  },
})

export const {
  clearSelectedInterview,
  clearInterviewError,
  clearQuestions,
  clearAvailableCandidates,
  clearAssignmentResult
} = interviewSlice.actions

export default interviewSlice.reducer