import { Skeleton } from "@/components/ui/skeleton";
import { type Course } from "@prisma/client";

export const CourseBox = ({ course }: { course: Course }) => {
  return (
    <div className="m-2 h-[17.5vh] w-[22.5vw] bg-white text-center">
      <h2>{course.name}</h2>
      <p>{course.description}</p>
    </div>
  );
};

export const CourseBoxSkeleton = () => {
  return (
    <div className="m-2 h-[17.5vh] w-[22.5vw]">
      <Skeleton className="mb-2 h-4 w-[22.5vw]" />
      <Skeleton className="mb-2 h-4 w-[20.5vw]" />
    </div>
  );
};
