import React, { useState } from 'react';
import {
  History,
  RotateCcw,
  Eye,
  FileText,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { QuizSessionResult, ScreenType } from '../../types/index.ts';
import { INITIAL_STUDY_HISTORY } from '../../data/sampleDocument.ts';

interface HistoryScreenProps {
  historyList: QuizSessionResult[];
  onNavigate: (screen: ScreenType) => void;
  onReviewSession: (session: QuizSessionResult) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  historyList = INITIAL_STUDY_HISTORY,
  onNavigate,
  onReviewSession,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = historyList.filter((item) =>
    item.docName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSessions = historyList.length;
  const avgScore =
    totalSessions > 0
      ? Math.round(
          historyList.reduce((acc, curr) => acc + curr.percentage, 0) / totalSessions
        )
      : 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-1">
            <History className="w-3.5 h-3.5" />
            <span>Tiến độ học tập</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Lịch sử ôn tập
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Lưu vết tất cả các lượt làm bài kiểm tra trắc nghiệm và đánh giá độ hiểu bài của bạn.
          </p>
        </div>

        <button
          onClick={() => onNavigate('upload')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors self-start sm:self-auto"
        >
          <span>Ôn tập tài liệu mới</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Tổng lượt ôn tập</span>
          <div className="text-2xl font-extrabold text-slate-900">{totalSessions} lượt</div>
          <p className="text-xs text-slate-500 mt-1">Đã lưu trữ chi tiết câu trả lời</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Điểm trung bình</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-blue-600">{avgScore}%</span>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
              Khá tốt
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Trên tổng các lượt kiểm tra</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Mục tiêu ôn thi</span>
          <div className="text-2xl font-extrabold text-indigo-600">Đạt 85%+</div>
          <p className="text-xs text-slate-500 mt-1">Sẵn sàng cho kỳ thi hết môn</p>
        </div>
      </div>

      {/* History Table Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-900">Danh sách phiên ôn tập gần đây</h2>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm tài liệu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Tài liệu học tập</th>
                <th className="py-3 px-4">Thời gian</th>
                <th className="py-3 px-4">Điểm số</th>
                <th className="py-3 px-4">Tỷ lệ</th>
                <th className="py-3 px-4">Chủ đề cần lưu ý</th>
                <th className="py-3 px-4 rounded-r-xl text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-4 font-semibold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate max-w-[220px]">{item.docName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-500 whitespace-nowrap">{item.date}</td>
                  <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">
                    {item.score}/{item.total} câu
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        item.percentage >= 80
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : item.percentage >= 60
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {item.percentage}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    {item.weakTopics && item.weakTopics.length > 0 ? (
                      <span className="text-xs text-amber-800 line-clamp-1">
                        {item.weakTopics.join(', ')}
                      </span>
                    ) : (
                      <span className="text-xs text-emerald-600 font-medium">Hoàn thành xuất sắc</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => onReviewSession(item)}
                      className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors mr-2"
                    >
                      Xem lại
                    </button>
                    <button
                      onClick={() => onNavigate('quiz')}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      Thi lại
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
