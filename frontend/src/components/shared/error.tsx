import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

interface TableErrorProps {
  message?: string | null;
  onRetry: () => void;
}

export function Error({ message, onRetry }: TableErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-dashed p-16 text-center animate-in fade-in-50 duration-300">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <h4 className="font-semibold text-lg tracking-tight">Oops! Something went wrong</h4>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          {message || "We encountered an error while pulling up your interview log list. Please try again."}
        </p>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onRetry} 
        className="gap-2 cursor-pointer mt-2"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Try Again
      </Button>
    </div>
  );
}