import { QuizQuestion, QuizSessionResult } from '../types/index.ts';

/**
 * Calculates total correct answers for a quiz given user answer mappings
 */
export function calculateScore(
  userAnswers: Record<number, number>,
  questions: QuizQuestion[]
): { score: number; total: number } {
  let score = 0;
  for (const q of questions) {
    if (userAnswers[q.id] === q.correctAnswer) {
      score += 1;
    }
  }
  return { score, total: questions.length };
}

/**
 * Calculates percentage integer (0 - 100)
 */
export function calculatePercentage(score: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((score / total) * 100);
}

/**
 * Evaluates performance grade and motivational feedback in Vietnamese
 */
export function getEvaluationLevel(percentage: number): {
  label: string;
  badgeClass: string;
  feedback: string;
} {
  if (percentage >= 90) {
    return {
      label: 'Xuất sắc',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      feedback: 'Bạn đã nắm rất vững các khái niệm cốt lõi của tài liệu! Sẵn sàng cho kỳ thi.',
    };
  }
  if (percentage >= 70) {
    return {
      label: 'Khá tốt',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      feedback: 'Kết quả khá tốt! Bạn chỉ cần ôn tập thêm một số chi tiết kỹ thuật.',
    };
  }
  if (percentage >= 50) {
    return {
      label: 'Đạt yêu cầu',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      feedback: 'Bạn đã hiểu các ý chính nhưng còn nhầm lẫn ở một số câu hỏi phân tích.',
    };
  }
  return {
    label: 'Cần ôn lại thêm',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    feedback: 'Hãy xem lại các chủ đề được gợi ý bên dưới và thử làm lại bài nhé.',
  };
}

/**
 * Identifies weak topics based on incorrect answers
 */
export function identifyWeakTopics(
  userAnswers: Record<number, number>,
  questions: QuizQuestion[]
): string[] {
  const weak = new Set<string>();
  for (const q of questions) {
    if (userAnswers[q.id] !== q.correctAnswer) {
      weak.add(q.topic);
    }
  }
  return Array.from(weak);
}

/**
 * Formats bytes to readable string (KB / MB)
 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
