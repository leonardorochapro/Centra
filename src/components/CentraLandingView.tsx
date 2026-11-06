import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Activity,
  Flame,
  ArrowRight,
  Clock,
  ChevronDown,
  Sparkles,
  Award,
  Video,
  FileCheck2,
  HelpCircle,
  Users,
} from 'lucide-react';
import { CloudSkyCanvas } from './CloudSkyCanvas';

interface CentraLandingViewProps {
  onGoToGenerator: () => void;
  onGoToCalendar: () => void;
  onOpenAuth: () => void;
}

export const CentraLandingView: React.FC<CentraLandingViewProps> = ({
  onGoToGenerator,
  onGoToCalendar,
  onOpenAuth,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedPlanForContact, setSelectedPlanForContact] = useState<string | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSelectPlan = (planName: string) => {
    setSelectedPlanForContact(planName);
    onGoToGenerator();
  };

  const faqs = [
    {
      q: 'Preciso de aparelhos de Pilates ou reformer?',
      a: 'Não. O método da Centra é 100% focado em Mat Pilates (solo). Você só precisa de um tapete de yoga, colchonete ou até mesmo uma toalha firme no chão da sua sala ou escritório em casa.',
    },
    {
      q: 'Tenho hérnia de disco ou dor lombar crônica. É seguro?',
      a: 'Totalmente. Nossa plataforma foi concebida por fisioterapeutas com triagem biomecânica automatizada. Cada exercício passa por filtro de contraindicações estrito: movimentos de flexão com carga ou torções bruscas são imediatamente excluídos para quem possui discopatia.',
    },
    {
      q: 'Quanto tempo dura cada sessão de treino?',
      a: 'Você escolhe conforme sua janela de teletrabalho: 15 minutos (pausa descompressiva rápida), 30 minutos (sessão intermediária ideal) ou 45 minutos (prática aprofundada de mobilidade e core).',
    },
    {
      q: 'Como funciona a ofensiva no calendário?',
      a: 'A Centra conta com um sistema de ofensiva diária integrada ao seu login: a cada sessão concluída ou pausa ativa realizada no dia, o calendário é carimbado e sua chama de consistência cresce.',
    },
    {
      q: 'Como funcionam as correções posturais ao vivo?',
      a: 'No plano Integral, você participa de encontros e revisões com fisioterapeuta, onde a execução dos movimentos é observada e ajustada em tempo real para proteger suas articulações.',
    },
    {
      q: 'Posso cancelar a qualquer momento?',
      a: 'Sim. Todos os planos são mensais e sem fidelidade — você cancela quando quiser, direto pela plataforma.',
    },
  ];

  return (
    <div className="w-full text-ink bg-white dark:bg-stone-950 dark:text-stone-100 transition-colors">
      {/* ========== SECTION 1 — HERO COM SHADER DE NUVENS ========== */}
      <section className="relative overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center bg-gradient-to-t from-sky to-ink">
        <CloudSkyCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-ink/40 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 py-20 w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5 text-sky" />
              <span>Mat Pilates Clínico com Foco em Teletrabalho</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] text-white [text-shadow:0_2px_20px_rgba(31,74,109,0.35)]">
              Centralizando seu core e deixando você nas nuvens.
            </h1>

            <p className="mt-6 text-lg text-white/90 max-w-md leading-relaxed font-normal">
              Sua plataforma online de Mat Pilates com supervisão clínica, correção biomecânica e treinos sem dor no conforto do seu lar.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onGoToGenerator}
                className="cursor-pointer bg-white text-ink px-7 py-3.5 rounded-full font-semibold hover:bg-sky-50 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] flex items-center gap-2"
              >
                <span>Gerar Meu Treino Sem Dor</span>
                <ArrowRight className="w-4 h-4 text-ink" />
              </button>

              <button
                type="button"
                onClick={onGoToCalendar}
                className="cursor-pointer text-white px-6 py-3.5 rounded-full font-medium border border-white/60 hover:border-white hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Flame className="w-4 h-4 text-amber-300 fill-current" />
                <span>Ver Ofensiva & Calendário</span>
              </button>
            </div>

            <div className="mt-10 flex items-center gap-5 text-sm text-white/85">
              <div className="flex -space-x-3">
                <div className="w-9 h-9 rounded-full bg-sky border-2 border-white/80 flex items-center justify-center font-bold text-xs text-ink">
                  CR
                </div>
                <div className="w-9 h-9 rounded-full bg-steel border-2 border-white/80 flex items-center justify-center font-bold text-xs text-ink">
                  AV
                </div>
                <div className="w-9 h-9 rounded-full bg-ink border-2 border-white/80 flex items-center justify-center font-bold text-xs text-white">
                  LR
                </div>
              </div>
              <p className="text-xs sm:text-sm font-medium">
                Mais de 1.200 profissionais em home office já treinam sem dor com a Centra
              </p>
            </div>
          </div>

          {/* Hero Posture Card */}
          <div className="relative">
            <div className="bg-white/95 dark:bg-stone-900 border border-steel/30 dark:border-stone-800 rounded-3xl p-6 shadow-[0_30px_60px_-25px_rgba(31,74,109,0.35)] max-w-md ml-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-ink dark:text-stone-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Ao vivo — Correção Postural Fisioterapêutica</span>
                </div>
                <span className="text-xs font-mono text-stone-500">18:42</span>
              </div>

              <div className="rounded-2xl bg-ink aspect-[4/3] relative overflow-hidden flex items-end p-5">
                <img
                  src="/src/assets/images/pilates_clinical_hero_1793878809470.jpg"
                  alt="Aluna praticando Mat Pilates em casa supervisionada"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="relative z-10">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-sky/90 text-ink font-bold text-[10px] mb-1">
                    Trilha: Coluna Saudável
                  </span>
                  <p className="text-white font-display font-semibold text-sm">
                    Estabilização Escapular & Descompressão Lombar
                  </p>
                  <p className="text-white/80 text-xs mt-0.5">
                    Fisio. Dra. Camila corrigindo apoio neutro da pelve
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-sky-50 dark:bg-stone-800/80 border border-steel/30 dark:border-stone-700 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal text-white flex items-center justify-center font-bold text-xs">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-ink dark:text-stone-200">
                      Trilha: Zero Impacto em Home Office
                    </p>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400">
                      12 sessões graduais · Sem aparelhos
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onGoToGenerator}
                  className="cursor-pointer text-xs font-semibold text-teal dark:text-sky hover:underline"
                >
                  Começar →
                </button>
              </div>
            </div>

            {/* Stat Floating Badge */}
            <div className="absolute -bottom-5 -left-4 hidden sm:block bg-white dark:bg-stone-900 border border-steel/30 dark:border-stone-800 rounded-2xl px-5 py-3.5 shadow-lg">
              <p className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                Alívio de dor lombar reportado
              </p>
              <p className="font-display font-bold text-teal dark:text-teal-400 text-xl">
                −78% <span className="text-xs font-normal text-stone-500">em 8 semanas de ofensiva</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2 — TRUST BAR ========== */}
      <section className="border-y border-steel/25 dark:border-stone-800 bg-sky-50 dark:bg-stone-900/60">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-8 grid sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 shrink-0 rounded-full bg-white dark:bg-stone-800 shadow-xs flex items-center justify-center text-teal dark:text-teal-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink dark:text-stone-200">
                Acompanhamento Clínico
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-snug">
                Triagem com rigor biomecânico por fisioterapeutas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 shrink-0 rounded-full bg-white dark:bg-stone-800 shadow-xs flex items-center justify-center text-teal dark:text-teal-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink dark:text-stone-200">
                Mat Pilates de Solo
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-snug">
                100% sem aparelhos pesados, no chão do seu escritório
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 shrink-0 rounded-full bg-white dark:bg-stone-800 shadow-xs flex items-center justify-center text-teal dark:text-teal-400">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink dark:text-stone-200">
                Exclusão de Contraindicações
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-snug">
                Filtro automático para hérnia, túnel do carpo e condromalácia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 3 — AS DORES DO TELETRABALHO ========== */}
      <section className="py-20 max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-wider text-teal dark:text-teal-400 mb-2">
            O Desafio da Rotina Sentada
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink dark:text-stone-100">
            Você passa 8 horas por dia sentado. Seu corpo não foi feito para isso.
          </h2>
          <p className="mt-4 text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            O teletrabalho traz flexibilidade, mas também cadeiras inadequadas, pouca movimentação articular e sobrecarga cumulativa na coluna.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 flex items-center justify-center font-bold mb-4">
              1
            </div>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base mb-2">
              Lombar Queima ao Levantar
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              A pressão intradiscal na lombar sentado é até 40% maior do que em pé. Sem ativação de Powerhouse, a coluna sofre.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold mb-4">
              2
            </div>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base mb-2">
              Trapézio Rígido e Cervical
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Cabeça projetada para a tela do notebook dobra o peso relativo sobre as vértebras cervicais, gerando cefaleia tensional.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-400 flex items-center justify-center font-bold mb-4">
              3
            </div>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base mb-2">
              Punhos & DORT/LER
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Digitação contínua comprime o túnel do carpo. Exercícios sem alívio de punho podem piorar a inflamação tendínea.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-400 flex items-center justify-center font-bold mb-4">
              4
            </div>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base mb-2">
              Falta de Tempo e Rotina Quebrada
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Trânsito até a academia é inviável no teletrabalho. Você precisa de treinos objetivos de 15 a 30 minutos em casa.
            </p>
          </div>
        </div>
      </section>

      {/* ========== SECTION 3.5 — GALERIA DE PRÁTICA CLÍNICA ========== */}
      <section className="py-16 bg-stone-100/70 dark:bg-stone-900/40 border-y border-stone-200 dark:border-stone-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-teal dark:text-teal-400 mb-1">
                Biomecânica em Prática
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink dark:text-stone-100">
                Movimentos seguros, calibrados para o seu tapete
              </h2>
            </div>
            <button
              type="button"
              onClick={onGoToGenerator}
              className="cursor-pointer text-xs font-semibold text-teal dark:text-sky hover:underline flex items-center gap-1"
            >
              <span>Configurar minha prescrição</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src="/src/assets/images/pilates_mindful_stretch_1793878811160.jpg"
                  alt="Alongamento torácico e respiração"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold text-teal dark:text-teal-400 uppercase tracking-wider">
                  Fase 1 · Aquecimento
                </span>
                <p className="font-semibold text-sm text-stone-900 dark:text-stone-100 mt-0.5">
                  Respiração Costolateral & Mobilização
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Restauração ventilatória diafragmática para desarmar a tensão do estresse.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src="/src/assets/images/pilates_clinical_hero_1793878809470.jpg"
                  alt="Estabilização de core no solo"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold text-teal dark:text-teal-400 uppercase tracking-wider">
                  Fase 3 · Core
                </span>
                <p className="font-semibold text-sm text-stone-900 dark:text-stone-100 mt-0.5">
                  Ponte Articulada e Ativação Pélvica
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Acordando os glúteos inibidos por horas na cadeira e protegendo a lombar.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src="/src/assets/images/ergonomics_telework_spine_1793878810964.jpg"
                  alt="Ergonomia no posto de teletrabalho"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold text-teal dark:text-teal-400 uppercase tracking-wider">
                  Postura Ativa
                </span>
                <p className="font-semibold text-sm text-stone-900 dark:text-stone-100 mt-0.5">
                  Ergonomia Aplicada ao Home Office
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Diretrizes de alinhamento visual, altura do monitor e pausas ativas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4 — A SOLUÇÃO CENTRA ========== */}
      <section className="py-20 max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-sky/30 text-teal dark:text-sky text-xs font-bold uppercase tracking-wider mb-4">
              O Método Clínico
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink dark:text-stone-100 leading-tight">
              Mat Pilates estruturado em 4 fases clínicas obrigatórias.
            </h2>
            <p className="mt-4 text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
              Diferente de vídeos genéricos na internet que podem agravar uma protusão discal, cada sessão gerada pela Centra obedece à sequência fisioterapêutica completa:
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100">
                    Fase 1: Aquecimento & Respiração Costolateral
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Despertar da musculatura profunda do Powerhouse e reexpansão da caixa torácica.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100">
                    Fase 2: Mobilidade Articular
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Descompressão segmento a segmento da coluna, escapulotorácica e flexores do quadril.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100">
                    Fase 3: Ativação do Core & Força Estabilizadora
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Fortalecimento do transverso abdominal, multífidos e glúteos sem sobrecarga nas vértebras.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100">
                    Fase 4: Relaxamento Miofascial & Desaceleração
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Baixa do tônus simpático, redução do cortisol e sensação prolongada de leveza.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-sky-50 dark:bg-stone-900 border border-steel/40 dark:border-stone-800 rounded-3xl p-8 shadow-xs">
            <h3 className="font-display text-xl font-bold text-ink dark:text-stone-100 mb-4">
              Por que a Centra é diferente?
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero movimentos perigosos: se você tem hérnia, o sistema bloqueia flexões forçadas.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Modo Prática Guiada com sino acústico suave e contagem regressiva por voz/chime.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ofensiva de hábitos (streak): mantenha a consistência sem cobranças extremas.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Impressão clínica formal da rotina para levar ao seu médico ou fisioterapeuta.</span>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-steel/30 dark:border-stone-800 flex items-center justify-between">
              <div>
                <p className="text-xs text-stone-500">Pronto para começar?</p>
                <p className="font-semibold text-sm text-ink dark:text-stone-200">
                  Teste o gerador clínico gratuito
                </p>
              </div>
              <button
                type="button"
                onClick={onGoToGenerator}
                className="cursor-pointer px-4 py-2 bg-teal text-white rounded-xl text-xs font-semibold hover:bg-teal-600 transition-colors"
              >
                Configurar Agora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 5 — HOW IT WORKS ========== */}
      <section id="como-funciona" className="py-20 bg-stone-50 dark:bg-stone-900/60 border-y border-stone-200 dark:border-stone-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-wider text-teal dark:text-teal-400 mb-2">
              Passo a Passo
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink dark:text-stone-100">
              Como funciona sua jornada na Centra
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="text-4xl font-display font-black text-teal/20 dark:text-teal-400/20 mb-2">
                01
              </div>
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base mb-1">
                Anamnese Rápida
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Você indica o tempo disponível (15, 30 ou 45 min), onde sente dor (lombar, cervical, punhos) e restrições.
              </p>
            </div>

            <div className="relative">
              <div className="text-4xl font-display font-black text-teal/20 dark:text-teal-400/20 mb-2">
                02
              </div>
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base mb-1">
                Filtro Biomecânico
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Nosso motor cruza as contraindicações e monta a sequência lógica das 4 fases de Pilates com avisos posturais.
              </p>
            </div>

            <div className="relative">
              <div className="text-4xl font-display font-black text-teal/20 dark:text-teal-400/20 mb-2">
                03
              </div>
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base mb-1">
                Prática Guiada
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Execute movimento por movimento com timer integrado, instruções detalhadas passo a passo e sinal acústico.
              </p>
            </div>

            <div className="relative">
              <div className="text-4xl font-display font-black text-teal/20 dark:text-teal-400/20 mb-2">
                04
              </div>
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base mb-1">
                Ofensiva & Calendário
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Sua consistência registrada na sua conta, incentivando 15 a 30 minutos diários de alívio sem dor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 6 — PRICING ========== */}
      <section id="planos" className="py-20 max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-wider text-teal dark:text-teal-400 mb-2">
            Planos Transparentes
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink dark:text-stone-100">
            Invista na sua coluna sem sair de casa
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400 text-sm">
            Sem fidelidade ou multas. Cancele com um clique a qualquer momento.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {/* Plan 1: Essencial */}
          <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Plano Essencial</p>
              <h3 className="text-2xl font-display font-bold text-ink dark:text-stone-100">Prática Autônoma</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-ink dark:text-stone-100">R$ 49</span>
                <span className="text-xs text-stone-500">/mês</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-2">
                Ideal para quem deseja rotinas rápidas e consistência no calendário.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-stone-700 dark:text-stone-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Gerador de rotinas ilimitado (15, 30 e 45 min)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Triagem de contraindicações biomecânicas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Calendário de ofensiva com histórico de sessões</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Modo Prática Guiada com cronômetro e áudio</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => handleSelectPlan('Essencial')}
              className="cursor-pointer mt-8 w-full py-3 rounded-full border border-teal text-teal dark:border-sky dark:text-sky font-semibold text-xs hover:bg-sky-50 dark:hover:bg-stone-800 transition-colors"
            >
              Começar com Essencial
            </button>
          </div>

          {/* Plan 2: Integral (Destaque) */}
          <div className="rounded-3xl border-2 border-teal dark:border-sky bg-sky-50/70 dark:bg-stone-900 p-8 flex flex-col justify-between relative shadow-lg">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-teal text-white text-[11px] font-bold uppercase tracking-wider">
              Mais Popular · Com Fisioterapia
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-teal dark:text-sky mb-2">Plano Integral</p>
              <h3 className="text-2xl font-display font-bold text-ink dark:text-stone-100">Supervisão ao Vivo</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-teal dark:text-sky">R$ 89</span>
                <span className="text-xs text-stone-500">/mês</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-2">
                Para quem quer correção postural humana em tempo real e evolução clínica.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-stone-800 dark:text-stone-200 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal dark:text-sky" />
                  <span>Tudo do plano Essencial</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal dark:text-sky" />
                  <span>Encontros semanais de correção ao vivo via Zoom</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal dark:text-sky" />
                  <span>Suporte direto com fisioterapeuta via WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal dark:text-sky" />
                  <span>Ajustes individuais para crises agudas de dor</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => handleSelectPlan('Integral')}
              className="cursor-pointer mt-8 w-full py-3.5 rounded-full bg-teal text-white font-semibold text-xs hover:bg-teal-600 transition-colors shadow-xs"
            >
              Garantir Meu Acesso Integral
            </button>
          </div>

          {/* Plan 3: Corporativo */}
          <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Empresas & Times</p>
              <h3 className="text-2xl font-display font-bold text-ink dark:text-stone-100">Centra Corporate</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-ink dark:text-stone-100">Sob Consulta</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-2">
                Solução de saúde ocupacional para empresas com colaboradores remotos.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-stone-700 dark:text-stone-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Dashboard corporativo de engajamento ergonômico</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Workshops de ergonomia teletrabalho ao vivo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Relatórios de redução de queixas posturais (NR-17)</span>
                </li>
              </ul>
            </div>

            <a
              href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20Centra%20Corporate"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer mt-8 w-full py-3 rounded-full border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 font-semibold text-xs text-center hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              Falar com Consultor
            </a>
          </div>
        </div>
      </section>

      {/* ========== SECTION 7 — CLINICAL AUTHORITY ========== */}
      <section id="equipe" className="py-20 bg-stone-50 dark:bg-stone-900/40 border-y border-stone-200 dark:border-stone-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-wider text-teal dark:text-teal-400 mb-2">
              Autoridade Clínica
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink dark:text-stone-100">
              Corpo técnico especializado em coluna e teletrabalho
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-teal text-white flex items-center justify-center font-bold text-xl shrink-0">
                CS
              </div>
              <div>
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                  Dra. Camila Santos
                </h3>
                <p className="text-xs font-medium text-teal dark:text-teal-400">
                  Fisioterapeuta Especialista em Coluna & Pilates Clínico
                </p>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                  Mais de 10 anos de experiência clínica na reabilitação de patologias discais e adaptação postural para trabalhadores de tecnologia.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-sky text-ink flex items-center justify-center font-bold text-xl shrink-0">
                AV
              </div>
              <div>
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                  Prof. Adônis Vinícios
                </h3>
                <p className="text-xs font-medium text-teal dark:text-teal-400">
                  Mestre em Biomecânica Ocupacional & Mat Pilates
                </p>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                  Pesquisador de fadiga postural sentada e criador dos protocolos de pausa ativa e descompressão articular em teletrabalho.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 8 — FAQ ACCORDION ========== */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-teal dark:text-teal-400 mb-2">
            Tire Suas Dúvidas
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink dark:text-stone-100">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-steel/30 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-900 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left px-6 py-4.5 font-display font-medium text-ink dark:text-stone-100 text-sm sm:text-base cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-teal dark:text-teal-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-stone-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========== SECTION 9 — FOOTER ========== */}
      <footer className="bg-ink text-white/70">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
            <div className="max-w-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
                C
              </div>
              <div>
                <p className="font-display text-lg font-bold text-white tracking-[0.14em] uppercase leading-none">
                  Centra
                </p>
                <p className="text-[10px] text-white/60 mt-1 tracking-wide uppercase">
                  Centralize seu corpo e sua mente em casa
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
              <div>
                <p className="text-white font-semibold mb-3">Navegação</p>
                <ul className="space-y-2 text-white/70">
                  <li>
                    <button onClick={onGoToGenerator} className="hover:text-white transition-colors cursor-pointer">
                      Gerador Clínico
                    </button>
                  </li>
                  <li>
                    <button onClick={onGoToCalendar} className="hover:text-white transition-colors cursor-pointer">
                      Ofensiva Diária
                    </button>
                  </li>
                  <li>
                    <a href="#planos" className="hover:text-white transition-colors">
                      Planos de Acesso
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-white font-semibold mb-3">Segurança</p>
                <ul className="space-y-2 text-white/70">
                  <li>
                    <span className="hover:text-white">Triagem NR-17</span>
                  </li>
                  <li>
                    <span className="hover:text-white">Filtro de Contraindicações</span>
                  </li>
                  <li>
                    <span className="hover:text-white">LGPD Compliance</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-white font-semibold mb-3">Conta & Acesso</p>
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  Entrar ou Criar Perfil
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 text-[11px] text-white/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 Centra Mat Pilates. Todos os direitos reservados.</p>
            <p>A Centra não substitui consultas médicas ou fisioterapêuticas presenciais em quadros agudos.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Concierge Button */}
      <a
        href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20tenho%20interesse%20nas%20aulas%20de%20Mat%20Pilates%20da%20Centra"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp com concierges clínicos Centra"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5C] shadow-[0_12px_28px_-8px_rgba(0,0,0,0.45)] flex items-center justify-center transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        <svg className="relative" width="26" height="26" viewBox="0 0 32 32" fill="white">
          <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.702 4.607 1.918 6.475L4 29l7.72-1.876A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.628 3 16.001 3zm.021 21.7c-1.86 0-3.61-.483-5.13-1.33l-.368-.207-4.58 1.113 1.127-4.46-.24-.383A9.65 9.65 0 016.35 15c0-5.32 4.33-9.65 9.65-9.65 5.32 0 9.65 4.33 9.65 9.65 0 5.32-4.33 9.65-9.63 9.7zm5.29-7.23c-.29-.145-1.71-.845-1.975-.94-.264-.097-.457-.145-.65.145-.192.29-.746.94-.915 1.133-.168.193-.336.217-.626.072-.29-.145-1.223-.451-2.33-1.437-.861-.768-1.443-1.716-1.613-2.006-.168-.29-.018-.447.127-.591.13-.13.29-.336.435-.505.145-.168.193-.29.29-.482.096-.193.048-.362-.024-.507-.072-.145-.65-1.567-.89-2.148-.234-.563-.472-.487-.65-.496l-.554-.01c-.192 0-.505.072-.77.362-.264.29-1.01.987-1.01 2.408 0 1.42 1.034 2.793 1.178 2.986.145.193 2.036 3.108 4.932 4.36.689.298 1.226.476 1.645.61.691.22 1.32.189 1.817.115.554-.083 1.71-.699 1.951-1.373.24-.674.24-1.252.168-1.373-.072-.12-.264-.193-.554-.338z" />
        </svg>
      </a>
    </div>
  );
};
