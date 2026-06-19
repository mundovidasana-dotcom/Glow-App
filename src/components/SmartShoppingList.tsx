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
    // ... resto de tu JSX igual que antes
  );
};