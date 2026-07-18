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
    questions: InterviewQuestion[];
    loading:boolean;
    generatingId:number | null
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

export interface InterviewQuestion {
  id: number;
  question_text: string;
  category: "Technical" | "Behavioral";
  order_sequence: number;
}