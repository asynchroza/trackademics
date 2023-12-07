import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type Dispatch, type SetStateAction } from "react";

export function SearchBar({
  className = "",
  setFilter,
}: {
  className?: string;
  setFilter: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className={cn("mb-4", className)}>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
    </div>
  );
}
