import { cn } from "@/lib/utils";
import { ProgramButton } from "./ProgramButton";

export const ProgramMenu = ({ className }: { className?: string }) => {
  return (
    <div className={cn(className, "")}>
      <ProgramButton />
      <ProgramButton />
    </div>
  );
};
