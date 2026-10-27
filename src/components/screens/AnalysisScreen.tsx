import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Cpu,
  GitBranch,
  Network,
  ShieldAlert,
  BookmarkCheck,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { DocumentItem, ScreenType } from '../../types/index.ts';
import {
  CONTENT_SUMMARY_BULLETS,
  DOCUMENT_OVERVIEW,
  KEY_CONCEPTS,
  KEY_TAKEAWAYS,
  MAIN_TOPICS,
  SAMPLE_DOCUMENT,
  SOURCE_REFERENCES,
} from '../../data/sampleDocument.ts';

interface AnalysisScreenProps {
  document?: DocumentItem;
  onNavigate: (screen: ScreenType) => void;
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({
  document = SAMPLE_DOCUMENT,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'topics' | 'concepts' | 'references'>('all');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return Cpu;
      case 'GitBranch':
        return GitBranch;
      case 'Network':
        return Network;
      case 'ShieldAlert':
        return ShieldAlert;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <button
          onClick={() => onNavigate('dashboard')}
          className="hover:text-blue-600 transition-colors"
        >
          Tổng quan
        </button>
        <span className="text-slate-300">/</span>
        <button
          onClick={() => onNavigate('upload')}
          className="hover:text-blue-600 transition-colors"
        >
          Tài liệu
        </button>
        <span className="text-slate-300">/</span>
        <span className="text-blue-600 font-semibold">Phân tích</span>
      </nav>

      {/* Document Header & Status Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-slate-100 pb-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Đã phân tích (mô phỏng)
                </span>
                <span className="text-xs text-slate-500">
                  {document.pages || 42} trang • {document.formattedSize || '1.8 MB'} • {document.uploadDate}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {document.name}
              </h1>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">{DOCUMENT_OVERVIEW.shortDescription}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
            <button
              onClick={() => onNavigate('upload')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors"
            >
              Quay lại tài liệu
            </button>
            <button
              onClick={() => onNavigate('generation')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
            >
              <span>Tạo câu hỏi ôn tập</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 text-center">
            <span className="text-xs text-slate-500 block mb-1">Thời gian đọc ước tính</span>
            <span className="text-sm sm:text-base font-bold text-slate-900">{DOCUMENT_OVERVIEW.readingTime}</span>
          </div>
          <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 text-center">
            <span className="text-xs text-slate-500 block mb-1">Cấu trúc giáo trình</span>
            <span className="text-sm sm:text-base font-bold text-slate-900">{DOCUMENT_OVERVIEW.sectionsCount}</span>
          </div>
          <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 text-center">
            <span className="text-xs text-slate-500 block mb-1">Chủ đề chính</span>
            <span className="text-sm sm:text-base font-bold text-blue-700">4 chuyên đề</span>
          </div>
          <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 text-center">
            <span className="text-xs text-slate-500 block mb-1">Khái niệm cốt lõi</span>
            <span className="text-sm sm:text-base font-bold text-indigo-700">6 khái niệm có trích dẫn</span>
          </div>
        </div>
      </div>

      {/* Responsible AI Disclaimer Banner */}
      <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          <p className="font-semibold text-amber-950 mb-0.5">
            Nguyên mẫu minh họa Đồ án AI — Google Stitch
          </p>
          <p>
            StudyAI là nguyên mẫu minh họa. Nội dung và kết quả được mô phỏng; người học cần kiểm tra thông tin với tài liệu gốc trước khi sử dụng.
          </p>
          <p className="text-xs text-amber-800 mt-1 italic">
            * Kết quả AI cần được đối chiếu với tài liệu gốc.
          </p>
        </div>
      </div>

      {/* Section: Tóm tắt nội dung */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Tóm tắt nội dung</h2>
            <p className="text-xs text-slate-500">Tổng quan tóm lược những luận điểm quan trọng nhất của tài liệu</p>
          </div>
        </div>

        <div className="space-y-3">
          {CONTENT_SUMMARY_BULLETS.map((bullet, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:border-blue-200 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                {idx + 1}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{bullet}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Các chủ đề chính */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Các chủ đề chính</h2>
              <p className="text-xs text-slate-500">4 phân nhánh kiến thức lớn được bóc tách từ tài liệu</p>
            </div>
          </div>
          <span className="text-xs text-slate-500 font-medium">Bấm vào thẻ để xem chi tiết</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MAIN_TOPICS.map((topic) => {
            const IconComponent = getTopicIcon(topic.iconName);
            const isSelected = selectedTopicId === topic.id;

            return (
              <div
                key={topic.id}
                onClick={() => setSelectedTopicId(isSelected ? null : topic.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/40 shadow-sm'
                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{topic.title}</h3>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                      topic.importance === 'Rất quan trọng'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {topic.importance}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">{topic.description}</p>

                <div className="space-y-1.5 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Nội dung trọng tâm:
                  </span>
                  {topic.keyPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section: Khái niệm quan trọng */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Khái niệm quan trọng</h2>
            <p className="text-xs text-slate-500">Định nghĩa cô đọng kèm vị trí trích dẫn số trang chính xác trong tài liệu</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {KEY_CONCEPTS.map((concept) => (
            <div
              key={concept.id}
              className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-slate-50/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">{concept.term}</h4>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 shrink-0">
                    {concept.citation}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{concept.definition}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Trích từ tài liệu gốc</span>
                <span className="text-blue-600 font-medium">Đối chiếu nội dung</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Nội dung cần ghi nhớ */}
      <section className="bg-gradient-to-br from-indigo-900 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-200">
            <BookmarkCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Nội dung cần ghi nhớ (High-Yield Points)</h2>
            <p className="text-xs text-blue-200">5 quy tắc vàng sinh viên cần nắm vững trước khi bước vào phòng thi</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {KEY_TAKEAWAYS.map((takeaway, tIdx) => (
            <div
              key={tIdx}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10"
            >
              <div className="w-6 h-6 rounded-lg bg-blue-500/30 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-blue-200">
                #{tIdx + 1}
              </div>
              <p className="text-sm text-blue-50 leading-relaxed">{takeaway}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Source-reference panel */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ExternalLink className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Bảng đối chiếu nguồn tài liệu (Source-Reference)</h2>
            <p className="text-xs text-slate-500">
              Minh chứng tính minh bạch và khả năng truy vết trang sách của từng khái niệm AI
            </p>
          </div>
        </div>

        <div className="space-y-3.5">
          {SOURCE_REFERENCES.map((ref) => (
            <div
              key={ref.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-600 text-white">
                    {ref.page}
                  </span>
                  <span className="font-semibold text-slate-900 text-sm">{ref.section}</span>
                </div>
                <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  Khái niệm: {ref.conceptTerm}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-1.5">{ref.title}</p>
              <p className="text-xs text-slate-700 italic bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                {ref.excerpt}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Sticky Action Bar */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <button
          onClick={() => onNavigate('upload')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại tài liệu</span>
        </button>

        <button
          onClick={() => onNavigate('generation')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all hover:scale-[1.01]"
        >
          <span>Tạo câu hỏi ôn tập</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
