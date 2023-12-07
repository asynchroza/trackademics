import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction, ChangeEvent } from "react";

export function SearchBar({
  className = "",
  setFilter,
  setLoading,
}: {
  className?: string;
  setFilter: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  let debouncer: NodeJS.Timeout;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    clearTimeout(debouncer);

    debouncer = setTimeout(() => {
      setFilter(e.target.value);
      setLoading(false);
    }, 800);
  };

  return (
    <div className={cn("mb-4", className)}>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
        onChange={handleInputChange}
      />
    </div>
  );
}
