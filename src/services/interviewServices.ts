import { axiosInstance } from "@/lib/axiosInstance";
import { CreateFeedbackParams, Interview, InterviewSession, PaginatedResponse } from "@/types";

// Function to get API methods
export function useInterviewsApi() {
  return {
    getScheduledInterviews: (): Promise<PaginatedResponse<Interview>> =>
      axiosInstance
        .get("/get-scheduled-interviews")
        .then((res) => res.data?.data),

    getInterviewSessionsByUser: (
      id: number
    ): Promise<PaginatedResponse<InterviewSession>> =>
      axiosInstance
        .get(`/get-interview-sessions-by-user/${id}`)
        .then((res) => res.data?.data),

    getInterviewSessionByUUID: (uuid: string): Promise<InterviewSession> =>
      axiosInstance
        .get(`/get-interview-session-by-uuid/${uuid}`)
        .then((res) => res.data?.data),

    getFeedbackByInterviewSessionUUID: (uuid: string) => 
      axiosInstance.get(`/interview/session/${uuid}/feedback`)
      .then(res => res.data?.data),

    startInterviewSession: (uuid: string) =>
      axiosInstance
        .post(`/interview/${uuid}/session/start`)
        .then((res) => res.data?.data),

    stopInterviewSession: (uuid: string, data: object) =>
      axiosInstance
        .put(`/interview/session/${uuid}/end`, data)
        .then((res) => res.data),

    createFeedback: (data: CreateFeedbackParams) =>
      axiosInstance.post(`/feedback/store`, data).then((res) => res.data?.data),
  };
}
