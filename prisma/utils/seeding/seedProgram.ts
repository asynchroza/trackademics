// TODO: seedProgram.ts should export a function which will seed a program
// e.g seedProgram(prisma, aubgBusAdministration, "aubg")

import {
  Course,
  Program,
  type PrismaClient,
  ElectiveGroup,
} from "@prisma/client";
import type program from "./seedingData/aubg/programs/business_administration.json";
import { connect } from "http2";

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

    const electiveGroupsPromises: Promise<ElectiveGroup>[] = [];

    prog.electiveGroups.forEach((group) => {
      electiveGroupsPromises.push(
        prisma.electiveGroup.upsert({
          where: {
            name_programId: {
              name: group.name,
              programId: program.id,
            },
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
          },
        }),
      );
    });

    const electiveCourses = await Promise.all(electiveGroupsPromises);

    console.log({ electiveCourses });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect().catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  }
};
