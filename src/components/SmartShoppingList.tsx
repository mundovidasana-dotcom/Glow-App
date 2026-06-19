import React from 'react';
import { ShoppingItem } from '../types';

interface Props {
  items: ShoppingItem[];
  setItems: React.Dispatch<React.SetStateAction<ShoppingItem[]>>;
}

export function SmartShoppingList({ items, setItems }: Props) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Compras</h2>
      {(items || []).map(item => (
        <div key={item.id} className="flex items-center gap-2 p-2 border-b">
          <input 
            type="checkbox" 
            checked={!!item.completed} 
            onChange={() => setItems(prev => prev.map(i => i.id === item.id ? {...i, completed: !i.completed} : i))} 
          />
          <span>{item.ingredientName}</span>
        </div>
      ))}
    </div>
  );
}