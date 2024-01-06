import { AccordionContent } from "@/components/ui/accordion";
import { CourseTable } from "./CourseTable";
import { checkCourseStatus } from "./utils";
import type { OptionalElectiveGroup as OptionalElectiveGroupType } from "~/types/extendedPrismaTypes";
import type { EnrolledCourse } from "./types";

export const OptionalElectiveGroup = ({
  electiveGroup,
  enrolledCourses,
}: {
  electiveGroup: OptionalElectiveGroupType;
  enrolledCourses?: EnrolledCourse[];
}) => {
  return (
    <AccordionContent>
      <p className="text-slate-600">
        The courses below are elective, affording you the flexibility to choose
        those that align with the group&#39;s requirements based on your
        preferences:
      </p>
      <CourseTable
        data={[
          ...electiveGroup.electiveCourses.map((course) => ({
            ...course.course,
            status: checkCourseStatus(course.codeName, enrolledCourses),
          })),
          ...(electiveGroup.ruledOutElectiveCourses
            ? electiveGroup.ruledOutElectiveCourses.map((course) => ({
                ...course,
                status: checkCourseStatus(course.codeName, enrolledCourses),
              }))
            : []),
        ]}
      />
    </AccordionContent>
  );
};
