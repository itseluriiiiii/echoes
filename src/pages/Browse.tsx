import React from "react";
import { useNavigate } from "react-router-dom";
import { QuestionCard } from "@/components/QuestionCard";
import { Disclaimer } from "@/components/Disclaimer";
import { mockQuestions } from "@/lib/mockData";

const Browse: React.FC = () => {
  const navigate = useNavigate();

  // Filter to show only non-expired questions
  const activeQuestions = mockQuestions.filter(
    (q) => q.expiresAt.getTime() > Date.now()
  );

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2 animate-fade-in">
          <h1 className="font-pixel text-lg text-foreground">
            Browse Questions
          </h1>
          <p className="font-body text-lg text-muted-foreground">
            Read what strangers are asking. Share your perspective.
          </p>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {activeQuestions.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-body text-lg text-muted-foreground">
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
        <Disclaimer className="mt-8" />
      </div>
    </div>
  );
};

export default Browse;
