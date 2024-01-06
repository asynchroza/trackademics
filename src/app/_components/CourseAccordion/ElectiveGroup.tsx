import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RequiredElectiveGroup } from "./RequiredElectiveGroup";
import { OptionalElectiveGroup } from "./OptionalElectiveGroup";
import type { FullElectiveGroup } from "~/types/extendedPrismaTypes";
import type { EnrolledCourse } from "./types";
import { useCountCredits } from "./useCountCredits";
import { AccordionContent } from "@radix-ui/react-accordion";

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
        <p className="text-sm text-slate-600">
          {electiveGroup.required ? "Required" : "Allowed"} total credits from
          this elective group: {electiveGroup.requiredCredits}
        </p>
        <p className="p-2 text-end text-sm text-slate-600">
          Current credits: {countCredits()}
        </p>
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
