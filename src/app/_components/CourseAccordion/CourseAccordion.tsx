"use client";

import type {
  FetchedRulesProgram,
  UserCourses,
} from "~/types/extendedPrismaTypes";
import { FoundationalCourses } from "./FoundationalCourses";
import { ElectiveGroups } from "./ElectiveGroups";
import { Accordion } from "@/components/ui/accordion";

export const CourseAccordion = ({
  program,
  userCourses,
}: {
  program: FetchedRulesProgram;
  userCourses?: UserCourses | null;
}) => {
  const enrolledCourses = userCourses?.enrolledCourses.map((course) => ({
    codeName: course.course.codeName,
    current: course.current,
  }));

  return (
    <Accordion type="single" collapsible className="w-[45vw]">
      <FoundationalCourses
        program={program}
        enrolledCourses={enrolledCourses}
      />
      <ElectiveGroups program={program} enrolledCourses={enrolledCourses} />
    </Accordion>
  );
};
