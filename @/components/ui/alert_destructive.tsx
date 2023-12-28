import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export function AlertDestructive({ className }: { className: string }) {
  return (
    <div className={cn(className)}>
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your credentials are incorrect. Please, try again!
        </AlertDescription>
      </Alert>
    </div>
  );
}
