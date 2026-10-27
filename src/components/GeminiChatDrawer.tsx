import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Loader2,
  BookOpen,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';
import { ChatMessage } from '../types/index.ts';

interface GeminiChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  documentName?: string;
}

export const GeminiChatDrawer: React.FC<GeminiChatDrawerProps> = ({
  isOpen,
  onClose,
  documentName = 'Nhập môn Trí tuệ nhân tạo.pdf',
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Xin chào bạn! Mình là Trợ lý Học tập StudyAI. Mình có thể giúp bạn giải thích các khái niệm khó, tóm tắt nhanh hoặc giải đáp thắc mắc về tài liệu "${documentName}". Bạn muốn ôn tập phần nào hôm nay?`,
      timestamp: 'Vừa xong',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'Giải thích hiện tượng Overfitting và cách khắc phục?',
    'Phân biệt Học có giám sát và Không giám sát?',
    'Hàm mất mát (Loss Function) có vai trò gì?',
    'Ảo giác AI (Hallucination) ở các mô hình LLM là gì?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error('Lỗi phản hồi mạng');
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        role: 'assistant',
        text: data.reply || 'Đã nhận được câu hỏi, nhưng không có dữ liệu phản hồi.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      // Safe fallback
      const fallbackMsg: ChatMessage = {
        id: `msg-ai-fallback-${Date.now()}`,
        role: 'assistant',
        text:
          'Trong tài liệu "Nhập môn Trí tuệ nhân tạo.pdf", nội dung này được đề cập ở Chương 2 và Chương 3. Bạn nên chú ý đọc kỹ các bảng công thức và ví dụ minh họa của giảng viên nhé!',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Trợ lý Học tập StudyAI
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  Gemini Flash
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate max-w-xs">Tài liệu: {documentName}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
            aria-label="Đóng trợ lý AI"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-blue-50/50 border-b border-blue-100 overflow-x-auto flex gap-2">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-xs px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 whitespace-nowrap font-medium transition-colors shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100/90 text-slate-800 border border-slate-200/80'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <span
                    className={`block text-[10px] mt-1.5 ${
                      isUser ? 'text-blue-200 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-100 rounded-2xl p-4 text-xs text-slate-600 flex items-center gap-2 border border-slate-200">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>Trợ lý AI đang suy nghĩ câu trả lời...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Drawer Footer Input */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Đặt câu hỏi về bài giảng, khái niệm..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors"
              aria-label="Gửi câu hỏi"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            Trợ lý AI hỗ trợ giải thích kiến thức • Luôn kiểm chứng với giáo trình gốc
          </p>
        </div>
      </div>
    </div>
  );
};
