import { Fragment } from "react";
import { CourseAccordion } from "~/app/_components/CourseAccordion/CourseAccordion";
import { ProgramMenu } from "~/app/_components/ProgramMenu/ProgramMenu";
import { api } from "~/trpc/server";

export default function Programs() {
  return <RenderProgram />;
}

async function RenderProgram() {
  const program = await api.program.getProgram.query({
    name: "Business Administration",
  });

  const userCourses = await api.course.getUserCourses.query();

  return (
    <Fragment>
      <ProgramMenu className="absolute start-0 min-h-[91.5vh]" />
      <div className="flex flex-row justify-center">
        <CourseAccordion program={program} userCourses={userCourses} />
      </div>
    </Fragment>
  );
}
