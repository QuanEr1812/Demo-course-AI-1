export type ScreenType = 
  | 'dashboard'
  | 'upload'
  | 'analysis'
  | 'generation'
  | 'quiz'
  | 'results'
  | 'history';

export interface DocumentItem {
  id: string;
  name: string;
  type: string;
  size: number; // bytes
  formattedSize: string;
  pages: number;
  uploadDate: string;
  status: 'Đã phân tích (mô phỏng)' | 'Đang xử lý' | 'Mới tải lên';
  topicsCount: number;
  questionsGenerated: number;
  description: string;
}

export interface TopicItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  importance: 'Rất quan trọng' | 'Quan trọng' | 'Tham khảo';
  keyPoints: string[];
}

export interface ConceptItem {
  id: string;
  term: string;
  definition: string;
  citation: string;
  topicId: string;
}

export interface SourceReference {
  id: string;
  page: string;
  section: string;
  title: string;
  excerpt: string;
  conceptTerm: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
  topic: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  citation: string;
}

export interface QuizConfig {
  questionType: 'Trắc nghiệm' | 'Đúng / Sai' | 'Câu hỏi ngắn';
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  questionCount: number;
  selectedTopics: string[];
}

export interface QuizSessionResult {
  id: string;
  docName: string;
  date: string;
  score: number;
  total: number;
  percentage: number;
  userAnswers: Record<number, number>;
  timeSpent: string;
  weakTopics: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
