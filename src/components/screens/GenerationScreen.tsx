import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckSquare,
  Square,
  HelpCircle,
  Eye,
  EyeOff,
  SlidersHorizontal,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { DocumentItem, QuizConfig, QuizQuestion, ScreenType } from '../../types/index.ts';
import { MAIN_TOPICS, SAMPLE_DOCUMENT, SAMPLE_QUIZ_QUESTIONS } from '../../data/sampleDocument.ts';

interface GenerationScreenProps {
  document?: DocumentItem;
  onNavigate: (screen: ScreenType) => void;
  onConfigSave?: (config: QuizConfig) => void;
}

export const GenerationScreen: React.FC<GenerationScreenProps> = ({
  document = SAMPLE_DOCUMENT,
  onNavigate,
  onConfigSave,
}) => {
  // Configuration state
  const [questionType, setQuestionType] = useState<'Trắc nghiệm' | 'Đúng / Sai' | 'Câu hỏi ngắn'>(
    'Trắc nghiệm'
  );
  const [difficulty, setDifficulty] = useState<'Dễ' | 'Trung bình' | 'Khó'>('Trung bình');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    MAIN_TOPICS.map((t) => t.title)
  );

  // Flow states
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [hasGenerated, setHasGenerated] = useState(true); // show preview initially or after generate
  const [showAnswers, setShowAnswers] = useState(false);

  const toggleTopic = (title: string) => {
    if (selectedTopics.includes(title)) {
      if (selectedTopics.length > 1) {
        setSelectedTopics(selectedTopics.filter((t) => t !== title));
      }
    } else {
      setSelectedTopics([...selectedTopics, title]);
    }
  };

  const handleGenerateQuestions = () => {
    setIsGenerating(true);
    setGenerationStep('AI đang phân tích tài liệu và cấu trúc đề thi...');

    setTimeout(() => {
      setGenerationStep('Đang khởi tạo các phương án nhiễu & viết giải thích chi tiết...');
    }, 800);

    setTimeout(() => {
      setGenerationStep('Hoàn tất bộ 5 câu hỏi ôn tập chất lượng cao!');
    }, 1500);

    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      if (onConfigSave) {
        onConfigSave({
          questionType,
          difficulty,
          questionCount,
          selectedTopics,
        });
      }
    }, 1900);
  };

  const handleStartQuiz = () => {
    onNavigate('quiz');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('analysis')}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Phân tích</span>
        </button>

        <span className="text-xs text-slate-500 font-medium">Bước 3 / 4: Thiết lập & Tạo bộ đề</span>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Tạo bộ câu hỏi ôn tập
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-1.5">
          Tùy chỉnh thông số để AI tự động trích lọc và sinh ngân hàng câu hỏi kiểm tra từ tài liệu.
        </p>
      </div>

      {/* Selected Source Document Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Tài liệu nguồn đã chọn:</span>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">{document.name}</h4>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500">
          <span>{document.pages || 42} trang</span>
          <span>•</span>
          <span className="font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Đã sẵn sàng tạo đề
          </span>
        </div>
      </div>

      {/* Configuration Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <SlidersHorizontal className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">Tùy chỉnh thông số bộ câu hỏi</h2>
        </div>

        {/* 1. Question Type */}
        <div className="space-y-2.5">
          <label className="text-sm font-bold text-slate-800 block">1. Định dạng câu hỏi</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(['Trắc nghiệm', 'Đúng / Sai', 'Câu hỏi ngắn'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setQuestionType(type)}
                className={`py-3 px-4 rounded-xl text-sm font-semibold border text-center transition-all ${
                  questionType === type
                    ? 'bg-blue-50 text-blue-700 border-blue-500 ring-2 ring-blue-500/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {type}
                {type === 'Trắc nghiệm' && (
                  <span className="block text-[11px] font-normal text-slate-500 mt-0.5">
                    4 phương án A, B, C, D
                  </span>
                )}
                {type === 'Đúng / Sai' && (
                  <span className="block text-[11px] font-normal text-slate-500 mt-0.5">
                    Kiểm tra định đề lý thuyết
                  </span>
                )}
                {type === 'Câu hỏi ngắn' && (
                  <span className="block text-[11px] font-normal text-slate-500 mt-0.5">
                    Tự luận giải thích ngắn gọn
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Difficulty */}
        <div className="space-y-2.5">
          <label className="text-sm font-bold text-slate-800 block">2. Mức độ khó</label>
          <div className="grid grid-cols-3 gap-3">
            {(['Dễ', 'Trung bình', 'Khó'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficulty(level)}
                className={`py-2.5 px-4 rounded-xl text-sm font-semibold border text-center transition-all ${
                  difficulty === level
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Question Count */}
        <div className="space-y-2.5">
          <label className="text-sm font-bold text-slate-800 block">3. Số lượng câu hỏi</label>
          <div className="grid grid-cols-3 gap-3">
            {[5, 10, 15].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setQuestionCount(count)}
                className={`py-2.5 px-4 rounded-xl text-sm font-semibold border text-center transition-all ${
                  questionCount === count
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {count} câu
                {count === 5 && (
                  <span className="block text-[11px] font-normal opacity-80">Khuyên dùng thử nghiệm</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Topic selection with checkboxes */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-800 block">4. Giới hạn chủ đề ôn tập</label>
            <span className="text-xs text-slate-500">Đã chọn {selectedTopics.length}/4 chuyên đề</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MAIN_TOPICS.map((topic) => {
              const isChecked = selectedTopics.includes(topic.title);
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => toggleTopic(topic.title)}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                    isChecked
                      ? 'bg-blue-50/50 border-blue-300'
                      : 'bg-white border-slate-200 opacity-60'
                  }`}
                >
                  <div className="mt-0.5 text-blue-600">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">{topic.title}</h5>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{topic.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action button to generate */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onNavigate('analysis')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-semibold"
          >
            Quay lại phân tích
          </button>

          <button
            type="button"
            onClick={handleGenerateQuestions}
            disabled={isGenerating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl shadow-md shadow-blue-500/25 transition-all"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang tạo câu hỏi...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-blue-200" />
                <span>Tạo câu hỏi</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Simulated Loading State Indicator */}
      {isGenerating && (
        <div className="bg-white rounded-3xl p-8 border border-blue-200 shadow-md text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">AI đang tạo câu hỏi từ tài liệu...</h3>
            <p className="text-xs text-slate-500 mt-1">{generationStep}</p>
          </div>
          <div className="w-64 max-w-full mx-auto bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-1.5 rounded-full animate-pulse w-3/4" />
          </div>
        </div>
      )}

      {/* Question Preview Section */}
      {hasGenerated && !isGenerating && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-800">
                  Xem trước bộ câu hỏi ({SAMPLE_QUIZ_QUESTIONS.length} câu)
                </span>
                <span className="text-xs text-slate-500">Mức độ: {difficulty}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Bộ đề ôn tập: {document.name}
              </h3>
            </div>

            {/* Quick Actions Header */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAnswers(!showAnswers)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
              >
                {showAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showAnswers ? 'Ẩn đáp án' : 'Xem đáp án'}</span>
              </button>

              <button
                type="button"
                onClick={handleStartQuiz}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Làm bài ngay</span>
              </button>
            </div>
          </div>

          {/* Demonstration Data Alert */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Lưu ý minh họa:</strong> Đây là các câu hỏi mẫu được xây dựng bám sát chương trình giảng dạy của tài liệu nhằm mục đích thử nghiệm giao diện đồ án, không phải câu hỏi từ hệ thống thi cử thực tế.
            </span>
          </div>

          {/* List of Preview Questions */}
          <div className="space-y-5">
            {SAMPLE_QUIZ_QUESTIONS.map((q, idx) => (
              <div
                key={q.id}
                className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/40 hover:bg-white hover:border-blue-200 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{q.topic}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {q.citation}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {q.question}
                </h4>

                <div className="grid grid-cols-1 gap-2 pt-1">
                  {q.options.map((opt, oIdx) => {
                    const isCorrect = oIdx === q.correctAnswer;
                    const letter = String.fromCharCode(65 + oIdx);

                    return (
                      <div
                        key={oIdx}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-colors ${
                          showAnswers && isCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                            showAnswers && isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Inline Answer & Explanation when revealed */}
                {showAnswers && (
                  <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1 animate-in fade-in">
                    <p className="font-bold text-emerald-950">
                      ✓ Đáp án đúng: {String.fromCharCode(65 + q.correctAnswer)}
                    </p>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Bottom Bar */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chỉnh sửa thiết lập</span>
            </button>

            <button
              type="button"
              onClick={handleStartQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Làm bài ngay</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
