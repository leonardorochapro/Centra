import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { UserProfile } from '../types/auth';
import { registerUser, loginUser, DEMO_USER } from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      setErrorMsg('Por favor, informe o seu nome completo.');
      return;
    }

    try {
      if (mode === 'register') {
        const user = registerUser(name, email);
        onLoginSuccess(user);
      } else {
        const user = loginUser(email);
        onLoginSuccess(user);
      }
      onClose();
    } catch (err) {
      setErrorMsg('Ocorreu um erro ao processar. Tente novamente.');
    }
  };

  const handleDemoLogin = () => {
    onLoginSuccess(DEMO_USER);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal text-white flex items-center justify-center font-bold text-xs tracking-wider">
              C
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                {currentUser ? 'Perfil do Praticante' : mode === 'login' ? 'Acessar Conta' : 'Criar Perfil Clínico'}
              </h2>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                CENTRA · Gestão de Ofensiva
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If user is already logged in, show their profile & logout option */}
        {currentUser ? (
          <div className="p-6 space-y-6 text-xs">
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60">
              <div className="w-12 h-12 rounded-full bg-teal text-white flex items-center justify-center text-lg font-bold shrink-0">
                {currentUser.name.charAt(0)}
              </div>
              <div className="space-y-0.5 min-w-0">
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">
                  {currentUser.name}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 truncate">{currentUser.email}</p>
                <div className="flex items-center gap-1.5 text-teal-800 dark:text-teal-400 font-medium pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{currentUser.occupation}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-stone-600 dark:text-stone-300">
              <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                <span className="text-stone-500">Membro desde:</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  {currentUser.memberSince}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                <span className="text-stone-500">Jornada na Cadeira:</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  ~{currentUser.workHoursPerDay}h diárias de teletrabalho
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Status da Conta:</span>
                <span className="font-semibold text-teal-800 dark:text-teal-400">
                  Ativa · Ofensiva Sincronizada
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-colors cursor-pointer"
              >
                Encerrar Sessão (Sair)
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Continuar Treinando
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Mode Tabs */}
            <div className="flex items-center p-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMsg('');
                }}
                className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMsg('');
                }}
                className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                Criar Conta
              </button>
            </div>

            {/* Quick Demo Login Option */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full p-3 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/70 dark:bg-teal-950/40 text-teal-950 dark:text-teal-200 text-xs flex items-center justify-between hover:bg-teal-100/60 dark:hover:bg-teal-900/40 transition-colors cursor-pointer"
            >
              <div className="text-left">
                <span className="font-bold block">Acesso Rápido de Teste</span>
                <span className="text-[11px] text-teal-800 dark:text-teal-300">
                  Entrar como Leonardo Rocha (com ofensiva pré-carregada)
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-800 dark:text-teal-400 shrink-0" />
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-stone-200 dark:border-stone-800"></div>
              <span className="flex-shrink mx-3 text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
                ou com suas credenciais
              </span>
              <div className="flex-grow border-t border-stone-200 dark:border-stone-800"></div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs leading-relaxed">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {mode === 'register' && (
                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Ana Silva"
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-teal-700 text-xs"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  E-mail Profissional
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@empresa.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-teal-700 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-teal-700 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal hover:bg-[#163752] text-white font-semibold rounded-xl text-xs shadow-xs transition-colors cursor-pointer mt-2"
              >
                {mode === 'login' ? 'Entrar e Sincronizar Ofensiva' : 'Criar Perfil e Começar'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
