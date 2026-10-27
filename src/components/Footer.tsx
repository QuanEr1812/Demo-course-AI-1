import React from 'react';
import { AlertCircle, GraduationCap, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-semibold text-amber-950">Lưu ý về Trách nhiệm AI (Responsible AI): </span>
            StudyAI là nguyên mẫu minh họa. Nội dung và kết quả được mô phỏng; người học cần kiểm tra thông tin với tài liệu gốc trước khi sử dụng.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-slate-700">StudyAI Prototype</span>
            <span>•</span>
            <span>Đồ án môn học Nền tảng Trí tuệ Nhân tạo (AI Foundations)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Môi trường học thuật mô phỏng
            </span>
            <span>Phiên bản 1.0.0 (Google Stitch Demo)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
