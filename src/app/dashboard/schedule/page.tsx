import { type Course } from "@prisma/client";
import { api } from "~/trpc/server";

const isUserSignedUpForCourses = (list: unknown[] | undefined) => {
  return list && list.length > 0;
};

export default async function Courses() {
  const response = await api.course.getUserCourses.query();
  let courses: Course[] | undefined = undefined;

  if (isUserSignedUpForCourses(response?.enrolledCourses)) {
    courses = response!.enrolledCourses.map(({ course }) => course);
  } else if (isUserSignedUpForCourses(response?.taughtCourses)) {
    courses = response!.taughtCourses;
  }

  if (!courses) return <h1>User is not signed up for any classes!</h1>;

  const something = await api.program.getProgram.query({
    name: "Business Administration",
  });
  console.log(something);

  return (
    <div className="w-4/5">
      {courses.map((course) => (
        <h1 key={course.name}>
          {course.codeName}: {course.name}
        </h1>
      ))}
    </div>
  );
}
