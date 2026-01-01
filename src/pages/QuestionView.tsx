import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { PixelCard } from "@/components/ui/PixelCard";
import { PixelButton } from "@/components/ui/PixelButton";
import { TimeRemaining } from "@/components/ui/TimeRemaining";
import { CategoryTabs } from "@/components/CategoryTabs";
import { AdviceReply } from "@/components/AdviceReply";
import { ReplyForm } from "@/components/ReplyForm";
import { Disclaimer } from "@/components/Disclaimer";
import { CategoryType } from "@/components/ui/CategoryBadge";
import { mockQuestions, addReply } from "@/lib/mockData";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const QuestionView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeCategory, setActiveCategory] = useState<CategoryType | "all">("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, forceUpdate] = useState({});

  const question = mockQuestions.find((q) => q.id === id);

  const isExpired = question ? question.expiresAt.getTime() < Date.now() : false;

  const filteredReplies = useMemo(() => {
    if (!question) return [];
    if (activeCategory === "all") return question.replies;
    return question.replies.filter((r) => r.category === activeCategory);
  }, [question, activeCategory]);

  const categoryCounts = useMemo(() => {
    if (!question) return { all: 0, emotional: 0, practical: 0, "tough-love": 0 };
    return {
      all: question.replies.length,
      emotional: question.replies.filter((r) => r.category === "emotional").length,
      practical: question.replies.filter((r) => r.category === "practical").length,
      "tough-love": question.replies.filter((r) => r.category === "tough-love").length,
    };
  }, [question]);

  const handleReplySubmit = async (content: string) => {
    if (!question) return;
    
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    addReply(question.id, content);
    setIsSubmitting(false);
    forceUpdate({});
    
    toast({
      title: "Advice shared",
      description: "Your anonymous advice has been posted.",
    });
  };

  if (!question) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4">
        <div className="max-w-2xl mx-auto text-center py-12">
          <h1 className="font-pixel text-lg text-foreground mb-4">
            Question Not Found
          </h1>
          <p className="font-body text-lg text-muted-foreground mb-6">
            This question may have expired or doesn't exist.
          </p>
          <Link to="/browse">
            <PixelButton variant="secondary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse Questions
            </PixelButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back Button */}
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 font-pixel text-[10px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Browse
        </Link>

        {/* Question Card */}
        <PixelCard variant="glow" className="animate-fade-in">
          <div className="space-y-4">
            <p className="font-body text-2xl leading-relaxed text-foreground">
              "{question.question}"
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-foreground/10">
              <TimeRemaining expiresAt={question.expiresAt} />
              {isExpired && (
                <span className="font-pixel text-[10px] text-muted-foreground uppercase">
                  Read-only
                </span>
              )}
            </div>
          </div>
        </PixelCard>

        {/* Reply Form (only if not expired) */}
        {!isExpired && (
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <ReplyForm onSubmit={handleReplySubmit} isLoading={isSubmitting} />
          </div>
        )}

        {/* Category Tabs */}
        {question.replies.length > 0 && (
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              counts={categoryCounts}
            />
          </div>
        )}

        {/* Replies */}
        <div className="space-y-4">
          {filteredReplies.length === 0 ? (
            <div className="text-center py-8 animate-fade-in">
              <p className="font-body text-lg text-muted-foreground">
                {question.replies.length === 0
                  ? "No advice yet. Be the first to share your perspective."
                  : "No advice in this category."}
              </p>
            </div>
          ) : (
            filteredReplies.map((reply, index) => (
              <div
                key={reply.id}
                className="animate-fade-in"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <AdviceReply
                  content={reply.content}
                  category={reply.category}
                  createdAt={reply.createdAt}
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

export default QuestionView;
