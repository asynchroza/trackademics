import { CourseAccordion } from "~/app/_components/CourseAccordion/CourseAccordion";
import { api } from "~/trpc/server";

export default function Programs() {
  return <RenderProgram />;
}

async function RenderProgram() {
  const program = await api.program.getProgram.query({
    name: "Business Administration",
  });

  return (
    <div className="flex flex-row justify-center">
      <CourseAccordion program={program} />
    </div>
  );
}
