import dayjs from "dayjs";
import DisplayCategoryBadges from "./DisplayCategoryBadges";
import { Button } from "./ui/button";
import { InterviewSessionCardProps } from "@/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const InterviewSessionCard = ({
  interviewSessionId,
  title,
  feedback,
  categories,
  completedAt,
}: InterviewSessionCardProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formattedDate = dayjs(completedAt || Date.now()).format("MMM D, YYYY");

  const handleFeedback = () => {
    setLoading(true);
    navigate(`/interview/session/${interviewSessionId}/feedback`);
  };

  return (
    <div className="card-border max-sm:w-full w-[360px]">
      <div className="card-interview">
        <div>
          {/* Type Badge */}
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-800">
            <p className="badge-text ">UK</p>
          </div>

          {/* Cover Image */}
          <img
            src="https://th.bing.com/th/id/R.6695e86b5a4095843985e64cd9fee6e3?rik=rXwqCPGCXb9IVw&pid=ImgRaw&r=0"
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          {/* Interview Role */}
          <h3 className="mt-5 capitalize">{title} Interview</h3>

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <img src="/calendar.svg" width={22} height={22} alt="calendar" />
              <p>{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <img src="/star.svg" width={22} height={22} alt="star" />
              <p>{Math.round(feedback?.score || 0)}/100</p>
            </div>
          </div>

          {/* Feedback or Placeholder Text */}
          <article
            className="prose lg:prose-xl dark:prose-invert max-w-none mt-5"
            dangerouslySetInnerHTML={{
              __html:
                feedback?.finalAssessment.substring(0, 120) ??
                "Feedback is not available for this session.",
            }}
          />
        </div>

        <DisplayCategoryBadges categories={categories} />

        <div className="flex flex-row justify-between">
          <Button
            className="btn-primary"
            onClick={() => handleFeedback()}
            disabled={loading}
          >
            {loading && <LoaderCircle className="w-4 h-4 animate-spin" />} Check
            Feedback
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewSessionCard;
