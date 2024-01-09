import { cn } from "@/lib/utils";
import { ProgramButton } from "./ProgramButton";

export const ProgramMenu = ({
  className,
  programNames,
}: {
  className?: string;
  programNames?: string[];
}) => {
  return (
    <div className={cn(className, "w-[10vw] bg-slate-400")}>
      {programNames?.map((programName) => (
        <ProgramButton key={programName} programName={programName} />
      ))}
    </div>
  );
};
