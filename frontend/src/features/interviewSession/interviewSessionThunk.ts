import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { interviewSessionAPI } from "./interviewSessionAPI";
import type { InterviewSession } from "./interviewSessionTypes";

interface ApiError {
  detail: string;
}

export const startInterview = createAsyncThunk<
  InterviewSession,
  number,
  { rejectValue: string }
>(
  "interviewSession/start",
  async (interviewId, { rejectWithValue }) => {
    try {
      const response = await interviewSessionAPI.start(interviewId);

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data.detail ??
        "Failed to start interview."
      );
    }
  }
);