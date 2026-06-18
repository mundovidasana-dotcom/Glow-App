/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserProfile, Recipe, RecipeCategory } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, Shield, Calendar, Plus, Trash2, CheckCircle2, 
  Sparkle, PlusCircle, Save, Check, ShoppingBag, Grid, 
  HelpCircle, User, Star, Flame, Eye
} from 'lucide-react';

interface ProfileViewProps {
  userProfile: UserProfile;
  onUpdateUserProfile: (newProfile: UserProfile) => void;
  recipes: Recipe[];
  onAddRecipe: (newRecipe: Recipe) => void;
  shoppingList: { id: string; ingredientName: string; recipeTitle: string; completed: boolean }[];
  onToggleShoppingItem: (id: string) => void;
  onDeleteShoppingItem: (id: string) => void;
  onClearShoppingList: () => void;
  onSwitchToRecipe: (recipeId: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onUpdateUserProfile,
  recipes,
  onAddRecipe,
  shoppingList,
  onToggleShoppingItem,
  onDeleteShoppingItem,
  onClearShoppingList,
  onSwitchToRecipe
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState(userProfile.name);
  const [editedCountry, setEditedCountry] = useState(userProfile.country || 'Colombia');
  const [wellnessGoal, setWellnessGoal] = useState('Reducir inflamación y equilibrar hormonas');

  // CMS Form state
  const [showCms, setShowCms] = useState(false);
  const [cmsCategory, setCmsCategory] = useState<RecipeCategory>('Almuerzos');
  const [cmsTitle, setCmsTitle] = useState('');
  const [cmsTime, setCmsTime] = useState('20 min');
  const [cmsDifficulty, setCmsDifficulty] = useState<'Fácil' | 'Medio' | 'Difícil'>('Fácil');
  const [cmsKeyNutrient, setCmsKeyNutrient] = useState('Alto en Polifenoles');
  const [cmsBenefit, setCmsBenefit] = useState('Combate el estrés celular oxidativo.');
  const [cmsImageUrl, setCmsImageUrl] = useState('');
  const [cmsIngredientsLine, setCmsIngredientsLine] = useState("1 filete de tofu orgánico\n1/2 taza de espinacas tiernas\n1 cucharada de semillas de sésamo");
  const [cmsPrepLine, setCmsPrepLine] = useState("Corta el tofu en dados finos.\nSaltea en sartén caliente con aceite de oliva.\nAgrega espinacas al final.");
  const [cmsCalories, setCmsCalories] = useState(250);
  const [cmsProtein, setCmsProtein] = useState(15);
  const [cmsCarbs, setCmsCarbs] = useState(12);
  const [cmsFats, setCmsFats] = useState(16);

  // Success message after recipe register
  const [cmsSuccessMessage, setCmsSuccessMessage] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUserProfile({
      ...userProfile,
      name: editedName,
      country: editedCountry
    });
    setIsEditingProfile(false);
  };

  const handleRegisterRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmsTitle.trim()) {
      alert('Por favor ingresa un título de receta.');
      return;
    }

    // Default beautiful placeholder images based on categories
    let finalImg = cmsImageUrl.trim();
    if (!finalImg) {
      if (cmsCategory === 'Desayunos') {
        finalImg = 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80';
      } else if (cmsCategory === 'Almuerzos') {
        finalImg = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80';
      } else if (cmsCategory === 'Cenas') {
        finalImg = 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=800&q=80';
      } else {
        finalImg = 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=800&q=80';
      }
    }

    const ingredientsArr = cmsIngredientsLine
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const prepArr = cmsPrepLine
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const newRecipe: Recipe = {
      id: `custom-recipe-${Date.now()}`,
      title: cmsTitle,
      category: cmsCategory,
      image: finalImg,
      rating: 5.0,
      reviews: 1,
      time: cmsTime,
      difficulty: cmsDifficulty,
      keyNutrient: cmsKeyNutrient,
      whyAntiInflammatory: cmsBenefit,
      ingredients: ingredientsArr,
      preparation: prepArr,
      nutritionalInfo: {
        calories: Number(cmsCalories) || 280,
        protein: Number(cmsProtein) || 12,
        carbs: Number(cmsCarbs) || 20,
        healthyFats: Number(cmsFats) || 14
      },
      featured: false
    };

    onAddRecipe(newRecipe);

    // Clear and show success
    setCmsSuccessMessage(`¡La receta "${cmsTitle}" fue registrada en ${cmsCategory} con éxito!`);
    setCmsTitle('');
    setCmsBenefit('');
    setCmsImageUrl('');
    setTimeout(() => setCmsSuccessMessage(''), 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-20"
    >
      {/* Title */}
      <div>
        <span className="text-[11px] uppercase tracking-widest text-brand-primary font-bold">Glow Wellness</span>
        <h1 className="font-serif text-2xl font-bold text-brand-dark mt-0.5">Mi Perfil Wellness</h1>
      </div>

      {/* User Information Profile Card */}
      <div className="bg-white border border-brand-subdued/80 rounded-2xl p-5 shadow-2xs">
        <div className="flex items-center gap-4">
          <div 
            className="relative group cursor-pointer" 
            onClick={() => document.getElementById('avatar-upload-file')?.click()}
            title="Haz clic para cambiar tu foto de perfil"
          >
            <img 
              src={userProfile.avatar} 
              alt={userProfile.name} 
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-cover border-2 border-[#D4A373] shadow-xs group-hover:brightness-95 transition-all"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[9px] text-white font-black uppercase tracking-wider text-center px-1">Subir Foto</span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-brand-primary p-1 rounded-full text-white shadow-xs">
              <Shield className="w-3.5 h-3.5 fill-white" />
            </div>
            {/* Real functional hidden file input */}
            <input 
              id="avatar-upload-file"
              type="file" 
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    if (reader.result) {
                      onUpdateUserProfile({
                        ...userProfile,
                        avatar: reader.result as string
                      });
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>

          <div className="flex-1">
            {!isEditingProfile ? (
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-serif text-lg font-bold text-brand-dark">
                    {userProfile.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#CCD5AE]/20 border border-[#CCD5AE]/50 text-[#8F9E62]">
                    📍 {userProfile.country || 'Colombia'}
                  </span>
                </div>
                <p className="text-xs text-brand-grey font-medium flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-brand-primary animate-pulse" /> 
                  {wellnessGoal}
                </p>
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="text-[11px] text-brand-primary font-bold underline cursor-pointer hover:text-brand-primary/80 mt-1 block"
                >
                  Editar perfil
                </button>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-3">
                <div>
                  <label className="text-[9px] font-bold text-brand-grey uppercase tracking-wider block mb-0.5">Nombre completo</label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="bg-brand-bg border border-brand-subdued rounded-lg px-2.5 py-1.5 text-xs font-semibold w-full block focus:border-[#D4A373] outline-hidden"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-[9px] font-bold text-brand-grey uppercase tracking-wider block mb-0.5">País (Localización de Mercados)</label>
                  <select
                    value={editedCountry}
                    onChange={(e) => setEditedCountry(e.target.value)}
                    className="bg-brand-bg border border-brand-subdued rounded-lg px-2.5 py-1.5 text-xs font-semibold w-full block focus:border-[#D4A373] outline-hidden cursor-pointer"
                  >
                    <option value="Colombia">Colombia 🇨🇴</option>
                    <option value="México">México 🇲🇽</option>
                    <option value="Perú">Perú 🇵🇪</option>
                    <option value="Chile">Chile 🇨🇱</option>
                    <option value="Otro">Otro LatAm / General 🌎</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-bold text-brand-grey uppercase tracking-wider block mb-0.5">Objetivo de bienestar</label>
                  <input
                    type="text"
                    value={wellnessGoal}
                    onChange={(e) => setWellnessGoal(e.target.value)}
                    placeholder="Meta wellness..."
                    className="bg-brand-bg border border-brand-subdued rounded-lg px-2.5 py-1.5 text-xs text-brand-grey w-full focus:border-[#D4A373] outline-hidden"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="text-[10px] text-brand-grey font-semibold px-2 py-1 rounded-sm cursor-pointer hover:bg-brand-bg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="text-[10px] bg-[#D4A373] text-white font-semibold px-3 py-1.5 rounded-md cursor-pointer flex items-center gap-1 hover:bg-[#c39162]"
                  >
                    <Save className="w-3 h-3" /> Guardar Cambios
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Subscription Premium Status Glow Card */}
      <div className="relative overflow-hidden bg-radial from-[#FDFBF9] via-[#FAEDCD]/70 to-[#FAEDCD] border border-[#D4A373]/30 rounded-2xl p-5 shadow-xs">
        {/* Subtle premium sparkle crown */}
        <div className="absolute top-4 right-4 bg-yellow-500/10 p-2 rounded-full text-yellow-600 animate-pulse">
          <Star className="w-5 h-5 fill-yellow-500" />
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A373]">Suscripción Exclusiva</span>
            <h3 className="font-serif text-lg font-bold text-brand-dark mt-0.5">Suscripción Premium Activa</h3>
          </div>

          <p className="text-xs text-brand-grey leading-relaxed">
            Tienes acceso ilimitado a las guías de inflamación celular, recetas personalizadas de temporada, y el asistente didáctico Glow.
          </p>

          <div className="flex items-center gap-1.5 text-xs font-medium text-brand-dark bg-white/70 px-3 py-2 rounded-xl border border-brand-subdued/50 w-fit">
            <Calendar className="w-4 h-4 text-brand-primary" />
            <span>Próxima renovación: <strong className="text-brand-dark">{userProfile.renewalDate}</strong></span>
          </div>
          
          <div className="pt-2">
            <span className="text-[10px] font-bold text-brand-grey uppercase tracking-wider block mb-1.5">Tus Beneficios Glow:</span>
            <ul className="grid grid-cols-2 gap-2 text-[11px] text-brand-grey">
              <li className="flex items-center gap-1">✨ Recetas Semanales</li>
              <li className="flex items-center gap-1">✨ Didáctica Médica</li>
              <li className="flex items-center gap-1">✨ Listas de Compras</li>
              <li className="flex items-center gap-1">✨ Soporte de Pantalla Activa</li>
            </ul>
          </div>
        </div>
      </div>

      {/* GAMIFICATION DASHBOARD (Screen 11: Reward Tiers & Progress) */}
      <div className="bg-white border border-brand-subdued/80 rounded-2xl p-5 shadow-2xs space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">Gamificación Glow</span>
          <h2 className="font-serif text-lg font-bold text-brand-dark mt-0.5 flex items-center gap-1.5">
            <Award className="w-5 h-5 text-brand-primary animate-bounce shrink-0" />
            <span>Mi Progreso Recompensas</span>
          </h2>
        </div>

        {/* Circular progress & level status block */}
        <div className="flex items-center gap-5 bg-brand-bg/50 p-4 rounded-xl border border-brand-subdued/30">
          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle outline */}
              <circle 
                cx="40" 
                cy="40" 
                r="34" 
                className="stroke-brand-subdued/50" 
                strokeWidth="5" 
                fill="transparent" 
              />
              {/* Dynamic filled circle progress */}
              <circle 
                cx="40" 
                cy="40" 
                r="34" 
                className="stroke-[#D4A373]" 
                strokeWidth="5" 
                fill="transparent" 
                strokeDasharray="213.6"
                strokeDashoffset={213.6 - (213.6 * Math.min((userProfile.points || 150) / 500, 1)) }
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-serif font-black text-brand-dark leading-none">{userProfile.points || 150}</span>
              <span className="text-[8px] font-black text-[#8F9E62] leading-none mt-1">PTS</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#CCD5AE]/20 border border-[#CCD5AE]/40 text-[#8F9E62] text-[10px] font-bold uppercase select-none">
              🏅 {userProfile.tier || 'Brote Activo'}
            </div>
            <h4 className="font-serif font-bold text-xs text-brand-dark">Siguiente nivel en {500 - (userProfile.points || 150)} pts</h4>
            <p className="text-[10px] text-brand-grey leading-relaxed">
              Completar misiones antiinflamatorias te otorga fitoquímicos Glow que canjeas por premios y recursos didácticos exclusivos.
            </p>
          </div>
        </div>

        {/* Timeline roadmap of Locked / Unlocked rewards */}
        <div className="space-y-3.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark">Plan de Ruta & Desbloqueos</h3>
          
          <div className="relative pl-5 border-l-2 border-brand-subdued/50 space-y-5">
            {/* Threshold 1: 50 pts (Unlocked) */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0.5 bg-[#CCD5AE] text-white p-0.5 rounded-full ring-4 ring-[#FDFBF9]">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-brand-dark">Acceso Comunidad Integral</h4>
                  <span className="bg-[#CCD5AE]/15 border border-[#CCD5AE]/30 text-[#8F9E62] text-[8px] font-black px-1.5 py-0.5 rounded-sm">DESBLOQUEADO</span>
                </div>
                <p className="text-[10px] text-brand-grey mt-0.5">Te permite ver, publicar y puntuar comentarios y fotos en el muro social. (50 pts)</p>
              </div>
            </div>

            {/* Threshold 2: 200 pts (Progresando) */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0.5 bg-[#D4A373] text-white p-0.5 rounded-full ring-4 ring-[#FDFBF9] animate-pulse">
                <Sparkle className="w-3.5 h-3.5 fill-[#D4A373]" />
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-brand-dark">Sello "Recetas Flash" de 10 min</h4>
                  <span className="bg-amber-100 border border-amber-300 text-brand-primary text-[8px] font-black px-1.5 py-0.5 rounded-sm">PRÓXIMA META</span>
                </div>
                <p className="text-[10px] text-brand-grey mt-0.5">Accede a la subcategoría de preparaciones ultra rápidas de alta densidad nutricional. (200 pts)</p>
              </div>
            </div>

            {/* Threshold 3: 500 pts (Locked) */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0.5 bg-brand-grey/30 text-brand-grey/60 p-0.5 rounded-full ring-4 ring-[#FDFBF9]">
                <Plus className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-brand-grey">Guía Digital de Hormonas & VIP</h4>
                  <span className="bg-brand-bg border border-brand-subdued text-brand-grey text-[8px] font-bold px-1.5 py-0.5 rounded-sm">BLOQUEADO</span>
                </div>
                <p className="text-[10px] text-brand-grey mt-0.5">Descarga el e-book científico "Nutrición para Hashimoto y Sop" con valor de $25. (500 pts)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Small Point-Earning Guide */}
        <div className="border-t border-brand-subdued/45 pt-4 bg-[#FDFBF9] rounded-xl p-3 border space-y-2">
          <span className="text-[9px] font-black text-[#8F9E62] uppercase tracking-widest block">¿Cómo acumular puntos?</span>
          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
            <div className="p-2 bg-white border border-[#CDBCAC]/20 rounded-lg shadow-3xs">
              <strong className="block text-brand-primary">+5 pts</strong>
              <span className="text-brand-grey text-[9px] block">Comentar receta</span>
            </div>
            <div className="p-2 bg-white border border-[#CDBCAC]/20 rounded-lg shadow-3xs">
              <strong className="block text-brand-primary">+10 pts</strong>
              <span className="text-brand-grey text-[9px] block">Publicar foto</span>
            </div>
            <div className="p-2 bg-white border border-[#CDBCAC]/20 rounded-lg shadow-3xs">
              <strong className="block text-brand-primary">+1 pt</strong>
              <span className="text-brand-grey text-[9px] block">Muro Likes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Shopping List Panel with Checkboxes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-brand-dark flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-primary" /> Mi Lista de Compras
          </h2>
          {shoppingList.length > 0 && (
            <button
              onClick={onClearShoppingList}
              className="text-[11px] text-red-500 hover:text-red-700 font-bold transition-colors cursor-pointer"
            >
              Vaciar lista
            </button>
          )}
        </div>

        <div className="bg-white border border-brand-subdued/80 rounded-2xl p-4 shadow-3xs max-h-[300px] overflow-y-auto no-scrollbar">
          {shoppingList.length > 0 ? (
            <div className="space-y-2.5">
              {shoppingList.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-brand-bg/60 border border-brand-subdued/20 hover:border-brand-primary/10 transition-colors"
                >
                  <div
                    onClick={() => onToggleShoppingItem(item.id)}
                    className="flex items-start gap-2.5 flex-1 cursor-pointer select-none"
                  >
                    <button className="mt-0.5 shrink-0 text-brand-primary">
                      {item.completed ? (
                        <CheckCircle2 className="w-4.5 h-4.5 text-brand-secondary fill-white" />
                      ) : (
                        <div className="w-4.5 h-4.5 border border-brand-subdued rounded-md" />
                      )}
                    </button>
                    <div>
                      <span className={`text-xs block leading-relaxed font-medium ${item.completed ? 'line-through text-brand-grey/60 font-light' : 'text-brand-dark'}`}>
                        {item.ingredientName}
                      </span>
                      <span className="text-[9px] text-brand-grey uppercase tracking-wider block mt-0.5">
                        De: {item.recipeTitle}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteShoppingItem(item.id)}
                    className="p-1 px-2 text-brand-grey hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-brand-grey">
              <ShoppingBag className="w-8 h-8 mx-auto stroke-[1.5] opacity-40 text-brand-primary" />
              <p className="text-xs font-semibold mt-2">¿Lista vacía?</p>
              <p className="text-[10px] mt-0.5 max-w-[220px] mx-auto text-brand-grey/70">
                Abre cualquier receta y haz clic en "Añadir ingredientes a mi lista" para rellenar este panel.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Admin Panel CMS Form Collapsible */}
      <div className="border border-brand-subdued/80 rounded-2xl bg-white overflow-hidden shadow-3xs">
        <button
          onClick={() => setShowCms(!showCms)}
          className="w-full text-left p-4 flex items-center justify-between hover:bg-brand-bg transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#CCD5AE]/30 text-[#A3B18A]">
              <Grid className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-brand-dark block">Consola Administradora de Recetas</span>
              <span className="text-[10px] text-brand-grey block mt-0.5">Módulo CMS para registrar nuevos platillos didácticos</span>
            </div>
          </div>
          <span className={`text-xs font-bold px-3 py-1 bg-brand-subdued/40 text-brand-primary rounded-full transform transition-transform ${showCms ? 'rotate-180' : ''}`}>
            {showCms ? 'Ocultar' : 'Expandir'}
          </span>
        </button>

        <AnimatePresence>
          {showCms && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="border-t border-brand-subdued/40 p-5 bg-brand-bg/50"
            >
              {cmsSuccessMessage && (
                <div className="p-3 mb-4 bg-[#CCD5AE]/20 text-brand-dark border border-brand-secondary/40 text-xs rounded-xl font-medium text-center">
                  {cmsSuccessMessage}
                </div>
              )}

              <form onSubmit={handleRegisterRecipe} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Category selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider block">Categoría</label>
                    <select
                      value={cmsCategory}
                      onChange={(e) => setCmsCategory(e.target.value as RecipeCategory)}
                      className="w-full bg-white border border-brand-subdued rounded-xl text-xs p-2.5 outline-hidden focus:border-brand-primary cursor-pointer"
                    >
                      <option value="Desayunos">Desayunos</option>
                      <option value="Almuerzos">Almuerzos</option>
                      <option value="Cenas">Cenas</option>
                      <option value="Snacks y Postres">Snacks y Postres</option>
                    </select>
                  </div>

                  {/* Difficulty selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider block">Dificultad</label>
                    <select
                      value={cmsDifficulty}
                      onChange={(e) => setCmsDifficulty(e.target.value as any)}
                      className="w-full bg-white border border-brand-subdued rounded-xl text-xs p-2.5 outline-hidden focus:border-brand-primary cursor-pointer"
                    >
                      <option value="Fácil">Fácil</option>
                      <option value="Medio">Medio</option>
                      <option value="Difícil">Difícil</option>
                    </select>
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider block">Título del platillo</label>
                  <input
                    type="text"
                    placeholder="Ej. Bowl de Avena con Semillas de Cáñamo silvestres"
                    value={cmsTitle}
                    onChange={(e) => setCmsTitle(e.target.value)}
                    className="w-full bg-white border border-brand-subdued rounded-xl text-xs p-2.5 outline-hidden focus:border-brand-primary"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Time */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider block">Tiempo Estimado</label>
                    <input
                      type="text"
                      placeholder="Ej. 15 min"
                      value={cmsTime}
                      onChange={(e) => setCmsTime(e.target.value)}
                      className="w-full bg-white border border-brand-subdued rounded-xl text-xs p-2.5"
                    />
                  </div>

                  {/* Key nutrient */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider block">Nutriente Clave principal</label>
                    <input
                      type="text"
                      placeholder="Ej. Alto en Antioxidantes o Vitamina D"
                      value={cmsKeyNutrient}
                      onChange={(e) => setCmsKeyNutrient(e.target.value)}
                      className="w-full bg-white border border-brand-subdued rounded-xl text-xs p-2.5"
                    />
                  </div>
                </div>

                {/* Anti-inflammatory description why */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider block">Beneficio Antiinflamatorio (Didáctico)</label>
                  <textarea
                    rows={2}
                    placeholder="Describe por qué es curativo, ej: Regula el microbioma..."
                    value={cmsBenefit}
                    onChange={(e) => setCmsBenefit(e.target.value)}
                    className="w-full bg-white border border-brand-subdued rounded-xl text-xs p-2.5 outline-hidden focus:border-brand-primary"
                  />
                </div>

                {/* Ingredients lines */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider block">Ingredientes (Uno por línea)</label>
                    <span className="text-[9px] text-[#D4A373]">Soporte didáctico</span>
                  </div>
                  <textarea
                    rows={3}
                    value={cmsIngredientsLine}
                    onChange={(e) => setCmsIngredientsLine(e.target.value)}
                    className="w-full bg-white border border-brand-subdued rounded-xl text-xs p-2.5 font-mono"
                  />
                </div>

                {/* Preparation lines */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider block">Pasos de Preparación (Uno por línea)</label>
                  <textarea
                    rows={3}
                    value={cmsPrepLine}
                    onChange={(e) => setCmsPrepLine(e.target.value)}
                    className="w-full bg-white border border-brand-subdued rounded-xl text-xs p-2.5 font-mono"
                  />
                </div>

                {/* Nutritional Info grids */}
                <div className="space-y-1 p-3 border border-brand-subdued/50 bg-white rounded-xl">
                  <span className="text-[10px] font-bold text-brand-dark uppercase tracking-wider block mb-2">Información de Macronutrientes</span>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="space-y-1 text-center">
                      <span className="text-[9px] text-brand-grey font-medium block">Calorías</span>
                      <input
                        type="number"
                        value={cmsCalories}
                        onChange={(e) => setCmsCalories(Number(e.target.value))}
                        className="w-full bg-brand-bg rounded-lg text-center text-xs p-1"
                      />
                    </div>
                    <div className="space-y-1 text-center">
                      <span className="text-[9px] text-brand-grey font-medium block">Proteínas (g)</span>
                      <input
                        type="number"
                        value={cmsProtein}
                        onChange={(e) => setCmsProtein(Number(e.target.value))}
                        className="w-full bg-brand-bg rounded-lg text-center text-xs p-1"
                      />
                    </div>
                    <div className="space-y-1 text-center">
                      <span className="text-[9px] text-brand-grey font-medium block">Carbos (g)</span>
                      <input
                        type="number"
                        value={cmsCarbs}
                        onChange={(e) => setCmsCarbs(Number(e.target.value))}
                        className="w-full bg-brand-bg rounded-lg text-center text-xs p-1"
                      />
                    </div>
                    <div className="space-y-1 text-center">
                      <span className="text-[9px] text-brand-grey font-medium block">Grasas (g)</span>
                      <input
                        type="number"
                        value={cmsFats}
                        onChange={(e) => setCmsFats(Number(e.target.value))}
                        className="w-full bg-brand-bg rounded-lg text-center text-xs p-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Image URL Optional */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider block">Foto del platillo (URL de Unsplash - Opcional)</label>
                  <input
                    type="text"
                    placeholder="Deja vacío para usar una foto representativa según su categoría"
                    value={cmsImageUrl}
                    onChange={(e) => setCmsImageUrl(e.target.value)}
                    className="w-full bg-white border border-brand-subdued rounded-xl text-xs p-2.5"
                  />
                </div>

                {/* Register Submission CTA */}
                <button
                  type="submit"
                  className="w-full bg-[#D4A373] hover:bg-[#c39162] text-white py-2.5 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  <PlusCircle className="w-4 h-4" /> Registrar Receta en el Recetario
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Embedded database stats */}
      <div className="bg-white border border-brand-subdued/80 rounded-2xl p-4 shadow-3xs flex justify-between items-center text-xs text-brand-grey">
        <span>Glow Base de Platillos:</span>
        <span className="font-semibold text-brand-dark flex items-center gap-1">
          <Eye className="w-4 h-4 text-brand-primary" /> {recipes.length} Recetas didácticas cargadas
        </span>
      </div>

      {/* Developer Demo Assistant Reset */}
      <div className="pt-2 text-center">
        <button
          onClick={() => {
            localStorage.removeItem('glow_onboarding_completed');
            localStorage.removeItem('glow_profile');
            localStorage.removeItem('glow_social_posts');
            localStorage.removeItem('glow_saved_ids');
            localStorage.removeItem('glow_shopping_list');
            window.location.reload();
          }}
          type="button"
          className="text-[10px] text-brand-grey/60 font-bold hover:text-brand-dark transition-colors cursor-pointer inline-flex items-center gap-1 hover:underline underline-offset-2"
        >
          <span>🔄 Reestablecer Onboarding & Datos (Glow Test Mode)</span>
        </button>
      </div>
    </motion.div>
  );
};
