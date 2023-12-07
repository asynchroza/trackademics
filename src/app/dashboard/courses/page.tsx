"use client";

import { type Course } from "@prisma/client";
import { useState } from "react";
import { SearchBar } from "~/app/_components/Common/SearchBar/SearchBar";
import { api } from "~/trpc/react";

export default function Courses() {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = api.course.getFilteredCourses.useQuery({
    filter,
    page: currentPage,
    pageSize: 5,
  });

  return (
    <div className="h-[60vh] w-[30vw]">
      <SearchBar setFilter={setFilter} />
      <RenderCourses courses={data} />
      <div
        className="bg-white"
        onClick={() => setCurrentPage((state) => state - 1)}
      >
        Back
      </div>
      <div
        className="bg-white"
        onClick={() => setCurrentPage((state) => state + 1)}
      >
        Next
      </div>
    </div>
  );
}

function RenderCourses({ courses }: { courses?: Course[] }) {
  return (
    <div className="w-full max-w-xs">
      {courses ? (
        courses.map((course) => (
          <div className="m-2" key={course.id}>
            <p>name: {course.name}</p>
            <p>description: {course.description}</p>
          </div>
        ))
      ) : (
        <h1>LOADING</h1>
      )}
    </div>
  );
}
