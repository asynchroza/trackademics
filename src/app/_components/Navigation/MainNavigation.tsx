import Link from "next/link";

import { cn } from "@/lib/utils";
import { NAVIGATION_PATHS } from "~/app/_constants/navigation";

export function MainNavigation({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href={NAVIGATION_PATHS.DASHBOARD_HOME}
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href={NAVIGATION_PATHS.DASHBOARD_COURSES}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Courses
      </Link>
    </nav>
  );
}
