import { Suspense } from "react";
import { api } from "~/trpc/server";

export default function Courses() {
  return (
    <Suspense fallback={<h1>LOADING</h1>}>
      <RenderCourses />
    </Suspense>
  );
}

async function RenderCourses() {
  const courses = await api.course.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {courses
        ? courses.map((course) => (
            <div key={course.id}>
              <p>{course.name}</p>
              <p>{course.description}</p>
            </div>
          ))
        : null}
    </div>
  );
}
