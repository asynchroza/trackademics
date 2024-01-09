import { cn } from "@/lib/utils";
import Link from "next/link";
import { NAVIGATION_PATHS } from "~/app/_constants/navigation";

export const ProgramButton = ({
  className,
  programName,
}: {
  className?: string;
  programName: string;
}) => {
  return (
    <Link
      href={`${NAVIGATION_PATHS.DASHBOARD_PROGRAMS}?program=${programName}`}
      className={cn(className, "w-[80%]")}
    >
      {programName}
    </Link>
  );
};
