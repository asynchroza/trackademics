import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import type { FetchedRulesProgram } from "~/types/extendedPrismaTypes";

export const programRouter = createTRPCRouter({
  getPrograms: protectedProcedure.query(({ ctx }) => {
    return ctx.db.program.findMany({
      where: {
        organizationId: ctx.session.user.organizationId,
      },
      include: {
        foundationalCourses: {
          select: {
            courses: true,
          },
        },
        electiveGroups: {
          select: {
            required: true,
            requiredCourses: {
              select: {
                codeName: true,
                course: true,
              },
            },
            requiredCredits: true,
            electiveCourses: {
              select: {
                codeName: true,
                course: true,
              },
            },
            rules: true,
            name: true,
          },
        },
      },
    });
  }),
  getProgram: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { name } = input;
      const program = (await ctx.db.program.findUnique({
        where: {
          name_organizationId: {
            name,
            organizationId: ctx.session.user.organizationId,
          },
        },
        include: {
          foundationalCourses: {
            select: {
              courses: true,
            },
          },
          electiveGroups: {
            select: {
              required: true,
              requiredCourses: {
                select: {
                  codeName: true,
                  course: true,
                },
              },
              requiredCredits: true,
              electiveCourses: {
                select: {
                  codeName: true,
                  course: true,
                },
              },
              rules: true,
              name: true,
            },
          },
        },
      })) as FetchedRulesProgram;

      const ruledOutClasses: Promise<void>[] = [];

      program?.electiveGroups.forEach((eg) =>
        eg.rules.forEach((rule) => {
          ruledOutClasses.push(
            (async () => {
              const courses = await ctx.db.course.findMany({
                where: {
                  OR: rule.patterns.map((pattern) => ({
                    codeName: {
                      startsWith: pattern,
                    },
                  })),
                },
              });

              eg.ruledOutElectiveCourses = courses;
            })(),
          );
        }),
      );

      await Promise.all(ruledOutClasses);

      return program;
    }),
});
