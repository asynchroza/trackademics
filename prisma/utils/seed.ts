import { type Course, PrismaClient, type User } from "@prisma/client";
import courses from "./seedingData/courses.json";
const prisma = new PrismaClient();

const getRandomIndex = <T>(arr: T[]) => {
  if (arr.length === 0) {
    throw new Error("No items in array. Can't fetch random array");
  }

  return arr[Math.floor(Math.random() * arr.length)];
};

try {
  const testStudent = await prisma.user.upsert({
    where: { email: "studenttest@admin.com" },
    update: {},
    create: {
      email: "studenttest@admin.com",
      name: "Tony Soprano",
      username: "tonysoprano",
      password: "admin1234",
      role: "Student",
    },
  });

  if (!testStudent) {
    throw new Error("Couldn't upsert test student");
  }

  const promisesProfessors = [
    await prisma.user.upsert({
      where: { email: "snape@admin.com" },
      update: {},
      create: {
        email: "snape@admin.com",
        name: "Snape",
        username: "profsnape",
        password: "admin1234",
        role: "Professor",
      },
    }),
    await prisma.user.upsert({
      where: { email: "bozhilov@admin.com" },
      update: {},
      create: {
        email: "bozhilov@admin.com",
        name: "Michael Bozhilov",
        username: "bozhilov14",
        password: "admin1234",
        role: "Professor",
      },
    }),
    await prisma.user.upsert({
      where: { email: "sony@admin.com" },
      update: {},
      create: {
        email: "sony@admin.com",
        name: "Sony",
        username: "sony14",
        password: "admin1234",
        role: "Professor",
      },
    }),
  ];

  const professorResult = await Promise.all(promisesProfessors);

  type SeedCourse = Pick<Course, "id" | "name" | "description">;
  const coursePromises: Promise<unknown>[] = [];

  courses.forEach((course: SeedCourse) => {
    coursePromises.push(
      prisma.course.upsert({
        where: {
          id: course.id,
        },
        update: {
          name: course.name,
          description: course.description,
        },
        create: {
          id: course.id,
          name: course.name,
          description: course.description,
          taughtBy: {
            connect: { id: getRandomIndex<User>(professorResult)!.id },
          },
        },
      }),
    );
  });

  const courseResult = await Promise.all(coursePromises);

  console.log({ professorResult, courseResult });
} catch (error) {
  console.error(error);
  await prisma.$disconnect().catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
}
