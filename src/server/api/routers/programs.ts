import { rules } from ".eslintrc.cjs";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const programRouter = createTRPCRouter({
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
