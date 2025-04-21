import dayjs from "dayjs";
import { Button } from "./ui/button";
import { InterviewCardProps } from "@/types";
import DisplayCategoryBadges from "./DisplayCategoryBadges";
import { useStartInterviewSession } from "@/hooks/useInterviews";
import { LoaderCircle } from "lucide-react";

const InterviewCard = ({
  title,
  interviewId,
  totalQuestions,
  createdAt,
  categories,
  description,
}: InterviewCardProps) => {
  const { mutate: startSession, isPending } = useStartInterviewSession();

  const handleStartInterviewSession = (interviewId: string) => {
    startSession({ uuid: interviewId });
  };

  const formattedDate = dayjs(createdAt || Date.now()).format("MMM D, YYYY");

  return (
    <div className="card-border w-full max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          {/* Country Badge */}
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-800">
            <p className="badge-text">UK</p>
          </div>

          <div className="flex flex-row gap-5 items-center">
            {/* Cover Image */}
            <div>
              <img
                src="https://th.bing.com/th/id/R.6695e86b5a4095843985e64cd9fee6e3?rik=rXwqCPGCXb9IVw&pid=ImgRaw&r=0"
                alt="cover-image"
                width={90}
                height={90}
                className="rounded-full object-fit size-[90px]"
              />
            </div>

            <div>
              {/* Interview title */}
              <h3 className="mt-5 capitalize">{title} Interview</h3>

              {/* Date & Score */}
              <div className="flex flex-row gap-5 mt-3">
                <div className="flex flex-row gap-2">
                  <img
                    src="/calendar.svg"
                    width={22}
                    height={22}
                    alt="calendar"
                  />
                  <p>{formattedDate}</p>
                </div>

                <div className="flex flex-row gap-2 items-center">
                  <img src="/question.svg" width={22} height={22} alt="star" />
                  <p>{totalQuestions}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <article
            className="prose lg:prose-xl dark:prose-invert max-w-none mt-5"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        <DisplayCategoryBadges categories={categories} />

        <div className="flex flex-row justify-between mt-0">
          <Button
            onClick={() => handleStartInterviewSession(interviewId)}
            disabled={isPending}
            className="btn-primary w-full"
          >
            {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />} 
            Start Interview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
