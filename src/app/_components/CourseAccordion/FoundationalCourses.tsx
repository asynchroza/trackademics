import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CourseTable } from "./CourseTable";
import type { FetchedRulesProgram } from "~/types/extendedPrismaTypes";
import { checkCourseStatus } from "./utils";
import type { EnrolledCourse } from "./types";
import { useCallback } from "react";

export const FoundationalCourses = ({
  program,
  enrolledCourses,
}: {
  program: FetchedRulesProgram;
  enrolledCourses?: EnrolledCourse[];
}) => {
  const countCredits = useCallback(() => {
    const filteredCourses = program.foundationalCourses.courses.filter(
      (course) => checkCourseStatus(course.codeName, enrolledCourses),
    );
    let totalCredits = 0;

    filteredCourses.forEach((course) => {
      totalCredits += course.credits;
    });

    return totalCredits;
  }, [program, enrolledCourses]);

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
