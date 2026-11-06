import React from 'react';
import { X, ShieldCheck, AlertTriangle, FileText, CheckCircle2, Info } from 'lucide-react';
import { ClinicalAuditLog, UserAssessment } from '../types/pilates';

interface ClinicalAuditDrawerProps {
  auditLog: ClinicalAuditLog;
  assessment: UserAssessment;
  isOpen: boolean;
  onClose: () => void;
}

export const ClinicalAuditDrawer: React.FC<ClinicalAuditDrawerProps> = ({
  auditLog,
  assessment,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-end">
      <div className="w-full max-w-xl h-full bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50/80 dark:bg-stone-900/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-800 dark:text-teal-400" />
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Relatório de Triagem Biomecânica
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Assessment Summary */}
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 space-y-2">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
              Parâmetros Avaliados
            </h3>
            <div className="space-y-1 text-stone-600 dark:text-stone-300">
              <p>
                <strong className="text-stone-800 dark:text-stone-200">Duração:</strong>{' '}
                {assessment.duration} minutos
              </p>
              <p>
                <strong className="text-stone-800 dark:text-stone-200">Queixas de Tensão:</strong>{' '}
                {assessment.pains.length > 0 ? assessment.pains.join(', ') : 'Nenhuma relatada'}
              </p>
              <p>
                <strong className="text-stone-800 dark:text-stone-200">Restrições Clínicas:</strong>{' '}
                {assessment.restrictions.length > 0
                  ? assessment.restrictions.join(', ')
                  : 'Nenhuma contraindicação prévia'}
              </p>
            </div>
          </div>

          {/* Clinical Focus */}
          <div className="space-y-2">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-800 dark:text-teal-400" />
              <span>Diretrizes e Foco Terapêutico</span>
            </h3>
            <ul className="space-y-1.5 text-stone-600 dark:text-stone-300 list-disc pl-4">
              {auditLog.clinicalFocus.map((focus, idx) => (
                <li key={idx}>{focus}</li>
              ))}
            </ul>
          </div>

          {/* Observations */}
          {auditLog.safetyObservations.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm flex items-center gap-1.5">
                <Info className="w-4 h-4 text-teal-800 dark:text-teal-400" />
                <span>Observações de Prevenção de Lesões</span>
              </h3>
              <ul className="space-y-1.5 text-stone-600 dark:text-stone-300 list-disc pl-4">
                {auditLog.safetyObservations.map((obs, idx) => (
                  <li key={idx}>{obs}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Excluded Exercises List */}
          <div className="space-y-3">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm flex items-center gap-1.5 text-amber-900 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              <span>Movimentos Excluídos pelo Filtro Clínico ({auditLog.excludedCount})</span>
            </h3>

            {auditLog.excludedCount === 0 ? (
              <p className="text-stone-500 dark:text-stone-400 italic">
                Nenhum movimento do banco precisou ser excluído. Todas as variáveis estão seguras.
              </p>
            ) : (
              <div className="space-y-2.5">
                {auditLog.excludedExercises.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-1"
                  >
                    <div className="flex items-center justify-between font-semibold text-stone-900 dark:text-stone-100">
                      <span>{item.exerciseName}</span>
                      <span className="text-[11px] text-amber-800 dark:text-amber-400 font-medium">
                        {item.triggeredBy}
                      </span>
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed">
                      {item.reason}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-teal hover:bg-[#163752] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Fechar Relatório
          </button>
        </div>
      </div>
    </div>
  );
};
