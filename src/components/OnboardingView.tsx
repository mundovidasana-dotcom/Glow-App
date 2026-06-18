/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Phone, Mail, User, Shield, CheckCircle, 
  ArrowRight, ArrowLeft, Star, Heart, Flame, ShieldAlert,
  Check
} from 'lucide-react';
import { UserProfile } from '../types';

interface OnboardingViewProps {
  onComplete: (userProfilePatch: Partial<UserProfile>) => void;
  onSkip: () => void;
}

const QUESTIONS = [
  {
    id: 'frequency',
    title: '¿Con qué frecuencia sientes inflamación abdominal?',
    subtitle: 'Esto nos ayuda a calibrar la dosis recomendada de caldos y prebióticos.',
    type: 'single',
    options: [
      { text: 'Diario', desc: 'Me siento hinchada casi todos los días o al comer' },
      { text: 'A veces', desc: 'Ocurre ante ciertos alimentos, estrés o al final de la tarde' },
      { text: 'Rara vez', desc: 'No suelo sufrir de hinchazón notable' }
    ]
  },
  {
    id: 'conditions',
    title: '¿Tienes alguna condición específica?',
    subtitle: 'Nuestros planes filtran ingredientes irritantes según tus sensibilidades.',
    type: 'multiple',
    options: [
      { text: 'Colon Irritable', desc: 'Gases constantes o cambios de hábito intestinal' },
      { text: 'Gastritis', desc: 'Ardor estomacal, reflujo o pesadez alta' },
      { text: 'Estreñimiento', desc: 'Tránsito lento o dificultad para evacuar diariamente' },
      { text: 'Ninguna', desc: 'Quiero comer saludable y prevenir inflamación' }
    ]
  },
  {
    id: 'goals',
    title: '¿Cuál es tu meta principal de bienestar en Glow?',
    subtitle: 'Te asignaremos retos prácticos para reprogramar tus hormonas y digestión.',
    type: 'single',
    options: [
      { text: 'Deshinchar mi vientre y aliviar pesadez', icon: '🌸' },
      { text: 'Aumentar mi nivel de energía y foco mental', icon: '⚡' },
      { text: 'Regular mi tránsito intestinal de forma natural', icon: '🌿' },
      { text: 'Aprender ciencia antiinflamatoria y recetas ricas', icon: '📚' }
    ]
  }
];

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete, onSkip }) => {
  // Step 0, 1, 2 = Questions. Step 3 = Lead Form. Step 4 = Success simulation.
  const [currentStep, setCurrentStep] = useState(0);
  
  // Quiz answers
  const [frequency, setFrequency] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [goal, setGoal] = useState('');

  // Register state
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+57');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNextQuestion = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Quiz completed! Go to Lead Form (Step 3)
      setCurrentStep(QUESTIONS.length);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelectSingle = (optionText: string) => {
    if (currentStep === 0) {
      setFrequency(optionText);
      // Perfect UX: Auto-advance on single select to keep it frictionless!
      setTimeout(() => handleNextQuestion(), 300);
    } else if (currentStep === 2) {
      setGoal(optionText);
      setTimeout(() => handleNextQuestion(), 300);
    }
  };

  const handleToggleMultiple = (optionText: string) => {
    if (optionText === 'Ninguna') {
      setSelectedConditions(['Ninguna']);
      return;
    }

    setSelectedConditions(prev => {
      const filtered = prev.filter(c => c !== 'Ninguna');
      if (filtered.includes(optionText)) {
        return filtered.filter(item => item !== optionText);
      } else {
        return [...filtered, optionText];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      return;
    }

    setIsSubmitted(true);
    setCurrentStep(4); // Success step
    
    // Simulate plan analysis and credit 150 points
    setTimeout(() => {
      onComplete({
        name: name.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: `${countryCode} ${phone.trim()}`,
        points: 200, // Include quiz + welcome bonus! 150 base + 50 quiz completes
        tier: 'Brote Activo',
        subscriptionActive: true,
        renewalDate: '18 de Julio, 2026' // 1 month free trial
      });
    }, 2500);
  };

  // Calculations for progress bar
  const totalSteps = QUESTIONS.length + 1; // questions + registration
  const progressPercent = Math.min(((currentStep) / totalSteps) * 100, 100);

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden font-sans">
      {/* Decorative blurry background circles */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#FAEDCD]/30 blur-3xl -z-10 animate-pulse duration-5000" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#CCD5AE]/20 blur-3xl -z-10 animate-pulse" />

      {/* Top Header Logo Bar */}
      <div className="mb-6 flex flex-col items-center text-center gap-1">
        <span className="font-serif text-3xl font-black text-brand-dark tracking-tight flex items-center gap-1.5">
          <span className="text-[#D4A373]">🌸</span> Glow
        </span>
        <p className="text-[10px] uppercase font-extrabold tracking-widest text-[#8F9E62]">Nutrición Científica & Antiinflamatoria</p>
      </div>

      <AnimatePresence mode="wait">
        {currentStep < QUESTIONS.length ? (
          // SCREEN 12: Interactive Onboarding Quiz (Pre-Registration)
          <motion.div
            key={`quiz-step-${currentStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-full max-w-lg bg-white border border-[#CDBCAC]/40 rounded-3xl p-6 sm:p-8 shadow-xl relative z-10 space-y-6"
          >
            {/* Top Indicator & Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#8F9E62]">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-1 text-[11px] font-bold ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-brand-grey hover:text-brand-dark transition-colors'}`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Atrás</span>
                </button>
                <span>Diagnóstico Inicial: {currentStep + 1} de {QUESTIONS.length}</span>
              </div>
              <div className="w-full h-1.5 bg-[#CCD5AE]/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-[#D4A373] to-[#8F9E62] transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="font-serif text-xl sm:text-2xl font-black text-brand-dark leading-tight">
                {QUESTIONS[currentStep].title}
              </h2>
              <p className="text-xs text-brand-grey">
                {QUESTIONS[currentStep].subtitle}
              </p>
            </div>

            {/* Answers List */}
            <div className="space-y-3">
              {QUESTIONS[currentStep].options.map((option, idx) => {
                const optText = option.text;
                const isSelected = currentStep === 1 
                  ? selectedConditions.includes(optText)
                  : currentStep === 0 
                    ? frequency === optText
                    : goal === optText;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (QUESTIONS[currentStep].type === 'single') {
                        handleSelectSingle(optText);
                      } else {
                        handleToggleMultiple(optText);
                      }
                    }}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 group ${
                      isSelected 
                        ? 'bg-[#CCD5AE]/10 border-[#8F9E62] shadow-sm' 
                        : 'bg-[#FDFBF9] border-[#CDBCAC]/30 hover:border-[#D4A373] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {'icon' in option && (
                        <span className="text-xl shrink-0 bg-white shadow-2xs p-1.5 rounded-lg border border-[#CDBCAC]/20">
                          {option.icon}
                        </span>
                      )}
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-brand-dark group-hover:text-brand-primary transition-colors">
                          {optText}
                        </h4>
                        {'desc' in option && (
                          <p className="text-[10px] text-brand-grey mt-0.5 leading-relaxed">
                            {option.desc}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                      isSelected 
                        ? 'bg-[#8F9E62] border-[#8F9E62] text-white' 
                        : 'border-[#CDBCAC]/65 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Drawer for multiple-select / skip */}
            <div className="flex gap-3 pt-2">
              {QUESTIONS[currentStep].type === 'multiple' ? (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  disabled={selectedConditions.length === 0}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white shadow-md flex items-center justify-center gap-2 transition-all ${
                    selectedConditions.length > 0 
                      ? 'bg-[#8F9E62] hover:bg-[#7e8c53] cursor-pointer' 
                      : 'bg-brand-grey/30 cursor-not-allowed'
                  }`}
                >
                  <span>Siguiente Pregunta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="w-full text-center">
                  <span className="text-[10px] text-brand-grey font-semibold">Selecciona una opción para avanzar rápidamente</span>
                </div>
              )}
            </div>

            {/* Quick Skip Link for testing/developers */}
            <div className="text-center">
              <button
                onClick={onSkip}
                className="text-[10px] text-brand-grey/70 hover:text-brand-dark transition-colors font-bold underline underline-offset-2"
              >
                Omitir diagnóstico y ver recetas demo
              </button>
            </div>
          </motion.div>
        ) : currentStep === QUESTIONS.length ? (
          // SCREEN 13: "Unlock Your Plan" Registration (Lead Capture)
          <motion.div
            key="lead-capture-step"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg bg-white border border-[#CDBCAC]/40 rounded-3xl p-6 sm:p-8 shadow-xl relative z-10"
          >
            {/* Header / Marketing Promo banner */}
            <div className="text-center space-y-3 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CCD5AE]/25 text-[#8F9E62] text-[10px] font-extrabold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 animate-spin" /> ¡Análisis Generado!
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-dark leading-tight">
                ¡Hemos creado tu plan antiinflamatorio!
              </h1>
              <p className="text-xs text-[#8F9E62] font-extrabold uppercase tracking-wide">
                Crea tu cuenta gratuita de 30 días para verlo.
              </p>
              
              {/* Dynamic personalized summary based on user selections */}
              <div className="bg-[#FAEDCD]/60 border border-amber-200/40 rounded-2xl p-3.5 text-brand-dark text-left space-y-2 text-xs font-semibold leading-relaxed">
                <div className="font-bold text-[13px] border-b border-[#CDBCAC]/35 pb-1.5 flex items-center justify-between text-amber-800">
                  <span>📋 Tu Receta de Diagnóstico:</span>
                  <span className="text-[10px] text-brand-grey font-normal font-sans">Antiinflamatoria</span>
                </div>
                <ul className="space-y-1 text-[11px] text-[#5c4a37]">
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#8F9E62]">✔</span> Frecuencia de Inflamación: <strong>{frequency || 'A veces'}</strong>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#8F9E62]">✔</span> Foco digestivo: <strong>{selectedConditions.join(', ') || 'Ninguna'}</strong>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#8F9E62]">✔</span> Meta recomendada: <strong className="text-amber-800">{goal || 'Deshinchar mi vientre'}</strong>
                  </li>
                </ul>
                <div className="pt-1.5 border-t border-[#CDBCAC]/25 text-[10px] text-brand-grey flex items-center justify-between">
                  <span>🎁 Primer mes 100% gratis</span>
                  <span>Solo $1/mes después</span>
                </div>
              </div>
            </div>

            {/* Registration Lead Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nombre */}
                <div className="space-y-1.5">
                  <label htmlFor="name-input" className="text-[11px] font-bold text-brand-dark uppercase tracking-wider block">
                    Nombre
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-grey/60">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      id="name-input"
                      type="text"
                      required
                      placeholder="Ej. María"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#FDFBF9] border border-[#CDBCAC]/50 focus:border-[#D4A373] outline-hidden rounded-xl text-xs pl-10 pr-4 py-3 font-medium transition-all"
                    />
                  </div>
                </div>

                {/* Apellido */}
                <div className="space-y-1.5">
                  <label htmlFor="lastname-input" className="text-[11px] font-bold text-brand-dark uppercase tracking-wider block">
                    Apellido
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-grey/60">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      id="lastname-input"
                      type="text"
                      required
                      placeholder="Ej. Alejandra"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-[#FDFBF9] border border-[#CDBCAC]/50 focus:border-[#D4A373] outline-hidden rounded-xl text-xs pl-10 pr-4 py-3 font-medium transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Correo Electrónico */}
              <div className="space-y-1.5">
                <label htmlFor="email-input" className="text-[11px] font-bold text-brand-dark uppercase tracking-wider block">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-grey/60">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    id="email-input"
                    type="email"
                    required
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FDFBF9] border border-[#CDBCAC]/50 focus:border-[#D4A373] outline-hidden rounded-xl text-xs pl-10 pr-4 py-3 font-medium transition-all"
                  />
                </div>
              </div>

              {/* Número de Celular with country code */}
              <div className="space-y-1.5">
                <label htmlFor="phone-input" className="text-[11px] font-bold text-brand-dark uppercase tracking-wider block">
                  Número de Celular
                </label>
                <div className="flex gap-2">
                  <select
                    id="country-code-select"
                    value={countryCode}
                    aria-label="Código de país"
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="bg-[#FDFBF9] border border-[#CDBCAC]/50 focus:border-[#D4A373] outline-hidden rounded-xl text-xs px-2.5 py-3 font-bold cursor-pointer transition-all shrink-0"
                  >
                    <option value="+57">🇨🇴 +57</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+52">🇲🇽 +52</option>
                    <option value="+54">🇦🇷 +54</option>
                    <option value="+56">🇨🇱 +56</option>
                    <option value="+51">🇵🇪 +51</option>
                  </select>
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-grey/60">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      id="phone-input"
                      type="tel"
                      required
                      placeholder="312 345 6789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#FDFBF9] border border-[#CDBCAC]/50 focus:border-[#D4A373] outline-hidden rounded-xl text-xs pl-10 pr-4 py-3 font-medium transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Opt-in checkmark */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="agreed-terms"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-1 h-3.5 w-3.5 rounded-sm border-[#CDBCAC] text-[#D4A373]"
                />
                <label htmlFor="agreed-terms" className="text-[10px] text-brand-grey leading-tight font-medium cursor-pointer">
                  Acepto los términos de servicio de Glow y quiero recibir resúmenes de nutrición antiinflamatoria semanales directamente a mi correo y celular.
                </label>
              </div>

              {/* CTA button */}
              <button
                type="submit"
                disabled={!agreedTerms}
                className={`w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-wider text-white shadow-md select-none transition-all flex items-center justify-center gap-2 ${
                  agreedTerms 
                    ? 'bg-[#D4A373] hover:bg-[#c39162] hover:shadow-lg active:scale-[0.99] cursor-pointer' 
                    : 'bg-brand-grey/40 cursor-not-allowed'
                }`}
              >
                <span>Ver mi plan y comenzar mes gratis</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </form>

            {/* Bypass/Demo Option */}
            <div className="mt-6 pt-5 border-t border-[#CDBCAC]/30 text-center flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="text-[10px] text-brand-grey font-bold hover:text-brand-dark transition-colors"
              >
                ← Volver al Quiz
              </button>
              <button
                type="button"
                onClick={onSkip}
                className="text-[10px] text-brand-grey font-bold hover:text-brand-dark transition-colors cursor-pointer"
              >
                Explorar demostración primero
              </button>
            </div>
          </motion.div>
        ) : (
          // Success state during analysis loading
          <motion.div
            key="success-step"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md bg-white border border-[#CCD5AE] rounded-3xl p-8 shadow-xl text-center space-y-6 relative z-10"
          >
            <div className="w-16 h-16 rounded-full bg-[#CCD5AE]/20 text-[#8F9E62] flex items-center justify-center mx-auto shadow-inner animate-bounce mb-3">
              <CheckCircle className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-extrabold text-brand-dark">¡Felicidades, {name}!</h2>
              <p className="text-xs text-brand-grey leading-relaxed">
                Tu cuenta de <strong className="text-brand-dark">Glow Premium</strong> ha sido creada correctamente. Recibes un bono de puntos por completar tu diagnóstico inicial:
              </p>
            </div>

            {/* Glowing Points reveal */}
            <div className="bg-[#FDFBF9] border border-[#CCD5AE]/40 p-4 rounded-2xl max-w-xs mx-auto text-center space-y-1 shadow-2xs">
              <div className="flex justify-center text-yellow-500 gap-1.5 animate-pulse">
                <Star className="w-5 h-5 fill-yellow-500" />
                <Star className="w-5 h-5 fill-yellow-500" />
                <Star className="w-5 h-5 fill-yellow-500" />
              </div>
              <span className="block font-serif text-3xl font-black text-[#D4A373] mt-1">200 PUNTOS GLOW</span>
              <span className="block text-[10px] uppercase font-bold text-[#8F9E62]">Nivel: Brote Activo</span>
            </div>

            <div className="bg-brand-bg rounded-xl p-3 border border-[#CDBCAC]/20 text-[10px] text-brand-dark space-y-1 font-semibold text-left">
              <div className="text-brand-primary uppercase text-[9px] font-bold">🎯 Plan asignado:</div>
              <div>🥑 {goal || 'Deshinchar mi vientre y aliviar pesadez'}</div>
              <div className="text-brand-grey text-[9px] mt-1 font-medium">Hemos configurado el Reto antiinflamatorio de 21 Días y el Muro de Síntomas específicamente para ti.</div>
            </div>

            <p className="text-[11px] text-[#8F9E62] font-semibold">
              ✨ ¡Comunidad y planes de recetas desbloqueados! Redirigiendo...
            </p>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-brand-grey">
              <Shield className="w-4 h-4 text-brand-primary" />
              <span>Garantía de privacidad de datos activa • TLS Seguro</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
