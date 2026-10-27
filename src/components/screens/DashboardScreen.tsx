import React from 'react';
import {
  FileText,
  HelpCircle,
  Clock,
  ArrowRight,
  UploadCloud,
  Cpu,
  CheckCircle2,
  ListOrdered,
  Sparkles,
  BookOpen,
  ChevronRight,
  FileCheck2,
} from 'lucide-react';
import { DocumentItem, ScreenType } from '../../types/index.ts';
import { RECENT_DOCUMENTS, SAMPLE_DOCUMENT } from '../../data/sampleDocument.ts';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectDocument: (doc: DocumentItem) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  onSelectDocument,
}) => {
  const handleStartNew = () => {
    onNavigate('upload');
  };

  const handleViewSample = () => {
    onSelectDocument(SAMPLE_DOCUMENT);
    onNavigate('analysis');
  };

  const steps = [
    {
      num: '01',
      title: 'Tải tài liệu',
      desc: 'Tải giáo trình PDF, bài giảng DOCX hoặc ghi chép môn học.',
      icon: UploadCloud,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      num: '02',
      title: 'Phân tích',
      desc: 'Trích xuất tự động các chủ đề, khái niệm và nội dung trọng tâm.',
      icon: Cpu,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    },
    {
      num: '03',
      title: 'Tạo câu hỏi',
      desc: 'Thiết lập độ khó, số lượng và tạo bộ câu hỏi trắc nghiệm sát đề thi.',
      icon: ListOrdered,
      color: 'bg-sky-50 text-sky-600 border-sky-200',
    },
    {
      num: '04',
      title: 'Ôn tập & Đánh giá',
      desc: 'Làm bài kiểm tra tương tác, xem giải thích chi tiết và bù lấp lỗ hổng.',
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white p-8 sm:p-12 shadow-xl shadow-blue-900/10">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-64 h-64 rounded-full bg-blue-400/20 blur-xl pointer-events-none" />

        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-medium mb-5">
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            <span>Nền tảng hỗ trợ học tập thông minh cho sinh viên</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight mb-4">
            Học thông minh hơn cùng AI
          </h1>

          <p className="text-base sm:text-xl text-blue-100 font-normal leading-relaxed mb-8 max-w-2xl">
            Phân tích tài liệu, tạo câu hỏi và ôn tập hiệu quả trong một quy trình.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleStartNew}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-xl shadow-lg shadow-blue-950/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Bắt đầu với tài liệu mới</span>
              <ArrowRight className="w-5 h-5 text-blue-600" />
            </button>

            <button
              onClick={handleViewSample}
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-blue-800/60 hover:bg-blue-800/90 text-white font-medium rounded-xl border border-white/20 backdrop-blur-sm transition-colors"
            >
              <BookOpen className="w-4 h-4 text-blue-200" />
              <span>Xem tài liệu mẫu</span>
            </button>
          </div>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-blue-200 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-600">Tài liệu đã xử lý</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">12</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              +2 tài liệu tuần này
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Giáo trình, bài giảng và tài liệu PDF</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-blue-200 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-600">Bộ câu hỏi đã tạo</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <HelpCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">48</span>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              180+ câu trắc nghiệm
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Tùy biến từ dễ đến nâng cao</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-blue-200 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-600">Lượt ôn tập</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">156</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Điểm TB: 84%
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Đã hoàn thành và lưu tiến độ</p>
        </div>
      </section>

      {/* Quy trình học tập (Learning Workflow) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Quy trình học tập 4 bước</h2>
          <p className="text-sm text-slate-500 mt-1">
            Quy trình khép kín giúp chuyển hóa tài liệu dài thành kiến thức ghi nhớ sâu
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="relative p-5 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${st.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">
                    {st.num}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1 text-base">{st.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Tài liệu gần đây</h2>
            <p className="text-sm text-slate-500">Các tài liệu học tập bạn đã xử lý trên hệ thống</p>
          </div>
          <button
            onClick={() => onNavigate('upload')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            <span>Tải thêm tài liệu</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {RECENT_DOCUMENTS.map((doc) => {
            const isAnalyzed = doc.status === 'Đã phân tích (mô phỏng)';
            const isProcessing = doc.status === 'Đang xử lý';

            return (
              <div
                key={doc.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/30 transition-all gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-semibold text-slate-900 text-base">{doc.name}</h4>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${
                          isAnalyzed
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : isProcessing
                            ? 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {doc.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{doc.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span>{doc.formattedSize}</span>
                      <span>•</span>
                      <span>{doc.pages} trang</span>
                      <span>•</span>
                      <span>{doc.uploadDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {isAnalyzed ? (
                    <>
                      <button
                        onClick={() => {
                          onSelectDocument(doc);
                          onNavigate('analysis');
                        }}
                        className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        Xem phân tích
                      </button>
                      <button
                        onClick={() => {
                          onSelectDocument(doc);
                          onNavigate('generation');
                        }}
                        className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
                      >
                        Tạo câu hỏi
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        onSelectDocument(SAMPLE_DOCUMENT);
                        onNavigate('analysis');
                      }}
                      className="px-3.5 py-2 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg"
                    >
                      Dùng tài liệu mẫu
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
