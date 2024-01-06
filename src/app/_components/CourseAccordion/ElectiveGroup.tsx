import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RequiredElectiveGroup } from "./RequiredElectiveGroup";
import { OptionalElectiveGroup } from "./OptionalElectiveGroup";
import type { FullElectiveGroup } from "~/types/extendedPrismaTypes";
import type { EnrolledCourse } from "./types";
import { useCountCredits } from "./useCountCredits";
import { RequiredCreditsHeader } from "./RequiredCreditsHeader";

export const ElectiveGroup = ({
  electiveGroup,
  enrolledCourses,
}: {
  electiveGroup: FullElectiveGroup;
  enrolledCourses?: EnrolledCourse[];
}) => {
  const electiveCourses = electiveGroup.electiveCourses.map(
    (course) => course.course,
  );
  const requiredCourses = electiveGroup.requiredCourses.map(
    (course) => course.course,
  );
  const countCredits = useCountCredits(
    electiveCourses.concat(requiredCourses),
    enrolledCourses,
  );

  return (
    <AccordionItem value={electiveGroup.name} key={electiveGroup.name}>
      <AccordionTrigger>{electiveGroup.name}</AccordionTrigger>
      <AccordionContent>
        <RequiredCreditsHeader
          required={electiveGroup.required}
          requiredCredits={electiveGroup.requiredCredits}
          currentCredits={countCredits()}
        />
      </AccordionContent>

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
