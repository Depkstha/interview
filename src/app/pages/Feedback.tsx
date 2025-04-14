import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import {
  useFeedbackByInterviewSessionUUID,
  useInterviewSessionByUUID,
  useStartInterviewSession,
} from "@/hooks/useInterviews";
import MainLayout from "../layouts/MainLayout";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Suspense } from "react";
import { CallSession, Feedback as FeedbackType } from "@/types";
import AudioPlayer from "@/components/AudioPlayer";

const Feedback = () => {
  const { uuid: interviewSessionId } = useParams<{ uuid: string }>();

  const { data } = useFeedbackByInterviewSessionUUID(interviewSessionId!);

  const { data: interviewSession } = useInterviewSessionByUUID(
    interviewSessionId!
  );

  console.log(data);

  const callSession: CallSession = data.callSession;
  const feedback: FeedbackType = data.feedback;

  const { mutate: startSession, isPending } = useStartInterviewSession();

  const handleStartInterviewSession = (interviewId: string) => {
    startSession({ uuid: interviewId });
  };

  return (
    <MainLayout>
      <Suspense fallback={<SkeletonLoader />}>
        <section className="section-feedback">
          <div className="flex flex-row justify-center">
            <h1 className="text-4xl font-semibold">
              Feedback on the Interview -{" "}
              <span className="capitalize">
                {interviewSession?.interview?.title}
              </span>{" "}
              Interview
            </h1>
          </div>

          <div className="flex flex-row justify-center ">
            <div className="flex flex-row gap-5">
              {/* Overall Impression */}
              <div className="flex flex-row gap-2 items-center">
                <img src="/star.svg" width={22} height={22} alt="star" />
                <p>
                  Overall Impression:{" "}
                  <span className="text-primary-200 font-bold">
                    {feedback?.score}
                  </span>
                  /100
                </p>
              </div>

              {/* Date */}
              <div className="flex flex-row gap-2">
                <img
                  src="/calendar.svg"
                  width={22}
                  height={22}
                  alt="calendar"
                />
                <p>
                  {feedback?.createdAt
                    ? dayjs(feedback?.createdAt).format("MMM D, YYYY h:mm A")
                    : "-"}
                </p>
              </div>
            </div>
          </div>

          <hr />

          <p>{feedback?.finalAssessment}</p>

          <AudioPlayer />

          {/* Interview Breakdown */}
          <div className="flex flex-col gap-4">
            <h2>Breakdown of the Interview:</h2>
            {feedback?.categoryScores?.map((category, index) => (
              <div key={index}>
                <p className="font-bold">
                  {index + 1}. {category.name} ({category.score}/100)
                </p>
                <p>{category.comment}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3>Strengths</h3>
            <ul>
              {feedback?.strengths?.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3>Areas for Improvement</h3>
            <ul>
              {feedback?.areasForImprovement?.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>

          <div className="buttons">
            <Button className="btn-secondary flex-1">
              <Link to="/" className="flex w-full justify-center">
                <p className="text-sm font-semibold text-primary-200 text-center">
                  Back to dashboard
                </p>
              </Link>
            </Button>

            <Button
              onClick={() =>
                handleStartInterviewSession(interviewSession?.interview?.uuid)
              }
              disabled={isPending}
              className="btn-primary flex-1"
            >
              <p className="text-sm font-semibold text-black text-center">
                {isPending ? "Retaking..." : "Retake Interview"}
              </p>
            </Button>
          </div>
        </section>
      </Suspense>
    </MainLayout>
  );
};

export default Feedback;
