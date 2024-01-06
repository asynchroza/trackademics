import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CourseTable } from "./CourseTable";
import type { FetchedRulesProgram } from "~/types/extendedPrismaTypes";
import { checkCourseStatus } from "./utils";
import type { EnrolledCourse } from "./types";
import { useCountCredits } from "./useCountCredits";

export const FoundationalCourses = ({
  program,
  enrolledCourses,
}: {
  program: FetchedRulesProgram;
  enrolledCourses?: EnrolledCourse[];
}) => {
  const countCredits = useCountCredits(
    program.foundationalCourses.courses,
    enrolledCourses,
  );

  return (
    <AccordionItem value="foundational">
      <AccordionTrigger>Foundational Courses</AccordionTrigger>
      <AccordionContent>
        <p className="text-slate-600">
          Successful completion of this specific set of prerequisite courses is
          required for graduation from this program.
        </p>
        <p className="p-2 text-end text-slate-600">
          Current credits: {countCredits()}
        </p>
      </AccordionContent>

      <AccordionContent>
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
