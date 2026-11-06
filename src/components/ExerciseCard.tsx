import React, { useState } from 'react';
import {
  ShieldAlert,
  Clock,
  Repeat,
  Sparkles,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Play,
  Layers,
  HeartPulse,
  Info,
} from 'lucide-react';
import { PilatesExercise, WorkoutDuration, PilatesPhase } from '../types/pilates';

interface ExerciseCardProps {
  exercise: PilatesExercise;
  index: number;
  duration: WorkoutDuration;
  onReplace?: () => void;
  onStartSingle?: () => void;
  hasAlternatives?: boolean;
}

const PHASE_LABELS: Record<PilatesPhase, { title: string; subtitle: string; order: string }> = {
  aquecimento: {
    title: 'Fase 1: Aquecimento & Respiração',
    subtitle: 'Conexão com o Powerhouse e desaceleração neuromuscular',
    order: '01',
  },
  mobilidade: {
    title: 'Fase 2: Mobilidade Articular',
    subtitle: 'Descompressão espinhal vértebra por vértebra e abertura torácica',
    order: '02',
  },
  core: {
    title: 'Fase 3: Ativação do Core & Força Estática',
    subtitle: 'Estabilidade lombo-pélvica e fortalecimento da cadeia posterior',
    order: '03',
  },
  relaxamento: {
    title: 'Fase 4: Relaxamento & Restauro',
    subtitle: 'Descompressão discal passiva e transição para o parassimpático',
    order: '04',
  },
};

const POSITION_NAMES: Record<string, string> = {
  supino: 'Decúbito Dorsal (Costas no chão)',
  prono: 'Decúbito Ventral (Barriga para baixo)',
  lateral: 'Decúbito Lateral (De lado)',
  quatro_apoios: 'Quatro Apoios',
  sentado: 'Sentado com Alinhamento Axial',
  em_pe: 'Em Pé',
};

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  index,
  duration,
  onReplace,
  onStartSingle,
  hasAlternatives = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const phaseMeta = PHASE_LABELS[exercise.phase];
  const prescribedDosage = exercise.durationOrReps[duration];
  const prescribedSeconds = exercise.durationSeconds[duration];

  return (
    <article className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 transition-all hover:border-stone-300 dark:hover:border-stone-700 shadow-2xs overflow-hidden">
      {/* Top Header of Card */}
      <div className="p-5 sm:p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1 min-w-0">
            {/* Clean unboxed metadata with separators (Strict Zero-Pill discipline) */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <span className="font-semibold text-teal-800 dark:text-teal-400">
                Exercício {String(index + 1).padStart(2, '0')}
              </span>
              <span aria-hidden="true">·</span>
              <span>{phaseMeta.title.split(':')[1]?.trim() || phaseMeta.title}</span>
              <span aria-hidden="true">·</span>
              <span>{POSITION_NAMES[exercise.position] || exercise.position}</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-2 pt-0.5">
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                {exercise.name}
              </h3>
              {exercise.classicalName && (
                <span className="text-xs font-mono text-stone-400 dark:text-stone-500 italic">
                  ({exercise.classicalName})
                </span>
              )}
            </div>
          </div>

          {/* Quick Actions (Replace & Guided Start) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {hasAlternatives && onReplace && (
              <button
                type="button"
                onClick={onReplace}
                title="Substituir por outro exercício seguro da mesma fase"
                className="p-2 text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
            {onStartSingle && (
              <button
                type="button"
                onClick={onStartSingle}
                title="Praticar com cronômetro guiado"
                className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Timer</span>
              </button>
            )}
          </div>
        </div>

        {/* Clinical Dosage Strip */}
        <div className="mt-4 p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
            <Repeat className="w-4 h-4 text-teal-800 dark:text-teal-400 shrink-0" />
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              Prescrição Clínica:
            </span>
            <span>{prescribedDosage}</span>
          </div>

          <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 font-mono tabular-nums">
            <Clock className="w-3.5 h-3.5" />
            <span>~{Math.round(prescribedSeconds / 60 * 10) / 10} min ({prescribedSeconds}s)</span>
          </div>
        </div>

        {/* Home Office Relevance & Clinical Benefit */}
        <div className="mt-3 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            Foco Ocupacional:
          </span>{' '}
          {exercise.homeOfficeRelevance}
        </div>
      </div>

      {/* Accordion Toggle / Steps Section */}
      <div className="border-t border-stone-100 dark:border-stone-800 px-5 sm:px-6 py-3 bg-stone-50/40 dark:bg-stone-900/40 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
        >
          <span>Instruções de Execução & Segurança Postural</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <div className="text-[11px] text-stone-500 dark:text-stone-400">
          {exercise.targetMuscles.slice(0, 2).join(', ')}
        </div>
      </div>

      {/* Expanded Content: Step-by-Step + Mandatory Postural Safety Warning */}
      {isExpanded && (
        <div className="p-5 sm:p-6 pt-3 space-y-4 text-xs border-t border-stone-100 dark:border-stone-800">
          {/* Step-by-Step execution */}
          <div className="space-y-2">
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider text-[11px]">
              Instruções de Execução (Passo a Passo Guiado)
            </h4>
            <ol className="space-y-2 text-stone-700 dark:text-stone-300 leading-relaxed list-decimal pl-4">
              {exercise.stepByStep.map((step, sIdx) => (
                <li key={sIdx} className="pl-1">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* MANDATORY POSTURAL SAFETY WARNING (Prevenção de Lesões) */}
          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-950 dark:text-amber-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-xs text-amber-900 dark:text-amber-300">
              <ShieldAlert className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
              <span>Aviso de Segurança Postural & Prevenção de Lesões</span>
            </div>
            <p className="text-xs leading-relaxed text-amber-900/90 dark:text-amber-200/90">
              {exercise.safetyWarning}
            </p>
          </div>

          {/* Modification Tip if available */}
          {exercise.modificationTip && (
            <div className="flex items-start gap-2 text-stone-600 dark:text-stone-300 bg-stone-100/70 dark:bg-stone-800/70 p-3 rounded-lg text-xs">
              <Info className="w-4 h-4 text-teal-800 dark:text-teal-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  Adaptação / Variação Segura:
                </span>{' '}
                {exercise.modificationTip}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
};
