import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AskQuestionForm } from "@/components/AskQuestionForm";
import { Disclaimer } from "@/components/Disclaimer";
import { PixelCard } from "@/components/ui/PixelCard";
import { useCreateQuestion } from "@/hooks/useQuestions";
import { toast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

const Ask: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const { mutate: createQuestion, isPending: isSubmitting } = useCreateQuestion();

  const handleSubmit = async (question: string) => {
    createQuestion(question, {
      onSuccess: (newQuestion) => {
        setSubmitted(true);
        
        toast({
          title: "Question posted",
          description: "Strangers can now see your question and share advice.",
        });

        // Redirect to the question page after a moment
        setTimeout(() => {
          navigate(`/question/${newQuestion.id}`);
        }, 1500);
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to post question. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-8 sm:pb-12 px-3 sm:px-4">
      <div className="max-w-xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="space-y-1 sm:space-y-2 animate-fade-in text-center">
          <h1 className="font-pixel text-base sm:text-lg text-foreground">
            Ask a Question
          </h1>
          <p className="font-body text-sm sm:text-lg text-muted-foreground">
            What's weighing on your mind?
          </p>
        </div>

        {/* Form or Success State */}
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {submitted ? (
            <PixelCard variant="glow" className="text-center py-6 sm:py-8 space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto flex items-center justify-center bg-practical/20 text-practical">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-pixel text-xs sm:text-sm text-foreground">
                Question Posted
              </h3>
              <p className="font-body text-sm sm:text-lg text-muted-foreground">
                Taking you to your question...
              </p>
            </PixelCard>
          ) : (
            <AskQuestionForm onSubmit={handleSubmit} isLoading={isSubmitting} />
          )}
        </div>

        {/* Tips */}
        {!submitted && (
          <PixelCard className="space-y-2 sm:space-y-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h4 className="font-pixel text-[9px] sm:text-[10px] text-muted-foreground uppercase">
              Tips for good questions
            </h4>
            <ul className="font-body text-xs sm:text-sm text-muted-foreground space-y-0.5 sm:space-y-1">
              <li>• Be specific about your situation</li>
              <li>• Keep it focused on one thing</li>
              <li>• Avoid identifying details</li>
              <li>• Ask what you truly need to know</li>
            </ul>
          </PixelCard>
        )}

        {/* Disclaimer */}
        <Disclaimer className="animate-fade-in" style={{ animationDelay: "0.3s" }} />
      </div>
    </div>
  );
};

export default Ask;
