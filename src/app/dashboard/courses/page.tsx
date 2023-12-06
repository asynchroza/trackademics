"use client"

import { type Course } from "@prisma/client";
import { useState } from "react";
import { SearchBar } from "~/app/_components/Common/SearchBar/SearchBar";
import { api } from "~/trpc/react";

export default function Courses() {
  const [filter, setFilter] = useState("");
  const {data} = api.course.getFilteredCourses.useQuery({filter});

  return (
    <div>
      <SearchBar setFilter={setFilter} />
      <RenderCourses courses={data}/>
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
        : <h1>LOADING</h1>}
    </div>
  );
}
