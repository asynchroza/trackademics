import { type Course } from "@prisma/client";

export const CourseBox = ({ course }: { course: Course }) => {
  return (
    <div className="m-2 h-[17.5vh] w-[22.5vw] bg-white text-center">
      <h2>{course.name}</h2>
      <p>{course.description}</p>
    </div>
  );
};
