import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingSpinner({
  size = 30,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn("[&>*]:animate-spin", className)}>
      <AiOutlineLoading3Quarters size={size} />
    </div>
  );
}
