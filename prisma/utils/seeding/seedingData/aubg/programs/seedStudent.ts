import type { Course, PrismaClient } from "@prisma/client";

export const seedStudent = async (prisma: PrismaClient) => {
  const majorCourses = [
    "BUS1001",
    "BUS2001",
    "BUS3000",
    "BUS2060",
    "BUS4048",
    "BUS2020",
    "BUS3020",
  ];

  const misho = await prisma.user.upsert({
    where: {
      email: "misho@bozhilov.com",
    },
    update: {},
    create: {
      name: "Misho Bozhilov",
      email: "misho@bozhilov.com",
      username: "mbozhilov",
      password: "admin1234",
      role: "Student",
      organization: { connect: { id: "aubg" } },
    },
  });

  const coursesPromises: Promise<Course | null>[] = [];

  majorCourses.forEach((codeName) => {
    coursesPromises.push(
      prisma.course.findUnique({
        where: {
          codeName_organizationId: {
            codeName,
            organizationId: "aubg",
          },
        },
      }),
    );
  });

  const courses = await Promise.all(coursesPromises);

  await prisma.enrollment.createMany({
    data: courses.map((courses) => ({
      courseId: courses!.id,
      studentId: misho.id,
      current: Math.random() < 0.5,
    })),
  });
};
