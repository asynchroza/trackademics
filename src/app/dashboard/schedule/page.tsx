import { api } from "~/trpc/server";

export default async function Courses() {
  const response = await api.course.getUserCourses.query();
  if (!response?.enrolledCourses)
    return <h1>User is not signed up for classes</h1>;

  const enrolledCourses = response.enrolledCourses;

  return (
    <div className="w-4/5">
      {enrolledCourses.map(({ course }) => (
        <h1 key={course.name}>
          {course.codeName}: {course.name}
        </h1>
      ))}
    </div>
  );
}
