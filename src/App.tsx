import React, { useState, useEffect } from 'react';
import {
  WorkoutDuration,
  UserAssessment,
  GeneratedRoutine,
} from './types/pilates';
import { UserProfile, UserStreakInfo } from './types/auth';
import {
  getCurrentUser,
  saveCurrentUser,
  calculateUserStreak,
  recordCompletedSession,
} from './services/authService';
import { generateClinicalPilatesRoutine } from './services/clinicalEngine';
import { Header } from './components/Header';
import { CentraLandingView } from './components/CentraLandingView';
import { ClinicalAssessmentForm } from './components/ClinicalAssessmentForm';
import { WorkoutPlanView } from './components/WorkoutPlanView';
import { GuidedSessionModal } from './components/GuidedSessionModal';
import { ClinicalAuditDrawer } from './components/ClinicalAuditDrawer';
import { ErgonomicsGuide } from './components/ErgonomicsGuide';
import { PilatesPrinciplesView } from './components/PilatesPrinciplesView';
import { PrintPrescriptionView } from './components/PrintPrescriptionView';
import { CalendarStreakView } from './components/CalendarStreakView';
import { AuthModal } from './components/AuthModal';

const DEFAULT_ASSESSMENT: UserAssessment = {
  duration: 30,
  pains: ['lombar', 'cervical'],
  restrictions: [],
  workPosture: 'muito_sentado',
  intensity: 'moderado',
};

export default function App() {
  const [assessment, setAssessment] = useState<UserAssessment>(DEFAULT_ASSESSMENT);
  const [routine, setRoutine] = useState<GeneratedRoutine>(() =>
    generateClinicalPilatesRoutine(DEFAULT_ASSESSMENT)
  );
  const [currentView, setCurrentView] = useState<
    'landing' | 'generator' | 'calendar' | 'ergonomics' | 'principles' | 'print'
  >('landing');
  const [activeTab, setActiveTab] = useState<'form' | 'plan'>('plan');
  const [isGuidedModalOpen, setIsGuidedModalOpen] = useState<boolean>(false);
  const [guidedInitialIndex, setGuidedInitialIndex] = useState<number>(0);
  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState<boolean>(false);
  const [isGeneratingBackend, setIsGeneratingBackend] = useState<boolean>(false);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [streakKey, setStreakKey] = useState<number>(0);

  const streakInfo: UserStreakInfo = currentUser
    ? calculateUserStreak(currentUser.id)
    : {
        currentStreak: 0,
        longestStreak: 0,
        totalCompletedSessions: 0,
        lastCompletedDate: null,
        completedDates: [],
      };

  // Theme Management with class on documentElement
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('centra_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('centra_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('centra_theme', 'light');
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleGenerateRoutine = async () => {
    setIsGeneratingBackend(true);
    try {
      // First attempt backend generation endpoint
      const response = await fetch('/api/routines/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assessment),
      });
      if (response.ok) {
        const backendRoutine = await response.json();
        setRoutine(backendRoutine);
      } else {
        const localRoutine = generateClinicalPilatesRoutine(assessment);
        setRoutine(localRoutine);
      }
    } catch {
      // Offline / immediate fallback
      const localRoutine = generateClinicalPilatesRoutine(assessment);
      setRoutine(localRoutine);
    } finally {
      setIsGeneratingBackend(false);
      setActiveTab('plan');
      setCurrentView('generator');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartSession = (initialIndex: number = 0) => {
    setGuidedInitialIndex(initialIndex);
    setIsGuidedModalOpen(true);
  };

  const handleResetEvaluation = () => {
    setActiveTab('form');
    setCurrentView('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSessionFinished = () => {
    if (currentUser) {
      recordCompletedSession(
        currentUser.id,
        routine.assessment.duration,
        `Sessão Centra Mat Pilates (${routine.assessment.duration} min) - ${routine.exercises.length} movimentos`
      );
      setStreakKey((prev) => prev + 1);
    }
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    saveCurrentUser(user);
    setStreakKey((prev) => prev + 1);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    saveCurrentUser(null);
    setStreakKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col transition-colors selection:bg-teal selection:text-white">
      {/* Top Bar Navigation */}
      <Header
        currentView={currentView === 'print' ? 'generator' : currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          if (view === 'generator') {
            setActiveTab('plan');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onResetEvaluation={handleResetEvaluation}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        currentStreak={streakInfo.currentStreak}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full">
        {currentView === 'landing' ? (
          <CentraLandingView
            onGoToGenerator={() => {
              setCurrentView('generator');
              setActiveTab('form');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToCalendar={() => {
              setCurrentView('calendar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {currentView === 'print' ? (
              <PrintPrescriptionView
                routine={routine}
                onBack={() => setCurrentView('generator')}
              />
            ) : currentView === 'calendar' ? (
              currentUser ? (
                <CalendarStreakView
                  key={streakKey}
                  user={currentUser}
                  onStartWorkout={() => {
                    setCurrentView('generator');
                    setActiveTab('plan');
                    handleStartSession(0);
                  }}
                  onStreakUpdated={() => setStreakKey((prev) => prev + 1)}
                />
              ) : (
                <div className="text-center py-16 space-y-4 max-w-md mx-auto bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
                  <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    Acesse sua conta para ver a ofensiva
                  </h2>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Faça login para acompanhar o calendário diário de práticas, streaks e histórico de alívio.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsAuthModalOpen(true)}
                    className="cursor-pointer px-5 py-2.5 bg-teal text-white rounded-xl text-xs font-semibold hover:bg-teal-600 transition-colors"
                  >
                    Fazer Login ou Criar Conta
                  </button>
                </div>
              )
            ) : currentView === 'ergonomics' ? (
              <ErgonomicsGuide
                onGoToGenerator={() => {
                  setCurrentView('generator');
                  setActiveTab('form');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ) : currentView === 'principles' ? (
              <PilatesPrinciplesView
                onGoToGenerator={() => {
                  setCurrentView('generator');
                  setActiveTab('form');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ) : (
              <div className="space-y-8">
                {/* Generator Sub-navigation (Form vs Generated Plan) */}
                <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('plan')}
                      className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                        activeTab === 'plan'
                          ? 'bg-teal text-white shadow-xs'
                          : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-sky-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      Plano Gerado ({routine.exercises.length} Exercícios)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('form')}
                      className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                        activeTab === 'form'
                          ? 'bg-teal text-white shadow-xs'
                          : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-sky-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      Configurar Parâmetros & Queixas
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    {currentUser && streakInfo.currentStreak > 0 && (
                      <button
                        type="button"
                        onClick={() => setCurrentView('calendar')}
                        className="hidden sm:flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
                      >
                        <span>Ofensiva Ativa: {streakInfo.currentStreak} dias seguidos 🔥</span>
                      </button>
                    )}

                    {activeTab === 'plan' && (
                      <button
                        type="button"
                        onClick={() => setIsAuditDrawerOpen(true)}
                        className="text-xs font-semibold text-teal dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Triagem de Segurança ({routine.auditLog.excludedCount} excluídos)</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Dynamic View: Form or Plan */}
                {activeTab === 'form' ? (
                  <ClinicalAssessmentForm
                    assessment={assessment}
                    onChange={setAssessment}
                    onSubmit={handleGenerateRoutine}
                  />
                ) : (
                  <WorkoutPlanView
                    routine={routine}
                    onStartSession={handleStartSession}
                    onPrint={() => setCurrentView('print')}
                    onEditAssessment={() => setActiveTab('form')}
                    onUpdateRoutine={setRoutine}
                    onOpenAuditLog={() => setIsAuditDrawerOpen(true)}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Guided Practice Modal with Timer and Web Audio Bell */}
      <GuidedSessionModal
        exercises={routine.exercises}
        initialIndex={guidedInitialIndex}
        duration={routine.assessment.duration}
        isOpen={isGuidedModalOpen}
        onClose={() => setIsGuidedModalOpen(false)}
        onSessionCompleted={handleSessionFinished}
      />

      {/* Client Login / Register Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />

      {/* Clinical Audit Drawer */}
      <ClinicalAuditDrawer
        auditLog={routine.auditLog}
        assessment={routine.assessment}
        isOpen={isAuditDrawerOpen}
        onClose={() => setIsAuditDrawerOpen(false)}
      />

      {/* Application Footer (When not on Landing) */}
      {currentView !== 'landing' && (
        <footer className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 mt-auto transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
            <div>
              <span className="font-semibold text-stone-700 dark:text-stone-300">
                Centra Mat Pilates
              </span>{' '}
              — Centralize seu corpo e sua mente em casa.
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setCurrentView('landing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
              >
                Início
              </button>
              <button
                onClick={() => {
                  setCurrentView('calendar');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
              >
                Ofensiva Diária
              </button>
              <button
                onClick={() => {
                  setCurrentView('principles');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
              >
                Princípios Clínicos
              </button>
              <button
                onClick={() => {
                  setCurrentView('ergonomics');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
              >
                Guia Home Office
              </button>
              <span>Alinhamento Biomecânico Seguro</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
