import React from 'react';
import { Activity, Moon, Sun, Flame, LogIn, Sparkles } from 'lucide-react';
import { UserProfile } from '../types/auth';

interface HeaderProps {
  currentView: 'landing' | 'generator' | 'calendar' | 'ergonomics' | 'principles';
  onNavigate: (view: 'landing' | 'generator' | 'calendar' | 'ergonomics' | 'principles') => void;
  onResetEvaluation: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  currentStreak: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onResetEvaluation,
  isDarkMode,
  onToggleTheme,
  currentUser,
  onOpenAuthModal,
  currentStreak,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Centra Wordmark + Logo */}
        <button
          onClick={() => onNavigate('landing')}
          className="text-left flex items-center gap-2.5 text-stone-900 dark:text-stone-100 hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
        >
          <svg
            viewBox="0 0 1019.1 1080"
            className="h-7 w-auto text-teal dark:text-sky"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M735.5,555.5c-4.8-9.8-4.8-21.2,0-31,2.5-5.2,4.9-10.3,7.3-15.4,55.3-118.6,79.7-227,63.4-295.1-9.7-40.8-31.8-61.5-48.7-71.7-62.2-37.5-145.5.3-227.8,74.3-6.8,6.1-13.5,12.5-20.3,19-20.6,20-41,42.1-60.9,65.6-5.9,7-11.7,14-17.5,21.2-24,29.9-47,61.7-68.4,94.3,0,0-.1.2-.2.2-7.6,11.6-25.3,9.9-30.2-3.1,0-.2-.1-.3-.2-.5-30.7-79.9-41-144.3-32.7-178.7,2-8.2,5-14.2,8.1-16.1,1.3-.8,3.8-1.4,7.5-1.4,13.9,0,45,8.9,95.4,49.9,5.9,4.8,11.9,10,17.9,15.3,19.6-23.3,40-45.5,60.8-65.8-82.3-74-165.6-111.8-227.8-74.3-16.8,10.2-38.9,30.9-48.7,71.7-16.3,68.1,8.1,176.6,63.4,295.1,2.4,5.1,4.8,10.3,7.3,15.4,4.8,9.8,4.8,21.2,0,31-2.5,5.2-4.9,10.3-7.3,15.4-55.3,118.6-79.7,227-63.4,295.1,9.7,40.8,31.8,61.5,48.7,71.7,16.6,10.1,34.8,14.7,54.1,14.7,52.6,0,113.5-34.8,173.7-89-20.8-20.3-41.2-42.5-60.8-65.8-6,5.3-12,10.5-17.9,15.3-63.8,51.8-96.5,52.4-102.9,48.5-3.1-1.9-6.1-7.9-8.1-16.1-8.2-34.5,2-98.8,32.7-178.7v-.3c5.1-13,22.8-14.9,30.4-3.3l.2.2c21.4,32.6,44.4,64.4,68.4,94.3,5.8,7.2,11.6,14.3,17.5,21.2,19.9,23.5,40.3,45.6,60.9,65.6,6.8,6.6,13.5,12.9,20.3,19,60.3,54.2,121.1,89,173.7,89,19.2,0,37.4-4.7,54.1-14.7,16.8-10.2,38.9-30.9,48.7-71.7,16.3-68.2-8.1-176.6-63.4-295.2-2.4-5.1-4.8-10.3-7.3-15.4ZM719.6,845.4c-2,8.2-5,14.2-8.1,16.1-6.4,3.9-39.2,3.3-102.9-48.5-5.9-4.8-11.9-10-17.9-15.3-6.7-6-13.5-12.2-20.3-18.8-20.3-19.7-40.7-41.9-60.9-66.2-5.9-7.1-11.7-14.3-17.6-21.8-23.9-30.5-47.3-63.8-69.4-99.2-5-8-9.9-16-14.6-23.9-.7-1.2-1.4-2.4-2.1-3.6-8.8-14.9-8.8-33.4,0-48.3.7-1.2,1.4-2.4,2.1-3.6,4.7-7.9,9.5-15.9,14.6-23.9,22.1-35.3,45.4-68.6,69.4-99.2,5.8-7.4,11.7-14.7,17.6-21.8,20.2-24.3,40.6-46.6,60.9-66.2,6.8-6.6,13.5-12.8,20.3-18.8,6-5.3,12-10.5,17.9-15.3,50.5-41,81.5-49.9,95.4-49.9s6.2.6,7.5,1.4c3.1,1.9,6.1,7.9,8.1,16.1,8.2,34.5-2,98.8-32.7,178.7,0,.2-.1.3-.2.5-5,13-22.6,14.7-30.2,3.1,0,0-.1-.2-.2-.2-21.4-32.6-44.4-64.4-68.4-94.3-20.3,19.8-40.7,42.2-60.8,66.8,23.9,30.5,47.3,63.8,69.4,99.2h0c5,8,9.9,16,14.6,23.9.7,1.2,1.4,2.4,2.1,3.6,8.8,14.9,8.8,33.4,0,48.3-.7,1.2-1.4,2.4-2.1,3.6-4.7,7.9-9.5,15.9-14.6,23.9-22.1,35.3-45.4,68.6-69.4,99.2,20.1,24.6,40.5,47,60.8,66.8,24-29.9,47-61.7,68.4-94.3l.2-.2c7.7-11.7,25.3-9.8,30.3,3.3v.3c30.8,79.9,41.1,144.3,32.8,178.7Z" />
            <path d="M509.6,1009.8c-259,0-469.8-210.7-469.8-469.8S250.5,70.2,509.6,70.2s469.8,210.7,469.8,469.8-210.7,469.8-469.8,469.8ZM509.6,138.8c-221.2,0-401.2,180-401.2,401.2s180,401.2,401.2,401.2,401.2-180,401.2-401.2-180-401.2-401.2-401.2Z" />
          </svg>
          <span className="font-display text-xl font-bold tracking-[0.14em] uppercase text-ink dark:text-stone-100">
            Centra
          </span>
        </button>

        {/* Zone 2: 4-5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-300">
          <button
            onClick={() => onNavigate('landing')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 cursor-pointer ${
              currentView === 'landing'
                ? 'border-teal dark:border-sky text-teal dark:text-stone-100 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Início / Conheça
          </button>

          <button
            onClick={() => onNavigate('generator')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 cursor-pointer ${
              currentView === 'generator'
                ? 'border-teal dark:border-sky text-teal dark:text-stone-100 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Gerador Clínico
          </button>

          <button
            onClick={() => onNavigate('calendar')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 cursor-pointer flex items-center gap-1.5 ${
              currentView === 'calendar'
                ? 'border-teal dark:border-sky text-teal dark:text-stone-100 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500 fill-current" />
            <span>Ofensiva</span>
            {currentStreak > 0 && (
              <span className="text-[11px] font-mono tabular-nums font-bold text-amber-600 dark:text-amber-400">
                {currentStreak}d
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('ergonomics')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 cursor-pointer ${
              currentView === 'ergonomics'
                ? 'border-teal dark:border-sky text-teal dark:text-stone-100 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Ergonomia
          </button>

          <button
            onClick={() => onNavigate('principles')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 cursor-pointer ${
              currentView === 'principles'
                ? 'border-teal dark:border-sky text-teal dark:text-stone-100 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Fundamentos
          </button>
        </nav>

        {/* Zone 3: 1 primary action + User profile + theme toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label={isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            className="w-9 h-9 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Auth Button */}
          {currentUser ? (
            <button
              onClick={onOpenAuthModal}
              title={`Perfil: ${currentUser.name}`}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center font-bold text-[10px]">
                {currentUser.name.charAt(0)}
              </div>
              <span className="hidden sm:inline max-w-[110px] truncate">{currentUser.name}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Entrar</span>
            </button>
          )}

          <button
            onClick={() => {
              onNavigate('generator');
              onResetEvaluation();
            }}
            className="px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-teal hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-600 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Activity className="w-4 h-4" />
            <span className="hidden sm:inline">Nova Avaliação</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar row */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-stone-200/80 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-xs font-medium text-stone-600 dark:text-stone-300">
        <button
          onClick={() => onNavigate('landing')}
          className={`px-2 py-1 rounded-md ${
            currentView === 'landing' ? 'bg-stone-200 dark:bg-stone-800 text-teal dark:text-sky font-semibold' : ''
          }`}
        >
          Início
        </button>

        <button
          onClick={() => onNavigate('generator')}
          className={`px-2 py-1 rounded-md ${
            currentView === 'generator' ? 'bg-stone-200 dark:bg-stone-800 text-teal dark:text-sky font-semibold' : ''
          }`}
        >
          Prescrição
        </button>

        <button
          onClick={() => onNavigate('calendar')}
          className={`px-2 py-1 rounded-md flex items-center gap-1 ${
            currentView === 'calendar' ? 'bg-stone-200 dark:bg-stone-800 text-teal dark:text-sky font-semibold' : ''
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
          <span>Ofensiva {currentStreak > 0 ? `(${currentStreak}d)` : ''}</span>
        </button>

        <button
          onClick={() => onNavigate('ergonomics')}
          className={`px-2 py-1 rounded-md ${
            currentView === 'ergonomics' ? 'bg-stone-200 dark:bg-stone-800 text-teal dark:text-sky font-semibold' : ''
          }`}
        >
          Ergonomia
        </button>
      </div>
    </header>
  );
};
