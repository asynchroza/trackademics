import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CourseWithTeachingProfessor } from "~/types/extendedPrismaTypes";

export const CourseBox = ({
  course,
}: {
  course: CourseWithTeachingProfessor;
}) => {
  return (
    <Card className="m-2 h-[17.5vh] w-[22.5vw]">
      <CardHeader>
        <CardTitle>
          {course.codeName}: {course.name}
        </CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Taught by: {course.taughtBy.name}</p>
      </CardContent>
    </Card>
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
