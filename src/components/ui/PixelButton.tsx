import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pixelButtonVariants = cva(
  "inline-flex items-center justify-center font-pixel text-xs uppercase tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 active:translate-x-[2px] active:translate-y-[2px]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-primary/80 hover:bg-primary/90 shadow-[4px_4px_0px_hsl(var(--primary)/0.3)] hover:shadow-[2px_2px_0px_hsl(var(--primary)/0.3)] active:shadow-none",
        secondary:
          "bg-secondary text-secondary-foreground border-secondary/80 hover:bg-secondary/80 shadow-[4px_4px_0px_hsl(var(--secondary)/0.5)] hover:shadow-[2px_2px_0px_hsl(var(--secondary)/0.5)] active:shadow-none",
        outline:
          "bg-transparent text-foreground border-foreground/30 hover:bg-foreground/5 shadow-[4px_4px_0px_hsl(var(--foreground)/0.1)] hover:shadow-[2px_2px_0px_hsl(var(--foreground)/0.1)] active:shadow-none",
        ghost:
          "bg-transparent text-foreground border-transparent hover:bg-foreground/5 shadow-none",
        emotional:
          "bg-emotional text-emotional-foreground border-emotional/80 hover:bg-emotional/90 shadow-[4px_4px_0px_hsl(var(--emotional)/0.3)] hover:shadow-[2px_2px_0px_hsl(var(--emotional)/0.3)] active:shadow-none",
        practical:
          "bg-practical text-practical-foreground border-practical/80 hover:bg-practical/90 shadow-[4px_4px_0px_hsl(var(--practical)/0.3)] hover:shadow-[2px_2px_0px_hsl(var(--practical)/0.3)] active:shadow-none",
        toughLove:
          "bg-tough-love text-tough-love-foreground border-tough-love/80 hover:bg-tough-love/90 shadow-[4px_4px_0px_hsl(var(--tough-love)/0.3)] hover:shadow-[2px_2px_0px_hsl(var(--tough-love)/0.3)] active:shadow-none",
      },
      size: {
        default: "px-4 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-xs",
        sm: "px-3 sm:px-4 py-2 text-[9px] sm:text-[10px]",
        lg: "px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm",
        icon: "h-9 w-9 sm:h-10 sm:w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface PixelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pixelButtonVariants> {}

const PixelButton = React.forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(pixelButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
PixelButton.displayName = "PixelButton";

export { PixelButton, pixelButtonVariants };
