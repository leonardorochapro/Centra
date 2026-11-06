import React from 'react';
import {
  Clock,
  AlertCircle,
  Shield,
  Laptop,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
  Info,
} from 'lucide-react';
import {
  WorkoutDuration,
  PainArea,
  PhysicalRestriction,
  UserAssessment,
} from '../types/pilates';

interface ClinicalAssessmentFormProps {
  assessment: UserAssessment;
  onChange: (assessment: UserAssessment) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

const PAIN_OPTIONS: { id: PainArea; label: string; sublabel: string }[] = [
  {
    id: 'lombar',
    label: 'Coluna Lombar e Sacro',
    sublabel: 'Sensação de peso ao levantar da cadeira ou rigidez pós-expediente',
  },
  {
    id: 'cervical',
    label: 'Cervical e Trapézio Superior',
    sublabel: 'Tensão na nuca e ombros contraídos em direção às orelhas',
  },
  {
    id: 'punhos',
    label: 'Punhos e Antebraços',
    sublabel: 'Sobrecarga repetitiva de digitação, mouse e suporte rígido de mesa',
  },
  {
    id: 'ombros',
    label: 'Ombros e Cintura Escapular',
    sublabel: 'Ombros caídos para a frente (protração) e queimação entre as escápulas',
  },
  {
    id: 'toracica',
    label: 'Coluna Torácica e Costelas',
    sublabel: 'Bloqueio respiratório e postura corcunda contínua no monitor',
  },
  {
    id: 'quadris',
    label: 'Quadris e Flexores da Coxa',
    sublabel: 'Encurtamento do psoas e inibição dos glúteos por tempo sentado',
  },
];

const RESTRICTION_OPTIONS: {
  id: PhysicalRestriction;
  label: string;
  clinicalEffect: string;
}[] = [
  {
    id: 'hernia_lombar',
    label: 'Hérnia de Disco / Protrusão Lombar',
    clinicalEffect: 'Exclui flexões forçadas e torções com compressão axial; prioriza coluna neutra.',
  },
  {
    id: 'osteopenia_osteoporose',
    label: 'Osteopenia ou Osteoporose',
    clinicalEffect: 'Evita flexões torácicas profundas; foca no alinhamento axial e extensores.',
  },
  {
    id: 'tunel_carpo_punho',
    label: 'Síndrome do Túnel do Carpo / Dor nos Punhos',
    clinicalEffect: 'Elimina apoio de peso sobre as mãos abertas; prioriza antebraços e decúbitos.',
  },
  {
    id: 'lesao_ombro',
    label: 'Lesão / Impacto no Ombro (Manguito)',
    clinicalEffect: 'Remove elevações acima de 90° sob carga e pranchas instáveis.',
  },
  {
    id: 'dor_joelho',
    label: 'Condromalácia / Dor ao Ajoelhar',
    clinicalEffect: 'Substitui posturas de joelho direto no solo por posições em supino ou em pé.',
  },
  {
    id: 'gravidez_diastase',
    label: 'Gestação ou Diástase Abdominal',
    clinicalEffect: 'Veta decúbito ventral (barriga para baixo) e pranchas hiperpressivas.',
  },
];

export const ClinicalAssessmentForm: React.FC<ClinicalAssessmentFormProps> = ({
  assessment,
  onChange,
  onSubmit,
  isLoading = false,
}) => {
  const togglePain = (pain: PainArea) => {
    const exists = assessment.pains.includes(pain);
    const updated = exists
      ? assessment.pains.filter((p) => p !== pain)
      : [...assessment.pains, pain];
    onChange({ ...assessment, pains: updated });
  };

  const toggleRestriction = (restriction: PhysicalRestriction) => {
    const exists = assessment.restrictions.includes(restriction);
    const updated = exists
      ? assessment.restrictions.filter((r) => r !== restriction)
      : [...assessment.restrictions, restriction];
    onChange({ ...assessment, restrictions: updated });
  };

  return (
    <div className="space-y-12">
      {/* Hero Presentation Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-stone-100 to-white dark:from-stone-900 dark:to-stone-950 border border-stone-200 dark:border-stone-800 p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-medium text-teal-800 dark:text-teal-400">
              <Shield className="w-4 h-4" />
              <span>Prescrição Biomecânica de Mat Pilates Ocupacional</span>
              <span aria-hidden="true">·</span>
              <span>Rigor Clínico & Ergonomia</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-50 text-balance">
              Alívio de dores posturais e reabilitação para quem trabalha em Home Office.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
              Gere um plano de Mat Pilates personalizado com base nas suas queixas de tensão e restrições articulares.
              Nosso motor clínico cruza suas informações para excluir automaticamente movimentos contraindicados e estruturar
              uma sequência balanceada em 4 fases: Aquecimento, Mobilidade, Ativação do Core e Relaxamento.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                <span>Zero movimentos lesivos à sua coluna</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                <span>Foco em DORT, LER e Síndrome Cruzada Superior</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                <span>Compatível com qualquer colchonete ou tapete</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden shadow-md border border-stone-200 dark:border-stone-800 aspect-[16/10] bg-stone-200 dark:bg-stone-800">
              <img
                src="/src/assets/images/pilates_clinical_hero_1793878809470.jpg"
                alt="Prática de Mat Pilates focada em alinhamento da coluna e saúde ocupacional"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-4">
                <p className="text-xs text-white/95 font-medium">
                  Sequência baseada nos 6 princípios Joseph Pilates: Respiração, Centro, Controle, Precisão, Concentração e Fluidez.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Assessment Card Form */}
      <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 space-y-10 shadow-xs">
        {/* Step 1: Duração da Sessão */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <div>
              <span className="text-xs font-semibold text-teal-800 dark:text-teal-400 uppercase tracking-wider">
                Etapa 1
              </span>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                Tempo Disponível para a Prática
              </h2>
            </div>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Adaptado à sua rotina de pausas no trabalho
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                time: 15 as WorkoutDuration,
                title: '15 Minutos',
                tag: 'Pausa Ativa Express',
                desc: 'Ideal para intervalos entre reuniões. 4 exercícios cirúrgicos para destravar coluna e punhos.',
              },
              {
                time: 30 as WorkoutDuration,
                title: '30 Minutos',
                tag: 'Equilíbrio Padrão (Recomendado)',
                desc: 'Sessão ideal para início da manhã ou fim de expediente. 7 a 8 exercícios completos.',
              },
              {
                time: 45 as WorkoutDuration,
                title: '45 Minutos',
                tag: 'Reabilitação Completa',
                desc: 'Protocolo intensivo com fortalecimento do Powerhouse, descompressão e mobilidade articular.',
              },
            ].map((item) => {
              const isSelected = assessment.duration === item.time;
              return (
                <button
                  key={item.time}
                  type="button"
                  onClick={() => onChange({ ...assessment, duration: item.time })}
                  className={`text-left p-5 rounded-xl border transition-all cursor-pointer relative min-h-[44px] ${
                    isSelected
                      ? 'border-teal bg-sky-50 dark:bg-stone-800 dark:border-sky ring-2 ring-teal/20 shadow-xs'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-stone-50/50 dark:bg-stone-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-teal dark:text-sky">
                      {item.tag}
                    </span>
                    <Clock
                      className={`w-4 h-4 ${
                        isSelected ? 'text-teal dark:text-sky' : 'text-stone-400'
                      }`}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Queixas de Dor ou Tensão */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <div>
              <span className="text-xs font-semibold text-teal-800 dark:text-teal-400 uppercase tracking-wider">
                Etapa 2
              </span>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                Queixas de Dor, Rigidez ou Tensão Muscular
              </h2>
            </div>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Selecione todas as regiões afetadas pelo teletrabalho
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {PAIN_OPTIONS.map((pain) => {
              const isChecked = assessment.pains.includes(pain.id);
              return (
                <button
                  key={pain.id}
                  type="button"
                  onClick={() => togglePain(pain.id)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer min-h-[44px] flex items-start gap-3.5 ${
                    isChecked
                      ? 'border-teal bg-sky-50 dark:bg-stone-800 dark:border-sky shadow-xs'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-900'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border transition-colors shrink-0 ${
                      isChecked
                        ? 'bg-teal-800 border-teal-800 text-white dark:bg-teal-600 dark:border-teal-600'
                        : 'border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                      {pain.label}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-snug">
                      {pain.sublabel}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Restrições Físicas e Articulares (Filtro Clínico Rigoroso) */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                  Etapa 3
                </span>
                <span className="text-xs text-stone-400 dark:text-stone-500">·</span>
                <span className="text-xs font-medium text-amber-800 dark:text-amber-400 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  Triagem de Segurança Postural
                </span>
              </div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                Restrições Físicas ou Lesões Articulares Diagnósticadas
              </h2>
            </div>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              O motor clínico excluirá movimentos contraindicados
            </span>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Selecione caso possua diagnóstico ou histórico. O sistema recalculará a segurança dos exercícios,
            evitando flexões ou cargas que possam comprimir discos ou estruturas inflamadas.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {RESTRICTION_OPTIONS.map((restr) => {
              const isChecked = assessment.restrictions.includes(restr.id);
              return (
                <button
                  key={restr.id}
                  type="button"
                  onClick={() => toggleRestriction(restr.id)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer min-h-[44px] flex items-start gap-3.5 ${
                    isChecked
                      ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/30 dark:border-amber-500'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-stone-50/40 dark:bg-stone-900'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border transition-colors shrink-0 ${
                      isChecked
                        ? 'bg-amber-700 border-amber-700 text-white dark:bg-amber-600 dark:border-amber-600'
                        : 'border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                      {restr.label}
                    </h3>
                    <p className="text-xs text-amber-900/80 dark:text-amber-300/80 mt-1 leading-snug">
                      {restr.clinicalEffect}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 4: Condição de Trabalho & Nível de Intensidade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Work posture */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-stone-900 dark:text-stone-100">
              Ambiente de Trabalho Predominante
            </label>
            <div className="space-y-2">
              {[
                {
                  id: 'muito_sentado' as const,
                  label: 'Sentado contínuo (> 7 horas por dia)',
                  desc: 'Aumento de carga lombo-sacra e encurtamento de flexores de quadril',
                },
                {
                  id: 'laptop_sem_suporte' as const,
                  label: 'Uso de notebook sem suporte elevado',
                  desc: 'Flexão contínua da cervical e protrusão da cabeça ("text neck")',
                },
                {
                  id: 'mouse_intensivo' as const,
                  label: 'Trabalho intensivo de mouse e digitação',
                  desc: 'Fadiga nos flexores do carpo e assimetria do ombro dominante',
                },
              ].map((posture) => (
                <button
                  key={posture.id}
                  type="button"
                  onClick={() => onChange({ ...assessment, workPosture: posture.id })}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-colors min-h-[44px] ${
                    assessment.workPosture === posture.id
                      ? 'border-teal-700 bg-teal-50 dark:bg-teal-950/40 text-stone-900 dark:text-stone-100 font-medium'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <p className="font-semibold text-stone-900 dark:text-stone-100">
                    {posture.label}
                  </p>
                  <p className="text-stone-500 dark:text-stone-400 mt-0.5">{posture.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Intensity */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-stone-900 dark:text-stone-100">
              Nível de Energia e Intensidade Desejada
            </label>
            <div className="space-y-2">
              {[
                {
                  id: 'suave' as const,
                  label: 'Suave & Restaurador',
                  desc: 'Ideal para alívio de dor aguda, descompressão e respiração pós-fadiga',
                },
                {
                  id: 'moderado' as const,
                  label: 'Moderado & Equilibrado',
                  desc: 'Ritmo tradicional de Pilates com foco em alinhamento e tônus postural',
                },
                {
                  id: 'dinamico' as const,
                  label: 'Ativo & Estabilizador',
                  desc: 'Maior desafio isométrico do Powerhouse para prevenção a longo prazo',
                },
              ].map((level) => (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => onChange({ ...assessment, intensity: level.id })}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-colors min-h-[44px] ${
                    assessment.intensity === level.id
                      ? 'border-teal-700 bg-teal-50 dark:bg-teal-950/40 text-stone-900 dark:text-stone-100 font-medium'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <p className="font-semibold text-stone-900 dark:text-stone-100">
                    {level.label}
                  </p>
                  <p className="text-stone-500 dark:text-stone-400 mt-0.5">{level.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Banner & CTA Button */}
        <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-stone-600 dark:text-stone-400">
            <span className="font-semibold text-stone-900 dark:text-stone-200">
              Configuração Ativa:
            </span>{' '}
            {assessment.duration} min · {assessment.pains.length} queixa(s) ·{' '}
            {assessment.restrictions.length} restrição(ões) clínica(s)
          </div>

          <button
            type="button"
            onClick={onSubmit}
            disabled={isLoading}
            className="w-full sm:w-auto px-7 py-3.5 bg-teal hover:bg-[#163752] text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 min-h-[48px] cursor-pointer"
          >
            {isLoading ? (
              <span>Processando Biomecânica Centra...</span>
            ) : (
              <>
                <span>Gerar Rotina de Mat Pilates Centra</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};
