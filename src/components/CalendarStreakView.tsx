import React, { useState } from 'react';
import {
  Flame,
  CheckCircle2,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Activity,
  Clock,
  ShieldCheck,
  PlusCircle,
  Play,
  RotateCcw,
} from 'lucide-react';
import { UserProfile, UserStreakInfo, PracticeSessionRecord } from '../types/auth';
import {
  calculateUserStreak,
  getAllSessions,
  toggleManualDayCompletion,
  formatDateKey,
} from '../services/authService';

interface CalendarStreakViewProps {
  user: UserProfile;
  onStartWorkout: () => void;
  onStreakUpdated: () => void;
}

export const CalendarStreakView: React.FC<CalendarStreakViewProps> = ({
  user,
  onStartWorkout,
  onStreakUpdated,
}) => {
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date());
  const [selectedDayKey, setSelectedDayKey] = useState<string>(formatDateKey(new Date()));

  const streakInfo: UserStreakInfo = calculateUserStreak(user.id);
  const allSessions: PracticeSessionRecord[] = getAllSessions(user.id);

  // Month navigation
  const prevMonth = () => {
    setCurrentMonthDate(
      new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonthDate(
      new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1)
    );
  };

  const currentYear = currentMonthDate.getFullYear();
  const currentMonth = currentMonthDate.getMonth();

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  // Calendar generation
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const todayKey = formatDateKey(new Date());

  const daysArray: (number | null)[] = [];
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= totalDaysInMonth; d++) {
    daysArray.push(d);
  }

  const handleToggleDay = (dateKey: string) => {
    toggleManualDayCompletion(user.id, dateKey);
    onStreakUpdated();
  };

  const selectedSessions = allSessions.filter((s) => s.date === selectedDayKey);
  const isSelectedDayCompleted = streakInfo.completedDates.includes(selectedDayKey);

  // Milestone achievements
  const milestones = [
    { target: 1, title: 'Primeiro Alívio', desc: '1 dia de prática', achieved: streakInfo.totalCompletedSessions >= 1 },
    { target: 3, title: 'Desbloqueio Lombar', desc: '3 dias de consistência', achieved: streakInfo.longestStreak >= 3 },
    { target: 7, title: 'Guerreiro Home Office', desc: '7 dias consecutivos', achieved: streakInfo.longestStreak >= 7 },
    { target: 14, title: 'Powerhouse Blindado', desc: '14 dias consecutivos', achieved: streakInfo.longestStreak >= 14 },
    { target: 30, title: 'Mestre da Ergonomia', desc: '30 dias na ofensiva', achieved: streakInfo.longestStreak >= 30 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Streak Hero Card */}
      <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-100 dark:border-stone-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
              <Flame className="w-4 h-4 fill-current text-amber-500" />
              <span>Controle de Ofensiva & Hábito Diário</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-500 dark:text-stone-400">{user.name}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Calendário de Práticas & Ofensiva Postural
            </h1>

            <p className="text-sm text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
              Manter a regularidade do Mat Pilates diário reverte as lesões cumulativas do sedentarismo.
              Acompanhe seus dias ativos, marque treinos e não deixe a sua ofensiva quebrar!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onStartWorkout}
              className="px-5 py-3 bg-teal hover:bg-[#163752] text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer min-h-[44px]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Treinar Hoje para Manter a Ofensiva</span>
            </button>
          </div>
        </div>

        {/* 4 Stats KPI Strip (Zero Pill & Tabular figures) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 space-y-1">
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
              <span>Ofensiva Atual</span>
              <Flame className="w-4 h-4 text-amber-500 fill-current" />
            </div>
            <div className="text-3xl font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100">
              {streakInfo.currentStreak}{' '}
              <span className="text-xs font-sans font-medium text-stone-500 dark:text-stone-400">
                dias
              </span>
            </div>
            <p className="text-[11px] text-teal-800 dark:text-teal-400 font-medium">
              {streakInfo.completedDates.includes(todayKey)
                ? 'Treino de hoje já concluído!'
                : 'Pendente hoje — treine para manter!'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 space-y-1">
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
              <span>Maior Ofensiva</span>
              <Trophy className="w-4 h-4 text-teal-800 dark:text-teal-400" />
            </div>
            <div className="text-3xl font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100">
              {streakInfo.longestStreak}{' '}
              <span className="text-xs font-sans font-medium text-stone-500 dark:text-stone-400">
                dias
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              Seu recorde histórico no app
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 space-y-1">
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
              <span>Total de Sessões</span>
              <Activity className="w-4 h-4 text-teal-800 dark:text-teal-400" />
            </div>
            <div className="text-3xl font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100">
              {streakInfo.totalCompletedSessions}
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              Práticas registradas na conta
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 space-y-1">
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
              <span>Consistência Mês</span>
              <ShieldCheck className="w-4 h-4 text-teal-800 dark:text-teal-400" />
            </div>
            <div className="text-3xl font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100">
              {Math.min(
                100,
                Math.round(
                  (streakInfo.completedDates.filter((d) => d.startsWith(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`)).length /
                    Math.max(1, new Date().getDate())) *
                    100
                )
              )}%
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              Adesão aos dias úteis
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Calendar View & Selected Day Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar Grid (8 cols) */}
        <section className="lg:col-span-8 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-6 shadow-xs">
          {/* Month Header with Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-teal-800 dark:text-teal-400" />
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                {monthNames[currentMonth]} {currentYear}
              </h2>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevMonth}
                aria-label="Mês anterior"
                className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                aria-label="Próximo mês"
                className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of Week Row */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
            <div>Dom</div>
            <div>Seg</div>
            <div>Ter</div>
            <div>Qua</div>
            <div>Qui</div>
            <div>Sex</div>
            <div>Sáb</div>
          </div>

          {/* Month Day Cells */}
          <div className="grid grid-cols-7 gap-2">
            {daysArray.map((dayNum, idx) => {
              if (dayNum === null) {
                return <div key={`empty_${idx}`} className="h-16 rounded-xl bg-transparent" />;
              }

              const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(
                dayNum
              ).padStart(2, '0')}`;
              const isCompleted = streakInfo.completedDates.includes(dateStr);
              const isToday = dateStr === todayKey;
              const isSelected = dateStr === selectedDayKey;

              return (
                <button
                  key={dateStr}
                  type="button"
                  onClick={() => setSelectedDayKey(dateStr)}
                  className={`h-16 p-1.5 rounded-xl border flex flex-col justify-between text-left transition-all cursor-pointer relative min-h-[44px] ${
                    isSelected
                      ? 'ring-2 ring-teal dark:ring-sky border-teal bg-sky-50/50 dark:bg-stone-800/80'
                      : isCompleted
                      ? 'border-steel/50 dark:border-teal-900 bg-sky-50/40 dark:bg-teal-950/30'
                      : 'border-stone-100 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono tabular-nums font-semibold ${
                        isToday
                          ? 'w-6 h-6 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold text-[11px]'
                          : 'text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {dayNum}
                    </span>

                    {isCompleted && (
                      <span title="Treino Concluído">
                        <CheckCircle2 className="w-4 h-4 text-teal-700 dark:text-teal-400 fill-teal-100 dark:fill-teal-950" />
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[10px]">
                    {isCompleted ? (
                      <span className="text-teal-800 dark:text-teal-400 font-semibold truncate">
                        Feito
                      </span>
                    ) : (
                      <span className="text-stone-300 dark:text-stone-600">·</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-teal"></span>
                <span>Dia Atual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                <span>Prática Concluída</span>
              </div>
            </div>
            <span>Clique em qualquer dia para ver ou marcar treino</span>
          </div>
        </section>

        {/* Selected Day Inspector & Manual Check-in (4 cols) */}
        <section className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-4 shadow-xs">
            <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
              <span className="text-xs font-semibold text-teal-800 dark:text-teal-400 uppercase tracking-wider">
                Detalhes do Dia
              </span>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                {selectedDayKey === todayKey ? 'Hoje' : selectedDayKey}
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60">
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  Status da Ofensiva:
                </span>
                <span
                  className={`font-bold flex items-center gap-1 ${
                    isSelectedDayCompleted
                      ? 'text-teal-800 dark:text-teal-400'
                      : 'text-stone-400 dark:text-stone-500'
                  }`}
                >
                  {isSelectedDayCompleted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Concluído</span>
                    </>
                  ) : (
                    <span>Não registrado</span>
                  )}
                </span>
              </div>

              {selectedSessions.length > 0 ? (
                <div className="space-y-2">
                  <span className="text-stone-500 font-semibold block">Sessões Realizadas:</span>
                  {selectedSessions.map((sess) => (
                    <div
                      key={sess.id}
                      className="p-3 rounded-lg border border-teal-100 dark:border-teal-900 bg-teal-50/40 dark:bg-teal-950/20 space-y-1"
                    >
                      <div className="font-bold text-stone-900 dark:text-stone-100">
                        {sess.routineTitle}
                      </div>
                      <div className="text-stone-500 text-[11px] flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{sess.durationMinutes} minutos</span>
                        <span>·</span>
                        <span>{new Date(sess.completedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-stone-500 dark:text-stone-400 leading-relaxed">
                  Nenhuma sessão gravada neste dia. Se você treinou fora da plataforma, pode registrar manualmente abaixo.
                </p>
              )}

              {/* Manual Check-in Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleToggleDay(selectedDayKey)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold border transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    isSelectedDayCompleted
                      ? 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                      : 'border-teal bg-teal hover:bg-[#163752] text-white shadow-xs'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isSelectedDayCompleted
                      ? 'Desmarcar este dia'
                      : 'Marcar como Concluído Manualmente'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Milestone Achievements */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-4 shadow-xs">
            <div className="border-b border-stone-100 dark:border-stone-800 pb-2">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Marcos de Consistência</span>
              </h3>
            </div>

            <div className="space-y-2.5 text-xs">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border flex items-center justify-between gap-3 ${
                    m.achieved
                      ? 'border-teal-200 dark:border-teal-900 bg-teal-50/40 dark:bg-teal-950/20'
                      : 'border-stone-100 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-900/40 opacity-60'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-stone-900 dark:text-stone-100">
                      {m.title}
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400">
                      {m.desc}
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-semibold ${
                      m.achieved
                        ? 'text-teal-800 dark:text-teal-400'
                        : 'text-stone-400'
                    }`}
                  >
                    {m.achieved ? 'Alcançado ✓' : 'Em progresso'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
