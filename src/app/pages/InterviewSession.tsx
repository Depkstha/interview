import MainLayout from "../layouts/MainLayout";
import { useParams } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { useInterviewSessionByUUID } from "@/hooks/useInterviews";
import Agent from "@/components/Agent";
import { User } from "@/types";

const InterviewSession = () => {
  const { user } = useAuthStore();

  const { uuid: interviewSessionId } = useParams<{ uuid: string }>();

  const { data: interviewSession } = useInterviewSessionByUUID(
    interviewSessionId!
  );

  return (
    <MainLayout>
        <div className="flex flex-row gap-4 justify-between">
          <div className="flex flex-row gap-4 items-center max-sm:flex-col">
            <div className="flex flex-row gap-4 items-center">
              <img
                src="https://th.bing.com/th/id/R.6695e86b5a4095843985e64cd9fee6e3?rik=rXwqCPGCXb9IVw&pid=ImgRaw&r=0"
                alt="cover-image"
                width={40}
                height={40}
                className="rounded-full object-cover size-[40px]"
              />
              <h3 className="capitalize">
                {interviewSession?.interview?.title} Interview
              </h3>
            </div>
          </div>

          <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">UK</p>
        </div>

        <Agent
          userName={(user as User).name}
          userId={(user as User).id}
          liveFeedbackEnabled={interviewSession.interview.liveFeedbackEnabled}
          interviewSessionId={interviewSession.uuid}
          questions={interviewSession.questions}
        />
    </MainLayout>
  );
};

export default InterviewSession;
