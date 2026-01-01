import React from "react";
import { PixelCard } from "@/components/ui/PixelCard";
import { PixelButton } from "@/components/ui/PixelButton";
import { TimeRemaining } from "@/components/ui/TimeRemaining";
import { MessageCircle } from "lucide-react";

interface QuestionCardProps {
  id: string;
  question: string;
  replyCount: number;
  createdAt: Date;
  expiresAt: Date;
  onClick?: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  replyCount,
  expiresAt,
  onClick,
}) => {
  return (
    <PixelCard 
      variant="interactive" 
      className="group"
      onClick={onClick}
    >
      <div className="space-y-3 sm:space-y-4">
        <p className="font-body text-base sm:text-lg md:text-xl leading-relaxed text-foreground/90">
          "{question}"
        </p>
        
        <div className="flex items-center justify-between pt-2 border-t border-foreground/10">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="inline-flex items-center gap-1.5 font-pixel text-[10px] text-muted-foreground uppercase">
              <MessageCircle className="w-3 h-3" />
              {replyCount} {replyCount === 1 ? "reply" : "replies"}
            </span>
            <TimeRemaining expiresAt={expiresAt} />
          </div>
          
          <PixelButton 
            variant="ghost" 
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            Read
          </PixelButton>
        </div>
      </div>
    </PixelCard>
  );
};

export { QuestionCard };
