import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const courseRouter = createTRPCRouter({
  getFilteredCourses: protectedProcedure.input(z.object({ filter: z.string() })).query(({ ctx, input }) => {
    const { filter } = input;
    return ctx.db.course.findMany({
      where: {
        OR: [
          { name: { contains: filter } },
          { description: { contains: filter } },
          { id: { contains: filter } }
        ]
      }
    })
  })
});
