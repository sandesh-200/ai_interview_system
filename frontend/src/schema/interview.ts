// interviewSchema.ts

import { z } from "zod";

export const createInterviewSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  job_position: z
    .string()
    .min(2, "Job position is required"),

  seniority_level: z
    .string()
    .min(1, "Select a seniority level"),

  max_questions: z
    .number()
    .min(1)
    .max(50),

  status: z.enum([
    "draft",
    "ready",
    "ongoing",
    "completed",
    "cancelled",
  ]),
});

export type CreateInterviewFormData = z.infer<
  typeof createInterviewSchema
>;