import React from 'react';
import { GeneratedRoutine, PilatesPhase } from '../types/pilates';
import { ShieldCheck, Clock, FileCheck, ArrowLeft, Printer } from 'lucide-react';

interface PrintPrescriptionViewProps {
  routine: GeneratedRoutine;
  onBack: () => void;
}

const PHASE_NAMES: Record<PilatesPhase, string> = {
  aquecimento: 'Fase 1: Aquecimento & Conexão Respiratória',
  mobilidade: 'Fase 2: Mobilidade Articular e Descompressão',
  core: 'Fase 3: Ativação do Core e Estabilidade Funcional',
  relaxamento: 'Fase 4: Relaxamento Miofascial e Restauro',
};

export const PrintPrescriptionView: React.FC<PrintPrescriptionViewProps> = ({
  routine,
  onBack,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const phases: PilatesPhase[] = ['aquecimento', 'mobilidade', 'core', 'relaxamento'];

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4">
      {/* Action controls (Hidden during print) */}
      <div className="no-print flex items-center justify-between p-4 bg-stone-100 dark:bg-stone-800 rounded-xl">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Plano Interativo</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="px-4 py-2 bg-teal hover:bg-[#163752] text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs cursor-pointer transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir / Salvar como PDF</span>
        </button>
      </div>

      {/* Printable Sheet */}
      <div className="bg-white text-stone-900 p-8 sm:p-12 rounded-2xl border border-stone-200 shadow-sm space-y-8 font-sans">
        {/* Prescription Header */}
        <div className="border-b-2 border-stone-800 pb-6 flex items-start justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-teal">
                CENTRA · MAT PILATES
              </span>
              <span className="text-stone-400">|</span>
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                Fisioterapia & Saúde Ocupacional
              </span>
            </div>
            <h1 className="text-2xl font-bold text-stone-900">
              Prescrição de Mat Pilates Personalizada
            </h1>
            <p className="text-xs text-stone-500">
              Protocolo para Teletrabalho e Prevenção de DORT / LER
            </p>
          </div>

          <div className="text-right text-xs text-stone-500 space-y-0.5 font-mono">
            <div>Data: {new Date(routine.createdAt).toLocaleDateString('pt-BR')}</div>
            <div>Duração: {routine.totalEstimatedMinutes} minutos</div>
            <div>Ref: {routine.id}</div>
          </div>
        </div>

        {/* Clinical Profile Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-stone-50 rounded-xl text-xs border border-stone-200">
          <div>
            <span className="text-stone-500 block font-medium">Tempo Selecionado:</span>
            <strong className="text-stone-900 text-sm font-bold">
              {routine.assessment.duration} minutos
            </strong>
          </div>
          <div>
            <span className="text-stone-500 block font-medium">Regiões com Queixas:</span>
            <strong className="text-stone-900">
              {routine.assessment.pains.length > 0 ? routine.assessment.pains.join(', ') : 'Nenhuma'}
            </strong>
          </div>
          <div>
            <span className="text-stone-500 block font-medium">Restrições Mapeadas:</span>
            <strong className="text-stone-900">
              {routine.assessment.restrictions.length > 0
                ? routine.assessment.restrictions.join(', ')
                : 'Livre de contraindicações'}
            </strong>
          </div>
          <div>
            <span className="text-stone-500 block font-medium">Filtro de Segurança:</span>
            <strong className="text-stone-900">
              {routine.auditLog.excludedCount} exercícios excluídos
            </strong>
          </div>
        </div>

        {/* Exercises grouped by phase */}
        <div className="space-y-6">
          {phases.map((phase) => {
            const phaseExercises = routine.exercises.filter((e) => e.phase === phase);
            if (phaseExercises.length === 0) return null;

            return (
              <div key={phase} className="space-y-3">
                <div className="border-b border-stone-300 pb-1 flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-teal-900">
                    {PHASE_NAMES[phase]}
                  </h2>
                  <span className="text-xs text-stone-500 font-mono">
                    {phaseExercises.length} exercício(s)
                  </span>
                </div>

                <div className="space-y-4">
                  {phaseExercises.map((exercise, idx) => (
                    <div
                      key={exercise.id}
                      className="p-4 rounded-lg border border-stone-200 space-y-2 text-xs"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-bold text-stone-900">
                            {idx + 1}. {exercise.name}
                          </h3>
                          {exercise.classicalName && (
                            <span className="text-[11px] text-stone-500 italic">
                              {exercise.classicalName}
                            </span>
                          )}
                        </div>
                        <span className="font-semibold text-stone-800 bg-stone-100 px-2.5 py-1 rounded text-[11px] shrink-0">
                          {exercise.durationOrReps[routine.assessment.duration]}
                        </span>
                      </div>

                      {/* Execution steps */}
                      <div className="space-y-1 text-stone-700 leading-relaxed">
                        <strong className="text-stone-800">Passo a passo:</strong>
                        <ol className="list-decimal pl-4 space-y-0.5">
                          {exercise.stepByStep.map((step, sIdx) => (
                            <li key={sIdx}>{step}</li>
                          ))}
                        </ol>
                      </div>

                      {/* Safety warning */}
                      <div className="p-2.5 bg-amber-50 rounded border border-amber-200 text-amber-900 font-medium">
                        <strong>Aviso de Segurança Postural:</strong> {exercise.safetyWarning}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Clinical Disclaimer */}
        <div className="pt-6 border-t border-stone-200 text-[11px] text-stone-500 space-y-1">
          <p>
            <strong>Aviso de Rigor Clínico:</strong> Este programa foi gerado por cruzamento
            biomecânico para profilaxia e alívio de desconfortos no teletrabalho. Em caso de dor aguda,
            irradiação para membros inferiores ou formigamento persistente, interrompa a prática e
            consulte um fisioterapeuta ou médico ortopedista.
          </p>
          <p className="font-mono text-[10px]">
            CENTRA · Plataforma Clínica de Mat Pilates & Saúde Ocupacional
          </p>
        </div>
      </div>
    </div>
  );
};
