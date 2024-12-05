import * as React from "react";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "../ui/loading-spinner";

interface LoadingScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  portal?: boolean;
}

export function LoadingScreen({ className, ...props }: LoadingScreenProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <LoadingSpinner />
    </div>
  );
}
