"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import type {
  FetchedRulesProgram,
  UserCourses,
} from "~/types/extendedPrismaTypes";
import { CourseTable } from "./CourseTable";
import { FoundationalCourses } from "./FoundationalCourses";
import { checkCourseStatus } from "./utils";

// enum CourseStatus {
//   CURRENT,
//   TAKEN,
//   NOT_TAKEN
// }

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
      {program.electiveGroups.map((electiveGroup) => (
        <AccordionItem value={electiveGroup.name} key={electiveGroup.name}>
          <AccordionTrigger>{electiveGroup.name}</AccordionTrigger>
          <AccordionContent>
            <p className="text-slate-600">
              {electiveGroup.required ? "Required" : "Allowed"} total credits
              from this elective group: {electiveGroup.requiredCredits}
            </p>
            {electiveGroup.requiredCourses.length != 0 ? (
              <p className="text-slate-600">
                To fulfill the requirements of this elective group, the courses
                below are mandatory:
              </p>
            ) : null}
            <CourseTable
              data={electiveGroup.requiredCourses.map((course) => ({
                ...course.course,
                status: checkCourseStatus(course.codeName, enrolledCourses),
              }))}
            />
          </AccordionContent>

          <AccordionContent>
            <p className="text-slate-600">
              The courses below are elective, affording you the flexibility to
              choose those that align with the group&#39;s requirements based on
              your preferences:
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
                      status: checkCourseStatus(
                        course.codeName,
                        enrolledCourses,
                      ),
                    }))
                  : []),
              ]}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
