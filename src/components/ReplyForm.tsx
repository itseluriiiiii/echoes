import React, { useState } from "react";
import { PixelCard } from "@/components/ui/PixelCard";
import { PixelTextarea } from "@/components/ui/PixelTextarea";
import { PixelButton } from "@/components/ui/PixelButton";
import { CategoryType } from "@/components/ui/CategoryBadge";
import { Send } from "lucide-react";

interface ReplyFormProps {
  onSubmit: (reply: string, category: CategoryType) => void;
  isLoading?: boolean;
}

const MAX_WORDS = 40;

const ReplyForm: React.FC<ReplyFormProps> = ({ onSubmit, isLoading }) => {
  const [reply, setReply] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("emotional");

  const wordCount = reply.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reply.trim() && wordCount <= MAX_WORDS) {
      onSubmit(reply.trim(), selectedCategory);
      setReply("");
    }
  };

  const isValid = reply.trim().length > 0 && wordCount <= MAX_WORDS;

  const categories: { value: CategoryType; label: string }[] = [
    { value: "emotional", label: "Emotional" },
    { value: "practical", label: "Practical" },
    { value: "tough-love", label: "Tough Love" },
  ];

  return (
    <PixelCard className="space-y-3 sm:space-y-4">
      <div className="space-y-0.5 sm:space-y-1">
        <h4 className="font-pixel text-[9px] sm:text-xs text-foreground/80">Share Your Advice</h4>
        <p className="font-body text-xs sm:text-sm text-muted-foreground">
          Be kind. Be honest. Be human.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
        <PixelTextarea
          placeholder="Your anonymous advice..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          showWordCount
          maxWords={MAX_WORDS}
          disabled={isLoading}
          rows={2}
        />
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 font-pixel text-[8px] sm:text-[9px] border-2 transition-all ${
                  selectedCategory === cat.value
                    ? "bg-foreground/10 border-foreground/30 text-foreground"
                    : "bg-transparent border-foreground/10 text-muted-foreground hover:border-foreground/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          
          <PixelButton 
            type="submit" 
            variant="secondary"
            size="sm"
            disabled={!isValid || isLoading}
            className="gap-1.5 sm:gap-2 w-full sm:w-auto"
          >
            <Send className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span className="text-[9px] sm:text-[10px]">Send Advice</span>
          </PixelButton>
        </div>
      </form>
    </PixelCard>
  );
};

export { ReplyForm };
