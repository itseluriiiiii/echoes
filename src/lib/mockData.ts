import { CategoryType } from "@/components/ui/CategoryBadge";

export interface Reply {
  id: string;
  content: string;
  category: CategoryType;
  createdAt: Date;
}

export interface Question {
  id: string;
  question: string;
  createdAt: Date;
  expiresAt: Date;
  replies: Reply[];
}

// Mock data for demo purposes
const now = new Date();

export const mockQuestions: Question[] = [
  {
    id: "1",
    question: "Is it okay to cut off a parent who's never supported me emotionally?",
    createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000),
    expiresAt: new Date(now.getTime() + 40 * 60 * 60 * 1000),
    replies: [
      {
        id: "1-1",
        content: "Your peace matters. Setting boundaries isn't abandonment—it's survival. You can love someone from a distance that keeps you whole.",
        category: "emotional",
        createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000),
      },
      {
        id: "1-2",
        content: "Start with a trial separation. Three months, no contact. Journal how you feel. The clarity will come naturally.",
        category: "practical",
        createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000),
      },
      {
        id: "1-3",
        content: "Blood doesn't entitle anyone to your energy. You don't owe explanations. Just go.",
        category: "tough-love",
        createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      },
    ],
  },
  {
    id: "2",
    question: "I'm 35 and have no idea what I want to do with my life. Is that normal?",
    createdAt: new Date(now.getTime() - 20 * 60 * 60 * 1000),
    expiresAt: new Date(now.getTime() + 28 * 60 * 60 * 1000),
    replies: [
      {
        id: "2-1",
        content: "More normal than you think. I found my path at 42. Life isn't a race with checkpoints. Breathe.",
        category: "emotional",
        createdAt: new Date(now.getTime() - 18 * 60 * 60 * 1000),
      },
      {
        id: "2-2",
        content: "Try 30 new things in 30 days. Tiny experiments. Cooking class, pottery, volunteering. Notice what makes time disappear.",
        category: "practical",
        createdAt: new Date(now.getTime() - 15 * 60 * 60 * 1000),
      },
    ],
  },
  {
    id: "3",
    question: "Should I tell my best friend their partner is cheating on them?",
    createdAt: new Date(now.getTime() - 5 * 60 * 60 * 1000),
    expiresAt: new Date(now.getTime() + 43 * 60 * 60 * 1000),
    replies: [
      {
        id: "3-1",
        content: "Yes. Rip the bandaid. They'll be hurt either way—better to be hurt by truth than prolonged lies. Real friends tell hard truths.",
        category: "tough-love",
        createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000),
      },
      {
        id: "3-2",
        content: "Before telling them, ask: do you have proof? Can you handle if they don't believe you? Prepare for all outcomes.",
        category: "practical",
        createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
      },
      {
        id: "3-3",
        content: "You're carrying a heavy weight for your friend. Whatever you decide, know your heart is in the right place.",
        category: "emotional",
        createdAt: new Date(now.getTime() - 30 * 60 * 1000),
      },
    ],
  },
  {
    id: "4",
    question: "How do I stop comparing myself to everyone on social media?",
    createdAt: new Date(now.getTime() - 36 * 60 * 60 * 1000),
    expiresAt: new Date(now.getTime() + 12 * 60 * 60 * 1000),
    replies: [
      {
        id: "4-1",
        content: "Delete the apps for two weeks. Cold turkey. Notice how your brain rewires when you stop feeding the comparison machine.",
        category: "practical",
        createdAt: new Date(now.getTime() - 30 * 60 * 60 * 1000),
      },
      {
        id: "4-2",
        content: "You're comparing your behind-the-scenes to everyone's highlight reel. They're struggling too. Everyone is.",
        category: "emotional",
        createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      },
    ],
  },
];

// Function to add a new question
export const addQuestion = (questionText: string): Question => {
  const newQuestion: Question = {
    id: `${Date.now()}`,
    question: questionText,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
    replies: [],
  };
  mockQuestions.unshift(newQuestion);
  return newQuestion;
};

// Function to add a reply (randomly categorized for demo)
export const addReply = (questionId: string, content: string): Reply | null => {
  const question = mockQuestions.find(q => q.id === questionId);
  if (!question) return null;

  const categories: CategoryType[] = ["emotional", "practical", "tough-love"];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];

  const newReply: Reply = {
    id: `${questionId}-${Date.now()}`,
    content,
    category: randomCategory,
    createdAt: new Date(),
  };
  
  question.replies.push(newReply);
  return newReply;
};
