import { InterviewCategoryProps } from "@/types";
import { Badge } from "./ui/badge";

const DisplayCategoryBadges = ({ categories }: InterviewCategoryProps) => {
  console.log(categories);

  return (
    <div className="flex flex-column flex-wrap gap-1">
      {categories.map(({ id, title }) => (
        <Badge className="mt-2" key={id}>{title}</Badge>
      ))}
    </div>
  );
};

export default DisplayCategoryBadges;
