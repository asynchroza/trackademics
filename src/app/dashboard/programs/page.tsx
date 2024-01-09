import type { PageProps } from ".next/types/app/page";
import { Fragment } from "react";
import { CourseAccordion } from "~/app/_components/CourseAccordion/CourseAccordion";
import { ProgramMenu } from "~/app/_components/ProgramMenu/ProgramMenu";
import { api } from "~/trpc/server";

interface SearchPageProps extends PageProps {
  searchParams: Pick<PageProps, "searchParams"> & { program?: string };
}

export default async function RenderProgram(props: SearchPageProps) {
  const programNames = await api.program.getProgramNames.query();
  const program = await api.program.getProgram.query({
    name: props.searchParams.program ?? "",
  });

  const userCourses = await api.course.getUserCourses.query();

  return (
    <Fragment>
      <ProgramMenu
        className="absolute start-0 min-h-[91.5vh]"
        programNames={programNames}
      />
      <div className="flex flex-row justify-center">
        {program ? (
          <CourseAccordion program={program} userCourses={userCourses} />
        ) : null}
      </div>
    </Fragment>
  );
}
