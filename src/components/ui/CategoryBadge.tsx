import * as React from "react";
import { cn } from "@/lib/utils";
import { Heart, Wrench, Zap } from "lucide-react";

type CategoryType = "emotional" | "practical" | "tough-love";

interface CategoryBadgeProps {
  category: CategoryType;
  className?: string;
  showIcon?: boolean;
}

const categoryConfig = {
  emotional: {
    icon: Heart,
    label: "Emotional",
    className: "bg-emotional/20 text-emotional border-emotional/30",
  },
  practical: {
    icon: Wrench,
    label: "Practical",
    className: "bg-practical/20 text-practical border-practical/30",
  },
  "tough-love": {
    icon: Zap,
    label: "Tough Love",
    className: "bg-tough-love/20 text-tough-love border-tough-love/30",
  },
};

const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  className,
  showIcon = true,
}) => {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 font-pixel text-[10px] uppercase border",
        config.className,
        className
      )}
    >
      {showIcon && <Icon className="w-3 h-3" />}
      {config.label}
    </span>
  );
};

export { CategoryBadge };
export type { CategoryType };
