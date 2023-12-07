"use client";

import { type Course } from "@prisma/client";
import { useEffect, useState } from "react";
import { SearchBar } from "~/app/_components/Common/SearchBar/SearchBar";
import { CourseBox } from "~/app/_components/Course/CourseBox";
import { api } from "~/trpc/react";

export default function Courses() {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

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
    <div className="w-4/5">
      <SearchBar setFilter={setFilter} />
      <RenderCourses courses={data} loading={isLoading} />
      <div
        className="bg-white"
        onClick={() => setCurrentPage((state) => (state > 1 ? state - 1 : 1))}
      >
        Back
      </div>
      <div
        className="bg-white"
        onClick={() =>
          setCurrentPage((state) =>
            data?.length === pageSize ? state + 1 : state,
          )
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
    <div className="grid grid-cols-3">
      {courses && courses?.length > 0 ? (
        courses.map((course) => <CourseBox course={course} key={course.id} />)
      ) : loading ? (
        <h1>LOADING</h1>
      ) : (
        <h1>NO RESULTS</h1>
      )}
    </div>
  );
}
