import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as db from "@/lib/database";
import { mockQuestions, addQuestion as addMockQuestion, addReply as addMockReply } from "@/lib/mockData";
import { Question, Reply } from "@/lib/mockData";
import { CategoryType } from "@/components/ui/CategoryBadge";

const USE_MOCK_DATA = !import.meta.env.VITE_SUPABASE_URL;

// Convert database format to app format
const convertQuestion = (q: any): Question => ({
  id: q.id,
  question: q.question,
  createdAt: new Date(q.created_at),
  expiresAt: new Date(q.expires_at),
  replies: q.replies?.map((r: any) => ({
    id: r.id,
    content: r.content,
    category: r.category,
    createdAt: new Date(r.created_at),
  })) || [],
});

export const useQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        return mockQuestions;
      }
      const questions = await db.fetchQuestionsWithReplies();
      return questions.map(convertQuestion);
    },
    staleTime: 30000, // 30 seconds
  });
};

export const useQuestion = (id: string) => {
  return useQuery({
    queryKey: ["question", id],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        return mockQuestions.find((q) => q.id === id) || null;
      }
      const question = await db.fetchQuestionWithReplies(id);
      return question ? convertQuestion(question) : null;
    },
    staleTime: 30000,
  });
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questionText: string) => {
      if (USE_MOCK_DATA) {
        return addMockQuestion(questionText);
      }
      const question = await db.createQuestion(questionText);
      return convertQuestion(question);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};

export const useCreateReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      questionId,
      content,
      category,
    }: {
      questionId: string;
      content: string;
      category: CategoryType;
    }) => {
      if (USE_MOCK_DATA) {
        return addMockReply(questionId, content);
      }
      const reply = await db.createReply(questionId, content, category);
      return reply;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["question", variables.questionId] });
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};
