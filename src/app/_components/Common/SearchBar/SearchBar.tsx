import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  type Dispatch,
  type SetStateAction,
  type ChangeEvent,
  useState,
} from "react";

export function SearchBar({
  className = "",
  defaultValue = "",
  setFilter,
  setLoading,
}: {
  className?: string;
  defaultValue?: string;
  setFilter: (arg: string) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const [debouncer, setDebouncer] = useState<NodeJS.Timeout>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    clearTimeout(debouncer);

    if (e.target.value.length === 0) {
      // do not debounce if input is deleted
      setFilter(e.target.value);
      setLoading(false);
      return;
    }

    setDebouncer(
      setTimeout(() => {
        setFilter(e.target.value);
        setLoading(false);
      }, 800),
    );
  };

  return (
    <div className={cn("mb-4", className)}>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
        onChange={handleInputChange}
        defaultValue={defaultValue}
      />
    </div>
  );
}
