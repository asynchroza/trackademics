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
          electiveGroups: true,
        },
      });
    }),
});
