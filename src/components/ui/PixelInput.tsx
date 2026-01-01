import * as React from "react";
import { cn } from "@/lib/utils";

export interface PixelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showCharCount?: boolean;
  maxChars?: number;
}

const PixelInput = React.forwardRef<HTMLInputElement, PixelInputProps>(
  ({ className, type, showCharCount, maxChars, value, ...props }, ref) => {
    const charCount = typeof value === 'string' ? value.length : 0;
    
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex w-full bg-input border-2 border-foreground/20 px-4 py-3 font-body text-lg text-foreground",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:border-primary focus:shadow-[0_0_10px_hsl(var(--primary)/0.2)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-all duration-150",
            showCharCount && "pr-16",
            className
          )}
          ref={ref}
          value={value}
          {...props}
        />
        {showCharCount && maxChars && (
          <span className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 font-pixel text-[10px]",
            charCount > maxChars ? "text-destructive" : "text-muted-foreground"
          )}>
            {charCount}/{maxChars}
          </span>
        )}
      </div>
    );
  }
);
PixelInput.displayName = "PixelInput";

export { PixelInput };
