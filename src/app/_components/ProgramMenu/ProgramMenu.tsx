"use client";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { NAVIGATION_PATHS } from "~/app/_constants/navigation";

export const ProgramMenu = ({
  className,
  selectedProgramName,
  programNames,
}: {
  className?: string;
  selectedProgramName: string;
  programNames?: string[];
}) => {
  const router = useRouter();

  return (
    <div className={cn(className, "")}>
      <Select
        onValueChange={(e) =>
          router.push(`${NAVIGATION_PATHS.DASHBOARD_PROGRAMS}?program=${e}`)
        }
        value={selectedProgramName}
      >
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Select a program" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Programs</SelectLabel>
            {programNames?.map((programName) => (
              <SelectItem key={programName} value={programName}>
                {" "}
                {programName}{" "}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
