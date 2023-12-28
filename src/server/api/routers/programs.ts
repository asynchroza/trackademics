import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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
    .query(({ ctx, input }) => {
      const { name } = input;
      return ctx.db.program.findUnique({
        where: {
          name_organizationId: {
            name,
            organizationId: ctx.session.user.organizationId,
          },
        },
        select: {
          requiredCredits: true,
          foundationalCourses: true,
          electiveGroups: {
            select: {
              requiredCredits: true,
              electiveCourses: true,
              requiredCourses: true,
              rules: true,
            },
          },
        },
      });
    }),
});
