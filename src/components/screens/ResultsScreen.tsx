import React from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Home,
  History,
  BookOpen,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  Share2,
} from 'lucide-react';
import { DocumentItem, QuizQuestion, ScreenType } from '../../types/index.ts';
import {
  calculatePercentage,
  calculateScore,
  getEvaluationLevel,
  identifyWeakTopics,
} from '../../utils/quiz.ts';
import { SAMPLE_DOCUMENT, SAMPLE_QUIZ_QUESTIONS } from '../../data/sampleDocument.ts';

interface ResultsScreenProps {
  document?: DocumentItem;
  questions?: QuizQuestion[];
  userAnswers: Record<number, number>;
  onRetryQuiz: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  document = SAMPLE_DOCUMENT,
  questions = SAMPLE_QUIZ_QUESTIONS,
  userAnswers,
  onRetryQuiz,
  onNavigate,
}) => {
  const { score, total } = calculateScore(userAnswers, questions);
  const percentage = calculatePercentage(score, total);
  const evaluation = getEvaluationLevel(percentage);
  const weakTopics = identifyWeakTopics(userAnswers, questions);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-1">
            <span>Hoàn thành bài ôn tập</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Kết quả ôn tập
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tài liệu: <strong className="text-slate-800">{document.name}</strong> • Đã chấm điểm tự động
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRetryQuiz}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm lại bài</span>
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Quay về trang chủ</span>
          </button>
        </div>
      </div>

      {/* Main Score Card Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Big Circular Percentage Score */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50/80 rounded-2xl border border-slate-100 text-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-slate-200"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className={percentage >= 70 ? 'stroke-blue-600' : 'stroke-amber-500'}
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - percentage / 100)}`}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-slate-900">{percentage}%</span>
                <span className="text-[11px] font-semibold text-slate-400">Độ chính xác</span>
              </div>
            </div>

            <div className="mt-3">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${evaluation.badgeClass}`}>
                {evaluation.label}
              </span>
            </div>
          </div>

          {/* Details & Motivational Feedback */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Tổng kết điểm số
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                {score}/{total} câu đúng
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {evaluation.feedback}
              </p>
            </div>

            {/* Visual Breakdown Tags */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-[11px] font-semibold text-emerald-800 block">Số câu đúng</span>
                <span className="text-xl font-bold text-emerald-700">{score} câu</span>
              </div>

              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                <span className="text-[11px] font-semibold text-rose-800 block">Số câu sai / bỏ trống</span>
                <span className="text-xl font-bold text-rose-700">{total - score} câu</span>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-semibold text-blue-800 block">Thời gian làm bài</span>
                <span className="text-xl font-bold text-blue-700">2 phút 15 giây</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Điểm cần ôn lại (Weak Topics Review) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Điểm cần ôn lại (Chủ đề đề xuất)</h2>
            <p className="text-xs text-slate-500">
              Các chuyên đề có câu trả lời chưa chính xác, nên xem lại tài liệu trước kỳ thi
            </p>
          </div>
        </div>

        {weakTopics.length > 0 ? (
          <div className="space-y-3 pt-2">
            {weakTopics.map((topic, wIdx) => (
              <div
                key={wIdx}
                className="flex items-center justify-between p-4 rounded-2xl bg-amber-50/50 border border-amber-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{topic}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Gợi ý: Đọc lại phần định nghĩa và ví dụ trong tài liệu gốc
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('analysis')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-blue-700 hover:bg-blue-50 text-xs font-semibold rounded-lg border border-blue-200 transition-colors"
                >
                  <span>Xem phân tích chủ đề</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-900 text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Tuyệt vời! Bạn không có câu sai nào trong bài ôn tập này. Toàn bộ các chuyên đề đều đạt độ chính xác tối đa.
            </span>
          </div>
        )}
      </div>

      {/* Section: Xem lại câu trả lời */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900">Xem lại câu trả lời chi tiết</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Đối chiếu câu trả lời của bạn với đáp án chuẩn và lời giải thích học thuật
          </p>
        </div>

        <div className="space-y-5">
          {questions.map((q, idx) => {
            const userAnswerIndex = userAnswers[q.id];
            const isCorrect = userAnswerIndex === q.correctAnswer;
            const hasAnswered = userAnswerIndex !== undefined;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border transition-all space-y-3.5 ${
                  isCorrect
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-rose-200 bg-rose-50/20'
                }`}
              >
                {/* Header status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs text-white ${
                        isCorrect ? 'bg-emerald-600' : 'bg-rose-500'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">{q.topic}</span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Đúng (+1 điểm)
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        Chưa chính xác
                      </>
                    )}
                  </span>
                </div>

                {/* Question */}
                <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {q.question}
                </h4>

                {/* Option list */}
                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const letter = String.fromCharCode(65 + optIdx);
                    const isUserChoice = userAnswerIndex === optIdx;
                    const isRealCorrect = optIdx === q.correctAnswer;

                    let rowStyle = 'bg-white border-slate-200 text-slate-700';
                    let badgeStyle = 'bg-slate-100 text-slate-600';

                    if (isRealCorrect) {
                      rowStyle = 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium';
                      badgeStyle = 'bg-emerald-600 text-white';
                    } else if (isUserChoice && !isRealCorrect) {
                      rowStyle = 'bg-rose-50 border-rose-300 text-rose-950';
                      badgeStyle = 'bg-rose-600 text-white';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start justify-between gap-3 ${rowStyle}`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span
                            className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${badgeStyle}`}
                          >
                            {letter}
                          </span>
                          <span className="leading-relaxed">{opt}</span>
                        </div>

                        {/* Status Label */}
                        <div className="shrink-0 text-right">
                          {isRealCorrect && (
                            <span className="text-[11px] font-bold text-emerald-700 block">
                              Đáp án đúng ✓
                            </span>
                          )}
                          {isUserChoice && !isRealCorrect && (
                            <span className="text-[11px] font-bold text-rose-700 block">
                              Bạn đã chọn ✗
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Explanation */}
                <div className="p-3.5 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Giải thích chi tiết:</span>
                    <span className="text-[11px] font-medium text-blue-600">{q.citation}</span>
                  </div>
                  <p className="leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={onRetryQuiz}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Làm lại bài</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('history')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-semibold transition-colors"
          >
            <History className="w-4 h-4" />
            <span>Xem lịch sử ôn tập</span>
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Quay về trang chủ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
