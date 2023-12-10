import {
  type Course,
  type PrismaClient,
  type User,
  type UserRole,
} from "@prisma/client";
import type organization from "./seedingData/aubg/organization.json";
import { generateRandomList, getRandomIndex } from "./seedingUtils";

export const seedOrganization = async (
  prisma: PrismaClient,
  org: typeof organization,
) => {
  try {
    // SEED ORGANIZATION
    const organization = await prisma.organization.upsert({
      where: {
        id: org.id,
      },
      update: {},
      create: {
        image: org.image,
        name: org.name,
        id: org.id,
      },
    });

    // SEED PROFESSORS
    const professorPromises: Promise<User>[] = [];
    org.professors.forEach((prof) => {
      professorPromises.push(
        prisma.user.upsert({
          where: {
            email: prof.email,
          },
          update: {},
          create: {
            organization: {
              connect: {
                id: organization.id,
              },
            },
            name: prof.name,
            email: prof.email,
            password: prof.password,
            username: prof.username,
            role: prof.role as UserRole,
          },
        }),
      );
    });

    const professors = await Promise.all(professorPromises);
    console.log({ professors });

    // SEED COURSES
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
            credits: 3, // TODO: 3 is default, get actual value from JSON
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
    console.log({ courses });

    // SEED STUDENTS
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

    const students = await Promise.all(studentPromises);
    console.log({ students });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect().catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  }
};
