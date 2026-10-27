/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { DashboardScreen } from './components/screens/DashboardScreen.tsx';
import { UploadScreen } from './components/screens/UploadScreen.tsx';
import { AnalysisScreen } from './components/screens/AnalysisScreen.tsx';
import { GenerationScreen } from './components/screens/GenerationScreen.tsx';
import { QuizScreen } from './components/screens/QuizScreen.tsx';
import { ResultsScreen } from './components/screens/ResultsScreen.tsx';
import { HistoryScreen } from './components/screens/HistoryScreen.tsx';
import { GeminiChatDrawer } from './components/GeminiChatDrawer.tsx';
import { ImageAnalysisModal } from './components/ImageAnalysisModal.tsx';
import {
  DocumentItem,
  QuizConfig,
  QuizSessionResult,
  ScreenType,
} from './types/index.ts';
import {
  INITIAL_STUDY_HISTORY,
  SAMPLE_DOCUMENT,
  SAMPLE_QUIZ_QUESTIONS,
} from './data/sampleDocument.ts';
import {
  calculatePercentage,
  calculateScore,
  identifyWeakTopics,
} from './utils/quiz.ts';
import { Bot } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [currentDocument, setCurrentDocument] = useState<DocumentItem>(SAMPLE_DOCUMENT);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({
    // Pre-populate realistic 4/5 answers so if user jumps straight to results it looks great
    1: 1,
    2: 1,
    3: 1,
    4: 1,
  });
  const [historyList, setHistoryList] = useState<QuizSessionResult[]>(INITIAL_STUDY_HISTORY);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Navigate helper with scroll-to-top
  const navigateTo = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDocument = (doc: DocumentItem) => {
    setCurrentDocument(doc);
  };

  const handleAnswerChange = (questionId: number, optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleRetryQuiz = () => {
    setUserAnswers({});
    navigateTo('quiz');
  };

  const handleSubmitQuiz = () => {
    const { score, total } = calculateScore(userAnswers, SAMPLE_QUIZ_QUESTIONS);
    const percentage = calculatePercentage(score, total);
    const weak = identifyWeakTopics(userAnswers, SAMPLE_QUIZ_QUESTIONS);

    const newSession: QuizSessionResult = {
      id: `session-${Date.now()}`,
      docName: currentDocument.name,
      date: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      score,
      total,
      percentage,
      userAnswers: { ...userAnswers },
      timeSpent: '2 phút 15 giây',
      weakTopics: weak,
    };

    setHistoryList([newSession, ...historyList]);
    navigateTo('results');
  };

  const handleReviewSession = (session: QuizSessionResult) => {
    if (session.userAnswers && Object.keys(session.userAnswers).length > 0) {
      setUserAnswers(session.userAnswers);
    }
    navigateTo('results');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Universal Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenImageModal={() => setIsImageModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentScreen === 'dashboard' && (
          <DashboardScreen
            onNavigate={navigateTo}
            onSelectDocument={handleSelectDocument}
          />
        )}

        {currentScreen === 'upload' && (
          <UploadScreen
            currentDocument={currentDocument}
            onSelectDocument={handleSelectDocument}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 'analysis' && (
          <AnalysisScreen
            document={currentDocument}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 'generation' && (
          <GenerationScreen
            document={currentDocument}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 'quiz' && (
          <QuizScreen
            document={currentDocument}
            questions={SAMPLE_QUIZ_QUESTIONS}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            onSubmitQuiz={handleSubmitQuiz}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 'results' && (
          <ResultsScreen
            document={currentDocument}
            questions={SAMPLE_QUIZ_QUESTIONS}
            userAnswers={userAnswers}
            onRetryQuiz={handleRetryQuiz}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 'history' && (
          <HistoryScreen
            historyList={historyList}
            onNavigate={navigateTo}
            onReviewSession={handleReviewSession}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer />

      {/* Floating Quick Action for Gemini AI Assistant */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full shadow-lg shadow-blue-600/30 hover:shadow-xl transition-all hover:scale-105"
          aria-label="Mở Trợ lý AI"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-blue-600" />
          </div>
          <span className="font-semibold text-xs sm:text-sm tracking-tight hidden sm:inline">
            Hỏi Trợ lý AI
          </span>
        </button>
      </div>

      {/* Slide-over Gemini AI Chat Drawer */}
      <GeminiChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        documentName={currentDocument.name}
      />

      {/* Multimodal Photo Understanding Modal */}
      <ImageAnalysisModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />
    </div>
  );
}
