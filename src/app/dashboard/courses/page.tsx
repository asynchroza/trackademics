"use client";

import { type Course } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchBar } from "~/app/_components/Common/SearchBar/SearchBar";
import { CourseBox } from "~/app/_components/Course/CourseBox";
import LoadingSpinner from "~/app/_components/Icons/LoadingSpinner";
import { NAVIGATION_PATHS } from "~/app/_constants/navigation";
import { api } from "~/trpc/react";

const getCorrectPageNumber = (queryParam: string | null) => {
  return Number(queryParam) > 0 ? Number(queryParam) : 1;
};

export default function Courses() {
  const router = useRouter();
  const params = useSearchParams();

  const [filter, setFilter] = useState(params.get("filter") ?? "");
  const [currentPage, setCurrentPage] = useState(
    getCorrectPageNumber(params.get("page")),
  );
  const [loading, setLoading] = useState(false);
  const pageSize = 9;

  const { data, isLoading: isRequestLoading } =
    api.course.getFilteredCourses.useQuery({
      filter,
      page: currentPage,
      pageSize,
    });

  useEffect(() => {
    // make sure to start from the first page
    // of fetched courses when a new filter is applied
    setCurrentPage(1);
  }, [filter]);

  useEffect(() => {
    router.push(
      `${NAVIGATION_PATHS.DASHBOARD_COURSES}?filter=${filter}&page=${currentPage}`,
    );
  }, [filter, currentPage, router]);

  return (
    <div className="w-4/5">
      <SearchBar
        setFilter={setFilter}
        setLoading={setLoading}
        defaultValue={filter}
      />
      <RenderCourses courses={data} loading={loading || isRequestLoading} />
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
    <div className="grid h-[60vh] grid-cols-3">
      {loading ? (
        <LoadingSpinner />
      ) : courses && courses?.length > 0 ? (
        courses.map((course) => <CourseBox course={course} key={course.id} />)
      ) : (
        <p>No courses were found</p>
      )}
    </div>
  );
}
