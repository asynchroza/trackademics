import { AccordionContent } from "@/components/ui/accordion";
import { CourseTable } from "./CourseTable";
import { checkCourseStatus } from "./utils";
import type { RequiredElectiveGroup as RequiredElectiveGroupType } from "~/types/extendedPrismaTypes";
import type { EnrolledCourse } from "./types";

export const RequiredElectiveGroup = ({
  electiveGroup,
  enrolledCourses,
}: {
  electiveGroup: RequiredElectiveGroupType;
  enrolledCourses?: EnrolledCourse[];
}) => {
  return (
    <AccordionContent>
      {electiveGroup.requiredCourses.length != 0 ? (
        <p className="text-slate-600">
          To fulfill the requirements of this elective group, the courses below
          are mandatory:
        </p>
      ) : null}
      <CourseTable
        data={electiveGroup.requiredCourses.map((course) => ({
          ...course.course,
          status: checkCourseStatus(course.codeName, enrolledCourses),
        }))}
      />
    </AccordionContent>
  );
};
