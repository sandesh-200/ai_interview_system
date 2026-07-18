import api from "@/api/axios";
import type { CreateInterviewRequest, UpdateInterviewRequest } from "./interviewTypes";

export const interviewAPI = {
    create:(data:CreateInterviewRequest)=>api.post("/interviews",data),
    getAll:()=>api.get("/interviews"),
    getById:(id:number)=>api.get(`/interviews/${id}`),
    update:(id:number,data:UpdateInterviewRequest)=>api.patch(`interviews/${id}`,data),
    delete:(id:number)=>api.delete(`/interviews/${id}`),
    generateQuestions:(id:number)=>api.post(`/interviews/${id}/generate-questions`),
    getQuestions:(id:number)=>api.get(`/interviews/${id}/questions`)
}
