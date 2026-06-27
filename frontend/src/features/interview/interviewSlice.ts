import type { InterviewState } from "@/features/interview/interviewTypes";
import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { 
  createInterview, 
  deleteInterview, 
  getAllInterviews, 
  getInterviewById, 
  updateInterview 
} from "./interviewThunk";

const initialState: InterviewState = {
  interviews: [],
  selectedInterview: null,
  loading: false,
  error: null
}

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    clearSelectedInterview(state) {
      state.selectedInterview = null;
    },
    clearInterviewError(state) {
      state.error = null;
    }
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

//matchers

    //pending
    builder.addMatcher(
      isPending(
        createInterview,
        getAllInterviews,
        getInterviewById,
        updateInterview,
        deleteInterview
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
        deleteInterview
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
  clearInterviewError
} = interviewSlice.actions

export default interviewSlice.reducer