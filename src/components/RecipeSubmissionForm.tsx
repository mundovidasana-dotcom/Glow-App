/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RecipeCategory } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Plus, Trash2, CheckCircle, Camera, Upload, ArrowLeft } from 'lucide-react';

interface RecipeSubmissionFormProps {
  onSubmitSubmission: (submission: {
    title: string;
    category: RecipeCategory;
    image: string;
    time: string;
    difficulty: 'Fácil' | 'Medio' | 'Difícil';
    keyNutrient: string;
    whyAntiInflammatory: string;
    ingredients: string[];
    preparation: string[];
  }) => void;
  onGoBack: () => void;
}

const PRESET_CULINARY_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
    name: 'Frescura Verde'
  },
  {
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
    name: 'Gourmet Herbal'
  },
  {
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
    name: 'Tofu Marinado'
  },
  {
    url: 'https://images.unsplash.com/photo-1610970881699-44a5587caa90?auto=format&fit=crop&w=400&q=80',
    name: 'Super Néctar'
  }
];

export const RecipeSubmissionForm: React.FC<RecipeSubmissionFormProps> = ({
  onSubmitSubmission,
  onGoBack
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<RecipeCategory>('Desayunos');
  const [selectedPhoto, setSelectedPhoto] = useState(PRESET_CULINARY_PHOTOS[0].url);
  const [time, setTime] = useState('15 min');
  const [difficulty, setDifficulty] = useState<'Fácil' | 'Medio' | 'Difícil'>('Fácil');
  const [keyNutrient, setKeyNutrient] = useState('');
  const [whyAntiInflammatory, setWhyAntiInflammatory] = useState('');
  
  // Dynamic arrays
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [prepSteps, setPrepSteps] = useState<string[]>(['']);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Dynamic ingredient handlers
  const handleAddIngredient = () => {
    setIngredients(prev => [...prev, '']);
  };

  const handleIngredientChange = (index: number, val: string) => {
    setIngredients(prev => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length === 1) {
      setIngredients(['']);
    } else {
      setIngredients(prev => prev.filter((_, idx) => idx !== index));
    }
  };

  // Dynamic step handlers
  const handleAddStep = () => {
    setPrepSteps(prev => [...prev, '']);
  };

  const handleStepChange = (index: number, val: string) => {
    setPrepSteps(prev => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleRemoveStep = (index: number) => {
    if (prepSteps.length === 1) {
      setPrepSteps(['']);
    } else {
      setPrepSteps(prev => prev.filter((_, idx) => idx !== index));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Mimic picking the next preset image
    const randomIndex = Math.floor(Math.random() * PRESET_CULINARY_PHOTOS.length);
    setSelectedPhoto(PRESET_CULINARY_PHOTOS[randomIndex].url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty lines
    const validIngredients = ingredients.map(i => i.trim()).filter(Boolean);
    const validSteps = prepSteps.map(s => s.trim()).filter(Boolean);

    if (!title.trim()) {
      alert('Por favor ingresa un título de receta.');
      return;
    }

    if (validIngredients.length === 0) {
      alert('Ingresa al menos un ingrediente válido.');
      return;
    }

    if (validSteps.length === 0) {
      alert('Ingresa al menos un paso de preparación.');
      return;
    }

    // Submit payload
    onSubmitSubmission({
      title,
      category,
      image: selectedPhoto,
      time,
      difficulty,
      keyNutrient: keyNutrient || 'Fitonutrientes activos',
      whyAntiInflammatory: whyAntiInflammatory || 'Rico en compuestos fenólicos antiinflamatorios.',
      ingredients: validIngredients,
      preparation: validSteps
    });

    setIsSuccess(true);
    setTimeout(() => {
      onGoBack();
    }, 2800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-24 w-full"
    >
      {/* Upper Navigation Header */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onGoBack}
          className="p-2 bg-white rounded-xl border border-brand-subdued hover:border-brand-primary hover:text-brand-primary transition-all cursor-pointer shadow-3xs"
          title="Regresar a la Comunidad"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#D4A373] font-bold block">Crear Propuesta</span>
          <h1 className="font-serif text-2xl font-bold text-brand-dark">Sube tu Receta</h1>
        </div>
      </div>

      <AnimatePresence>
        {isSuccess ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#8F9E62]/10 border border-[#8F9E62]/30 rounded-3xl p-8 text-center space-y-4"
          >
            <div className="w-16 h-16 bg-white border border-[#8F9E62]/20 rounded-full flex items-center justify-center mx-auto shadow-xs text-[#8F9E62]">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif text-lg font-bold text-brand-dark">¡Receta enviada para revisión!</h3>
              <p className="text-xs text-brand-grey max-w-sm mx-auto leading-relaxed">
                Tu receta ha entrado en la bandeja de aprobación del equipo nutricional de Glow. Te notificaremos en cuanto se valide. ¡Muchas gracias por aportar salud!
              </p>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Disclaimer Notice Box */}
            <div className="bg-[#D4A373]/10 border border-[#D4A373]/35 rounded-2xl p-4 flex gap-3">
              <ShieldAlert className="w-5 h-5 text-[#D4A373] shrink-0 mt-0.5" />
              <p className="text-xs text-brand-dark/90 leading-relaxed font-semibold">
                Tu receta será revisada por nuestro equipo nutricional antes de publicarse para asegurar que cumple con los estándares antiinflamatorios.
              </p>
            </div>

            {/* Photo Upload Box (drag and drop with tactile preview presets) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-dark uppercase tracking-wider block">Foto del platillo</label>
              
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all relative overflow-hidden flex flex-col items-center justify-center min-h-[160px] cursor-pointer ${
                  isDragging 
                    ? 'border-brand-primary bg-brand-primary/5' 
                    : 'border-brand-subdued/80 bg-white hover:border-[#D4A373]'
                }`}
              >
                {selectedPhoto ? (
                  <>
                    <img 
                      src={selectedPhoto} 
                      alt="Recipe preview mockup" 
                      className="absolute inset-0 w-full h-full object-cover opacity-85 hover:scale-103 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4 space-y-2">
                      <Camera className="w-7 h-7 drop-shadow-xs" />
                      <span className="text-[11px] font-bold tracking-wide">Foto Seleccionada (Arrastra otra o arrastra aquí)</span>
                      <p className="text-[9px] opacity-95">Arrastra una imagen o pulsa los presets inferiores para cambiar</p>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-brand-primary mx-auto" />
                    <p className="text-xs font-semibold text-brand-dark">Arrastra e introduce una imagen de tu plato</p>
                    <p className="text-[10px] text-brand-grey">Soporta JPG, PNG de alta fidelidad nutricional</p>
                  </div>
                )}
              </div>

              {/* Presets Row to allow instant beautiful mock photo selection */}
              <div className="space-y-1">
                <span className="text-[10px] text-brand-grey font-bold uppercase tracking-wider block">Fotos recomendadas para simulación:</span>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_CULINARY_PHOTOS.map((ph, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPhoto(ph.url)}
                      className={`h-11 rounded-lg overflow-hidden border-2 transition-all relative ${
                        selectedPhoto === ph.url ? 'border-brand-primary scale-98 shadow-xs' : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                      title={ph.name}
                    >
                      <img src={ph.url} alt={ph.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Inputs: Recipe Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-brand-dark uppercase tracking-wider block mb-1.5">
                  Título de la Receta
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej. Sopa Dorada de Cúrcuma y Colinabo"
                  className="w-full bg-white border border-brand-subdued px-3.5 py-3 rounded-xl text-xs focus:outline-hidden focus:border-[#D4A373] text-brand-dark font-medium placeholder-brand-grey/60 shadow-3xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-brand-dark uppercase tracking-wider block mb-1.5">
                    Categoría
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as RecipeCategory)}
                    className="w-full bg-white border border-brand-subdued px-3 py-3 rounded-xl text-xs focus:outline-hidden focus:border-[#D4A373] text-brand-dark font-semibold cursor-pointer"
                  >
                    <option value="Desayunos">Desayunos</option>
                    <option value="Almuerzos">Almuerzos</option>
                    <option value="Cenas">Cenas</option>
                    <option value="Snacks y Postres">Snacks y Postres</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-brand-dark uppercase tracking-wider block mb-1.5">
                    Dificultad
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as 'Fácil' | 'Medio' | 'Difícil')}
                    className="w-full bg-white border border-brand-subdued px-3 py-3 rounded-xl text-xs focus:outline-hidden focus:border-[#D4A373] text-brand-dark font-semibold cursor-pointer"
                  >
                    <option value="Fácil">Fácil</option>
                    <option value="Medio">Medio</option>
                    <option value="Difícil">Difícil</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-brand-dark uppercase tracking-wider block mb-1.5">
                    Tiempo
                  </label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Ej. 20 min"
                    className="w-full bg-white border border-brand-subdued px-3.5 py-3 rounded-xl text-xs focus:outline-hidden focus:border-[#D4A373] text-brand-dark font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-brand-dark uppercase tracking-wider block mb-1.5">
                    Nutriente Principal
                  </label>
                  <input
                    type="text"
                    value={keyNutrient}
                    onChange={(e) => setKeyNutrient(e.target.value)}
                    placeholder="Ej. Curcumina y Bromelina"
                    className="w-full bg-white border border-brand-subdued px-3.5 py-3 rounded-xl text-xs focus:outline-hidden focus:border-[#D4A373] text-brand-dark font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-dark uppercase tracking-wider block mb-1.5">
                  ¿Por qué es Antiinflamatorio?
                </label>
                <textarea
                  value={whyAntiInflammatory}
                  onChange={(e) => setWhyAntiInflammatory(e.target.value)}
                  placeholder="Ej. Contiene gingeroles que reducen la síntesis de citocinas proinflamatorias."
                  rows={2}
                  className="w-full bg-white border border-brand-subdued px-3.5 py-2.5 rounded-xl text-xs focus:outline-hidden focus:border-[#D4A373] text-brand-dark"
                />
              </div>
            </div>

            {/* Dynamic list of Ingredients */}
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-brand-subdued pb-1">
                <label className="text-xs font-extrabold text-brand-dark uppercase tracking-wider">
                  Ingredientes
                </label>
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="text-xs text-[#D4A373] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Añadir ingrediente
                </button>
              </div>

              <div className="space-y-2">
                {ingredients.map((ing, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <span className="text-[11px] font-bold text-brand-grey w-5">{idx + 1}.</span>
                    <input
                      type="text"
                      required
                      value={ing}
                      onChange={(e) => handleIngredientChange(idx, e.target.value)}
                      placeholder={`Ingrediente ${idx + 1} (ej. 1 cucharadita de cúrcuma)`}
                      className="flex-1 bg-white border border-brand-subdued px-3 py-2.5 rounded-xl text-xs focus:outline-hidden focus:border-[#D4A373] text-brand-dark font-medium placeholder-brand-grey/50"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(idx)}
                      className="p-2.5 text-brand-grey hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Quitar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic list of preparation steps */}
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-brand-subdued pb-1">
                <label className="text-xs font-extrabold text-brand-dark uppercase tracking-wider">
                  Pasos de Preparación
                </label>
                <button
                  type="button"
                  onClick={handleAddStep}
                  className="text-xs text-[#D4A373] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Añadir paso
                </button>
              </div>

              <div className="space-y-2">
                {prepSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <span className="text-[11px] font-bold text-brand-grey w-5 mt-3">{idx + 1}.</span>
                    <textarea
                      required
                      value={step}
                      onChange={(e) => handleStepChange(idx, e.target.value)}
                      placeholder={`Paso de preparación ${idx + 1}`}
                      rows={2}
                      className="flex-1 bg-white border border-brand-subdued px-3 py-2 rounded-xl text-xs focus:outline-hidden focus:border-[#D4A373] text-brand-dark font-medium placeholder-brand-grey/50"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(idx)}
                      className="p-2.5 text-brand-grey hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer mt-1"
                      title="Quitar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#D4A373] hover:bg-[#c49261] text-white py-4 px-6 rounded-xl text-xs font-bold transition-all shadow-xs uppercase tracking-widest"
            >
              Enviar para Revisión
            </button>
          </form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
