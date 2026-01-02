import { cn } from "~/lib/utils";

interface ChatConversationProps {
  className?: string;
}

export function IndeterminantProgress({ className }: ChatConversationProps) {
  return (
    <div className={cn("h-1 bg-secondary overflow-hidden", className)}>
      <div className="h-full w-full bg-primary animate-progress-loading origin-left" />
    </div>
  );
}
