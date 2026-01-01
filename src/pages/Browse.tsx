import React from "react";
import { useNavigate } from "react-router-dom";
import { QuestionCard } from "@/components/QuestionCard";
import { Disclaimer } from "@/components/Disclaimer";
import { useQuestions } from "@/hooks/useQuestions";
import { Loader2 } from "lucide-react";

const Browse: React.FC = () => {
  const navigate = useNavigate();
  const { data: questions = [], isLoading, error } = useQuestions();

  // Filter to show only non-expired questions
  const activeQuestions = questions.filter(
    (q) => q.expiresAt.getTime() > Date.now()
  );

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-8 sm:pb-12 px-3 sm:px-4">
      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="space-y-2 animate-fade-in">
          <h1 className="font-pixel text-base sm:text-lg text-foreground">
            Browse Questions
          </h1>
          <p className="font-body text-sm sm:text-lg text-muted-foreground">
            Read what strangers are asking. Share your perspective.
          </p>
        </div>

        {/* Questions List */}
        <div className="space-y-3 sm:space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="font-body text-sm sm:text-lg text-destructive">
                Error loading questions. Please try again.
              </p>
            </div>
          ) : activeQuestions.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-body text-sm sm:text-lg text-muted-foreground">
                No questions yet. Be the first to ask.
              </p>
            </div>
          ) : (
            activeQuestions.map((question, index) => (
              <div
                key={question.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <QuestionCard
                  id={question.id}
                  question={question.question}
                  replyCount={question.replies.length}
                  createdAt={question.createdAt}
                  expiresAt={question.expiresAt}
                  onClick={() => navigate(`/question/${question.id}`)}
                />
              </div>
            ))
          )}
        </div>

        {/* Disclaimer */}
        <Disclaimer className="mt-6 sm:mt-8" />
      </div>
    </div>
  );
};

export default Browse;
