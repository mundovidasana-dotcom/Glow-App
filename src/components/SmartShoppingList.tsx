/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShoppingItem } from '../types';
import { motion } from 'motion/react';
import { CheckCircle2, Trash2, ShoppingBag, Share2, Sparkles } from 'lucide-react';

interface SmartShoppingListProps {
  shoppingList: ShoppingItem[];
  onToggleShoppingItem: (itemId: string) => void;
  onDeleteShoppingItem: (itemId: string) => void;
  onClearShoppingList: () => void;
}

const CATEGORY_HEADERS = [
  '🥦 Vegetales',
  '🥩 Proteínas',
  '🌾 Despensa',
  '🧊 Refrigerados',
  '✨ Otros'
];

export function categorizeIngredient(ingredient: string): string {
  const ing = ingredient.toLowerCase();
  if (
    ing.includes('apio') || ing.includes('espinaca') || ing.includes('manzana') || 
    ing.includes('limón') || ing.includes('cebolla') || ing.includes('pimiento') || 
    ing.includes('calabaza') || ing.includes('puerro') || ing.includes('aguacate') || 
    ing.includes('granada') || ing.includes('brócoli') || ing.includes('frambuesa') || 
    ing.includes('mango') || ing.includes('lechuga') || ing.includes('menta') ||
    ing.includes('fruta') || ing.includes('jengibre') || ing.includes('ajo') || 
    ing.includes('hierbas') || ing.includes('perejil') || ing.includes('eneldo') || 
    ing.includes('romero')
  ) {
    return '🥦 Vegetales';
  }
  if (
    ing.includes('salmón') || ing.includes('tofu') || ing.includes('tempeh') || 
    ing.includes('huevo') || ing.includes('pavo') || ing.includes('pollo') || 
    ing.includes('proteína')
  ) {
    return '🥩 Proteínas';
  }
  if (
    ing.includes('chía') || ing.includes('sésamo') || ing.includes('nuez') || 
    ing.includes('nueces') || ing.includes('semillas') || ing.includes('avena') || 
    ing.includes('canela') || ing.includes('cacao') || ing.includes('dátiles') || 
    ing.includes('miel') || ing.includes('tamari') || ing.includes('aceite') || 
    ing.includes('pimienta') || ing.includes('sal') || ing.includes('polvo') || 
    ing.includes('cáñamo') || ing.includes('quinoa') || ing.includes('quinua') || 
    ing.includes('arce') || ing.includes('dátil') || ing.includes('chips') || 
    ing.includes('coco deshidratado') || ing.includes('almendra') || ing.includes('nueces')
  ) {
    return '🌾 Despensa';
  }
  if (
    ing.includes('leche') || ing.includes('refrigerado') || ing.includes('crema') || 
    ing.includes('yogur') || ing.includes('queso')
  ) {
    return '🧊 Refrigerados';
  }
  return '✨ Otros';
}

export const SmartShoppingList: React.FC<SmartShoppingListProps> = ({
  shoppingList,
  onToggleShoppingItem,
  onDeleteShoppingItem,
  onClearShoppingList,
}) => {
  // Categorize elements
const safeList = shoppingList || [];
  const groupedItems: { [category: string]: ShoppingItem[] } = {
    '🥦 Vegetales': [],
    '🥩 Proteínas': [],
    '🌾 Despensa': [],
    '🧊 Refrigerados': [],
    '✨ Otros': []
  };

 // Usamos safeList en lugar de shoppingList
  safeList.forEach(item => {
    const computedCat = item.category || categorizeIngredient(item.ingredientName);
    if (groupedItems[computedCat]) {
      groupedItems[computedCat].push(item);
    } else {
      groupedItems['✨ Otros'].push(item);
    }
  });

// Ajuste de seguridad: Si shoppingList es null o undefined, usamos un array vacío
  const safeList = shoppingList || [];
  
  const totalItems = safeList.length;
  const completedItems = safeList.filter(i => i.completed).length;

  // Build the text message for WhatsApp sharing
  const getWhatsAppShareLink = () => {
    let text = '*Glow: Mi Lista de Súper Antiinflamatoria* 🥦✨\n\n';
    
    let hasContent = false;
    CATEGORY_HEADERS.forEach(cat => {
      const items = groupedItems[cat] || []; // Seguridad extra aquí también
      if (items && items.length > 0) {
        hasContent = true;
        text += `*${cat}*\n`;
        items.forEach(item => {
          const check = item.completed ? '✅' : '⬜';
          text += `${check} ${item.ingredientName} _(para: ${item.recipeTitle})_\n`;
        });
        text += '\n';
      }
    });

    if (!hasContent) {
      return '';
    }

    text += '¡Planificado desde Glow: Nutrición Antiinflamatoria! 🌸';
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  const whatsappLink = getWhatsAppShareLink();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-24 w-full"
    >
      <div>
        <span className="text-[11px] uppercase tracking-widest text-[#D4A373] font-bold block">Mi Compra Wellness</span>
        <h1 className="font-serif text-3xl font-bold text-brand-dark mt-0.5">Mi Lista Inteligente</h1>
        <p className="text-secondary-dark/70 text-xs mt-1">
          Tus ingredientes se agrupan automáticamente para facilitar tu recorrido por el supermercado.
        </p>
      </div>

      {totalItems > 0 ? (
        <div className="space-y-6">
          {/* Progress Banner */}
          <div className="bg-[#CCD5AE]/15 border border-[#CCD5AE]/30 rounded-3xl p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-brand-grey uppercase tracking-widest block">Progreso de Compra</span>
              <p className="text-xs font-semibold text-brand-dark">
                Comprado: <span className="text-brand-primary">{completedItems}</span> de <span className="font-bold">{totalItems}</span> ingredientes
              </p>
            </div>
            {/* Minimal Progress Ring or horizontal indicator */}
            <div className="w-24 bg-white/60 h-2 rounded-full overflow-hidden border border-brand-subdued/30">
              <div 
                className="bg-[#D4A373] h-full transition-all duration-300"
                style={{ width: `${totalItems ? (completedItems / totalItems) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Grouped Shopping Aisle Cards */}
          {CATEGORY_HEADERS.map((catKey) => {
            const list = groupedItems[catKey];
            if (!list || list.length === 0) return null;

            return (
              <div 
                key={catKey}
                className="bg-white border border-brand-subdued/80 rounded-2xl p-4 shadow-3xs space-y-3"
              >
                <div className="flex items-center gap-2 border-b border-brand-subdued/40 pb-2">
                  <span className="font-serif text-sm font-extrabold text-brand-dark tracking-tight">{catKey}</span>
                  <span className="text-[10px] bg-brand-bg text-[#D4A373] font-bold px-1.5 py-0.5 rounded-full">
                    {list.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {list.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-brand-bg/40 border border-brand-subdued/20 hover:border-brand-primary/10 transition-colors group"
                    >
                      <div
                        onClick={() => onToggleShoppingItem(item.id)}
                        className="flex items-start gap-2.5 flex-1 cursor-pointer select-none"
                      >
                        <button className="mt-0.5 shrink-0 text-brand-primary">
                          {item.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-[#8F9E62] fill-white" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-brand-subdued rounded-lg bg-white/80 group-hover:border-[#D4A373] transition-colors" />
                          )}
                        </button>
                        <div>
                          <span className={`text-xs block leading-relaxed font-semibold transition-all ${
                            item.completed ? 'line-through text-brand-grey/50 font-light' : 'text-brand-dark'
                          }`}>
                            {item.ingredientName}
                          </span>
                          <span className="text-[9px] text-[#D4A373]/90 font-bold uppercase tracking-wider block mt-0.5">
                            Receta: {item.recipeTitle}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onDeleteShoppingItem(item.id)}
                        className="text-brand-grey hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar ingrediente"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 tracking-wide"
            >
              <Share2 className="w-4 h-4 shrink-0" />
              Compartir lista por WhatsApp
            </a>

            <button
              onClick={onClearShoppingList}
              className="bg-red-50 hover:bg-red-100 text-red-650 py-3.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-red-200 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Limpiar lista completa
            </button>
          </div>
        </div>
      ) : (
        /* Empty State with a lovely anti-inflammatory tip */
        <div className="text-center py-12 px-6 bg-white border border-brand-subdued/80 rounded-3xl space-y-5">
          <div className="w-16 h-16 bg-[#FAEDCD]/40 rounded-full flex items-center justify-center mx-auto shadow-3xs">
            <ShoppingBag className="w-8 h-8 text-brand-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-brand-dark">Tu lista está vacía</h3>
            <p className="text-xs text-brand-grey max-w-xs mx-auto leading-relaxed">
              Explora las deliciosas recetas premium y agrega sus ingredientes con un solo toque desde sus fichas didácticas detalladas.
            </p>
          </div>
          <div className="p-4 bg-brand-bg rounded-2xl border border-brand-subdued/50 max-w-xs mx-auto space-y-1">
            <div className="flex items-center gap-1.5 justify-center text-brand-primary">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Sabías que...</span>
            </div>
            <p className="text-[11px] text-brand-grey leading-relaxed">
              Hacer una lista planificada disminuye las compras por impulso de snacks ultraprocesados que disparan citocinas inflamatorias en la sangre.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};
