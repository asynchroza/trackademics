// https://github.com/prisma/prisma/discussions/10928

import type { Course, Prisma } from "@prisma/client";

type ExtendedProgram = Prisma.ProgramGetPayload<{
  include: {
    foundationalCourses: {
      select: {
        courses: true;
      };
    };
    electiveGroups: {
      select: {
        required: true;
        requiredCourses: {
          select: {
            codeName: true;
            course: true;
          };
        };
        requiredCredits: true;
        electiveCourses: {
          select: {
            codeName: true;
            course: true;
          };
        };
        rules: true;
        name: true;
      };
    };
  };
}>;

export interface FetchedRulesProgram extends ExtendedProgram {
  electiveGroups: Array<
    ExtendedProgram["electiveGroups"][number] & {
      ruledOutElectiveCourses: Course[] | undefined;
    }
  >;
}

export type CourseWithTeachingProfessor = Prisma.CourseGetPayload<{
  include: {
    taughtBy: true;
  };
}>;
