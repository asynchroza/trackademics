import type { EnrolledCourse } from "./types";

export const checkCourseStatus = (
  codeName: string,
  enrolledCourses: EnrolledCourse[] | undefined,
): boolean => {
  if (!enrolledCourses) return false;
  const status =
    enrolledCourses
      .filter((enrolledCourse) => enrolledCourse.codeName === codeName)
      .at(0)?.current ?? false;
  return status;
};
