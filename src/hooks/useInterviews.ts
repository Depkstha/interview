import { useInterviewsApi } from "@/services/interviewServices";
import { useAuthStore } from "@/stores/authStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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

//Start a session
export function useStartInterviewSession() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { startInterviewSession } = useInterviewsApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => startInterviewSession(id),
    onSuccess: (data) => {
      navigate(`/interview/session/${data.session.uuid}`, {
        state: { session: data.session, interview: data.interview },
      });

      queryClient.invalidateQueries({ queryKey: ["interview-sessions", user?.id] }); 
      
    },
    onError: (error) => {
      console.error('Error starting session:', error);
      alert('Failed to start interview session');
    },
  });
}

// End a session
export function useStopInterviewSession() {
  const { user } = useAuthStore();
  const { stopInterviewSession } = useInterviewsApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: object }) => stopInterviewSession(id, data),
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["interview-sessions", user?.id] });

    },
    onError: (error) => {
      console.error('Error stopping session:', error);
      alert('Failed to start interview session');
    },
  });
}

