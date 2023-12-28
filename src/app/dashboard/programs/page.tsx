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
      <h1>{program.name}</h1>
      <div>
        {program.foundationalCourses.courses.map((course) => (
          <div key={course.id}>{course.codeName}</div>
        ))}
      </div>
      <div>
        {program.electiveGroups.map((eg) => {
          return (
            <div key={eg.name}>
              <h1>{eg.name}</h1>
              <div>
                {eg.requiredCourses.map((course) => (
                  <div key={course.id}>{course.codeName}</div>
                ))}
              </div>
              <div>
                {eg.electiveCourses.map((course) => (
                  <div key={course.id}>{course.codeName}</div>
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
    <div>
      {programs.map((program) => (
        <ProgramContainer key={program.name} program={program} />
      ))}
    </div>
  );
}
