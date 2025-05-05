export interface Feedback {
  id: number;
  sessionId: number;
  vapiSessionId: string;
  score: number;
  transcript: string[];
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  counselorScore: number;
  counselorCategoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  counselor: User;
  counselorFinalAssessment: string;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

export interface Category {
  id: number;
  title: string;
}

export interface CallSession {
  id: string;
  stereoRecordingUrl: string;
  endedReason: string;
}

export interface Question {
  id: number;
  title: string;
  category: Category;
  expected_answer: string;
  difficulty: string;
  order: number;
  createdAt: string;
  updateAt: string;
}

export interface InterviewType {
  id: number;
  title: string;
  code: string;
  logo: string;
  order: number;
  createdAt: string;
  updateAt: string;
}

export interface Interview {
  id: number;
  uuid: string;
  interviewType: InterviewType;
  categories: Category[];
  title: string;
  liveFeedbackEnabled: boolean;
  aiFeedbackEnabled: boolean;
  description: string;
  totalQuestions: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewSession {
  id: number;
  uuid: string;
  interview: Interview;
  interviewee: User;
  feedback: Feedback | null;
  questions: string[];
  status: string;
  startedAt: string;
  completedAt: string;
}

export interface InterviewSessionCardProps {
  title: string;
  interviewSessionId: string;
  logo?: string;
  completedAt: string;
  feedback: Feedback | null;
  categories: Category[];
}

export interface InterviewCardProps {
  title: string;
  interviewId: string;
  description: string;
  userId: number;
  liveFeedbackEnabled: boolean;
  logo?: string;
  createdAt: string;
  categories: Category[];
  totalQuestions: number;
}

export interface PaginationMeta {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

interface CreateFeedbackParams {
  interviewSessionId: string;
  transcript: { role: string; content: string }[];
  callId: string;
}

interface User {
  name: string;
  email: string;
  id: number;
  profile: string;
}

interface AgentProps {
  userName: string;
  userId?: number;
  interviewSessionId: string;
  feedbackId?: string;
  liveFeedbackEnabled: boolean;
  questions?: string[];
}

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface GetFeedbackByInterviewIdParams {
  interviewId: string;
  userId: string;
}

interface GetLatestInterviewsParams {
  userId: string;
  limit?: number;
}

interface LogInParams {
  email: string;
  password: string;
}

interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

type FormType = "sign-in" | "sign-up";

interface InterviewFormProps {
  interviewId: string;
  role: string;
  level: string;
  type: string;
  techstack: string[];
  amount: number;
}

interface InterviewCategoryProps {
  categories: Category[];
}

interface AudioPlayerProps {
  audioUrl: string;
}