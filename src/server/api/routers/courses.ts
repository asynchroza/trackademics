import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const courseRouter = createTRPCRouter({
  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.course.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

});
