"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
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
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === currentPage}
            onClick={() => {
              setCurrentPage(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (totalPages < maxNumberOfPages) {
      links.push(
        <PaginationItem key="ellipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      );

      links.push(
        <PaginationItem key={maxNumberOfPages}>
          <PaginationLink href="#">{maxNumberOfPages}</PaginationLink>
        </PaginationItem>,
      );
    }

    return links;
  };

  // TODO: Dim previous and next buttons if they are not supposed to be pressed
  return (
    <Pagination>
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
