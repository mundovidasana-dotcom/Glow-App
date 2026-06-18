/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Heart, Activity, Calendar, ArrowRight, CheckCircle, 
  Smile, Flame, Shield, HelpCircle, TrendingUp, RefreshCw
} from 'lucide-react';

interface SymptomTrackerViewProps {
  onAddPoints?: (points: number) => void;
}

interface CheckInRecord {
  dateLabel: string;
  energy: number; // 1 to 5
  inflammation: number; // 1 to 5
  bloating: number; // 1 to 5
  completed: boolean;
}

export const SymptomTrackerView: React.FC<SymptomTrackerViewProps> = ({ onAddPoints }) => {
  // 5 Energy Levels
  const MOOD_ENERGY_LEVELS = [
    { level: 1, label: 'Agotada', emoji: '🥱', color: 'text-red-500 bg-red-50 border-red-200' },
    { level: 2, label: 'Cansada', emoji: '💤', color: 'text-amber-500 bg-amber-50 border-amber-200' },
    { level: 3, label: 'Neutral', emoji: '😐', color: 'text-slate-500 bg-slate-50 border-slate-200' },
    { level: 4, label: 'Con Energía', emoji: '😊', color: 'text-[#8F9E62] bg-[#CCD5AE]/10 border-[#CCD5AE]/40' },
    { level: 5, label: 'Radiante', emoji: '⚡', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' }
  ];

  // Current Checkin Form values
  const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null);
  const [inflammation, setInflammation] = useState<number>(3); // Slider (1 = Mínima, 5 = Máxima)
  const [bloating, setBloating] = useState<number>(3); // Slider (1 = Sin hinchazón, 5 = Extrema)
  const [digestiveNote, setDigestiveNote] = useState<string>('');
  const [isLoggedToday, setIsLoggedToday] = useState<boolean>(false);

  // Simulated 7 days database for stats rendering
  const [history, setHistory] = useState<CheckInRecord[]>([
    { dateLabel: 'Vie 12', energy: 2, inflammation: 4, bloating: 5, completed: true },
    { dateLabel: 'Sáb 13', energy: 3, inflammation: 3, bloating: 3, completed: true },
    { dateLabel: 'Dom 14', energy: 4, inflammation: 2, bloating: 2, completed: true },
    { dateLabel: 'Lun 15', energy: 5, inflammation: 1, bloating: 1, completed: true },
    { dateLabel: 'Mar 16', energy: 3, inflammation: 4, bloating: 4, completed: true },
    { dateLabel: 'Mié 17', energy: 4, inflammation: 2, bloating: 2, completed: true },
    { dateLabel: 'Hoy 18', energy: 0, inflammation: 0, bloating: 0, completed: false } // placeholder for today
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSaveCheckIn = () => {
    if (selectedEnergy === null) {
      setToastMessage('⚠️ Por favor selecciona tu nivel de energía actual.');
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    // Mark today as complete with values
    setHistory(prev => prev.map(rec => {
      if (rec.dateLabel === 'Hoy 18') {
        return {
          dateLabel: 'Hoy 18',
          energy: selectedEnergy,
          inflammation: 6 - inflammation, // inverse for nice chart presentation (higher is better wellbeing)
          bloating: 6 - bloating, // inverse for nice chart presentation (higher is better wellbeing)
          completed: true
        };
      }
      return rec;
    }));

    setIsLoggedToday(true);
    
    if (onAddPoints) {
      onAddPoints(15); // Log daily checkin awards 15 fitoquimicos/Points
    }

    setToastMessage('🎉 ¡Autoevaluación guardada! Sumaste +15 Puntos Glow por cuidar de ti.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-24 w-full font-sans text-left"
    >
      {/* Top Title Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8F9E62]">Mi Bienestar Habitual</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-dark mt-0.5 flex items-center gap-2">
            <Activity className="w-6.5 h-6.5 text-[#D4A373] shrink-0" />
            <span>Monitoreo de Síntomas Diarios</span>
          </h1>
          <p className="text-brand-grey text-xs mt-1 leading-relaxed">
            Mide tus niveles de ardor, hinchazón y energía para calibrar automáticamente las recomendaciones en tus recetas.
          </p>
        </div>

        <div className="bg-[#CCD5AE]/15 border border-[#CCD5AE]/40 rounded-full px-3 py-1 text-[11px] font-bold text-[#8F9E62] flex items-center gap-1.5 shrink-0 self-start sm:self-center">
          <Calendar className="w-3.5 h-3.5" />
          <span>Hoy: Jueves 18 de Junio</span>
        </div>
      </div>

      {/* Toast Alert Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-3.5 rounded-2xl text-xs font-bold shadow-sm border ${
              toastMessage.includes('⚠️') 
                ? 'bg-red-50 border-red-200 text-red-700' 
                : 'bg-[#CCD5AE]/20 border-[#CCD5AE] text-[#8F9E62]'
            }`}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* CHECK-IN CARD - SCREEN 14 (LEFT COMPONENT) */}
        <div className="md:col-span-7 bg-white border border-[#CDBCAC]/30 rounded-3xl p-5 sm:p-6 shadow-sm space-y-6">
          <div className="border-b border-[#CDBCAC]/20 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-[#D4A373] font-bold text-sm">✍</span>
              <h2 className="font-serif text-lg font-bold text-brand-dark">Chequeo de Hoy</h2>
            </div>
            {isLoggedToday ? (
              <span className="bg-[#CCD5AE]/30 border border-[#CCD5AE] text-[#8F9E62] text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1 select-none font-sans">
                ✓ REGISTRADO
              </span>
            ) : (
              <span className="bg-[#FAEDCD]/50 text-brand-primary text-[10px] font-extrabold px-3 py-1 rounded-full animate-pulse select-none">
                PENDIENTE (+15 pts)
              </span>
            )}
          </div>

          {!isLoggedToday ? (
            <div className="space-y-6">
              
              {/* 1. Mood/Energy Selector (5 custom icons) */}
              <div className="space-y-3">
                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block">
                  1. ¿Cuál es tu nivel de energía y ánimo en este momento?
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {MOOD_ENERGY_LEVELS.map((item) => {
                    const isPicked = selectedEnergy === item.level;
                    return (
                      <button
                        key={item.level}
                        type="button"
                        onClick={() => setSelectedEnergy(item.level)}
                        className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1 group cursor-pointer ${
                          isPicked 
                            ? `${item.color} scale-102 ring-2 ring-[#D4A373] shadow-inner` 
                            : 'bg-[#FDFBF9] border-[#CDBCAC]/25 hover:border-[#D4A373] hover:bg-white'
                        }`}
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                        <span className="text-[9px] font-bold truncate w-full">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Inflammation & Bloating parameters */}
              <div className="space-y-5 bg-[#FDFBF9] p-4 border border-[#CDBCAC]/15 rounded-2xl">
                
                {/* Inflammation Check */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="infl-slider" className="font-bold text-brand-dark flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span>Nivel de pesadez estomacal o acidez</span>
                    </label>
                    <span className="font-mono font-bold text-brand-primary bg-amber-50 px-2 py-0.5 rounded-md border border-[#CDBCAC]/20">
                      Nivel {inflammation} / 5
                    </span>
                  </div>
                  <input
                    id="infl-slider"
                    type="range"
                    min="1"
                    max="5"
                    value={inflammation}
                    onChange={(e) => setInflammation(Number(e.target.value))}
                    className="w-full accent-brand-primary h-2 bg-brand-subdued/60 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-brand-grey font-semibold uppercase tracking-wider px-1">
                    <span>Mínimo (Aliviado)</span>
                    <span>Máximo (Reflujo/Ardor)</span>
                  </div>
                </div>

                {/* Bloating Slider */}
                <div className="space-y-2 pt-2 border-t border-[#CDBCAC]/10">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="bloat-slider" className="font-bold text-brand-dark flex items-center gap-1.5">
                      <ScaleIcon className="w-4 h-4 text-[#8F9E62]" />
                      <span>Grado de inflamación o hinchazón abdominal</span>
                    </label>
                    <span className="font-mono font-bold text-brand-primary bg-amber-50 px-2 py-0.5 rounded-md border border-[#CDBCAC]/20">
                      Nivel {bloating} / 5
                    </span>
                  </div>
                  <input
                    id="bloat-slider"
                    type="range"
                    min="1"
                    max="5"
                    value={bloating}
                    onChange={(e) => setBloating(Number(e.target.value))}
                    className="w-full accent-[#8F9E62] h-2 bg-brand-subdued/60 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-brand-grey font-semibold uppercase tracking-wider px-1">
                    <span>Plano y ligero</span>
                    <span>Hinchado (Gases/Presión)</span>
                  </div>
                </div>
              </div>

              {/* Digestive notes */}
              <div className="space-y-1.5">
                <label htmlFor="digestive-note-input" className="text-[11px] font-black text-brand-dark uppercase tracking-wider block">
                  Notas Adicionales (Opcional)
                </label>
                <input
                  id="digestive-note-input"
                  type="text"
                  placeholder="Ej. Siento cólicos por estrés laboral o por comer lácteos..."
                  value={digestiveNote}
                  onChange={(e) => setDigestiveNote(e.target.value)}
                  className="w-full bg-[#FDFBF9] border border-[#CDBCAC]/40 focus:border-[#D4A373] outline-hidden rounded-xl text-xs px-4 py-3 font-medium transition-all"
                />
              </div>

              {/* SAVE CHECK-IN CTA BUTTON */}
              <button
                type="button"
                onClick={handleSaveCheckIn}
                className="w-full py-4 rounded-2xl bg-[#D4A373] hover:bg-[#c39162] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Guardar chequeo de bienestar</span>
                <CheckCircle className="w-4.5 h-4.5" />
              </button>
            </div>
          ) : (
            // Success logged state inside form column
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#CCD5AE]/20 text-[#8F9E62] flex items-center justify-center mx-auto shadow-inner animate-pulse">
                <CheckCircle className="w-9 h-9 stroke-[2.5]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-lg font-bold text-brand-dark">¡Felicidades por tu autoconsciencia!</h3>
                <p className="text-xs text-brand-grey max-w-sm mx-auto leading-relaxed">
                  Has completado el auto-monitoreo de hoy. Hemos procesado tus datos y verás el progreso reflejado en las gráficas semanales.
                </p>
              </div>

              <div className="bg-[#CCD5AE]/10 border border-[#CCD5AE]/30 max-w-xs mx-auto p-3 rounded-xl text-[10px] text-brand-dark space-y-1 font-semibold">
                <div className="text-[#8F9E62] uppercase font-bold text-[9px]">💡 Nutri-Tip Receptivo:</div>
                <p className="text-brand-grey font-medium leading-normal">
                  Basado en tu reporte, hoy incluimos un <strong className="text-brand-dark">Sorbete de Jengibre y Pepino</strong> en tus recomendaciones para favorecer la descompresión intestinal.
                </p>
              </div>

              <button
                onClick={() => setIsLoggedToday(false)}
                className="text-[10px] text-brand-primary font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Simular volver a calificar</span>
              </button>
            </div>
          )}
        </div>

        {/* STATISTICS CARD - SCREEN 14 (RIGHT COMPONENT: 7 DAYS PROGRESS BAR CHART) */}
        <div className="md:col-span-5 bg-white border border-[#CDBCAC]/30 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#CDBCAC]/20 pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#8F9E62]" />
                <h2 className="font-serif text-sm font-bold text-brand-dark">Estadísticas de 7 días</h2>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-brand-grey font-bold">Historial</span>
            </div>

            <p className="text-[11px] text-brand-grey leading-relaxed font-medium">
              Barra vertical indica <strong className="text-brand-dark">Ligereza Digestiva</strong> acumulada (valores más altos indican menor pesadez e inflamación).
            </p>

            {/* Custom SVG Bar Chart */}
            <div className="bg-[#FDFBF9] border border-brand-subdued/50 rounded-2xl p-4">
              <div className="h-44 flex items-end justify-between gap-1.5 pb-2 border-b border-[#CDBCAC]/30">
                {history.map((rec, index) => {
                  // If completed, compute well-being index (average of 6-inflammation and 6-bloating + energy)
                  const heightVal = rec.completed 
                    ? Math.round(((rec.energy + rec.inflammation + rec.bloating) / 15) * 100) 
                    : 0;

                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1 group relative">
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full mb-1 bg-brand-dark text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap whitespace-pre">
                        {rec.completed 
                          ? `Bienestar: ${heightVal}%\nÁnimo: ${rec.energy}★`
                          : 'Sin datos'}
                      </div>

                      <div className="w-full bg-[#CDBCAC]/15 rounded-t-md h-36 flex items-end overflow-hidden">
                        {rec.completed ? (
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${heightVal}%` }}
                            transition={{ delay: index * 0.05, duration: 0.8 }}
                            className={`w-full rounded-t-sm transition-all ${
                              heightVal > 70 
                                ? 'bg-[#8F9E62]' 
                                : heightVal > 45 
                                  ? 'bg-[#D4A373]' 
                                  : 'bg-orange-400'
                            }`}
                          />
                        ) : (
                          <div className="w-full h-2 bg-dotted bg-slate-350 bg-repeat-y opacity-30" />
                        )}
                      </div>

                      <span className="text-[9px] font-bold text-brand-grey shrink-0 pt-1">
                        {rec.dateLabel}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Legends */}
              <div className="flex gap-4 justify-center items-center pt-3 text-[9px] font-bold text-brand-grey">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#8F9E62]" />
                  <span>Óptimo (&gt;70%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#D4A373]" />
                  <span>Estable</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-orange-400" />
                  <span>Moderado</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#CCD5AE]/15 border border-[#CCD5AE]/30 p-3 rounded-xl mt-4 shrink-0 text-left">
            <span className="text-[10px] uppercase font-bold text-[#8F9E62] block">🚀 Desafío del Alumnado:</span>
            <p className="text-[10px] text-[#556037] font-semibold mt-0.5 leading-snug">
              Mantén una racha de 5 días de auto-monitoreo para desbloquear la guía hormonal "Glow Pro" de forma 100% gratuita. 
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Simple inline helper icon
const ScaleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="m16 16 3-8 3 8c-.87.37-2.14.58-3 .58s-2.13-.21-3-.58Z" />
    <path d="m2 16 3-8 3 8c-.87.37-2.14.58-3 .58s-2.13-.21-3-.58Z" />
    <path d="M7 21h10" />
    <path d="M12 2v19" />
    <path d="M12 4h10" />
    <path d="M12 4H2" />
  </svg>
);
