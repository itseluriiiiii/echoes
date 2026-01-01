import * as React from "react";
import { cn } from "@/lib/utils";

interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glow" | "interactive";
}

const PixelCard = React.forwardRef<HTMLDivElement, PixelCardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative bg-card border-2 border-foreground/20 p-2 sm:p-4",
          "shadow-[2px_2px_0px_hsl(230_25%_5%)] sm:shadow-[4px_4px_0px_hsl(230_25%_5%)]",
          variant === "glow" && "shadow-[2px_2px_0px_hsl(230_25%_5%),0_0_20px_hsl(var(--primary)/0.15)] sm:shadow-[4px_4px_0px_hsl(230_25%_5%),0_0_20px_hsl(var(--primary)/0.15)]",
          variant === "interactive" && "transition-all duration-150 hover:shadow-[1px_1px_0px_hsl(230_25%_5%)] sm:hover:shadow-[2px_2px_0px_hsl(230_25%_5%)] hover:translate-x-[1px] sm:hover:translate-x-[2px] hover:translate-y-[1px] sm:hover:translate-y-[2px] cursor-pointer",
          className
        )}
        {...props}
      >
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-1 h-1 sm:w-2 sm:h-2 border-t-2 border-l-2 border-foreground/30" />
        <div className="absolute top-0 right-0 w-1 h-1 sm:w-2 sm:h-2 border-t-2 border-r-2 border-foreground/30" />
        <div className="absolute bottom-0 left-0 w-1 h-1 sm:w-2 sm:h-2 border-b-2 border-l-2 border-foreground/30" />
        <div className="absolute bottom-0 right-0 w-1 h-1 sm:w-2 sm:h-2 border-b-2 border-r-2 border-foreground/30" />
        {children}
      </div>
    );
  }
);
PixelCard.displayName = "PixelCard";

export { PixelCard };
