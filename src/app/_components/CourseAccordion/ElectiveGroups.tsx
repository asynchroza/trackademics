import type { FetchedRulesProgram } from "~/types/extendedPrismaTypes";
import type { EnrolledCourse } from "./types";
import { ElectiveGroup } from "./ElectiveGroup";

export const ElectiveGroups = ({
  program,
  enrolledCourses,
}: {
  program: FetchedRulesProgram;
  enrolledCourses?: EnrolledCourse[];
}) => {
  const components = program.electiveGroups.map((electiveGroup) => (
    <ElectiveGroup
      electiveGroup={electiveGroup}
      enrolledCourses={enrolledCourses}
      key={electiveGroup.name}
    />
  ));

  return components;
};
