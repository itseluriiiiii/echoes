import React, { useState } from "react";
import { PixelCard } from "@/components/ui/PixelCard";
import { PixelInput } from "@/components/ui/PixelInput";
import { PixelButton } from "@/components/ui/PixelButton";
import { Send } from "lucide-react";

interface AskQuestionFormProps {
  onSubmit: (question: string) => void;
  isLoading?: boolean;
}

const MAX_CHARS = 150;

const AskQuestionForm: React.FC<AskQuestionFormProps> = ({ onSubmit, isLoading }) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && question.length <= MAX_CHARS) {
      onSubmit(question.trim());
      setQuestion("");
    }
  };

  const isValid = question.trim().length > 0 && question.length <= MAX_CHARS;

  return (
    <PixelCard variant="glow" className="space-y-3 sm:space-y-4">
      <div className="space-y-1 sm:space-y-2">
        <h3 className="font-pixel text-xs sm:text-sm text-primary">Ask a Stranger</h3>
        <p className="font-body text-sm sm:text-base text-muted-foreground">
          What's the one thing you can't ask the people you know?
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <PixelInput
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          showCharCount
          maxChars={MAX_CHARS}
          disabled={isLoading}
        />
        
        <div className="flex items-center justify-between">
          <span className="font-pixel text-[8px] text-muted-foreground uppercase">
            Anonymous • Expires in 48h
          </span>
          <PixelButton 
            type="submit" 
            disabled={!isValid || isLoading}
            className="gap-2"
          >
            <Send className="w-3 h-3" />
            Ask
          </PixelButton>
        </div>
      </form>
    </PixelCard>
  );
};

export { AskQuestionForm };
