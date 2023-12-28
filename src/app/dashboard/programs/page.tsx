import { api } from "~/trpc/server";

export default function Programs() {
  return <RenderProgram />;
}

function ProgramContainer({
  program,
}: {
  program: Awaited<ReturnType<typeof api.program.getPrograms.query>>[0];
}) {
  return (
    <div className="flex flex-col">
      <h1 className="p-2">
        {program.name} --- Total required credits: {program.requiredCredits}
      </h1>
      <h2 className="p-2">Foundational courses:</h2>
      <div>
        {program.foundationalCourses.courses.map((course) => (
          <div key={course.id} className="flex flex-row">
            <h3>
              {course.codeName}: {course.name}
            </h3>
          </div>
        ))}
      </div>
      <div>
        {program.electiveGroups.map((eg) => {
          return (
            <div key={eg.name}>
              <h1 className="p-2">
                {eg.name} --- Required credits: {eg.requiredCredits}
              </h1>
              <div>
                {eg.requiredCourses.map((course) => (
                  <div key={course.course.id} className="flex flex-row">
                    <h3>
                      {course.course.codeName}: {course.course.name}
                    </h3>
                  </div>
                ))}
              </div>
              <div>
                {eg.electiveCourses.map((course) => (
                  <div key={course.course.id} className="flex flex-row">
                    <h3>
                      {course.course.codeName}: {course.course.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

async function RenderProgram() {
  const programs = await api.program.getPrograms.query();

  return (
    <div className="flex flex-row">
      {programs.map((program) => (
        <ProgramContainer key={program.name} program={program} />
      ))}
    </div>
  );
}
