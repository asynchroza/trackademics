import {
  type Course,
  PrismaClient,
  type User,
  type UserRole,
} from "@prisma/client";
import organizations from "./seedingData/organizations.json";
const prisma = new PrismaClient();

const getRandomIndex = <T>(arr: T[]) => {
  if (arr.length === 0) {
    throw new Error("No items in array. Can't fetch random array");
  }

  return arr[Math.floor(Math.random() * arr.length)];
};

const generateRandomList = <T>(n: number, arr: T[]): T[] => {
  if (n <= 0) {
    throw new Error("List size must be greater than 0");
  }

  const uniqueValues = new Set<T>();
  const result: T[] = [];

  while (result.length < n) {
    const value = getRandomIndex<T>(arr);

    if (!value) throw new Error("Cannot generate random list");
    if (!uniqueValues.has(value)) {
      uniqueValues.add(value);
      result.push(value);
    }
  }

  return result;
};

try {
  const promise: Promise<unknown>[] = [];
  organizations.forEach((org) => {
    promise.push(
      (async () => {
        await prisma.organization.upsert({
          where: { id: org.id },
          update: {},
          create: {
            id: org.id,
            name: org.name,
            image: org.image,
          },
        });

        const professorPromises: Promise<User>[] = [];

        org.professors.forEach((prof) =>
          professorPromises.push(
            prisma.user.upsert({
              where: { username: prof.username },
              update: {},
              create: {
                name: prof.name,
                username: prof.username,
                password: prof.password,
                role: prof.role as UserRole,
                email: prof.email,
                organization: { connect: { id: org.id } },
              },
            }),
          ),
        );

        const professors = await Promise.all(professorPromises);

        const coursePromises: Promise<Course>[] = [];
        org.courses.forEach((course) => {
          coursePromises.push(
            prisma.course.upsert({
              where: {
                codeName_organizationId: {
                  codeName: course.codeName,
                  organizationId: org.id,
                },
              },
              update: {},
              create: {
                codeName: course.codeName,
                name: course.name,
                description: course.description,
                taughtBy: {
                  connect: { id: getRandomIndex<User>(professors)!.id },
                },
                organization: {
                  connect: { id: org.id },
                },
              },
            }),
          );
        });

        const courses = await Promise.all(coursePromises);

        const studentPromises: Promise<User>[] = [];

        org.students.forEach((student) => {
          const randomCourses = generateRandomList<Course>(5, courses);

          studentPromises.push(
            prisma.user.upsert({
              where: { username: student.username },
              update: {},
              create: {
                name: student.name,
                username: student.username,
                password: student.password,
                email: student.email,
                role: student.role as UserRole,
                organization: { connect: { id: org.id } },
                enrolledCourses: {
                  connectOrCreate: randomCourses.map((course) => ({
                    where: { id: course.id },
                    create: {
                      course: {
                        connect: { id: course.id },
                      },
                    },
                  })),
                },
              },
            }),
          );
        });

        await Promise.all(studentPromises);
      })(),
    );
  });

  await Promise.all(promise);
} catch (error) {
  console.error(error);
  await prisma.$disconnect().catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
}
