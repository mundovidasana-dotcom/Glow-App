/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Recipe, RecipeCategory } from '../types';
import { motion } from 'motion/react';
import { Sparkles, Soup, Coffee, Apple, Compass, ChevronRight, Star, Heart, ArrowRight } from 'lucide-react';

interface DashboardViewProps {
  userName: string;
  userImage?: string; // Pasamos la foto de forma dinámica
  recipes: Recipe[];
  onSelectCategory: (category: RecipeCategory) => void;
  onSelectRecipe: (recipeId: string) => void;
  savedRecipeIds: string[];
  onToggleSaveRecipe: (recipeId: string) => void;
}

const SHIELD_TIPS = [
  {
    text: "La cúrcuma es mejor si se consume con pimienta negra: la piperina aumenta su absorción en un 2000%.",
    source: "Nutrición Celular"
  },
  {
    text: "Cocinar el brócoli al vapor durante un máximo de 4 minutos preserva el sulforafano, un potente desintoxicante.",
    source: "Fitonutrientes"
  },
  {
    text: "Incorporar cacao puro (>85%) aporta flavonoides que desinflaman el sistema cardiovascular.",
    source: "Cardio-saludable"
  },
  {
    text: "Beber agua templada con rodajas de jengibre fresco estimula la digestión bloqueando citocinas inflamatorias.",
    source: "Hábitos Matutinos"
  }
];

export const DashboardView: React.FC<DashboardViewProps> = ({
  userName,
  userImage,
  recipes,
  onSelectCategory,
  onSelectRecipe,
  savedRecipeIds,
  onToggleSaveRecipe
}) => {
  const [tipIndex, setTipIndex] = useState(0);

  // Determine dynamic greeting based on current local time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      return '¡Buenos días';
    } else if (hour >= 12 && hour < 20) {
      return '¡Buenas tardes';
    } else {
      return '¡Buenas noches';
    }
  };

  const currentTip = SHIELD_TIPS[tipIndex];

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % SHIELD_TIPS.length);
  };

  // Get a few featured/new recipes
 const featuredRecipes = (recipes || []).filter(r => r.featured).slice(0, 4);
  // Category card config
  const categoriesConfig: { category: RecipeCategory; title: string; icon: React.ReactNode; desc: string; bg: string }[] = [
    { 
      category: 'Desayunos', 
      title: 'Desayunos', 
      icon: <Coffee className="w-6 h-6 text-[#9CA970]" />, 
      desc: 'Energía sutil',
      bg: 'bg-[#CCD5AE]/15 hover:bg-[#CCD5AE]/25'
    },
    { 
      category: 'Almuerzos', 
      title: 'Almuerzos', 
      icon: <Compass className="w-6 h-6 text-[#D4A373]" />, 
      desc: 'Nutritivos y saciantes',
      bg: 'bg-[#FAEDCD]/40 hover:bg-[#FAEDCD]/60'
    },
    { 
      category: 'Cenas', 
      title: 'Cenas', 
      icon: <Soup className="w-6 h-6 text-[#A3B18A]" />, 
      desc: 'Ligeras y reparadoras',
      bg: 'bg-[#CCD5AE]/15 hover:bg-[#CCD5AE]/25'
    },
    { 
      category: 'Snacks y Postres', 
      title: 'Snacks y Postres', 
      icon: <Apple className="w-6 h-6 text-[#E0A96D]" />, 
      desc: 'Caprichos saludables',
      bg: 'bg-[#FAEDCD]/40 hover:bg-[#FAEDCD]/60'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-20"
    >
      {/* Dynamic Greeting */}
      <div className="flex justify-between items-start pt-2">
        <div>
          <span className="text-[13px] uppercase tracking-widest text-brand-grey font-semibold">Bienvenida a Glow</span>
          <h1 className="font-serif text-3xl font-bold text-brand-dark mt-0.5">
            {getGreeting()}, {userName.split(' ')[0]}!
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-brand-primary overflow-hidden shadow-xs">
          <img 
            src={userImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"} 
            alt={`Avatar de ${userName}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover" 
          />
        </div>
      </div>

      {/* Tip of the Day Card */}
      <div 
        id="tip-of-the-day"
        className="relative overflow-hidden bg-brand-subdued/40 border border-brand-primary/20 rounded-3xl p-6 shadow-xs flex flex-col justify-between"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles className="w-24 h-24 text-brand-primary" />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brand-primary" />
            </span>
            <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
              Consejo Antiinflamatorio del Día
            </span>
          </div>
          
          <p className="text-[14px] text-brand-dark leading-relaxed font-medium">
            "{currentTip.text}"
          </p>
        </div>

        <div className="flex justify-between items-center mt-5 pt-3 border-t border-brand-primary/10">
          <span className="text-[11px] font-semibold uppercase text-brand-grey tracking-wider">
            Tema: {currentTip.source}
          </span>
          <button 
            onClick={handleNextTip}
            className="text-xs font-semibold py-1 px-3 text-brand-primary hover:bg-brand-primary/10 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
          >
            Siguiente consejo
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Didactic Navigation Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl font-bold text-brand-dark">Categorías Nutritivas</h2>
          <span className="text-xs text-brand-grey font-medium">Nutrición de precisión</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categoriesConfig.map((item, index) => (
            <button
              key={index}
              onClick={() => onSelectCategory(item.category)}
              className={`${item.bg} text-left p-5 rounded-2xl border border-brand-subdued/25 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xs group cursor-pointer flex flex-col justify-between min-h-[135px]`}
            >
              <div className="p-2.5 bg-white rounded-xl shadow-xs w-fit group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div>
                <h3 className="font-serif text-base font-semibold text-brand-dark mt-3 block group-hover:text-brand-primary transition-colors">
                  {item.title}
                </h3>
                <span className="text-[11px] text-brand-grey font-normal mt-0.5 block leading-tight">
                  {item.desc}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Horizontally Scrollable Featured Carousel */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-brand-dark">Recetas Recomendadas</h2>
            <p className="text-xs text-brand-grey">Aprobadas por nutricionistas esta semana</p>
          </div>
          <button 
            onClick={() => onSelectCategory('Almuerzos')}
            className="text-xs text-brand-primary font-semibold flex items-center gap-1 hover:underline cursor-pointer"
          >
            Ver más
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar snapped-x-scroll snap-mandatory scroll-smooth">
          {featuredRecipes.map((recipe) => (
            <div 
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe.id)}
              className="min-w-[280px] max-w-[280px] snap-start bg-white rounded-2xl overflow-hidden shadow-[0_4px_18px_rgba(0,0,0,0.02)] border border-brand-subdued/30 hover:border-brand-primary/30 hover:shadow-[0_8px_25px_rgba(212,163,115,0.06)] transition-all cursor-pointer flex flex-col"
            >
              <div className="relative h-40 w-full bg-brand-bg">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Heart save toggle button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSaveRecipe(recipe.id);
                  }}
                  className="absolute top-2.5 right-2.5 p-2 bg-white/90 backdrop-blur-xs rounded-full shadow-xs hover:scale-110 active:scale-95 transition-transform"
                >
                  <Heart 
                    className={`w-4 h-4 transition-colors ${
                      savedRecipeIds.includes(recipe.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-brand-grey hover:text-red-500'
                    }`} 
                  />
                </button>

                {/* Star rating */}
                <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs py-0.5 px-2 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-brand-primary text-brand-primary" />
                  <span className="text-[10px] font-semibold text-brand-dark">{recipe.rating} ({recipe.reviews})</span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wide text-brand-grey font-semibold block mb-1">
                    {recipe.category} • {recipe.keyNutrient.split(' ')[0] || 'Omega-3'}
                  </span>
                  <h3 className="font-serif font-bold text-sm text-brand-dark leading-snug line-clamp-2">
                    {recipe.title}
                  </h3>
                </div>
                
                <div className="flex items-center justify-between text-[11px] text-brand-grey mt-4 pt-2.5 border-t border-brand-subdued/10">
                  <span>{recipe.time}</span>
                  <span className="font-semibold text-brand-primary">{recipe.difficulty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};