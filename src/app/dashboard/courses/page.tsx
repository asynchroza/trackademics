"use client";

import { type Course } from "@prisma/client";
import { useEffect, useState } from "react";
import { SearchBar } from "~/app/_components/Common/SearchBar/SearchBar";
import { api } from "~/trpc/react";

export default function Courses() {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const { data, isLoading } = api.course.getFilteredCourses.useQuery({
    filter,
    page: currentPage,
    pageSize,
  });

  useEffect(() => {
    // make sure to start from the first page
    // of fetched courses when a new filter is applied
    setCurrentPage(1);
  }, [filter]);

  return (
    <div className="h-[60vh] w-[30vw]">
      <SearchBar setFilter={setFilter} />
      <RenderCourses courses={data} loading={isLoading} />
      <div
        className="bg-white"
        onClick={() =>
          setCurrentPage((state) => (state > 1 ? state - 1 : state))
        }
      >
        Back
      </div>
      <div
        className="bg-white"
        onClick={() =>
          setCurrentPage((state) => (data?.length === 5 ? state + 1 : state))
        }
      >
        Next
      </div>
    </div>
  );
}

function RenderCourses({
  loading,
  courses,
}: {
  loading: boolean;
  courses?: Course[];
}) {
  return (
    <div className="w-full max-w-xs">
      {courses && courses?.length > 0 ? (
        courses.map((course) => (
          <div className="m-2" key={course.id}>
            <p>name: {course.name}</p>
            <p>description: {course.description}</p>
          </div>
        ))
      ) : loading ? (
        <h1>LOADING</h1>
      ) : (
        <h1>NO RESULTS</h1>
      )}
    </div>
  );
}
