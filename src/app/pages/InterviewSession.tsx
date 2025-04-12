import Agent from "@/components/Agent";
import { useInterviewSessionByUUID } from "@/hooks/useInterviews";
import { getRandomInterviewCover } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { User } from "@/types";

const InterviewSession = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { uuid: interviewSessionId } = useParams<{ uuid: string }>();
  const { data: interviewSession, isLoading } = useInterviewSessionByUUID(
    interviewSessionId!
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!interviewSession) {
    navigate("/");
    return null;
  }

  console.log(interviewSession);

  return (
    <MainLayout>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <img
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">
              {interviewSession?.interview?.title} Interview
            </h3>
          </div>

          {/* <DisplayCategoryBadges categories={interviewSession?.interview?.categories} /> */}
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">UK</p>
      </div>

      <Agent
        userName={(user as User).name}
        userId={(user as User).id}
        interviewSessionId={interviewSession.uuid}
        type="interview"
        questions={interviewSession.questions}
      />
    </MainLayout>
  );
};

export default InterviewSession;
