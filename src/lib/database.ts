import { supabase } from "./supabase";
import { CategoryType } from "@/components/ui/CategoryBadge";

export interface Reply {
  id: string;
  question_id: string;
  content: string;
  category: CategoryType;
  created_at: string;
}

export interface Question {
  id: string;
  question: string;
  created_at: string;
  expires_at: string;
  replies?: Reply[];
}

// Questions
export const fetchQuestions = async (): Promise<Question[]> => {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const fetchQuestionById = async (id: string): Promise<Question | null> => {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data || null;
};

export const createQuestion = async (question: string): Promise<Question> => {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 48);

  const { data, error } = await supabase
    .from("questions")
    .insert([
      {
        question,
        created_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Replies
export const fetchRepliesByQuestionId = async (
  questionId: string
): Promise<Reply[]> => {
  const { data, error } = await supabase
    .from("replies")
    .select("*")
    .eq("question_id", questionId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
};

export const createReply = async (
  questionId: string,
  content: string,
  category: CategoryType
): Promise<Reply> => {
  const { data, error } = await supabase
    .from("replies")
    .insert([
      {
        question_id: questionId,
        content,
        category,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Fetch question with replies
export const fetchQuestionWithReplies = async (
  id: string
): Promise<Question | null> => {
  const question = await fetchQuestionById(id);
  if (!question) return null;

  const replies = await fetchRepliesByQuestionId(id);
  return { ...question, replies };
};

// Fetch all questions with replies
export const fetchQuestionsWithReplies = async (): Promise<Question[]> => {
  const questions = await fetchQuestions();
  const questionsWithReplies = await Promise.all(
    questions.map(async (q) => {
      const replies = await fetchRepliesByQuestionId(q.id);
      return { ...q, replies };
    })
  );
  return questionsWithReplies;
};
