import { InterviewCategoryProps } from "@/types";
import { Badge } from "./ui/badge";

const DisplayCategoryBadges = ({ categories }: InterviewCategoryProps) => {
  console.log(categories);

  return (
    <div className="flex flex-column gap-1">
      {categories.map(({ id, title }) => (
        <Badge key={id}>{title}</Badge>
      ))}
    </div>
  );
};

export default DisplayCategoryBadges;
