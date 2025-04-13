import { useInterviews, useInterviewSessions } from "@/hooks/useInterviews";
import { useAuthStore } from "@/stores/authStore";
import { User } from "@/types";
import MainLayout from "../layouts/MainLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import InterviewCard from "@/components/InterviewCard";
import { Skeleton } from "@/components/ui/skeleton";
import InterviewSessionCard from "@/components/InterviewSessionCard";

const Home = () => {
  const { user } = useAuthStore();

  const {
    data: interviewResponse,
    error: interviewsError,
    isLoading: interviewsLoading,
  } = useInterviews();

  const {
    data: interviewSessionResponse,
    error: interviewSessionsError,
    isLoading: interviewSessionsLoading,
  } = useInterviewSessions((user as User).id);

  const interviews = interviewResponse?.data ?? [];
  const interviewSessions = interviewSessionResponse?.data ?? [];

  const hasInterviewSessions = interviewSessions.length > 0;
  const hasScheduledInterviews = interviews.length > 0;

  if (interviewsError || interviewSessionsError) {
    return (
      <MainLayout>
        <Alert variant="destructive" className="mx-auto max-w-4xl">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error loading data</AlertTitle>
          <AlertDescription>
            {interviewsError?.message || interviewSessionsError?.message}
          </AlertDescription>
        </Alert>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>
        </div>

        <img
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {interviewsLoading ? (
            Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
              ))
          ) : hasScheduledInterviews ? (
            interviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={(user as User).id}
                title={interview.title}
                totalQuestions={interview.totalQuestions}
                interviewId={interview.uuid}
                description={interview.description}
                categories={interview.categories}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <Alert>
              <AlertDescription>
                There are currently no interviews available.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interview Sessions With Feedback</h2>

        <div className="interviews-section">
          {interviewSessionsLoading ? (
            Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-[200px] w-[360px] max-sm:w-full rounded-xl"
                />
              ))
          ) : hasInterviewSessions ? (
            interviewSessions?.map(
              ({ interview: { categories, title }, feedback, ...session }) => (
                <InterviewSessionCard
                  key={session.id}
                  title={title}
                  feedback={feedback}
                  interviewSessionId={session.uuid}
                  categories={categories}
                  completedAt={session.completedAt}
                />
              )
            )
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
