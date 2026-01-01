import React from "react";
import { CategoryBadge, CategoryType } from "@/components/ui/CategoryBadge";
import { cn } from "@/lib/utils";

interface AdviceReplyProps {
  content: string;
  category: CategoryType;
  createdAt: Date;
  className?: string;
}

const AdviceReply: React.FC<AdviceReplyProps> = ({
  content,
  category,
  createdAt,
  className,
}) => {
  const timeAgo = React.useMemo(() => {
    const now = new Date();
    const diff = now.getTime() - createdAt.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours > 0) {
      return `${hours}h ago`;
    }
    if (minutes > 0) {
      return `${minutes}m ago`;
    }
    return "just now";
  }, [createdAt]);

  return (
    <div
      className={cn(
        "relative pl-4 py-3 border-l-2 animate-fade-in",
        category === "emotional" && "border-emotional/50",
        category === "practical" && "border-practical/50",
        category === "tough-love" && "border-tough-love/50",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <CategoryBadge category={category} />
        <span className="font-pixel text-[8px] text-muted-foreground uppercase">
          {timeAgo}
        </span>
      </div>
      <p className="font-body text-lg leading-relaxed text-foreground/85">
        {content}
      </p>
    </div>
  );
};

export { AdviceReply };
