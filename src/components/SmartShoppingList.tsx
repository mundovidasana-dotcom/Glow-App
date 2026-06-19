/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShoppingItem } from '../types';
import { motion } from 'framer-motion';
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
    ing.includes('coco deshidratado') || ing.includes('almendra')
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
  const safeList = shoppingList || [];

  const groupedItems: { [category: string]: ShoppingItem[] } = {
    '🥦 Vegetales': [],
    '🥩 Proteínas': [],
    '🌾 Despensa': [],
    '🧊 Refrigerados': [],
    '✨ Otros': []
  };

  safeList.forEach(item => {
    const computedCat = item.category || categorizeIngredient(item.ingredientName);
    if (groupedItems[computedCat]) {
      groupedItems[computedCat].push(item);
    } else {
      groupedItems['✨ Otros'].push(item);
    }
  });

  const totalItems = safeList.length;
  const completedItems = safeList.filter(i => i.completed).length;

  const getWhatsAppShareLink = () => {
    let text = '*Glow: Mi Lista de Súper Antiinflamatoria* 🥦✨\n\n';
    let hasContent = false;
    CATEGORY_HEADERS.forEach(cat => {
      const items = groupedItems[cat] || [];
      if (items.length > 0) {
        hasContent = true;
        text += `*${cat}*\n`;
        items.forEach(item => {
          const check = item.completed ? '✅' : '⬜';
          text += `${check} ${item.ingredientName} _(para: ${item.recipeTitle})_\n`;
        });
        text += '\n';
      }
    });
    if (!hasContent) return '';
    text += '¡Planificado desde Glow: Nutrición Antiinflamatoria! 🌸';
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#CDBCAC]/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#D4A373] mb-1">
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">Tu Plan semanal</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#4A3E3D]">Lista de Compras Inteligente</h1>
          <p className="text-sm text-[#7A6E67] mt-1">Organizada automáticamente por categorías antiinflamatorias.</p>
        </div>

        {totalItems > 0 && (
          <div className="flex items-center gap-3">
            <a
              href={getWhatsAppShareLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-sm hover:bg-[#20ba56] transition-all"
            >
              <Share2 className="w-4 h-4" /> Compartir por WhatsApp
            </a>
            <button
              onClick={onClearShoppingList}
              className="flex items-center gap-2 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl text-sm font-medium bg-red-50/50 hover:bg-red-50 transition-all"
            >
              <Trash2 className="w-4 h-4" /> Limpiar Lista
            </button>
          </div>
        )}
      </div>

      {totalItems === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#CDBCAC]/20 shadow-sm max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-[#FDFBF9] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#CDBCAC]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#4A3E3D] mb-1">Tu lista está vacía</h3>
          <p className="text-[#7A6E67] text-sm mb-6">Explora las recetas del menú de inicio y añade los ingredientes que te falten.</p>
        </div>
      ) : (
        <>
          <div className="bg-white p-4 rounded-2xl border border-[#CDBCAC]/20 shadow-sm flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-[#7A6E67]">
              <span>Progreso de compra:</span>
              <span className="font-bold text-[#4A3E3D]">{completedItems} de {totalItems} ítems</span>
            </div>
            <div className="w-48 bg-[#FDFBF9] h-2 rounded-full overflow-hidden border border-[#CDBCAC]/10">
              <div 
                className="bg-[#D4A373] h-full transition-all duration-300"
                style={{ width: `${(completedItems / totalItems) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid gap-6">
            {CATEGORY_HEADERS.map(category => {
              const items = groupedItems[category] || [];
              if (items.length === 0) return null;

              return (
                <div key={category} className="bg-white rounded-2xl border border-[#CDBCAC]/20 shadow-sm overflow-hidden">
                  <div className="bg-[#FDFBF9] px-5 py-3 border-b border-[#CDBCAC]/10 flex items-center justify-between">
                    <h3 className="font-medium text-[#4A3E3D] text-sm flex items-center gap-2">
                      {category}
                      <span className="bg-[#CDBCAC]/20 text-[#7A6E67] text-xs px-2 py-0.5 rounded-full">{items.length}</span>
                    </h3>
                  </div>

                  <div className="divide-y divide-[#CDBCAC]/10">
                    {items.map(item => (
                      <div key={item.id} className={`flex items-center justify-between p-4 transition-all ${item.completed ? 'bg-gray-50/50' : ''}`}>
                        <button 
                          onClick={() => onToggleShoppingItem(item.id)}
                          className="flex items-center gap-3 flex-1 text-left"
                        >
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            item.completed 
                              ? 'bg-[#D4A373] border-[#D4A373] text-white' 
                              : 'border-[#CDBCAC] hover:border-[#D4A373]'
                          }`}>
                            {item.completed && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                          </div>
                          <div>
                            <p className={`text-sm font-medium transition-all ${item.completed ? 'line-through text-[#CDBCAC]' : 'text-[#4A3E3D]'}`}>
                              {item.ingredientName}
                            </p>
                            <p className="text-xs text-[#9A8E87]">Para: {item.recipeTitle}</p>
                          </div>
                        </button>

                        <button
                          onClick={() => onDeleteShoppingItem(item.id)}
                          className="text-[#CDBCAC] hover:text-red-500 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};