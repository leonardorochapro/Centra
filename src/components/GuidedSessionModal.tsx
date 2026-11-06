import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  ShieldAlert,
  CheckCircle,
  Wind,
  Repeat,
  Sparkles,
} from 'lucide-react';
import { PilatesExercise, WorkoutDuration } from '../types/pilates';
import { playGentleBell } from '../utils/audioChime';

interface GuidedSessionModalProps {
  exercises: PilatesExercise[];
  initialIndex?: number;
  duration: WorkoutDuration;
  isOpen: boolean;
  onClose: () => void;
  onSessionCompleted?: () => void;
}

export const GuidedSessionModal: React.FC<GuidedSessionModalProps> = ({
  exercises,
  initialIndex = 0,
  duration,
  isOpen,
  onClose,
  onSessionCompleted,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [totalExerciseTime, setTotalExerciseTime] = useState<number>(60);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [breathState, setBreathState] = useState<'inspirar' | 'expirar'>('inspirar');

  const currentExercise = exercises[currentIndex];

  // Initialize timer for current exercise
  useEffect(() => {
    if (!isOpen || !currentExercise) return;
    const exerciseSecs = currentExercise.durationSeconds[duration] || 60;
    setTimeLeft(exerciseSecs);
    setTotalExerciseTime(exerciseSecs);
    setIsRunning(false);
  }, [currentIndex, isOpen, currentExercise, duration]);

  // Breathing cycle animation timer (4s inhale / 5s exhale)
  useEffect(() => {
    if (!isRunning || !isOpen || isCompleted) return;
    const interval = setInterval(() => {
      setBreathState((prev) => (prev === 'inspirar' ? 'expirar' : 'inspirar'));
    }, 4500);
    return () => clearInterval(interval);
  }, [isRunning, isOpen, isCompleted]);

  // Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0 && !isCompleted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleExerciseFinish();
            return 0;
          }
          if (soundEnabled && prev <= 4 && prev > 1) {
            playGentleBell('tick');
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft, isCompleted, soundEnabled]);

  const handleExerciseFinish = () => {
    if (soundEnabled) {
      playGentleBell('next');
    }
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsRunning(false);
      setIsCompleted(true);
      if (soundEnabled) {
        playGentleBell('complete');
      }
      onSessionCompleted?.();
    }
  };

  const handleTogglePlay = () => {
    if (!isRunning && soundEnabled && timeLeft === totalExerciseTime) {
      playGentleBell('start');
    }
    setIsRunning(!isRunning);
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsRunning(false);
      setIsCompleted(true);
      if (soundEnabled) {
        playGentleBell('complete');
      }
      onSessionCompleted?.();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleResetCurrent = () => {
    const exerciseSecs = currentExercise.durationSeconds[duration] || 60;
    setTimeLeft(exerciseSecs);
    setIsRunning(false);
  };

  if (!isOpen) return null;

  const progressPercent = ((totalExerciseTime - timeLeft) / totalExerciseTime) * 100;
  const overallProgressPercent = ((currentIndex + (totalExerciseTime - timeLeft) / totalExerciseTime) / exercises.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-900/80">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-teal-800 dark:text-teal-400">
              Sessão Guiada de Mat Pilates
            </span>
            <span className="text-xs text-stone-400 dark:text-stone-500">·</span>
            <span className="text-xs font-mono tabular-nums text-stone-600 dark:text-stone-300">
              Exercício {currentIndex + 1} de {exercises.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
              title={soundEnabled ? 'Silenciar sinos' : 'Ativar sinos suaves'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Progress Line */}
        <div className="w-full h-1 bg-stone-100 dark:bg-stone-800">
          <div
            className="h-full bg-teal-700 transition-all duration-300 ease-out"
            style={{ width: `${Math.min(overallProgressPercent, 100)}%` }}
          />
        </div>

        {/* Content Area */}
        {isCompleted ? (
          <div className="p-8 sm:p-12 text-center space-y-6 my-auto">
            <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                Sessão Concluída com Sucesso!
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Excelente trabalho. Você descomprimiu a coluna, ativou o Powerhouse e restabeleceu
                o tônus muscular dos flexores e extensores pós-horas na cadeira.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 max-w-md mx-auto text-xs text-left space-y-2">
              <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                Dicas para o restante do seu expediente:
              </span>
              <ul className="space-y-1 text-stone-600 dark:text-stone-300 list-disc pl-4">
                <li>Beba um copo cheio de água fresca para reidratar os discos intervertebrais.</li>
                <li>Verifique a altura da tela: o topo do monitor deve ficar na linha dos olhos.</li>
                <li>Próxima micro-pausa: em 50 a 60 minutos, levante-se por 2 minutos.</li>
              </ul>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setCurrentIndex(0);
                  setIsCompleted(false);
                  setIsRunning(false);
                }}
                className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                Repetir Sessão
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-teal hover:bg-[#163752] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Voltar à Visão Geral
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            {/* Exercise Title and Phase */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-teal-800 dark:text-teal-400 uppercase tracking-wider">
                  Fase: {currentExercise.phase}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                  {currentExercise.name}
                </h2>
                {currentExercise.classicalName && (
                  <p className="text-xs text-stone-400 dark:text-stone-500 italic mt-0.5">
                    {currentExercise.classicalName}
                  </p>
                )}
              </div>

              {/* Timer & Dosage Dial */}
              <div className="flex items-center gap-4 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 p-3.5 rounded-xl shrink-0">
                <div className="text-center min-w-[70px]">
                  <div className="text-3xl font-mono font-bold tabular-nums text-stone-900 dark:text-stone-100">
                    {formatTime(timeLeft)}
                  </div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                    Restante
                  </span>
                </div>
                <div className="border-l border-stone-200 dark:border-stone-700 pl-3 space-y-0.5 text-xs text-stone-600 dark:text-stone-300">
                  <div className="font-semibold text-stone-900 dark:text-stone-100">
                    {currentExercise.durationOrReps[duration]}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">
                    Execução cadenciada
                  </div>
                </div>
              </div>
            </div>

            {/* Breathing Guide Synchronizer */}
            <div className="p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <Wind className="w-5 h-5 text-teal-800 dark:text-teal-400 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-teal-950 dark:text-teal-200 block">
                    Cadência Respiratória Pilates
                  </span>
                  <p className="text-xs text-teal-900/80 dark:text-teal-300/80">
                    {breathState === 'inspirar'
                      ? 'Inspirar pelo nariz: expanda as costelas laterais sem tensionar o pescoço.'
                      : 'Expirar pela boca: feche o zíper abdominal, ativando o transverso e períneo.'}
                  </p>
                </div>
              </div>

              <span
                className={`text-xs font-bold px-3 py-1 rounded-md transition-all uppercase tracking-wider ${
                  breathState === 'inspirar'
                    ? 'bg-sky text-ink font-bold'
                    : 'bg-teal text-white'
                }`}
              >
                {breathState === 'inspirar' ? 'Inspire' : 'Expire'}
              </span>
            </div>

            {/* Step-by-Step execution list */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                Passo a Passo da Execução:
              </h3>
              <ol className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed list-decimal pl-5">
                {currentExercise.stepByStep.map((step, idx) => (
                  <li key={idx} className="pl-1">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Mandatory Postural Safety Alert */}
            <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
                <ShieldAlert className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                <span>Alerta Biomecânico de Segurança Postural</span>
              </div>
              <p className="text-xs leading-relaxed text-amber-900/90 dark:text-amber-200/90">
                {currentExercise.safetyWarning}
              </p>
            </div>
          </div>
        )}

        {/* Modal Controls Footer */}
        {!isCompleted && (
          <div className="p-4 sm:p-5 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/90 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-3.5 py-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
            >
              <SkipBack className="w-4 h-4" />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleResetCurrent}
                className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Reiniciar tempo do exercício"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleTogglePlay}
                className="px-6 py-2.5 bg-teal hover:bg-[#163752] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs flex items-center gap-2 transition-all min-w-[120px] justify-center cursor-pointer"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>{timeLeft === totalExerciseTime ? 'Iniciar' : 'Continuar'}</span>
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="px-3.5 py-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1.5 transition-colors"
            >
              <span className="hidden sm:inline">
                {currentIndex < exercises.length - 1 ? 'Próximo' : 'Concluir'}
              </span>
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
