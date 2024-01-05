"use client";

import { type Course } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PaginationNavigation } from "~/app/_components/Common/Pagination/Pagination";
import { SearchBar } from "~/app/_components/Common/SearchBar/SearchBar";
import {
  CourseBox,
  CourseBoxSkeleton,
} from "~/app/_components/Course/CourseBox";
import { NAVIGATION_PATHS } from "~/app/_constants/navigation";
import { api } from "~/trpc/react";

const getCorrectPageNumber = (queryParam: string | null) => {
  return Number(queryParam) > 0 ? Number(queryParam) : 1;
};

type Filter = {
  current: string;
  previous: string | null;
};

const skeletonArray = Array.from({ length: 9 }, (_, index) => (
  <CourseBoxSkeleton key={index} />
));

export default function Courses() {
  const router = useRouter();
  const params = useSearchParams();

  const [filter, setFilter] = useState<Filter>({
    current: params.get("filter") ?? "",
    previous: null,
  });
  const [cachedMaxNumberPages, setCachedMaxNumberPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    getCorrectPageNumber(params.get("page")),
  );
  const [loading, setLoading] = useState(false);
  const pageSize = 9;

  const { data, isLoading: isRequestLoading } =
    api.course.getFilteredCourses.useQuery({
      filter: filter.current,
      page: currentPage,
      pageSize,
    });

  const wrappedSetFilter = (current: string) => {
    setFilter((prev) => ({ current, previous: prev.current }));
  };

  useEffect(() => {
    // To prevent the initial page from being set to 1 upon loading,
    // we verify if the filter has been saved previously.
    // This enables users to share links and load identical results in various tabs.
    if (filter.previous) setCurrentPage(1);
  }, [filter]);

  useEffect(() => {
    // We need to keep the cached result of data.totalNumberOfPages in order
    // to avoid redundant rerendering of the pagination component.
    if (typeof data?.totalNumberOfPages === "number") {
      setCachedMaxNumberPages(data.totalNumberOfPages);
    }
  }, [data]);

  useEffect(() => {
    router.push(
      `${NAVIGATION_PATHS.DASHBOARD_COURSES}?filter=${filter?.current}&page=${currentPage}`,
    );
  }, [filter, currentPage, router]);

  return (
    <div className="w-4/5">
      <SearchBar
        setFilter={wrappedSetFilter}
        setLoading={setLoading}
        defaultValue={filter.current}
      />
      <RenderCourses
        courses={data?.currentPageCourses}
        loading={loading || isRequestLoading}
      />
      <PaginationNavigation
        maxNumberOfPages={cachedMaxNumberPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
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
        skeletonArray
      ) : courses && courses?.length > 0 ? (
        courses.map((course) => <CourseBox course={course} key={course.id} />)
      ) : (
        <p>No courses were found</p>
      )}
    </div>
  );
}
