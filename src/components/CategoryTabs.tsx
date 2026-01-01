import React from "react";
import { cn } from "@/lib/utils";
import { Heart, Wrench, Zap } from "lucide-react";
import { CategoryType } from "@/components/ui/CategoryBadge";

interface CategoryTabsProps {
  activeCategory: CategoryType | "all";
  onCategoryChange: (category: CategoryType | "all") => void;
  counts: Record<CategoryType | "all", number>;
}

const tabs: { key: CategoryType | "all"; label: string; icon?: React.ReactNode }[] = [
  { key: "all", label: "All" },
  { key: "emotional", label: "Emotional", icon: <Heart className="w-3 h-3" /> },
  { key: "practical", label: "Practical", icon: <Wrench className="w-3 h-3" /> },
  { key: "tough-love", label: "Tough Love", icon: <Zap className="w-3 h-3" /> },
];

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
  counts,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onCategoryChange(tab.key)}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-2 font-pixel text-[10px] uppercase border-2 transition-all duration-150",
            activeCategory === tab.key
              ? "bg-foreground/10 border-foreground/30 text-foreground"
              : "bg-transparent border-foreground/10 text-muted-foreground hover:border-foreground/20 hover:text-foreground/70"
          )}
        >
          {tab.icon}
          {tab.label}
          <span className="ml-1 opacity-60">({counts[tab.key]})</span>
        </button>
      ))}
    </div>
  );
};

export { CategoryTabs };
