import {
  PilatesExercise,
  PilatesPhase,
  WorkoutDuration,
  UserAssessment,
  GeneratedRoutine,
  ClinicalAuditLog,
  PhysicalRestriction,
  PainArea,
} from '../types/pilates';
import { PILATES_EXERCISES_DATABASE } from '../data/pilatesExercises';

const RESTRICTION_LABELS: Record<PhysicalRestriction, string> = {
  hernia_lombar: 'Hérnia de Disco / Protrusão Lombar',
  osteopenia_osteoporose: 'Osteopenia / Osteoporose',
  tunel_carpo_punho: 'Túnel do Carpo / Sobrecarga nos Punhos',
  lesao_ombro: 'Lesão de Ombro / Impacto Subacromial',
  dor_joelho: 'Condromalácia / Dor Patelar ao Ajoelhar',
  gravidez_diastase: 'Gestação / Diástase Abdominal',
};

const PAIN_LABELS: Record<PainArea, string> = {
  lombar: 'Região Lombar / Pélvica',
  cervical: 'Cervical e Trapézio Superior',
  punhos: 'Punhos e Antebraços',
  ombros: 'Ombros e Cintura Escapular',
  toracica: 'Coluna Torácica e Costelas',
  quadris: 'Quadris e Flexores da Coxa',
};

const RESTRICTION_CLINICAL_RATIONALE: Record<PhysicalRestriction, string> = {
  hernia_lombar: 'Exclusão rigorosa de exercícios com flexão lombar sob carga ou torção com compressão axial, priorizando alinhamento neutro e descompressão discal.',
  osteopenia_osteoporose: 'Remoção de flexões torácicas profundas forçadas e rotações bruscas para preservar a integridade da densidade mineral óssea das vértebras.',
  tunel_carpo_punho: 'Vetado apoio de peso direto com punhos estendidos em 90 graus (como 4 apoios com palmas abertas ou prancha alta), substituído por suporte em antebraço ou decúbito dorsal.',
  lesao_ombro: 'Eliminadas sobrecargas em amplitudes acima de 90 graus ou pranchas com instabilidade escapular que possam irritar o manguito rotador.',
  dor_joelho: 'Retiradas posições de apoio direto sobre a patela sem amortecimento ou flexões extremas com carga articular.',
  gravidez_diastase: 'Vetadas posições em decúbito ventral (prono) e pranchas com alta pressão intra-abdominal que possam abrir a linha alba.',
};

export function generateClinicalPilatesRoutine(assessment: UserAssessment): GeneratedRoutine {
  const auditLog: ClinicalAuditLog = {
    excludedCount: 0,
    excludedExercises: [],
    clinicalFocus: [],
    safetyObservations: [],
  };

  // 1. Identificar foco clínico com base nas queixas
  if (assessment.pains.length > 0) {
    const focusPains = assessment.pains.map((p) => PAIN_LABELS[p]).join(', ');
    auditLog.clinicalFocus.push(`Alívio direcionado para as queixas: ${focusPains}.`);
  } else {
    auditLog.clinicalFocus.push('Manutenção postural preventiva para rotina de teletrabalho (Home Office).');
  }

  // 2. Filtragem biomecânica de contraindicações
  const safeExercises: PilatesExercise[] = [];

  for (const exercise of PILATES_EXERCISES_DATABASE) {
    let isContraindicated = false;
    let contraindicationReason = '';
    let triggeredBy = '';

    // Checar restrições articulares
    for (const restriction of assessment.restrictions) {
      if (exercise.contraindicatedFor.includes(restriction)) {
        isContraindicated = true;
        triggeredBy = RESTRICTION_LABELS[restriction];
        contraindicationReason = RESTRICTION_CLINICAL_RATIONALE[restriction];
        break;
      }
    }

    // Checar dores agudas específicas que contraindicam movimentos específicos
    if (!isContraindicated && exercise.painContraindications) {
      for (const pain of assessment.pains) {
        if (exercise.painContraindications.includes(pain)) {
          isContraindicated = true;
          triggeredBy = `Queixa de Dor Aguda em: ${PAIN_LABELS[pain]}`;
          contraindicationReason = `Movimento potencialmente irritativo para a fase de dor atual relatada no segmento ${PAIN_LABELS[pain].toLowerCase()}.`;
          break;
        }
      }
    }

    if (isContraindicated) {
      auditLog.excludedCount++;
      auditLog.excludedExercises.push({
        exerciseName: exercise.name,
        reason: contraindicationReason,
        triggeredBy,
      });
    } else {
      safeExercises.push(exercise);
    }
  }

  // 3. Montar observações de segurança
  if (assessment.restrictions.length > 0) {
    auditLog.safetyObservations.push(
      `Triagem de segurança ativa: ${assessment.restrictions.length} restrição(ões) física(s) mapeada(s). Movimentos incompatíveis foram rigorosamente expurgados.`
    );
  }
  if (assessment.pains.includes('cervical')) {
    auditLog.safetyObservations.push(
      'Atenção cervical: Todos os exercícios priorizam apoio neutro da cabeça e evitam tração de pescoço contra a gravidade.'
    );
  }
  if (assessment.pains.includes('punhos') || assessment.restrictions.includes('tunel_carpo_punho')) {
    auditLog.safetyObservations.push(
      'Proteção distal: Exercícios estruturados com apoio sobre antebraços ou em decúbito dorsal sem sobrecarga nos punhos.'
    );
  }
  if (assessment.pains.includes('lombar') || assessment.restrictions.includes('hernia_lombar')) {
    auditLog.safetyObservations.push(
      'Blindagem lombar: Foco prioritário na estabilidade neutra, ativação do transverso e descompressão axial discal.'
    );
  }

  // 4. Selecionar exercícios por fases lógicas do Pilates
  const phases: PilatesPhase[] = ['aquecimento', 'mobilidade', 'core', 'relaxamento'];
  const exercisesByPhase: Record<PilatesPhase, PilatesExercise[]> = {
    aquecimento: [],
    mobilidade: [],
    core: [],
    relaxamento: [],
  };

  for (const ex of safeExercises) {
    exercisesByPhase[ex.phase].push(ex);
  }

  // Algoritmo de priorização por pontuação de pertinência clínica
  const scoreExercise = (ex: PilatesExercise): number => {
    let score = 0;
    // Bônus se alivia diretamente a dor que o usuário tem
    for (const pain of assessment.pains) {
      if (ex.priorityForPain.includes(pain)) {
        score += 5;
      }
    }
    // Bônus para postura de home office comum
    if (assessment.workPosture === 'laptop_sem_suporte' && ex.priorityForPain.includes('cervical')) {
      score += 3;
    }
    if (assessment.workPosture === 'mouse_intensivo' && ex.priorityForPain.includes('punhos')) {
      score += 4;
    }
    if (assessment.workPosture === 'muito_sentado' && (ex.priorityForPain.includes('lombar') || ex.priorityForPain.includes('quadris'))) {
      score += 3;
    }
    return score;
  };

  // Ordenar cada fase pela pertinência clínica
  for (const phase of phases) {
    exercisesByPhase[phase].sort((a, b) => scoreExercise(b) - scoreExercise(a));
  }

  // Quantidade de exercícios por fase de acordo com a duração
  // 15 min: 4 exercícios (1 de cada fase)
  // 30 min: 7 exercícios (2 aquecimento, 2 mobilidade, 2 core, 1 relaxamento)
  // 45 min: 10 exercícios (2 a 3 aquecimento, 3 mobilidade, 3 core, 2 relaxamento)
  const quota: Record<WorkoutDuration, Record<PilatesPhase, number>> = {
    15: {
      aquecimento: 1,
      mobilidade: 1,
      core: 1,
      relaxamento: 1,
    },
    30: {
      aquecimento: 2,
      mobilidade: 2,
      core: 2,
      relaxamento: 1,
    },
    45: {
      aquecimento: 2,
      mobilidade: 3,
      core: 3,
      relaxamento: 2,
    },
  };

  const selectedExercises: PilatesExercise[] = [];
  const phaseCounts: Record<PilatesPhase, number> = {
    aquecimento: 0,
    mobilidade: 0,
    core: 0,
    relaxamento: 0,
  };

  for (const phase of phases) {
    const targetCount = quota[assessment.duration][phase];
    const available = exercisesByPhase[phase];
    const picked = available.slice(0, targetCount);

    selectedExercises.push(...picked);
    phaseCounts[phase] = picked.length;
  }

  // Calcular tempo total estimado em segundos
  const totalSeconds = selectedExercises.reduce(
    (acc, curr) => acc + curr.durationSeconds[assessment.duration],
    0
  );
  // Adiciona margem de transição suave de 20s entre exercícios
  const transitionMarginSeconds = (selectedExercises.length - 1) * 20;
  const estimatedTotalMinutes = Math.round((totalSeconds + transitionMarginSeconds) / 60);

  return {
    id: `routine_${Date.now()}`,
    createdAt: new Date().toISOString(),
    assessment,
    exercises: selectedExercises,
    phaseSummary: phaseCounts,
    totalEstimatedMinutes: estimatedTotalMinutes,
    auditLog,
  };
}

export function getAlternativeExercises(
  currentExercise: PilatesExercise,
  assessment: UserAssessment,
  currentRoutineIds: string[]
): PilatesExercise[] {
  return PILATES_EXERCISES_DATABASE.filter((ex) => {
    if (ex.id === currentExercise.id) return false;
    if (ex.phase !== currentExercise.phase) return false;
    if (currentRoutineIds.includes(ex.id)) return false;

    // Checar contraindicações
    for (const restriction of assessment.restrictions) {
      if (ex.contraindicatedFor.includes(restriction)) return false;
    }
    if (ex.painContraindications) {
      for (const pain of assessment.pains) {
        if (ex.painContraindications.includes(pain)) return false;
      }
    }
    return true;
  });
}
