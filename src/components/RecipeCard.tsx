/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Recipe } from '../types';
import { Clock, Star, Award } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div
      id={`recipe-card-${recipe.id}`}
      style={{ contentVisibility: 'auto' }}
      className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-brand-subdued/30 hover:shadow-[0_10px_30px_rgba(212,163,115,0.08)] transition-all duration-300 cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      {/* Recipe Image & Rating Badge */}
      <div className="relative h-48 w-full overflow-hidden bg-brand-subdued/20">
        <img
          src={recipe.image}
          alt={recipe.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
          <Star className="w-3.5 h-3.5 fill-brand-primary text-brand-primary" />
          <span className="text-xs font-semibold text-brand-dark">{recipe.rating}</span>
          <span className="text-[10px] text-brand-grey font-medium">({recipe.reviews})</span>
        </div>

        {/* Category Pill */}
        <div className="absolute bottom-3 left-3 bg-brand-primary text-white px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-xs">
          {recipe.category}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Nutrient Tag */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-2 h-2 rounded-full bg-brand-secondary" />
            <span className="text-[11px] font-medium text-brand-grey uppercase tracking-wide flex items-center gap-1">
              <Award className="w-3 h-3 text-brand-primary" />
              {recipe.keyNutrient}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg text-brand-dark leading-snug group-hover:text-brand-primary transition-colors duration-200 line-clamp-2 mb-2 font-semibold">
            {recipe.title}
          </h3>

          {/* Spark description snippet */}
          <p className="text-xs text-brand-grey line-clamp-2 leading-relaxed mb-4">
            {recipe.whyAntiInflammatory}
          </p>
        </div>

        {/* Info Footer */}
        <div className="pt-3 border-t border-brand-bg flex items-center justify-between text-xs text-brand-grey">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-brand-primary" />
            <span>{recipe.time}</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
            <span className="font-medium text-brand-dark">{recipe.difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
