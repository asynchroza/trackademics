import { courseRouter } from "~/server/api/routers/courses";
import { createTRPCRouter } from "~/server/api/trpc";
import { organizationRouter } from "./routers/organizations";

export const appRouter = createTRPCRouter({
  course: courseRouter,
  organization: organizationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
