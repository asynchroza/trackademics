import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CourseTable } from "./CourseTable";
import type { FetchedRulesProgram } from "~/types/extendedPrismaTypes";
import { checkCourseStatus } from "./utils";
import type { EnrolledCourse } from "./types";

export const FoundationalCourses = ({
  program,
  enrolledCourses,
}: {
  program: FetchedRulesProgram;
  enrolledCourses?: EnrolledCourse[];
}) => {
  return (
    <AccordionItem value="foundational">
      <AccordionTrigger>Foundational Courses</AccordionTrigger>
      <AccordionContent>
        <p className="text-slate-600">
          Successful completion of this specific set of prerequisite courses is
          required for graduation from this program.
        </p>
        <CourseTable
          data={program.foundationalCourses.courses.map((course) => ({
            ...course,
            status: checkCourseStatus(course.codeName, enrolledCourses),
          }))}
        />
      </AccordionContent>
    </AccordionItem>
  );
};
