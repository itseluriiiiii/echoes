import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface DisclaimerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "flex items-start gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 bg-muted/50 border border-foreground/10",
        className
      )}
      {...props}
    >
      <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0 mt-0.5" />
      <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
        Advice from strangers. Not professional help. If you're in crisis, please reach out to a qualified professional.
      </p>
    </div>
  );
};

export { Disclaimer };
