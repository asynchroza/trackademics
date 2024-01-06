import type { Course } from "@prisma/client";
import type { EnrolledCourse } from "./types";
import { useCallback } from "react";
import { checkCourseStatus } from "./utils";

export const useCountCredits = (
  courses: Course[],
  enrolledCourses?: EnrolledCourse[],
) => {
  return useCallback(() => {
    const filteredCourses = courses.filter((course) =>
      checkCourseStatus(course.codeName, enrolledCourses),
    );
    let totalCredits = 0;

    filteredCourses.forEach((course) => {
      totalCredits += course.credits;
    });

    return totalCredits;
  }, [courses, enrolledCourses]);
};
