import { Input } from "@/components/ui/input"
import { type Dispatch, type SetStateAction } from "react"

export function SearchBar({setFilter}: {setFilter: Dispatch<SetStateAction<string>>}) {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
        onChange={(e) => {setFilter(e.target.value)}}
      />
    </div>
  )
}