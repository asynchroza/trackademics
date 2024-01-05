"use client";

import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import type { Dispatch, SetStateAction } from "react";

export const PaginationNavigation = ({
  currentPage,
  maxNumberOfPages,
  setCurrentPage,
}: {
  currentPage: number;
  maxNumberOfPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) => {
  const generatePaginationLinks = () => {
    const links = [];
    const totalPages = Math.min(currentPage + 2, maxNumberOfPages);

    for (let i = Math.max(1, currentPage - 1); i <= totalPages; i++) {
      links.push(
        <PaginationLink
          key={i}
          isActive={i === currentPage}
          onClick={() => {
            setCurrentPage(i);
          }}
        >
          {i}
        </PaginationLink>,
      );
    }

    // TODO: Come back to this once there're more seeded courses
    // if (totalPages < maxNumberOfPages) {
    //   links.push(
    //     <PaginationItem key="ellipsis">
    //       <PaginationEllipsis />
    //     </PaginationItem>,
    //   );

    //   links.push(
    //     <PaginationItem key={maxNumberOfPages}>
    //       <PaginationLink onClick={}>{maxNumberOfPages}</PaginationLink>
    //     </PaginationItem>,
    //   );
    // }

    return links;
  };

  if (maxNumberOfPages === -1)
    return <Skeleton className="mx-auto my-[1vh] h-[3vh] w-[25vw]" />;

  // TODO: Dim previous and next buttons if they are not supposed to be pressed
  return (
    <Pagination className="h-[5vh]">
      <PaginationContent>
        <PaginationPrevious
          onClick={() => {
            if (currentPage !== 1) {
              setCurrentPage((state) => state - 1);
            }
          }}
        />

        {generatePaginationLinks()}

        <PaginationNext
          onClick={() => {
            if (currentPage !== maxNumberOfPages) {
              setCurrentPage((state) => state + 1);
            }
          }}
        />
      </PaginationContent>
    </Pagination>
  );
};
