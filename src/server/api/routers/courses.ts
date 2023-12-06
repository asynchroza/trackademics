import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const courseRouter = createTRPCRouter({
  getFilteredCourses: protectedProcedure.input(
    z.object({
      filter: z.string(),
      page: z.number().optional(),
      pageSize: z.number().optional()
    })
  ).query(({ ctx, input }) => {
    const mode = "insensitive"
    const { filter, page = 1, pageSize = 10 } = input;
    const skip = (page - 1) * pageSize;

    return ctx.db.course.findMany({
      where: {
        OR: [
          { name: { contains: filter, mode } },
          { id: { contains: filter, mode } }
        ]
      },
      skip,
      take: pageSize
    })
  })
});
