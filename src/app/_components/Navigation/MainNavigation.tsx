"use client";
import { cn } from "@/lib/utils";
import { NAVIGATION_PATHS } from "~/app/_constants/navigation";
import NavLink from "./NavLink";
import { usePathname, useRouter } from "next/navigation";

// TODO: Professors, Admins and Students have to have different views

export function MainNavigation({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const path = usePathname();
  const router = useRouter();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <NavLink
        href={NAVIGATION_PATHS.DASHBOARD_HOME}
        path={path}
        router={router}
      >
        Home
      </NavLink>
      <NavLink
        href={NAVIGATION_PATHS.DASHBOARD_SCHEDULE}
        path={path}
        router={router}
      >
        Schedule
      </NavLink>
      <NavLink
        href={NAVIGATION_PATHS.DASHBOARD_COURSES}
        path={path}
        router={router}
      >
        Courses
      </NavLink>
      <NavLink
        href={NAVIGATION_PATHS.NOT_YET_IMPLEMENTED}
        path={path}
        router={router}
      >
        Degree Audit
      </NavLink>
    </nav>
  );
}
