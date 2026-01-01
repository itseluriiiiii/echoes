import React, { useState } from "react";
import { PixelCard } from "@/components/ui/PixelCard";
import { PixelTextarea } from "@/components/ui/PixelTextarea";
import { PixelButton } from "@/components/ui/PixelButton";
import { Send } from "lucide-react";

interface ReplyFormProps {
  onSubmit: (reply: string) => void;
  isLoading?: boolean;
}

const MAX_WORDS = 40;

const ReplyForm: React.FC<ReplyFormProps> = ({ onSubmit, isLoading }) => {
  const [reply, setReply] = useState("");

  const wordCount = reply.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reply.trim() && wordCount <= MAX_WORDS) {
      onSubmit(reply.trim());
      setReply("");
    }
  };

  const isValid = reply.trim().length > 0 && wordCount <= MAX_WORDS;

  return (
    <PixelCard className="space-y-4">
      <div className="space-y-1">
        <h4 className="font-pixel text-xs text-foreground/80">Share Your Advice</h4>
        <p className="font-body text-sm text-muted-foreground">
          Be kind. Be honest. Be human.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <PixelTextarea
          placeholder="Your anonymous advice..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          showWordCount
          maxWords={MAX_WORDS}
          disabled={isLoading}
          rows={3}
        />
        
        <div className="flex justify-end">
          <PixelButton 
            type="submit" 
            variant="secondary"
            size="sm"
            disabled={!isValid || isLoading}
            className="gap-2"
          >
            <Send className="w-3 h-3" />
            Send Advice
          </PixelButton>
        </div>
      </form>
    </PixelCard>
  );
};

export { ReplyForm };
