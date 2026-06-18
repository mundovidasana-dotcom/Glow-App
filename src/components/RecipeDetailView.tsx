/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Recipe } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Heart, Share2, Clock, Award, Check, 
  Lightbulb, Info, ShieldCheck, ShoppingBag, CheckSquare, Square,
  MessageSquare, Send, Sparkles, ThumbsUp, Camera, CheckSquare as VerifiedCheck
} from 'lucide-react';

interface RecipeDetailViewProps {
  recipe: Recipe;
  isSaved: boolean;
  onToggleSave: () => void;
  onGoBack: () => void;
  onAddIngredientsToShoppingList: (ingredients: string[], recipeTitle: string) => void;
  onAddPoints?: (points: number) => void;
  userAvatar?: string;
  userName?: string;
  userTier?: string;
}

type TabType = 'Ingredientes' | 'Preparación' | 'Información Nutricional';

export const RecipeDetailView: React.FC<RecipeDetailViewProps> = ({
  recipe,
  isSaved,
  onToggleSave,
  onGoBack,
  onAddIngredientsToShoppingList,
  onAddPoints,
  userAvatar = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
  userName = 'María Alejandra',
  userTier = 'Brote Activo'
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('Ingredientes');
  
  // Interactive state lists
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  
  // Simulated lock screen state
  const [wakeLockEnabled, setWakeLockEnabled] = useState(true);

  // Success Gallery & Comments local states (Phase 3)
  const [successGallery, setSuccessGallery] = useState([
    {
      id: 'gal-1',
      image: 'https://images.unsplash.com/photo-1517881917431-1348889736cd?auto=format&fit=crop&w=300&h=300&q=80',
      author: 'Valeria Ortiz',
      tier: 'Semilla Radiante'
    },
    {
      id: 'gal-2',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&h=300&q=80',
      author: 'Lucía Beltrán',
      tier: 'Flor Silvestre'
    },
    {
      id: 'gal-3',
      image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=300&h=300&q=80',
      author: 'Gabriela Ríos',
      tier: 'Rayo de Oro'
    }
  ]);

  const [commentsList, setCommentsList] = useState([
    {
      id: 'comm-1',
      authorName: 'Isabella Castillo',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
      tier: 'Brote Activo',
      text: 'La preparé hoy por la mañana y de verdad que se siente la ligereza intestinal. La canela de Ceylán le da un sabor increíble sin necesidad de añadir endulzantes adicionales. ¡10/10!',
      timeAgo: 'Hace 3 horas',
      likes: 12,
      liked: false
    },
    {
      id: 'comm-2',
      authorName: 'Alejandra Pérez',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80',
      tier: 'Semilla Radiante',
      text: 'Me encantó la didáctica médica que explica el por qué de sus ingredientes. Como paciente de Hashimoto, agradezco muchísimo que especifiquen cómo actúa en nuestras hormonas y el bienestar intestinal.',
      timeAgo: 'Ayer, 14:20',
      likes: 24,
      liked: false
    }
  ]);

  const [newCommentText, setNewCommentText] = useState('');

  const handleLikeComment = (id: string) => {
    setCommentsList(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          liked: !c.liked,
          likes: c.liked ? c.likes - 1 : c.likes + 1
        };
      }
      return c;
    }));
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    // Add comment to list
    const newComment = {
      id: `comm-new-${Date.now()}`,
      authorName: userName,
      authorAvatar: userAvatar,
      tier: userTier,
      text: newCommentText.trim(),
      timeAgo: 'Hace 1 min',
      likes: 0,
      liked: false
    };

    setCommentsList(prev => [newComment, ...prev]);
    setNewCommentText('');
    
    // Reward points!
    if (onAddPoints) {
      onAddPoints(5);
    }
    
    triggerToast('💬 ¡Gracias por comentar! Has sumado +5 Puntos Glow.', 'success');
  };

  const handleUploadPhoto = () => {
    // Generate a beautiful mock layout photo
    const foodImgs = [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&h=300&q=80',
      'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=300&h=300&q=80',
      'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=300&h=300&q=80'
    ];
    const randomImg = foodImgs[Math.floor(Math.random() * foodImgs.length)];

    const newItem = {
      id: `gal-new-${Date.now()}`,
      image: randomImg,
      author: userName,
      tier: userTier
    };

    setSuccessGallery(prev => [...prev, newItem]);
    
    // Reward points!
    if (onAddPoints) {
      onAddPoints(10);
    }

    triggerToast('📸 ¡Foto de receta subida con éxito! Sumaste +10 Puntos Glow.', 'success');
  };

  // Success Feedbacks state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'neutral' | 'success'>('neutral');

  const triggerToast = (msg: string, type: 'neutral' | 'success' = 'neutral') => {
    setToastMessage(msg);
    setToastColor(type);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleShare = () => {
    // Mimic share action
    if (navigator.clipboard) {
      const shareUrl = `${window.location.origin}/recipe/${recipe.id}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        triggerToast('📋 ¡Enlace copiado con éxito! Comparte salud.', 'success');
      }).catch(() => {
        triggerToast('📋 Enlace de receta interactiva generado.', 'neutral');
      });
    } else {
      triggerToast('📋 Enlace de receta interactiva generado.', 'neutral');
    }
  };

  const toggleIngredient = (ingName: string) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [ingName]: !prev[ingName]
    }));
  };

  const toggleStep = (stepIdx: number) => {
    setCheckedSteps(prev => ({
      ...prev,
      [stepIdx]: !prev[stepIdx]
    }));
  };

  const handleAddShoppingList = () => {
    onAddIngredientsToShoppingList(recipe.ingredients, recipe.title);
    triggerToast('🛍️ ¡Ingredientes añadidos con éxito a tu Lista de Compras!', 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.35 }}
      className="relative pb-28 text-brand-dark"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-xl w-[90%] max-w-sm text-center text-xs font-semibold backdrop-blur-md flex items-center justify-center gap-2 border ${
              toastColor === 'success'
                ? 'bg-[#CCD5AE]/95 text-brand-dark border-brand-secondary/40'
                : 'bg-white/95 text-brand-dark border-brand-subdued'
            }`}
          >
            {toastColor === 'success' && <ShieldCheck className="w-4 h-4 text-brand-primary" />}
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner with Image */}
      <div className="relative h-64 md:h-72 -mx-4 -mt-6 mb-6 overflow-hidden bg-brand-bg shadow-sm">
        <img
          src={recipe.image}
          alt={recipe.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Floating Header controls over banner */}
        <div className="absolute top-5 left-4 right-4 flex items-center justify-between">
          <button
            onClick={onGoBack}
            className="p-2.5 bg-white/90 backdrop-blur-xs rounded-full shadow-md text-brand-dark hover:bg-white active:scale-95 transition-transform cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={onToggleSave}
              className="p-2.5 bg-white/90 backdrop-blur-xs rounded-full shadow-md text-brand-dark hover:bg-white active:scale-95 transition-transform cursor-pointer"
            >
              <Heart className={`w-5 h-5 transition-colors ${isSaved ? 'fill-red-500 text-red-500' : 'text-brand-grey'}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 bg-white/90 backdrop-blur-xs rounded-full shadow-md text-brand-dark hover:bg-white active:scale-95 transition-transform cursor-pointer"
            >
              <Share2 className="w-5 h-5 text-brand-grey" />
            </button>
          </div>
        </div>

        {/* Title and Category Tag overlayed inside banner bottom */}
        <div className="absolute bottom-5 left-4 right-4 text-white">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-brand-primary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full select-none shadow-3xs">
              {recipe.category}
            </span>
            <span className="bg-[#CCD5AE] text-brand-dark text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 select-none shadow-3xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8F9E62] animate-pulse" />
              <span>Creado por Catherine - Glow Oficial</span>
            </span>
          </div>
          <h1 className="font-serif text-xl md:text-2xl font-bold leading-tight drop-shadow-md">
            {recipe.title}
          </h1>
        </div>
      </div>

      {/* Didactic Information Block (Why Anti-Inflammatory) */}
      <div className="bg-[#FAEDCD]/40 border border-brand-primary/20 rounded-2xl p-5 mb-5 space-y-2">
        <h3 className="text-xs font-bold text-brand-primary uppercase tracking-widest flex items-center gap-1.5">
          <Award className="w-4 h-4" /> ¿Por qué es Antiinflamatorio?
        </h3>
        <p className="text-xs md:text-sm text-brand-grey leading-relaxed">
          {recipe.whyAntiInflammatory}
        </p>
      </div>

      {/* Interactive Wake Lock Simulated Banner */}
      <div className="bg-white border border-brand-subdued/80 rounded-2xl p-4 mb-6 shadow-2xs flex items-center justify-between gap-4">
        <div className="flex gap-2.5 items-start">
          <span className="p-1.5 rounded-lg bg-[#CCD5AE]/20 mt-0.5 text-brand-primary">
            <Lightbulb className="w-4.5 h-4.5" />
          </span>
          <div>
            <h4 className="text-xs font-bold text-brand-dark leading-tight">Pantalla Activa Glow</h4>
            <p className="text-[10px] text-brand-grey mt-0.5">
              Evita el apagado automático de tu pantalla mientras cocinas, manteniendo tus manos libres.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setWakeLockEnabled(!wakeLockEnabled);
            triggerToast(
              wakeLockEnabled 
                ? '🔒 Simulación de Pantalla Desactiva. La pantalla seguirá tu configuración habitual de reposo.' 
                : '✨ ¡Simulación de Pantalla Activa! El dispositivo permanecerá iluminado mientras cocinas.',
              'neutral'
            );
          }}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
            wakeLockEnabled ? 'bg-brand-primary' : 'bg-brand-grey/20'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
              wakeLockEnabled ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Preparation Meta Row */}
      <div className="flex items-center justify-around bg-brand-subdued/20 border border-brand-subdued/30 rounded-2xl py-3 px-4 mb-6 text-xs text-brand-grey">
        <div className="text-center">
          <span className="block text-[10px] uppercase font-bold text-brand-primary">Tiempo</span>
          <span className="font-semibold text-brand-dark text-[13px] flex items-center justify-center gap-1 mt-0.5">
            <Clock className="w-3.5 h-3.5" /> {recipe.time}
          </span>
        </div>
        <div className="w-px h-8 bg-brand-subdued/45" />
        <div className="text-center">
          <span className="block text-[10px] uppercase font-bold text-brand-primary">Dificultad</span>
          <span className="font-semibold text-brand-dark text-[13px] block mt-0.5">{recipe.difficulty}</span>
        </div>
        <div className="w-px h-8 bg-brand-subdued/45" />
        <div className="text-center">
          <span className="block text-[10px] uppercase font-bold text-brand-primary">Nutriente Clave</span>
          <span className="font-semibold text-[#CCD5AE] bg-[#CCD5AE]/10 border border-[#CCD5AE]/20 rounded-md px-2 py-0.5 text-[11px] block mt-0.5 font-sans">
            {recipe.keyNutrient.split(' ')[0] || 'Omega-3'}
          </span>
        </div>
      </div>

      {/* Elegant Horizontal Toggle Tabs */}
      <div className="mb-6">
        <div className="flex border-b border-brand-subdued/40 justify-center">
          {(['Ingredientes', 'Preparación', 'Información Nutricional'] as TabType[]).map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-3 text-xs md:text-sm font-semibold tracking-wide transition-all cursor-pointer flex-1 text-center ${
                  isActive ? 'text-brand-primary font-bold' : 'text-brand-grey hover:text-brand-dark'
                }`}
              >
                {tab}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Panels */}
      <div className="min-h-[160px]">
        {/* PANEL 1: INGREDIENTES */}
        {activeTab === 'Ingredientes' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3.5"
          >
            <p className="text-[11px] leading-tight text-brand-grey flex items-center gap-1 mb-2">
              <Info className="w-3.5 h-3.5 text-brand-primary shrink-0" /> Mark off ingredients you already have laid out on your counter!
            </p>
            {recipe.ingredients.map((ingredient, idx) => {
              const isChecked = !checkedIngredients[ingredient];
              return (
                <div
                  key={idx}
                  onClick={() => toggleIngredient(ingredient)}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                    !isChecked
                      ? 'bg-brand-bg/40 border-brand-subdued/40 opacity-70'
                      : 'bg-white border-brand-subdued/50 hover:border-brand-primary/30 shadow-2xs'
                  }`}
                >
                  <button className="mt-0.5 shrink-0 transition-all text-brand-primary">
                    {!isChecked ? (
                      <CheckSquare className="w-4.5 h-4.5 fill-brand-primary text-white" />
                    ) : (
                      <Square className="w-4.5 h-4.5" />
                    )}
                  </button>
                  <span
                    className={`text-xs md:text-sm leading-relaxed ${
                      !isChecked ? 'line-through text-brand-grey/60 font-light' : 'text-brand-dark font-medium'
                    }`}
                  >
                    {ingredient}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* PANEL 2: PREPARACION */}
        {activeTab === 'Preparación' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            <p className="text-[11px] leading-tight text-brand-grey flex items-center gap-1 mb-1">
              <Check className="w-3.5 h-3.5 text-brand-secondary shrink-0" /> Check steps off to record your cooking journey.
            </p>

            {recipe.preparation.map((step, idx) => {
              const stepChecked = !!checkedSteps[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className={`flex gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                    stepChecked
                      ? 'bg-brand-secondary/10 border-brand-secondary/20 opacity-70'
                      : 'bg-white border-brand-subdued/50 hover:border-brand-primary/20 shadow-2xs'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    stepChecked 
                      ? 'bg-[#CCD5AE] text-brand-dark' 
                      : 'bg-brand-subdued/30 text-brand-primary'
                  }`}>
                    {idx + 1}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <p className={`text-xs md:text-sm leading-relaxed transition-all ${
                      stepChecked ? 'line-through text-brand-grey/70 italic' : 'text-brand-dark font-medium'
                    }`}>
                      {step}
                    </p>
                  </div>

                  <div className="mt-1 shrink-0 text-brand-primary">
                    {stepChecked ? (
                      <div className="w-4.5 h-4.5 bg-[#CCD5AE] text-white rounded-md flex items-center justify-center shadow-3xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-4.5 h-4.5 border border-brand-subdued rounded-md" />
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* PANEL 3: INFORMACION NUTRICIONAL */}
        {activeTab === 'Información Nutricional' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-brand-subdued/70 rounded-2xl p-5 shadow-2xs space-y-5"
          >
            <div className="pb-3 border-b border-brand-subdued/40 justify-between items-center flex">
              <span className="font-serif text-sm font-bold">Porción Recomendada</span>
              <span className="text-xs bg-[#FAEDCD] text-brand-primary px-3 py-1 rounded-full font-semibold">1 ración completa</span>
            </div>

            {/* Total Calories Panel */}
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs text-brand-grey font-medium uppercase tracking-wider block">Calorías Totales</span>
                <span className="text-3xl font-extrabold text-brand-dark font-mono mt-0.5 block">{recipe.nutritionalInfo.calories} <span className="text-xs font-normal text-brand-grey uppercase">kcal</span></span>
              </div>
              <div className="p-2.5 bg-brand-subdued/30 rounded-xl">
                <Info className="w-5 h-5 text-brand-primary" />
              </div>
            </div>

            <div className="space-y-3.5 pt-2">
              <div className="text-xs font-bold text-brand-grey uppercase tracking-widest block mb-1">Distribución de Macronutrientes</div>
              
              {/* Protein indicator */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-brand-dark flex items-center gap-1.5 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4A373]" /> Proteínas
                  </span>
                  <span className="text-brand-grey font-mono">{recipe.nutritionalInfo.protein}g</span>
                </div>
                <div className="h-2 w-full bg-brand-bg rounded-lg overflow-hidden">
                  <div 
                    style={{ width: `${Math.min((recipe.nutritionalInfo.protein / 50) * 100, 100)}%` }} 
                    className="h-full bg-[#D4A373] rounded-lg" 
                  />
                </div>
              </div>

              {/* Carbs indicator */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-brand-dark flex items-center gap-1.5 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FAEDCD]" /> Carbohidratos Complejos
                  </span>
                  <span className="text-brand-grey font-mono">{recipe.nutritionalInfo.carbs}g</span>
                </div>
                <div className="h-2 w-full bg-brand-bg rounded-lg overflow-hidden">
                  <div 
                    style={{ width: `${Math.min((recipe.nutritionalInfo.carbs / 80) * 100, 100)}%` }} 
                    className="h-full bg-brand-primary rounded-lg" 
                  />
                </div>
              </div>

              {/* Fats indicator */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-brand-dark flex items-center gap-1.5 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#CCD5AE]" /> Grasas Saludables
                  </span>
                  <span className="text-brand-grey font-mono">{recipe.nutritionalInfo.healthyFats}g</span>
                </div>
                <div className="h-2 w-full bg-brand-bg rounded-lg overflow-hidden">
                  <div 
                    style={{ width: `${Math.min((recipe.nutritionalInfo.healthyFats / 40) * 100, 100)}%` }} 
                    className="h-full bg-[#CCD5AE] rounded-lg" 
                  />
                </div>
              </div>
            </div>

            <p className="text-[10px] text-brand-grey leading-relaxed text-center italic pt-2">
              *Los valores nutricionales pueden fluctuar ligeramente según la procedencia ecológica de tus ingredientes.
            </p>
          </motion.div>
        )}
      </div>

      {/* SUCCESS GALLERY - "Así les quedó a la comunidad" */}
      <div className="mt-8 pt-6 border-t border-brand-subdued/40 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-base font-bold text-brand-dark">Así les quedó a la comunidad</h3>
            <p className="text-[10px] text-brand-grey">Fotos subidas de forma independiente por alumnas de Glow</p>
          </div>
          <button
            onClick={handleUploadPhoto}
            type="button"
            className="bg-[#CCD5AE]/40 hover:bg-[#CCD5AE]/60 text-brand-dark px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95 shrink-0"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Subir mi foto (+10 pts)</span>
          </button>
        </div>

        {/* Horizontal scroll of gallery */}
        <div className="flex gap-4 overflow-x-auto pb-3 snap-x scrollbar-none select-none">
          {successGallery.map((item) => (
            <div 
              key={item.id} 
              className="flex-shrink-0 w-36 bg-white border border-[#CDBCAC]/25 rounded-2xl overflow-hidden shadow-3xs snap-start"
            >
              <div className="relative h-24 bg-brand-bg">
                <img 
                  src={item.image} 
                  alt={`Hecho por ${item.author}`} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 bg-black/65 backdrop-blur-xs text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md">
                  ✨ {item.tier}
                </div>
              </div>
              <div className="p-2 bg-white">
                <p className="text-[10px] font-bold text-brand-dark truncate">De {item.author}</p>
                <span className="text-[8px] text-[#8F9E62] font-semibold block">• Receta Validada</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INTERACTIVE COMMENTS SECTION */}
      <div className="mt-8 pt-6 border-t border-[#CDBCAC]/30 space-y-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4.5 h-4.5 text-brand-primary" />
          <h3 className="font-serif text-base font-bold text-brand-dark">Preguntas y Experiencias</h3>
        </div>

        {/* Post Comment form */}
        <div className="bg-white border border-[#CDBCAC]/20 p-4 rounded-2xl shadow-3xs space-y-3">
          <label htmlFor="comment-input" className="text-[11px] font-bold text-brand-primary uppercase tracking-wider block">
            ¿Te funcionó esta receta? ¡Cuéntanos tu experiencia y gana puntos!
          </label>
          <form onSubmit={handleSubmitComment} className="relative">
            <input
              id="comment-input"
              type="text"
              placeholder="Ej. Me pareció sumamente refrescante..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="w-full bg-[#FDFBF9] border border-brand-subdued rounded-xl text-xs pl-4 pr-12 py-3 outline-hidden focus:border-brand-primary font-medium"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-primary hover:bg-[#be9060] text-white rounded-lg active:scale-95 transition-all cursor-pointer shadow-xs"
              title="Publicar comentario"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="flex items-center gap-1.5 text-[9px] text-[#8F9E62] font-semibold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" />
            <span>Reglas: Comenta (+5 pts) • Sube foto (+10 pts) • Recibe Likes (+1 pt)</span>
          </div>
        </div>

        {/* Comments Feed */}
        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1 scrollbar-none pb-12">
          {commentsList.map((comm) => (
            <div 
              key={comm.id} 
              className="bg-white border border-brand-subdued/40 rounded-2xl p-4 shadow-3xs flex gap-3 text-xs text-left"
            >
              <img 
                src={comm.authorAvatar} 
                alt={comm.authorName} 
                className="w-8 h-8 rounded-full object-cover border border-[#CDBCAC]/30 self-start shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 space-y-1 my-0.5 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="font-bold text-brand-dark text-xs truncate">{comm.authorName}</h4>
                    <span className="inline-flex text-[8px] font-bold text-[#8F9E62] bg-[#CCD5AE]/15 px-1.5 py-0.5 rounded-md mt-0.5 border border-[#CCD5AE]/20 font-sans leading-none">
                      🏅 {comm.tier}
                    </span>
                  </div>
                  <span className="text-[10px] text-brand-grey font-medium shrink-0">{comm.timeAgo}</span>
                </div>
                <p className="text-brand-dark text-xs leading-relaxed font-semibold break-words mt-1">
                  {comm.text}
                </p>
                <div className="flex items-center gap-1.5 pt-1.5 text-brand-grey">
                  <button 
                    type="button"
                    onClick={() => handleLikeComment(comm.id)}
                    className={`flex items-center gap-1 font-bold text-[10px] transition-colors cursor-pointer ${comm.liked ? 'text-brand-primary animate-pulse' : 'hover:text-brand-dark'}`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${comm.liked ? 'fill-brand-primary' : ''}`} />
                    <span>{comm.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Floating Shopping List Footer Button */}
      <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-4 z-40 bg-linear-to-t from-brand-bg via-brand-bg/80 to-transparent pt-4 pb-2">
        <button
          onClick={handleAddShoppingList}
          className="w-full bg-[#D4A373] hover:bg-[#c39162] text-white py-3.5 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:translate-y-[-1px] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-4.5 h-4.5 text-white" />
          Añadir ingredientes a mi lista
        </button>
      </div>
    </motion.div>
  );
};
