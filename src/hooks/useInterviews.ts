import { queryClient } from "@/lib/queryClient";
import { useInterviewsApi } from "@/services/interviewServices";
import { useAuthStore } from "@/stores/authStore";
import { CreateFeedbackParams } from "@/types";
import { useQuery, useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Fetch All Scheduled Interviews
export function useInterviews() {
  const { getScheduledInterviews } = useInterviewsApi();
  return useQuery({
    queryKey: ["interviews"],
    queryFn: getScheduledInterviews,
  });
}

export function useInterviewSessions(id: number) {
  const { getInterviewSessionsByUser } = useInterviewsApi();
  return useQuery({
    queryKey: ["interview-sessions", id],
    queryFn: () => getInterviewSessionsByUser(id),
    enabled: !!id,
  });
}

export function useInterviewSessionByUUID(uuid: string) {
  const { getInterviewSessionByUUID } = useInterviewsApi();
  return useSuspenseQuery({
    queryKey: ["interview-session", uuid],
    queryFn: () => getInterviewSessionByUUID(uuid),
  });
}

export function useFeedbackByInterviewSessionUUID(uuid: string) {
  const { getFeedbackByInterviewSessionUUID } = useInterviewsApi();
  return useSuspenseQuery({
    queryKey: ["feedback", uuid],
    queryFn: () => getFeedbackByInterviewSessionUUID(uuid),
  });
}

//Start a session
export function useStartInterviewSession() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { startInterviewSession } = useInterviewsApi();

  return useMutation({
    mutationFn: ({ uuid }: { uuid: string }) => startInterviewSession(uuid),
    onSuccess: (data) => {
      navigate(`/interview/session/${data.session.uuid}`, {
        state: { session: data.session, interview: data.interview },
      });

      queryClient.invalidateQueries({
        queryKey: ["interview-sessions", user?.id],
      });
    },
    onError: (error) => {
      console.error("Error starting session:", error);
      toast.error("Interview session start failed!");
    },
  });
}

// End a session
export function useStopInterviewSession() {
  const { user } = useAuthStore();
  const { stopInterviewSession } = useInterviewsApi();

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: object }) =>
      stopInterviewSession(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["interview-sessions", user?.id],
      });
    },
    onError: (error) => {
      console.error("Error stopping session:", error);
    },
  });
}

export function useCreateFeedback() {
  const naviagate = useNavigate();
  const { createFeedback } = useInterviewsApi();

  return useMutation({
    mutationFn: (data: CreateFeedbackParams) => createFeedback(data),
    onSuccess: (data) => {
      naviagate(`/interview/session/${data.interviewSession.uuid}/feedback`);
    },
    onError: (error) => {
      console.error("Error creating session:", error);
      toast.error("Feedback generation failed!");
    },
  });
}
