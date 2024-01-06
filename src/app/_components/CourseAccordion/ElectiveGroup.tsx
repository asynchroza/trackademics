import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RequiredElectiveGroup } from "./RequiredElectiveGroup";
import { OptionalElectiveGroup } from "./OptionalElectiveGroup";
import type { FullElectiveGroup } from "~/types/extendedPrismaTypes";
import { EnrolledCourse } from "./types";

export const ElectiveGroup = ({
  electiveGroup,
  enrolledCourses,
}: {
  electiveGroup: FullElectiveGroup;
  enrolledCourses?: EnrolledCourse[];
}) => {
  return (
    <AccordionItem value={electiveGroup.name} key={electiveGroup.name}>
      <AccordionTrigger>{electiveGroup.name}</AccordionTrigger>
      <RequiredElectiveGroup
        electiveGroup={electiveGroup}
        enrolledCourses={enrolledCourses}
      />
      <OptionalElectiveGroup
        electiveGroup={electiveGroup}
        enrolledCourses={enrolledCourses}
      />
    </AccordionItem>
  );
};
