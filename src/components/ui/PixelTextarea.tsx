import * as React from "react";
import { cn } from "@/lib/utils";

export interface PixelTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  showWordCount?: boolean;
  maxWords?: number;
}

const PixelTextarea = React.forwardRef<HTMLTextAreaElement, PixelTextareaProps>(
  ({ className, showWordCount, maxWords, value, ...props }, ref) => {
    const wordCount = typeof value === 'string' 
      ? value.trim().split(/\s+/).filter(Boolean).length 
      : 0;
    
    return (
      <div className="relative w-full">
        <textarea
          className={cn(
            "flex min-h-[120px] w-full bg-input border-2 border-foreground/20 px-4 py-3 font-body text-lg text-foreground resize-none",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:border-primary focus:shadow-[0_0_10px_hsl(var(--primary)/0.2)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-all duration-150",
            className
          )}
          ref={ref}
          value={value}
          {...props}
        />
        {showWordCount && maxWords && (
          <span className={cn(
            "absolute right-3 bottom-3 font-pixel text-[10px]",
            wordCount > maxWords ? "text-destructive" : "text-muted-foreground"
          )}>
            {wordCount}/{maxWords} words
          </span>
        )}
      </div>
    );
  }
);
PixelTextarea.displayName = "PixelTextarea";

export { PixelTextarea };
