import React from 'react';
import {
  Wind,
  Target,
  ShieldCheck,
  Compass,
  Activity,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface PilatesPrinciplesViewProps {
  onGoToGenerator: () => void;
}

export const PilatesPrinciplesView: React.FC<PilatesPrinciplesViewProps> = ({
  onGoToGenerator,
}) => {
  const principles = [
    {
      title: '1. Respiração Costolateral',
      subtitle: 'Respiração profunda tridimensional',
      icon: Wind,
      desc: 'No Pilates clínico, a respiração não é apenas oxigenação: é o motor biomecânico da estabilidade. A expansão lateral das costelas preserva a contração do transverso abdominal e relaxa a musculatura acessória do pescoço (escalenos e esternocleidomastoideo) comumente tensa após horas de digitação.',
    },
    {
      title: '2. Centralização (O Powerhouse)',
      subtitle: 'O centro de gravidade e força estabilizadora',
      icon: Target,
      desc: 'Compreende o transverso do abdômen, multífidos da coluna, diafragma e assoalho pélvico. Todo movimento inicia no centro e irradia para a periferia. Quando o Powerhouse está ativo, a coluna lombar fica blindada contra forças de cisalhamento geradas pela cadeira.',
    },
    {
      title: '3. Controle Neuromuscular',
      subtitle: 'Mente controlando o movimento sem impulsos',
      icon: ShieldCheck,
      desc: 'Nenhum movimento no Pilates é feito por inércia ou balanço. O controle motor refinado treina o sistema nervoso a recrutar os músculos estabilizadores profundos antes dos motores primários, prevenindo lesões e compensações musculares.',
    },
    {
      title: '4. Precisão Biomecânica',
      subtitle: 'Qualidade soberana sobre a quantidade',
      icon: Compass,
      desc: 'Ao contrário de treinos de academia focados em repetições exaustivas, o Mat Pilates foca na exatidão do alinhamento. 5 repetições com perfeição postural e pelve neutra geram mais reeducação postural do que 50 repetições mal executadas.',
    },
    {
      title: '5. Concentração & Consciência Corporal',
      subtitle: 'Atenção plena ao padrão de movimento',
      icon: Activity,
      desc: 'Trabalhadores remotos costumam sofrer de fragmentação mental por excesso de estímulos digitais. A prática de Pilates exige foco pleno na percepção do próprio corpo, atuando como um potente descompressor do estresse mental.',
    },
    {
      title: '6. Fluidez de Movimento',
      subtitle: 'Transições suaves sem rigidez ou sobressaltos',
      icon: Layers,
      desc: 'A energia flui suavemente entre os segmentos do corpo. O movimento fluido alivia o tônus hipertônico dos músculos posturais e estimula a lubrificação do líquido sinovial nas articulações facetárias da coluna vertebral.',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Intro Hero */}
      <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-semibold text-teal-800 dark:text-teal-400 uppercase tracking-wider">
              Metodologia & Biomecânica
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight text-balance">
              Os 6 Princípios Clássicos Aplicados à Saúde Ocupacional
            </h1>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              Criado originalmente por Joseph Pilates sob o nome de <em>Contrologia</em>, o método é hoje
              um dos pilares padrão-ouro na fisioterapia preventiva mundial para reabilitar trabalhadores sedentários.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onGoToGenerator}
                className="px-5 py-2.5 bg-teal hover:bg-[#163752] text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>Experimentar Prática Personalizada Centra</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 aspect-[4/3] bg-stone-100 dark:bg-stone-800 shadow-md">
              <img
                src="/src/assets/images/pilates_mindful_stretch_1793878811160.jpg"
                alt="Execução da ponte articulada de Pilates com foco em controle do core"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Principles */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            A Anatomia dos Princípios
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Como cada fundamento atua fisiologicamente no seu corpo durante a rotina
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {principles.map((pr, idx) => {
            const Icon = pr.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-950/50 border border-teal-100 dark:border-teal-900 text-teal-800 dark:text-teal-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                    {pr.title}
                  </h3>
                  <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                    {pr.subtitle}
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {pr.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
