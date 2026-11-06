import React from 'react';
import {
  Monitor,
  CheckCircle2,
  AlertCircle,
  Eye,
  Clock,
  Armchair,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface ErgonomicsGuideProps {
  onGoToGenerator: () => void;
}

export const ErgonomicsGuide: React.FC<ErgonomicsGuideProps> = ({ onGoToGenerator }) => {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-semibold text-teal-800 dark:text-teal-400 uppercase tracking-wider">
              Saúde Ocupacional no Teletrabalho
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight text-balance">
              Guia Prático de Ergonomia & Postura para Home Office
            </h1>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              O Mat Pilates restaura a mobilidade e a força do Powerhouse, mas o hábito postural durante as 8 horas
              de trabalho é a chave para consolidar a ausência de dor. Conheça as diretrizes biomecânicas fundamentadas
              na ergonomia de prevenção a DORT e LER.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onGoToGenerator}
                className="px-5 py-2.5 bg-teal hover:bg-[#163752] text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>Criar Minha Rotina Centra</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 aspect-[4/3] bg-stone-100 dark:bg-stone-800 shadow-md">
              <img
                src="/src/assets/images/ergonomics_telework_spine_1793878810964.jpg"
                alt="Postura correta de trabalho em home office com alinhamento da coluna"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Ergonomic Station */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            Os 4 Ajustes da Estação de Trabalho
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Recomendações técnicas para eliminar compensações que sobrecarregam a cervical e a lombar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-3">
            <div className="flex items-center gap-2.5 font-bold text-stone-900 dark:text-stone-100 text-sm">
              <Monitor className="w-5 h-5 text-teal-800 dark:text-teal-400" />
              <h3>1. Linha do Olhar & Altura do Monitor</h3>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              O terço superior da tela deve estar exatamente na altura dos seus olhos. Trabalhar com laptop apoiado diretamente
              na mesa obriga o pescoço a flexionar 30° a 45°, aumentando a carga sobre as vértebras cervicais de 5kg para até 22kg de pressão efetiva.
            </p>
            <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-lg text-xs text-stone-700 dark:text-stone-300">
              <strong>Solução Prática:</strong> Utilize um suporte de notebook ou pilha de livros firmes e conecte teclado e mouse externos.
            </div>
          </div>

          <div className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-3">
            <div className="flex items-center gap-2.5 font-bold text-stone-900 dark:text-stone-100 text-sm">
              <Armchair className="w-5 h-5 text-teal-800 dark:text-teal-400" />
              <h3>2. Apoio Lombar & Pelve Neutra</h3>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              A região lombar possui uma curva natural chamada lordose fisiológica. Sentar-se na ponta da cadeira ou escorregar
              inverte essa curva para uma cifose, comprimindo a parte anterior dos discos L4-L5 e L5-S1.
            </p>
            <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-lg text-xs text-stone-700 dark:text-stone-300">
              <strong>Solução Prática:</strong> Sente-se com o quadril totalmente no fundo do assento. Caso sua cadeira não tenha suporte, use uma pequena toalha enrolada na curvatura lombar.
            </div>
          </div>

          <div className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-3">
            <div className="flex items-center gap-2.5 font-bold text-stone-900 dark:text-stone-100 text-sm">
              <Clock className="w-5 h-5 text-teal-800 dark:text-teal-400" />
              <h3>3. Apoio de Braços & Ângulo de 90°</h3>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Os ombros devem repousar relaxados, sem subir em direção às orelhas. Os antebraços devem ficar apoiados formando
              um ângulo entre 90° e 100° em relação aos cotovelos, mantendo o punho reto sem flexão dorsal.
            </p>
            <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-lg text-xs text-stone-700 dark:text-stone-300">
              <strong>Solução Prática:</strong> Aproxime a cadeira da mesa para não ter que esticar os braços para frente, prevenindo espasmos do trapézio.
            </div>
          </div>

          <div className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-3">
            <div className="flex items-center gap-2.5 font-bold text-stone-900 dark:text-stone-100 text-sm">
              <Eye className="w-5 h-5 text-teal-800 dark:text-teal-400" />
              <h3>4. A Regra 20-20-20 & Micro-Pausas</h3>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              A cada 20 minutos de foco na tela, olhe para um objeto a pelo menos 6 metros (20 pés) de distância por 20 segundos.
              A cada 50 minutos, levante-se por 2 minutos para quebrar o padrão isquêmico dos discos intervertebrais.
            </p>
            <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-lg text-xs text-stone-700 dark:text-stone-300">
              <strong>Solução Prática:</strong> Integre uma rotina express de 15 minutos do CENTRA Mat Pilates no meio do seu expediente.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
