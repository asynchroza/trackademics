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

export type UserCourses = Prisma.UserGetPayload<{
  select: {
    enrolledCourses: {
      select: {
        course: true;
        current: true;
      };
    };
    taughtCourses: true;
  };
}>;

export type RequiredElectiveGroup = Prisma.ElectiveGroupGetPayload<{
  select: {
    required: true;
    name: true;
    requiredCredits: true;
    requiredCourses: {
      select: {
        codeName: true;
        course: true;
      };
    };
  };
}>;

export type OptionalElectiveGroup = Prisma.ElectiveGroupGetPayload<{
  select: {
    required: true;
    name: true;
    requiredCredits: true;
    electiveCourses: {
      select: {
        codeName: true;
        course: true;
      };
    };
  };
}> & { ruledOutElectiveCourses: Course[] | undefined };

export type FullElectiveGroup = RequiredElectiveGroup & OptionalElectiveGroup;
