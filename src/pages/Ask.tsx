import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AskQuestionForm } from "@/components/AskQuestionForm";
import { Disclaimer } from "@/components/Disclaimer";
import { PixelCard } from "@/components/ui/PixelCard";
import { addQuestion } from "@/lib/mockData";
import { toast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

const Ask: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (question: string) => {
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const newQuestion = addQuestion(question);
    setIsSubmitting(false);
    setSubmitted(true);
    
    toast({
      title: "Question posted",
      description: "Strangers can now see your question and share advice.",
    });

    // Redirect to the question page after a moment
    setTimeout(() => {
      navigate(`/question/${newQuestion.id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2 animate-fade-in text-center">
          <h1 className="font-pixel text-lg text-foreground">
            Ask a Question
          </h1>
          <p className="font-body text-lg text-muted-foreground">
            What's weighing on your mind?
          </p>
        </div>

        {/* Form or Success State */}
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {submitted ? (
            <PixelCard variant="glow" className="text-center py-8 space-y-4">
              <div className="w-12 h-12 mx-auto flex items-center justify-center bg-practical/20 text-practical">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-pixel text-sm text-foreground">
                Question Posted
              </h3>
              <p className="font-body text-lg text-muted-foreground">
                Taking you to your question...
              </p>
            </PixelCard>
          ) : (
            <AskQuestionForm onSubmit={handleSubmit} isLoading={isSubmitting} />
          )}
        </div>

        {/* Tips */}
        {!submitted && (
          <PixelCard className="space-y-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h4 className="font-pixel text-[10px] text-muted-foreground uppercase">
              Tips for good questions
            </h4>
            <ul className="font-body text-sm text-muted-foreground space-y-1">
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
