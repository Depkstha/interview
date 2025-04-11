import { axiosInstance } from "@/lib/axiosInstance";
import { Interview, InterviewSession, PaginatedResponse } from "@/types";

// Function to get API methods
export function useInterviewsApi() {

  return {
    getScheduledInterviews: (): Promise<PaginatedResponse<Interview>> => axiosInstance.get("/get-scheduled-interviews").then(res => res.data?.data),
    getInterviewSessionsByUser: (id: number): Promise<PaginatedResponse<InterviewSession>> => axiosInstance.get(`/get-interview-sessions-by-user/${id}`).then(res => res.data?.data),
    startInterviewSession: (id: string) => axiosInstance.get(`/interview/${id}/start`).then(res => res.data?.data),
    stopInterviewSession: (id: string, data: object) => axiosInstance.put(`/interview/${id}/end`, data).then(res => res.data),
  };
}