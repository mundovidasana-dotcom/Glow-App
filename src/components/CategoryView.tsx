/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Recipe, RecipeCategory } from '../types';
import { RecipeCard } from './RecipeCard';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, ArrowLeft, RefreshCw, Sparkle } from 'lucide-react';

interface CategoryViewProps {
  initialCategory: RecipeCategory;
  recipes: Recipe[];
  onSelectRecipe: (id: string) => void;
  onGoBack: () => void;
}

type FilterPill = 'Todos' | 'Bajo en Carb' | 'Sin Gluten' | 'Rápido (<20 min)';

export const CategoryView: React.FC<CategoryViewProps> = ({
  initialCategory,
  recipes,
  onSelectRecipe,
  onGoBack,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterPill>('Todos');

  const categories: RecipeCategory[] = ['Desayunos', 'Almuerzos', 'Cenas', 'Snacks y Postres'];

  // Filters calculation
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      // 1. Matches active category
      if (recipe.category !== selectedCategory) return false;

      // 2. Matches search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = recipe.title.toLowerCase().includes(query);
        const matchesNutrient = recipe.keyNutrient.toLowerCase().includes(query);
        const matchesDesc = recipe.whyAntiInflammatory.toLowerCase().includes(query);
        const matchesIngredient = recipe.ingredients.some(ing => ing.toLowerCase().includes(query));
        if (!matchesTitle && !matchesNutrient && !matchesDesc && !matchesIngredient) {
          return false;
        }
      }

      // 3. Matches filter pills
      if (activeFilter === 'Bajo en Carb') {
        // e.g. carbs < 25g
        return recipe.nutritionalInfo.carbs < 25;
      }
      if (activeFilter === 'Sin Gluten') {
        // Look inside ingredients for 'harina', 'trigo', 'pan', unless specified
        const glutenTriggers = ['trigo', 'centeno', 'cebada', 'pan', 'pasta tradicional'];
        const hasGluten = recipe.ingredients.some(ing => 
          glutenTriggers.some(trigger => ing.toLowerCase().includes(trigger))
        );
        return !hasGluten;
      }
      if (activeFilter === 'Rápido (<20 min)') {
        // Parse time: extract numbers
        const mins = parseInt(recipe.time) || 0;
        return mins <= 20;
      }

      return true;
    });
  }, [recipes, selectedCategory, searchQuery, activeFilter]);

  const resetFilters = () => {
    setSearchQuery('');
    setActiveFilter('Todos');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-20"
    >
      {/* Header section with back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onGoBack}
          className="p-2 bg-white rounded-full border border-brand-subdued hover:bg-brand-subdued/20 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-5 h-5 text-brand-dark" />
        </button>
        <span className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">Nutrición Didáctica</span>
        <div className="w-9 h-9 opacity-0" /> {/* Spacer */}
      </div>

      {/* Dynamic Title */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-brand-dark mt-1 flex items-center gap-2">
          {selectedCategory === 'Snacks y Postres' ? 'Snacks y Postres' : `${selectedCategory}`} <span className="text-brand-primary">Antiinflamatorios</span>
        </h1>
        <p className="text-xs text-brand-grey mt-1">
          Ingredientes ricos en antioxidantes, fitonutrientes y grasas saludables que sanan de dentro hacia fuera.
        </p>
      </div>

      {/* Horizontal Category Switcher */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const isActive = cat === selectedCategory;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                resetFilters();
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-brand-primary text-white shadow-xs'
                  : 'bg-white text-brand-grey border border-brand-subdued/50 hover:bg-brand-subdued/10'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Elegant Search and Filter Section */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-grey/80" />
          <input
            type="text"
            placeholder={`Buscar receta de ${selectedCategory.toLowerCase()} o ingrediente...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-brand-subdued/60 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-2xl pl-11 pr-4 py-3 text-sm text-brand-dark placeholder-brand-grey/60 outline-hidden transition-all shadow-2xs"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-brand-grey hover:text-brand-dark font-medium"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Pill Filters */}
        <div className="flex gap-1.5 overflow-x-auto py-1 no-scrollbar">
          {(['Todos', 'Bajo en Carb', 'Sin Gluten', 'Rápido (<20 min)'] as FilterPill[]).map((pill) => {
            const isSelected = activeFilter === pill;
            return (
              <button
                key={pill}
                onClick={() => setActiveFilter(pill)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-secondary text-brand-dark font-semibold shadow-2xs'
                    : 'bg-white/70 text-brand-grey border border-brand-subdued/30 hover:bg-white'
                }`}
              >
                {pill}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recetario list */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-brand-grey">
          <span>Se encontraron <strong>{filteredRecipes.length}</strong> recetas</span>
          {(searchQuery || activeFilter !== 'Todos') && (
            <button
              onClick={resetFilters}
              className="text-brand-primary font-semibold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Reestablecer
            </button>
          )}
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
              >
                <RecipeCard
                  recipe={recipe}
                  onClick={() => onSelectRecipe(recipe.id)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-brand-subdued/30 shadow-2xs space-y-3">
            <div className="w-12 h-12 bg-brand-subdued/30 rounded-full flex items-center justify-center mx-auto">
              <Sparkle className="w-6 h-6 text-brand-primary" />
            </div>
            <div>
              <p className="font-serif text-lg font-bold text-brand-dark">No hay recetas coincidentes</p>
              <p className="text-xs text-brand-grey mt-1">
                Prueba buscando otro término o desactivando filtros. ¡Glow se actualiza constantemente!
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="mt-2 bg-brand-primary text-white text-xs px-4 py-2 rounded-xl font-semibold hover:bg-brand-primary/95 transition-all text-center mx-auto block cursor-pointer"
            >
              Ver todas las recetas de {selectedCategory}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
