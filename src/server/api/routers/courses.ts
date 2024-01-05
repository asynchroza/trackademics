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
    .query(async ({ ctx, input }) => {
      const { filter, page = 1, pageSize = 10 } = input;
      const skip = (page - 1) * pageSize;

      const currentPageCourses = await ctx.db.course.findMany({
        where: {
          OR: [
            {
              name: { contains: filter, mode: PRISMA_FILTER_MODES.INSENSITIVE },
            },
            { id: { contains: filter, mode: PRISMA_FILTER_MODES.INSENSITIVE } },
          ],
          AND: [
            {
              organizationId: { equals: ctx.session.user.organizationId },
            },
          ],
        },
        skip,
        take: pageSize,
      });

      const totalNumberOfPages = Math.ceil(
        (await ctx.db.course.count({
          where: {
            OR: [
              {
                name: {
                  contains: filter,
                  mode: PRISMA_FILTER_MODES.INSENSITIVE,
                },
              },
              {
                id: { contains: filter, mode: PRISMA_FILTER_MODES.INSENSITIVE },
              },
            ],
            AND: [
              {
                organizationId: { equals: ctx.session.user.organizationId },
              },
            ],
          },
        })) / pageSize,
      );

      return { currentPageCourses, totalNumberOfPages };
    }),
  getUserCourses: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        enrolledCourses: {
          select: {
            course: true,
          },
        },
        taughtCourses: true,
      },
    });
  }),
  getPatternMatchingCourses: protectedProcedure
    .input(z.object({ patterns: z.string().array() }))
    .query(({ ctx, input }) => {
      const { patterns } = input;

      return ctx.db.course.findMany({
        where: {
          OR: patterns.map((pattern) => ({
            codeName: {
              startsWith: pattern,
            },
          })),
        },
      });
    }),
});
