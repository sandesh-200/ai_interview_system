export type InterviewStatus =
  | "draft"
  | "ready"
  | "ongoing"
  | "completed"
  | "cancelled";

export interface Interview {
  id: number;
  title: string;
  job_position: string;
  seniority_level: string;
  max_questions: number;
  status: InterviewStatus;
  created_by: number;
  created_at: string;
}

export interface InterviewState{
    interviews:Interview[];
    selectedInterview:Interview | null
    loading:boolean;
    error:string | null;
}

export interface CreateInterviewRequest {
  title: string;
  job_position: string;
  seniority_level: string;
  max_questions: number;
}

export interface UpdateInterviewRequest {
  title?: string;
  job_position?: string;
  seniority_level?: string;
  max_questions?: number;
}