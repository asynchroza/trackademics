"use client";

import { cn } from "@/lib/utils";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function NavLink({
  children,
  href,
  path,
  router,
}: {
  children: React.ReactNode;
  href: string;
  path: string;
  router: AppRouterInstance;
}) {
  const changeLocation = () => {
    router.push(href);
  };

  const muteForeground = () => {
    if (path.includes(href)) return "";
    return "text-muted-foreground";
  };

  return (
    <div
      className={cn(
        `cursor-pointer text-sm font-medium transition-colors hover:text-primary`,
        muteForeground(),
      )}
      onClick={changeLocation}
    >
      {children}
    </div>
  );
}
