export type PainArea =
  | 'lombar'
  | 'cervical'
  | 'punhos'
  | 'ombros'
  | 'toracica'
  | 'quadris';

export type PhysicalRestriction =
  | 'hernia_lombar'
  | 'osteopenia_osteoporose'
  | 'tunel_carpo_punho'
  | 'lesao_ombro'
  | 'dor_joelho'
  | 'gravidez_diastase';

export type WorkoutDuration = 15 | 30 | 45;

export type PilatesPhase = 'aquecimento' | 'mobilidade' | 'core' | 'relaxamento';

export type BodyPosition =
  | 'supino'        // Deitado de barriga para cima
  | 'prono'         // Deitado de barriga para baixo
  | 'lateral'       // Deitado de lado
  | 'quatro_apoios' // Em 4 apoios (joelhos e mãos/antebraços)
  | 'sentado'       // Sentado no chão ou colchonete
  | 'em_pe';        // Em pé

export interface PilatesExercise {
  id: string;
  name: string;
  classicalName?: string;
  phase: PilatesPhase;
  position: BodyPosition;
  durationOrReps: {
    15: string;
    30: string;
    45: string;
  };
  durationSeconds: {
    15: number;
    30: number;
    45: number;
  };
  targetMuscles: string[];
  clinicalBenefit: string;
  homeOfficeRelevance: string;
  stepByStep: string[];
  safetyWarning: string;
  contraindicatedFor: PhysicalRestriction[];
  painContraindications?: PainArea[]; // se dor aguda contraindica
  priorityForPain: PainArea[]; // áreas de dor que este exercício mais alivia
  modificationTip?: string;
}

export interface UserAssessment {
  duration: WorkoutDuration;
  pains: PainArea[];
  restrictions: PhysicalRestriction[];
  workPosture: 'muito_sentado' | 'laptop_sem_suporte' | 'mouse_intensivo' | 'misto';
  intensity: 'suave' | 'moderado' | 'dinamico';
}

export interface ClinicalAuditLog {
  excludedCount: number;
  excludedExercises: {
    exerciseName: string;
    reason: string;
    triggeredBy: string;
  }[];
  clinicalFocus: string[];
  safetyObservations: string[];
}

export interface GeneratedRoutine {
  id: string;
  createdAt: string;
  assessment: UserAssessment;
  exercises: PilatesExercise[];
  phaseSummary: Record<PilatesPhase, number>;
  totalEstimatedMinutes: number;
  auditLog: ClinicalAuditLog;
}
