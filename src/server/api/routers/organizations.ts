import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const organizationRouter = createTRPCRouter({
  getOrganization: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      const { id } = input;

      return ctx.db.organization.findUnique({
        where: {
          id,
        },
      });
    }),
});
