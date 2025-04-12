import { queryClient } from "@/lib/queryClient";
import { useInterviewsApi } from "@/services/interviewServices";
import { useAuthStore } from "@/stores/authStore";
import { useQuery, useMutation } from "@tanstack/react-query";
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

export function useInterviewSessionByUUID(uuid: string) {
  const { getInterviewSessionByUUID } = useInterviewsApi();
  return useQuery({
    queryKey: ["interview-session", uuid],
    queryFn: () => getInterviewSessionByUUID(uuid),
    enabled: !!uuid,
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

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: object }) => stopInterviewSession(uuid, data),
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["interview-sessions", user?.id] });

    },
    onError: (error) => {
      console.error('Error stopping session:', error);
      alert('Failed to start interview session');
    },
  });
}

