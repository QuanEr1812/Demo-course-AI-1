import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  History,
  LayoutDashboard,
  Bot,
  Camera,
  Menu,
  X,
  GraduationCap,
} from 'lucide-react';
import { ScreenType } from '../types/index.ts';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenChat: () => void;
  onOpenImageModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenChat,
  onOpenImageModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard' as ScreenType, label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'upload' as ScreenType, label: 'Tài liệu', icon: BookOpen },
    { id: 'history' as ScreenType, label: 'Lịch sử ôn tập', icon: History },
  ];

  const handleNavClick = (screen: ScreenType) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Product Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-2.5 text-left group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight text-slate-900">
                    Study<span className="text-blue-600">AI</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
                    Đồ án AI
                  </span>
                </div>
                <p className="text-xs text-slate-500 hidden sm:block">Trợ lý ôn tập & phân tích tài liệu</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentScreen === item.id ||
                (item.id === 'upload' &&
                  ['upload', 'analysis', 'generation', 'quiz', 'results'].includes(currentScreen));

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenImageModal}
              title="Chụp hoặc tải ảnh ghi chép để phân tích"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
            >
              <Camera className="w-3.5 h-3.5 text-slate-600" />
              <span>Phân tích ảnh</span>
            </button>

            <button
              onClick={onOpenChat}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm shadow-blue-500/20 transition-all hover:shadow-md"
            >
              <Bot className="w-4 h-4" />
              <span>Hỏi Trợ lý AI</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenChat}
              className="p-2 text-blue-600 bg-blue-50 rounded-lg"
              aria-label="Trợ lý AI"
            >
              <Bot className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-5 h-5 text-blue-600" />
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => {
                onOpenImageModal();
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg"
            >
              <Camera className="w-4 h-4" />
              Phân tích ảnh
            </button>
            <button
              onClick={() => {
                onOpenChat();
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg"
            >
              <Bot className="w-4 h-4" />
              Trợ lý AI
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
