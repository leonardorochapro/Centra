# 🧘‍♂️ Centra — Centralize seu corpo e sua mente em casa
## Mat Pilates Clínico para Teletrabalho & Saúde Ocupacional (Full-Stack)

> **Plataforma web full-stack de Mat Pilates clínico com acompanhamento postural, anamnese individualizada, exclusão de contraindicações biomecânicas, controle de ofensiva diária (streak), API REST em Express e landing page integrada com shader WebGL de nuvens.**

[![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-19.0-blue?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646C9F?logo=vite&logoColor=white)](https://vitejs.dev/)

---

## 📌 Visão Geral da Centra

A **Centra** foi concebida para mitigar os impactos da postura sedentária prolongada em profissionais em regime de teletrabalho (*home office*), tais como:
* Lombalgias posturais e sobrecarga na articulação sacroilíaca;
* Tensão suboccipital, cervicalgias e cefaleias tensionais de tela;
* Tendinopatias e DORT/LER em punhos e antebraços causadas por mouse e teclado;
* Rigidez na caixa torácica e inibição da respiração diafragmática;
* Encurtamento de flexores de quadril (*psoas*) e "amnésia glútea".

A plataforma une uma landing page de alta conversão (com shader WebGL em tempo real, prova social, planos de assinatura e concierges) a uma aplicação clínica robusta integrada a uma API REST em Express para persistência e gestão de sessões.

Diferente de aplicativos genéricos de exercícios, o sistema atua com **rigor clínico e fisioterapêutico**: cruza automaticamente queixas de dor e restrições articulares diagnosticadas (ex.: hérnia de disco, osteoporose, síndrome do túnel do carpo, impacto no ombro, dor no joelho e diástase) para **expurgar movimentos contraindicados** antes de compor o treino.

---

## 🚀 Principais Funcionalidades

### 1. 🛡️ Triagem Clínica & Filtro Biomecânico
- **Duração Flexível**: 15 min (*Pausa Ativa Express*), 30 min (*Equilíbrio Padrão*) ou 45 min (*Reabilitação Completa*).
- **Mapeamento de Queixas**: Lombar, cervical/trapézio, punhos/LER, ombros/escápulas, coluna torácica e flexores de quadril.
- **Exclusão de Contraindicações**:
  - *Hérnia Lombar*: Elimina flexões forçadas sob carga ou torções axiais compressivas; prioriza coluna neutra.
  - *Osteopenia/Osteoporose*: Retira flexões e torções extremas para proteger a integridade dos corpos vertebrais.
  - *Túnel do Carpo / Punhos*: Substitui apoios manuais abertos por antebraços ou decúbito dorsal.
  - *Lesão de Ombro*: Remove elevações acima de 90° e pranchas instáveis.
  - *Dor Patelar / Joelho*: Veta posturas de apoio direto sobre o joelho sem amortecimento.
  - *Gestação / Diástase*: Veta decúbito ventral (prono) e exercícios hiperpressivos.
- **Relatório de Auditoria Clínica**: Painel transparente demonstrando exatamente quais exercícios foram excluídos e a fundamentação biomecânica de cada veto.

### 2. 🧩 Sequência Lógica em 4 Fases de Pilates
Toda sessão é balanceada na sequência clássica de Contrologia:
1. **Aquecimento & Respiração**: Ativação costolateral e conexão do *Powerhouse* (transverso do abdômen, multífidos e assoalho pélvico).
2. **Mobilidade Articular**: Articulação segmentar vértebra por vértebra e descompressão toracolombar.
3. **Ativação do Core**: Estabilidade funcional estática e fortalecimento da cadeia posterior.
4. **Relaxamento & Restauro**: Descompressão discal passiva e estímulo do sistema nervoso parassimpático.

### 3. 📋 Cartões de Exercícios Completos
Para **CADA** exercício gerado no plano, a aplicação apresenta:
- **Nome técnico** e nomenclatura clássica em Pilates;
- **Posição anatômica** de execução (*decúbito dorsal, ventral, lateral, 4 apoios, sentado*);
- **Séries, repetições cadenciadas ou tempo prescrito**;
- **Instruções passo a passo** guiadas pela respiração tridimensional;
- **Aviso de segurança postural** focado na prevenção de lesões e compensações comuns no escritório;
- **Substituição inteligente**: Permite trocar qualquer movimento por outra alternativa clínica segura da mesma fase.

### 4. ⏱️ Modo Sessão Guiada (Prática Interativa)
- Cronômetro regressivo em tempo real para cada exercício;
- Sinos e áudios suaves gerados nativamente via **Web Audio API** (sem arquivos externos pesados);
- **Guia respiratório animado** sincronizado (*Inspire pelas costelas / Expire ativando o Powerhouse*);
- Navegação entre exercícios (Avançar, Voltar, Pausar e Reiniciar).

### 5. 🔥 Calendário de Práticas & Controle de Ofensiva (Streak)
- **Ofensiva Atual**: Contador de dias consecutivos de prática diária (*streak*);
- **Recorde Pessoal**: Maior ofensiva já registrada;
- **Grade Mensal Interativa**: Navegação de meses com marcação visual dos dias concluídos;
- **Check-in Manual**: Opção de marcar treinos realizados fora do computador;
- **Marcos de Consistência**: Conquistas desbloqueáveis (1 dia, 3 dias, 7 dias, 14 dias e 30 dias na ofensiva);
- **Gravação Automática**: Ao finalizar o treino no cronômetro guiado, a sessão é registrada no perfil imediatamente.

### 6. 👤 Autenticação & Perfil do Teletrabalhador
- Sistema de login e cadastro com armazenamento local seguro (`localStorage`);
- Modo de **Acesso Rápido com 1 Clique** (usuário de demonstração com histórico de treinos pré-carregado);
- Perfil personalizado com profissão, jornada diária na cadeira e métricas de adesão.

### 7. 🖨️ Prescrição Pronta para Impressão / PDF
- Ficha clínica formatada para impressão física ou exportação em PDF via navegador (`Ctrl + P`);
- Inclui cabeçalho de saúde ocupacional, resumo da triagem do paciente, dosagens e orientações de prevenção.

### 8. 📚 Módulos Educativos Integrados
- **Guia de Ergonomia Home Office**: Regra 20-20-20, alinhamento dos olhos com a tela, apoio lombar e ângulo dos cotovelos a 90°.
- **Fundamentos do Método Pilates**: Explicação detalhada dos 6 princípios de Joseph Pilates aplicados ao trabalhador remoto.

---

## 🛠️ Stack Tecnológica

| Tecnologia | Finalidade |
| :--- | :--- |
| **React 19** | Biblioteca declarativa de interface orientada a componentes funcionais e hooks. |
| **TypeScript** | Tipagem estática rigorosa para garantir segurança biomecânica e consistência de dados. |
| **Tailwind CSS v4** | Framework utilitário de estilização com suporte nativo a modo Claro/Escuro (`@custom-variant dark`). |
| **Vite 8** | Bundler e ambiente de desenvolvimento ultrarrápido com Hot Module Replacement. |
| **Lucide React** | Conjunto coeso de ícones funcionais e minimalistas. |
| **Web Audio API** | Síntese de frequências acústicas suaves (*chimes*) para transição de exercícios sem dependências externas. |

---

## 📁 Estrutura do Repositório

```text
centra-pilates/
├── public/
├── src/
│   ├── assets/
│   │   └── images/              # Ativos visuais de estúdio e ergonomia
│   ├── components/
│   │   ├── AuthModal.tsx        # Modal de login, cadastro e perfil
│   │   ├── CalendarStreakView.tsx # Calendário mensal e rastreamento de ofensiva
│   │   ├── ClinicalAssessmentForm.tsx # Formulário interativo de queixas e restrições
│   │   ├── ClinicalAuditDrawer.tsx    # Relatório de transparência biomecânica
│   │   ├── ErgonomicsGuide.tsx        # Guia visual de postura para teletrabalho
│   │   ├── ExerciseCard.tsx           # Cartão técnico com passo a passo e avisos
│   │   ├── GuidedSessionModal.tsx     # Cronômetro de prática com guia de respiração
│   │   ├── Header.tsx                 # Barra superior conforme o Top Bar Contract
│   │   ├── PilatesPrinciplesView.tsx  # Metodologia e fundamentos de Contrologia
│   │   ├── PrintPrescriptionView.tsx  # Ficha clínica especializada para impressão/PDF
│   │   └── WorkoutPlanView.tsx        # Painel central da rotina com filtros
│   ├── data/
│   │   └── pilatesExercises.ts  # Base de dados clínica de Mat Pilates
│   ├── services/
│   │   ├── authService.ts       # Gestão de utilizador, histórico e cálculo de streak
│   │   └── clinicalEngine.ts    # Motor de cruzamento de contraindicações e fases
│   ├── types/
│   │   ├── auth.ts              # Interfaces de perfil, sessões e ofensiva
│   │   └── pilates.ts           # Definições de exercícios, restrições e planos
│   ├── utils/
│   │   └── audioChime.ts        # Sintetizador sonoro suave para transições
│   ├── App.tsx                  # Orquestrador de rotas e estado central
│   ├── index.css                # Importação Tailwind v4 e estilos de impressão
│   └── main.tsx                 # Ponto de entrada React
├── index.html                   # Metadados e carregamento de tipografia
├── package.json                 # Dependências e scripts de execução
├── tsconfig.json                # Configuração do TypeScript
└── vite.config.ts               # Configuração do Vite
```

---

## 💻 Instalação e Execução Local

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior instalada;
- Gerenciador de pacotes `npm` ou `yarn`.

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/centra-pilates.git
   cd centra-pilates
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acessar no navegador:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Outros Scripts Úteis
- **Verificação de Tipos (Lint/Typecheck):**
  ```bash
  npm run lint
  ```
- **Compilação de Produção:**
  ```bash
  npm run build
  ```
- **Pré-visualização do Build:**
  ```bash
  npm run preview
  ```

---

## ⚕️ Aviso de Rigor Clínico & Segurança

Este software foi projetado como uma ferramenta profilática de ergonomia e saúde ocupacional para teletrabalhadores saudáveis ou com dores posturais não complicadas. Não substitui consulta, diagnóstico médico presencial ou tratamento fisioterapêutico individualizado. Em caso de dor incapacitante, perda de força motora, queimação aguda ou irradiação nervosa para braços ou pernas, o usuário é orientado a interromper a prática e procurar atendimento especializado.

---

## 📄 Licença

Distribuído sob a licença **Apache 2.0**. Consulte o arquivo [LICENSE](LICENSE) para obter mais informações.

---

<p align="center">
  Desenvolvido com foco no bem-estar físico e na longevidade postural do trabalhador moderno.
</p>
