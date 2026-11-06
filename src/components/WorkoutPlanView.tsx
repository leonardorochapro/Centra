import React, { useState } from 'react';
import {
  Play,
  Printer,
  SlidersHorizontal,
  ShieldCheck,
  Clock,
  Flame,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { GeneratedRoutine, PilatesExercise, PilatesPhase } from '../types/pilates';
import { ExerciseCard } from './ExerciseCard';
import { getAlternativeExercises } from '../services/clinicalEngine';

interface WorkoutPlanViewProps {
  routine: GeneratedRoutine;
  onStartSession: (initialIndex?: number) => void;
  onPrint: () => void;
  onEditAssessment: () => void;
  onUpdateRoutine: (updatedRoutine: GeneratedRoutine) => void;
  onOpenAuditLog: () => void;
}

export const WorkoutPlanView: React.FC<WorkoutPlanViewProps> = ({
  routine,
  onStartSession,
  onPrint,
  onEditAssessment,
  onUpdateRoutine,
  onOpenAuditLog,
}) => {
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<'todas' | PilatesPhase>('todas');
  const [substitutingExerciseId, setSubstitutingExerciseId] = useState<string | null>(null);

  const phases: PilatesPhase[] = ['aquecimento', 'mobilidade', 'core', 'relaxamento'];

  const phaseNames: Record<PilatesPhase, string> = {
    aquecimento: 'Aquecimento & Respiração',
    mobilidade: 'Mobilidade Espinhal',
    core: 'Ativação do Core',
    relaxamento: 'Relaxamento & Restauro',
  };

  const handleReplaceExercise = (oldExercise: PilatesExercise, newExercise: PilatesExercise) => {
    const updatedList = routine.exercises.map((ex) => (ex.id === oldExercise.id ? newExercise : ex));
    onUpdateRoutine({
      ...routine,
      exercises: updatedList,
    });
    setSubstitutingExerciseId(null);
  };

  const filteredExercises =
    selectedPhaseFilter === 'todas'
      ? routine.exercises
      : routine.exercises.filter((ex) => ex.phase === selectedPhaseFilter);

  const routineExerciseIds = routine.exercises.map((e) => e.id);

  return (
    <div className="space-y-8">
      {/* Top Clinical Header & Action Bar */}
      <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-100 dark:border-stone-800">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <span className="font-semibold text-teal-800 dark:text-teal-400">
                Prescrição de Mat Pilates
              </span>
              <span aria-hidden="true">·</span>
              <span>Saúde Ocupacional Home Office</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{routine.exercises.length} Exercícios</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">~{routine.totalEstimatedMinutes} minutos</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Plano Personalizado de Alívio & Equilíbrio Postural
            </h1>

            <p className="text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
              Sequência biomecanicamente estruturada para combater as tensões de teletrabalho. Movimentos contraindicados
              foram removidos com base na triagem clínica de suas queixas e restrições.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onPrint}
              className="px-4 py-2.5 rounded-xl border border-steel/40 dark:border-stone-700 hover:bg-sky-50 dark:hover:bg-stone-800 text-ink dark:text-stone-200 text-xs font-semibold flex items-center gap-2 transition-colors min-h-[44px] cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / PDF</span>
            </button>

            <button
              type="button"
              onClick={onEditAssessment}
              className="px-4 py-2.5 rounded-xl border border-steel/40 dark:border-stone-700 hover:bg-sky-50 dark:hover:bg-stone-800 text-ink dark:text-stone-200 text-xs font-semibold flex items-center gap-2 transition-colors min-h-[44px] cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Ajustar Parâmetros</span>
            </button>

            <button
              type="button"
              onClick={() => onStartSession(0)}
              className="px-5 py-2.5 bg-teal hover:bg-[#163752] text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 transition-all min-h-[44px] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Iniciar Sessão Guiada</span>
            </button>
          </div>
        </div>

        {/* Clinical Safety Strip & Audit Indicator */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-800 dark:text-teal-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                Filtro de Contraindicações
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {routine.auditLog.excludedCount > 0 ? (
                  <>
                    <strong className="font-semibold text-teal-900 dark:text-teal-300">
                      {routine.auditLog.excludedCount} exercícios
                    </strong>{' '}
                    foram excluídos automaticamente para proteger sua coluna e articulações.
                  </>
                ) : (
                  'Todos os exercícios do protocolo foram validados como seguros para suas respostas.'
                )}
              </p>
              {routine.auditLog.excludedCount > 0 && (
                <button
                  type="button"
                  onClick={onOpenAuditLog}
                  className="text-[11px] font-semibold text-teal-800 dark:text-teal-400 hover:underline pt-1 block cursor-pointer"
                >
                  Ver relatório de exclusão clínica →
                </button>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 flex items-start gap-3">
            <Clock className="w-5 h-5 text-teal-800 dark:text-teal-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                Sequência Lógica de Pilates
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                4 fases essenciais: Aquecimento ({routine.phaseSummary.aquecimento}), Mobilidade ({routine.phaseSummary.mobilidade}), Core ({routine.phaseSummary.core}) e Relaxamento ({routine.phaseSummary.relaxamento}).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-teal-800 dark:text-teal-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                Alinhamento Ocupacional
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Prioriza desativação de compensações da cadeira: ativa glúteos e abdômen profundo, abrindo peito e aliviando a nuca.
              </p>
            </div>
          </div>
        </div>

        {/* Phase Filter Tabs (Interactive Filter Buttons - Allowed by Constitution) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100 dark:border-stone-800">
          <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 mr-2">
            Filtrar por Fase:
          </span>
          <button
            type="button"
            onClick={() => setSelectedPhaseFilter('todas')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer min-h-[36px] ${
              selectedPhaseFilter === 'todas'
                ? 'bg-teal text-white font-semibold shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:bg-sky-50 dark:hover:bg-stone-800'
            }`}
          >
            Todas as Fases ({routine.exercises.length})
          </button>
          {phases.map((phase) => {
            const count = routine.phaseSummary[phase];
            return (
              <button
                key={phase}
                type="button"
                onClick={() => setSelectedPhaseFilter(phase)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer min-h-[36px] ${
                  selectedPhaseFilter === phase
                    ? 'bg-teal text-white font-semibold shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-sky-50 dark:hover:bg-stone-800'
                }`}
              >
                {phaseNames[phase]} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* Alternative Exercise Selection Modal / Drawer */}
      {substitutingExerciseId && (
        <div className="p-5 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/70 dark:bg-teal-950/40 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-teal-950 dark:text-teal-200">
              Escolha uma alternativa segura para substituição
            </h3>
            <button
              type="button"
              onClick={() => setSubstitutingExerciseId(null)}
              className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            >
              Cancelar
            </button>
          </div>

          {(() => {
            const currentEx = routine.exercises.find((e) => e.id === substitutingExerciseId);
            if (!currentEx) return null;
            const alternatives = getAlternativeExercises(
              currentEx,
              routine.assessment,
              routineExerciseIds
            );

            if (alternatives.length === 0) {
              return (
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  Não há outros exercícios alternativos compatíveis com suas restrições para esta fase específica.
                </p>
              );
            }

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {alternatives.map((alt) => (
                  <div
                    key={alt.id}
                    className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-teal-100 dark:border-teal-900 text-xs space-y-2"
                  >
                    <div className="font-bold text-stone-900 dark:text-stone-100">
                      {alt.name}
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed">
                      {alt.clinicalBenefit}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleReplaceExercise(currentEx, alt)}
                      className="px-3 py-1.5 bg-teal-800 hover:bg-teal-900 text-white rounded-md text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Selecionar este exercício
                    </button>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* Exercise Cards List */}
      <div className="space-y-4">
        {filteredExercises.map((exercise, idx) => {
          const originalIndex = routine.exercises.findIndex((e) => e.id === exercise.id);
          const alternatives = getAlternativeExercises(
            exercise,
            routine.assessment,
            routineExerciseIds
          );

          return (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              index={originalIndex >= 0 ? originalIndex : idx}
              duration={routine.assessment.duration}
              hasAlternatives={alternatives.length > 0}
              onReplace={() => setSubstitutingExerciseId(exercise.id)}
              onStartSingle={() => onStartSession(originalIndex >= 0 ? originalIndex : idx)}
            />
          );
        })}
      </div>

      {/* Bottom Sticky Action Banner */}
      <div className="p-5 rounded-2xl bg-stone-900 dark:bg-stone-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-stone-100">
            Pronto para iniciar sua prática agora?
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            O modo guiado orienta passo a passo com cronômetro, áudio suave de transição e instruções de respiração.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onStartSession(0)}
          className="w-full sm:w-auto px-6 py-3 bg-teal hover:bg-[#163752] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Começar Prática do Início</span>
        </button>
      </div>
    </div>
  );
};
