import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  FileCheck2,
  Sparkles,
  Loader2,
  Info,
  Layers,
  Calendar,
} from 'lucide-react';
import { DocumentItem, ScreenType } from '../../types/index.ts';
import { SAMPLE_DOCUMENT } from '../../data/sampleDocument.ts';

interface UploadScreenProps {
  currentDocument: DocumentItem;
  onSelectDocument: (doc: DocumentItem) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({
  currentDocument,
  onSelectDocument,
  onNavigate,
}) => {
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem>(currentDocument || SAMPLE_DOCUMENT);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingStep, setAnalyzingStep] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectSample = () => {
    setSelectedDoc(SAMPLE_DOCUMENT);
    onSelectDocument(SAMPLE_DOCUMENT);
  };

  const handleCustomFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const ext = file.name.split('.').pop()?.toUpperCase() || 'PDF';
      const customDoc: DocumentItem = {
        id: `custom-${Date.now()}`,
        name: file.name,
        type: ext,
        size: file.size,
        formattedSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        pages: Math.max(5, Math.min(80, Math.round(file.size / 50000))),
        uploadDate: new Date().toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'Đã phân tích (mô phỏng)',
        topicsCount: 4,
        questionsGenerated: 5,
        description:
          'Tài liệu người dùng tải lên được phân tích cấu trúc bài giảng, trích xuất thực thể và tạo ngân hàng câu hỏi ôn tập.',
      };
      setSelectedDoc(customDoc);
      onSelectDocument(customDoc);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setAnalyzingStep('1/3: Đang trích xuất cấu trúc văn bản & tiêu đề chương...');

    setTimeout(() => {
      setAnalyzingStep('2/3: Đang tổng hợp các khái niệm cốt lõi & lập bảng trích dẫn...');
    }, 900);

    setTimeout(() => {
      setAnalyzingStep('3/3: Hoàn tất phân tích dữ liệu học tập!');
    }, 1700);

    setTimeout(() => {
      setIsAnalyzing(false);
      onNavigate('analysis');
    }, 2200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('dashboard')}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Trang chủ</span>
        </button>

        <span className="text-xs text-slate-500 font-medium">Bước 1 / 4 trong quy trình ôn tập</span>
      </div>

      {/* Screen Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Tải tài liệu học tập
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-1.5">
          Tải lên tài liệu hoặc chọn giáo trình mẫu có sẵn để trải nghiệm quy trình phân tích và tạo câu hỏi tự động.
        </p>
      </div>

      {/* Upload Drag & Drop Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) {
            handleSelectSample();
          }
        }}
        className={`relative rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center transition-all bg-white ${
          isDragging
            ? 'border-blue-500 bg-blue-50/50 scale-[1.01]'
            : 'border-slate-300 hover:border-blue-400 bg-white/80'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt,image/*"
          className="hidden"
          onChange={handleCustomFileChange}
        />

        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1">
          Kéo thả tài liệu vào đây hoặc chọn tệp từ thiết bị
        </h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-5">
          Hệ thống hỗ trợ các định dạng bài giảng phổ biến của trường đại học
        </p>

        {/* Format Chips */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            PDF
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            DOCX
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            TXT
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Ảnh chụp ghi chép
          </span>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>Chọn tài liệu</span>
        </button>
      </div>

      {/* Preset Sample Document Selection Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md">
                  Tài liệu mẫu chuẩn cho Đồ án
                </span>
                <span className="text-xs text-slate-500">Khuyên dùng thử nghiệm</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                {SAMPLE_DOCUMENT.name}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Giáo trình đầy đủ gồm 42 trang: Lịch sử AI, Học có giám sát, Mạng Nơ-ron và Hiện tượng Ảo giác.
              </p>
            </div>
          </div>

          <button
            onClick={handleSelectSample}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all shrink-0 ${
              selectedDoc.name === SAMPLE_DOCUMENT.name
                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/30'
                : 'bg-white text-blue-700 hover:bg-blue-50 border border-blue-300'
            }`}
          >
            {selectedDoc.name === SAMPLE_DOCUMENT.name ? '✓ Đã chọn tài liệu mẫu' : 'Chọn tài liệu này'}
          </button>
        </div>
      </div>

      {/* Document Information Panel */}
      {selectedDoc && (
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Thông tin tài liệu đã chọn</h3>
                <p className="text-xs text-slate-500">Sẵn sàng để đưa vào luồng phân tích trí tuệ nhân tạo</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5" />
              Đã tải thành công
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block mb-1">Tên tài liệu</span>
              <span className="text-sm font-bold text-slate-900 truncate block" title={selectedDoc.name}>
                {selectedDoc.name}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block mb-1">Định dạng</span>
              <span className="text-sm font-bold text-slate-900 uppercase">
                {selectedDoc.type} Document
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block mb-1">Dung lượng</span>
              <span className="text-sm font-bold text-slate-900">{selectedDoc.formattedSize}</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block mb-1">Số trang ước tính</span>
              <span className="text-sm font-bold text-slate-900">{selectedDoc.pages} trang</span>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-blue-50/60 border border-blue-100 rounded-xl p-3 text-xs text-blue-900">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              Mô phỏng đồ án: Dữ liệu phân tích và câu hỏi được xây dựng bám sát cấu trúc của tệp <strong>{selectedDoc.name}</strong> nhằm minh họa luồng học tập hoàn chỉnh.
            </span>
          </div>
        </div>
      )}

      {/* Analysis Loading Modal Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">Đang phân tích tài liệu...</h3>
              <p className="text-xs text-slate-500 mt-1">Hệ thống đang trích xuất kiến thức trọng tâm</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-700 font-medium border border-slate-200">
              {analyzingStep}
            </div>

            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse w-4/5" />
            </div>

            <p className="text-[11px] text-slate-400">Vui lòng chờ trong giây lát (mô phỏng đồ án AI)</p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition-colors"
        >
          Quay lại
        </button>

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01]"
        >
          <span>Phân tích tài liệu</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
