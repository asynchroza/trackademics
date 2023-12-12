import { type PrismaClient, type ElectiveGroup } from "@prisma/client";
import type program from "./seedingData/aubg/programs/business_administration.json";

export const seedProgram = async (
  prisma: PrismaClient,
  prog: typeof program,
  org: "aubg" | "xyzuni",
) => {
  try {
    const program = await prisma.program.upsert({
      where: {
        name_organizationId: {
          name: prog.name,
          organizationId: org,
        },
      },
      update: {},
      create: {
        name: prog.name,
        requiredCredits: 120,
        Organization: {
          connect: {
            id: org,
          },
        },
      },
    });

    console.log({ program });

    const foundationalCourses = await prisma.program.update({
      where: {
        name_organizationId: {
          name: prog.name,
          organizationId: org,
        },
      },
      data: {
        foundationalCourses: {
          connect: prog.foundationalCourses.map((course) => ({
            codeName_organizationId: {
              codeName: course.codeName,
              organizationId: org,
            },
          })),
        },
      },
    });

    console.log({ foundationalCourses });

    // SEED ELECTIVE GROUPS
    const electiveGroupsPromises: Promise<ElectiveGroup>[] = [];

    prog.electiveGroups.forEach((group) => {
      electiveGroupsPromises.push(
        prisma.electiveGroup.upsert({
          where: {
            name: group.name,
          },
          update: {},
          create: {
            name: group.name,
            requiredCredits: group.requiredCredits,
            ...(group.requiredCourses
              ? {
                  requiredCourses: {
                    createMany: {
                      data: group.requiredCourses.map((course) => ({
                        codeName: course.codeName,
                        organizationId: org,
                      })),
                    },
                  },
                }
              : {}),
            ...(group.electiveCourses
              ? {
                  electiveCourses: {
                    createMany: {
                      data: group.electiveCourses.map((course) => ({
                        codeName: course.codeName,
                        organizationId: org,
                      })),
                    },
                  },
                }
              : {}),
            ...(group.electiveRules
              ? {
                  rules: {
                    createMany: {
                      data: group.electiveRules.map((rule) => ({
                        regex: rule.regex,
                        name: rule.name,
                      })),
                    },
                  },
                }
              : {}),
          },
        }),
      );
    });

    const electiveCourses = await Promise.all(electiveGroupsPromises);
    console.log({ electiveCourses });

    await prisma.program.update({
      where: {
        name_organizationId: {
          name: program.name,
          organizationId: org,
        },
      },
      data: {
        electiveGroups: {
          connect: electiveCourses.map((course) => ({ id: course.id })),
        },
      },
    });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect().catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  }
};
