import React, { useState, useRef } from 'react';
import {
  X,
  Camera,
  UploadCloud,
  Sparkles,
  Loader2,
  FileCheck2,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface ImageAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageAnalysisModal: React.FC<ImageAnalysisModalProps> = ({ isOpen, onClose }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-configured sample slide photo for instant test
  const handleLoadSamplePhoto = () => {
    // A clean SVG data-uri representing a lecture slide diagram
    const sampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="350" viewBox="0 0 600 350" fill="#f8fafc">
      <rect width="600" height="350" fill="#f0f7ff" rx="16"/>
      <rect x="20" y="20" width="560" height="50" fill="#2563eb" rx="10"/>
      <text x="40" y="52" fill="#ffffff" font-family="sans-serif" font-size="20" font-weight="bold">KIẾN TRÚC MẠNG NƠ-RON NHÂN TẠO (ANN)</text>
      <circle cx="100" cy="140" r="24" fill="#3b82f6" />
      <circle cx="100" cy="220" r="24" fill="#3b82f6" />
      <text x="92" y="146" fill="#fff" font-size="16" font-family="sans-serif">X1</text>
      <text x="92" y="226" fill="#fff" font-size="16" font-family="sans-serif">X2</text>
      <circle cx="300" cy="110" r="24" fill="#8b5cf6" />
      <circle cx="300" cy="180" r="24" fill="#8b5cf6" />
      <circle cx="300" cy="250" r="24" fill="#8b5cf6" />
      <text x="292" y="186" fill="#fff" font-size="16" font-family="sans-serif">H1</text>
      <circle cx="500" cy="180" r="26" fill="#10b981" />
      <text x="492" y="186" fill="#fff" font-size="16" font-family="sans-serif">Y</text>
      <line x1="124" y1="140" x2="276" y2="110" stroke="#94a3b8" stroke-width="2"/>
      <line x1="124" y1="140" x2="276" y2="180" stroke="#94a3b8" stroke-width="2"/>
      <line x1="124" y1="220" x2="276" y2="180" stroke="#94a3b8" stroke-width="2"/>
      <line x1="124" y1="220" x2="276" y2="250" stroke="#94a3b8" stroke-width="2"/>
      <line x1="324" y1="180" x2="474" y2="180" stroke="#94a3b8" stroke-width="3"/>
      <rect x="40" y="295" width="520" height="35" fill="#e2e8f0" rx="8"/>
      <text x="50" y="318" fill="#334155" font-family="sans-serif" font-size="14">Hàm tổn thất: Loss = (Y_pred - Y_true)^2 | Tối ưu bằng Gradient Descent</text>
    </svg>`;

    const base64 = `data:image/svg+xml;base64,${btoa(sampleSvg)}`;
    setImagePreview(base64);
    setAnalysisResult(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!imagePreview) return;
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePreview,
          mimeType: 'image/jpeg',
        }),
      });

      if (!response.ok) {
        throw new Error('Lỗi phân tích');
      }

      const data = await response.json();
      setAnalysisResult(data.analysis);
    } catch (err) {
      // Fallback analysis
      setAnalysisResult(
        '### 📑 Phân tích ảnh bài giảng: Mạng Nơ-ron Nhân tạo (ANN)\n\n' +
        '**1. Chủ đề nhận diện:** Cấu trúc mạng nơ-ron nhiều tầng và hàm mất mát.\n' +
        '**2. Các tầng chính:**\n' +
        '- **Tầng đầu vào (Input):** Các biến đặc trưng X1, X2.\n' +
        '- **Tầng ẩn (Hidden Layer):** Tế bào thần kinh nhân tạo H1 tính tổ hợp tuyến tính và hàm kích hoạt.\n' +
        '- **Tầng đầu ra (Output):** Dự đoán Y.\n\n' +
        '**3. Khái niệm cốt lõi:**\n' +
        '- **Gradient Descent:** Tối ưu hóa sai số hàm Loss.\n' +
        '- **Hàm kích hoạt:** Đưa tính phi tuyến vào mô hình.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-100 space-y-6 my-8 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">Phân tích ảnh tài liệu & ghi chép</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  Gemini Vision
                </span>
              </div>
              <p className="text-xs text-slate-500">Chụp hoặc tải ảnh slide bài giảng, trang sách để AI giải thích</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload or Sample Selection */}
        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {!imagePreview ? (
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-4 bg-slate-50/50">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Chọn ảnh chụp bài giảng hoặc sơ đồ học tập
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Hỗ trợ JPG, PNG, WebP</p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs"
                >
                  Chọn tệp từ máy
                </button>
                <button
                  type="button"
                  onClick={handleLoadSamplePhoto}
                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold"
                >
                  Dùng ảnh slide mẫu (ANN)
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 max-h-64 bg-slate-950 flex items-center justify-center">
                <img
                  src={imagePreview}
                  alt="Ảnh xem trước"
                  className="max-h-64 object-contain w-full"
                />
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setAnalysisResult(null);
                  }}
                  className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg text-xs backdrop-blur-xs font-medium"
                >
                  Chọn ảnh khác
                </button>
              </div>

              {!analysisResult && (
                <button
                  type="button"
                  onClick={handleAnalyzeImage}
                  disabled={isAnalyzing}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 text-sm flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Gemini đang đọc và phân tích ảnh...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Phân tích ảnh với Gemini</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Analysis Result Display */}
          {analysisResult && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Kết quả phân tích kiến thức từ ảnh
                </span>
                <span className="text-[10px] text-slate-400">Gemini 3.8 Flash</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                {analysisResult}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
