import { CourseAccordion } from "~/app/_components/CourseAccordion/CourseAccordion";
import { api } from "~/trpc/server";

export default function Programs() {
  return <RenderProgram />;
}

async function RenderProgram() {
  const programs = await api.program.getPrograms.query();

  return (
    <div className="flex flex-row justify-center">
      <CourseAccordion program={programs[0]!} />
    </div>
  );
}
