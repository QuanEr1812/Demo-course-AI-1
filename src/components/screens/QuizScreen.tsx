import React, { useState, useEffect } from 'react';
import {
  FileText,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  Send,
  RotateCcw,
  Flag,
} from 'lucide-react';
import { DocumentItem, QuizQuestion, ScreenType } from '../../types/index.ts';
import { SAMPLE_DOCUMENT, SAMPLE_QUIZ_QUESTIONS } from '../../data/sampleDocument.ts';

interface QuizScreenProps {
  document?: DocumentItem;
  questions?: QuizQuestion[];
  userAnswers: Record<number, number>;
  onAnswerChange: (questionId: number, optionIndex: number) => void;
  onSubmitQuiz: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  document = SAMPLE_DOCUMENT,
  questions = SAMPLE_QUIZ_QUESTIONS,
  userAnswers,
  onAnswerChange,
  onSubmitQuiz,
  onNavigate,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex] || questions[0];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(userAnswers).filter(
    (k) => userAnswers[Number(k)] !== undefined
  ).length;

  const currentAnswer = userAnswers[currentQ.id];
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (optIndex: number) => {
    onAnswerChange(currentQ.id, optIndex);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleConfirmSubmit = () => {
    setShowSubmitModal(false);
    onSubmitQuiz();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Quiz Top Header Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                Đang làm bài
              </span>
              <span className="text-xs text-slate-500 font-medium truncate max-w-xs sm:max-w-md">
                Tài liệu: {document.name}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Bài ôn tập của bạn
            </h1>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>{formatTimer(secondsElapsed)}</span>
            </div>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Nộp bài</span>
            </button>
          </div>
        </div>

        {/* Progress bar & indicator */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>
              Câu {currentIndex + 1} / {totalQuestions}
            </span>
            <span>
              Đã trả lời {answeredCount}/{totalQuestions} câu ({Math.round((answeredCount / totalQuestions) * 100)}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        {/* Question Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              #{currentIndex + 1}
            </span>
            <span className="text-xs font-semibold text-slate-600 px-2.5 py-1 rounded-lg bg-slate-100">
              {currentQ.topic}
            </span>
            <span className="text-xs font-semibold text-blue-700 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200">
              Mức độ: {currentQ.difficulty}
            </span>
          </div>

          <span className="text-xs text-slate-400 font-medium">
            Trích xuất từ: {currentQ.citation}
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
          {currentQ.question}
        </h2>

        {/* 4 Selectable Answers */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((option, optIdx) => {
            const letter = String.fromCharCode(65 + optIdx);
            const isSelected = currentAnswer === optIdx;

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50/60 bg-white'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                  }`}
                >
                  {letter}
                </div>
                <div className="flex-1 text-sm sm:text-base font-medium text-slate-800 leading-relaxed pt-0.5">
                  {option}
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-colors ${
                    isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons: Câu trước / Câu tiếp theo / Nộp bài */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-colors ${
              currentIndex === 0
                ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Câu trước</span>
          </button>

          {currentIndex < totalQuestions - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              <span>Câu tiếp theo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowSubmitModal(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Nộp bài</span>
            </button>
          )}
        </div>
      </div>

      {/* Question Number Navigator */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500">
          <span>Bảng điều hướng câu hỏi:</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" /> Đã chọn
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-slate-200 inline-block" /> Chưa chọn
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {questions.map((q, qIdx) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const isCurrent = qIdx === currentIndex;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(qIdx)}
                className={`w-10 h-10 rounded-xl text-sm font-bold flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'ring-2 ring-blue-600 ring-offset-2 bg-blue-600 text-white shadow-xs'
                    : isAnswered
                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {qIdx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Confirmation Dialog Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Send className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900">Xác nhận nộp bài?</h3>
              <p className="text-sm text-slate-500 mt-1">
                Bạn đã trả lời <strong className="text-blue-600">{answeredCount}</strong> trên tổng số{' '}
                <strong>{totalQuestions}</strong> câu hỏi.
              </p>
            </div>

            {answeredCount < totalQuestions && (
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Bạn còn <strong>{totalQuestions - answeredCount}</strong> câu hỏi chưa chọn đáp án. Các câu chưa trả lời sẽ được tính là 0 điểm.
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition-colors"
              >
                Kiểm tra lại
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/25 transition-all"
              >
                Xác nhận nộp bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
