import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { PRISMA_FILTER_MODES } from "../utils/modes";

export const courseRouter = createTRPCRouter({
  getFilteredCourses: protectedProcedure
    .input(
      z.object({
        filter: z.string(),
        page: z.number().optional(),
        pageSize: z.number().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      const { filter, page = 1, pageSize = 10 } = input;
      const skip = (page - 1) * pageSize;

      return ctx.db.course.findMany({
        where: {
          OR: [
            {
              name: { contains: filter, mode: PRISMA_FILTER_MODES.INSENSITIVE },
            },
            { id: { contains: filter, mode: PRISMA_FILTER_MODES.INSENSITIVE } },
          ],
        },
        skip,
        take: pageSize,
      });
    }),
});
