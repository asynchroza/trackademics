"use client"

import { type Course } from "@prisma/client";
import { useState } from "react";
import { SearchBar } from "~/app/_components/Common/SearchBar/SearchBar";
import { api } from "~/trpc/react";

export default function Courses() {
  const {data} = api.course.getLatest.useQuery();
  const [filter, setFilter] = useState("");

  return (
    <div>
      <SearchBar setFilter={setFilter} />
      <RenderCourses courses={data?.filter((course) => course.name.includes(filter) || course.description.includes(filter) || course.id.includes(filter))}/>
    </div>
  );
}

function RenderCourses({courses}: {courses?: Course[]}) {
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
