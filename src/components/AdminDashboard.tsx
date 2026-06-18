/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserSubmission, Recipe, RecipeCategory } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Check, X, BookOpen, Layers, Users, Clock, Flame, 
  Activity, TrendingUp, Search, Download, Filter, Eye, Clock3,
  Calendar, CheckCircle, BarChart3, AlertCircle, FileSpreadsheet
} from 'lucide-react';

interface AdminDashboardProps {
  pendingSubmissions: UserSubmission[];
  recipesCount: number;
  onApproveSubmission: (submissionId: string) => void;
  onRejectSubmission: (submissionId: string) => void;
  onPublishOfficialRecipe: (newRecipe: Recipe) => void;
}

interface DemoUserRow {
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
  tier: string;
  status: 'Pago' | 'Mes Gratis';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  pendingSubmissions,
  recipesCount,
  onApproveSubmission,
  onRejectSubmission,
  onPublishOfficialRecipe,
}) => {
  // Navigation inside the Admin Workspace
  const [adminTab, setAdminTab] = useState<'analytics' | 'moderation' | 'cms'>('analytics');

  // Interactive Database Table State (Filters & Search)
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Pago' | 'Mes Gratis'>('Todos');
  const [exportFeedback, setExportFeedback] = useState(false);

  // CMS Form States
  const [cmsTitle, setCmsTitle] = useState('');
  const [cmsCategory, setCmsCategory] = useState<RecipeCategory>('Desayunos');
  const [cmsImage, setCmsImage] = useState('https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80');
  const [cmsTime, setCmsTime] = useState('20 min');
  const [cmsDifficulty, setCmsDifficulty] = useState<'Fácil' | 'Medio' | 'Difícil'>('Fácil');
  const [cmsNutrient, setCmsNutrient] = useState('');
  const [cmsWhy, setCmsWhy] = useState('');
  const [cmsIngredientsText, setCmsIngredientsText] = useState('');
  const [cmsPrepText, setCmsPrepText] = useState('');
  const [cmsCalories, setCmsCalories] = useState(250);
  const [cmsProtein, setCmsProtein] = useState(12);
  const [cmsCarbs, setCmsCarbs] = useState(30);
  const [cmsFats, setCmsFats] = useState(10);
  const [cmsSuccessMessage, setCmsSuccessMessage] = useState(false);

  // Mock User Database representing 7 actual premium female clients
  const USER_DATABASE: DemoUserRow[] = [
    { name: "Juliana Restrepo", email: "juliana.res@gmail.com", phone: "+57 312 458 9652", registeredAt: "14 de Jun, 2026", tier: "Flor Silvestre", status: "Pago" },
    { name: "Isabella Gómez", email: "isag@outlook.com", phone: "+57 300 415 7856", registeredAt: "11 de Jun, 2026", tier: "Rayo de Oro", status: "Mes Gratis" },
    { name: "Valentina Castro", email: "vale.castro@gmail.com", phone: "+57 311 742 1254", registeredAt: "08 de Jun, 2026", tier: "Brote Activo", status: "Pago" },
    { name: "Camila Buendía", email: "camila@buendia.org", phone: "+57 320 895 1412", registeredAt: "05 de Jun, 2026", tier: "Semilla Radiante", status: "Mes Gratis" },
    { name: "Lucía Domínguez", email: "lucia.dom@hotmail.com", phone: "+57 304 316 4589", registeredAt: "01 de Jun, 2026", tier: "Flor Silvestre", status: "Pago" },
    { name: "Mariana Salazar", email: "salazarmari@gmail.com", phone: "+57 315 222 4110", registeredAt: "28 de May, 2026", tier: "Rayo de Oro", status: "Pago" },
    { name: "Diana Carolina Díaz", email: "caro.diaz@glow.co", phone: "+57 311 900 8877", registeredAt: "15 de May, 2026", tier: "Rayo de Oro", status: "Pago" }
  ];

  // Simulated engagement stats for analytics visualization
  const ENGAGEMENT_DATA = {
    savedRecipes: [
      { name: 'Caldo Revitalizante Hashimoto', count: 184 },
      { name: 'Crema Prebiótica de Espárragos', count: 142 },
      { name: 'Pudin de Chía Choco-Glow', count: 98 },
      { name: 'Waffles Antinflamatorio de Yuca', count: 86 },
      { name: 'Tarta Semillas & Hierbabuena', count: 65 }
    ],
    communityActivity: [
      { day: 'Lun', postsCount: 15, commentsCount: 48 },
      { day: 'Mar', postsCount: 22, commentsCount: 64 },
      { day: 'Mié', postsCount: 18, commentsCount: 52 },
      { day: 'Jue', postsCount: 30, commentsCount: 88 },
      { day: 'Vie', postsCount: 25, commentsCount: 71 },
      { day: 'Sáb', postsCount: 32, commentsCount: 95 },
      { day: 'Dom', postsCount: 28, commentsCount: 81 }
    ]
  };

  const handlePublishCMS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmsTitle.trim()) return;

    const ingredients = cmsIngredientsText
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);
    const preparation = cmsPrepText
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    const newRecipe: Recipe = {
      id: `official-${Date.now()}`,
      title: cmsTitle,
      category: cmsCategory,
      image: cmsImage,
      rating: 5.0,
      reviews: 1,
      time: cmsTime,
      difficulty: cmsDifficulty,
      keyNutrient: cmsNutrient || 'Compuestos flavonoides',
      whyAntiInflammatory: cmsWhy || 'Estimula el vaciado gástrico bloqueando prostaglandinas inflamatorias inducidas por estrés celular.',
      ingredients: ingredients.length > 0 ? ingredients : ['1 ingrediente modelo'],
      preparation: preparation.length > 0 ? preparation : ['Proceso modelo de cocina.'],
      nutritionalInfo: {
        calories: Number(cmsCalories) || 200,
        protein: Number(cmsProtein) || 10,
        carbs: Number(cmsCarbs) || 20,
        healthyFats: Number(cmsFats) || 8,
      },
      featured: true
    };

    onPublishOfficialRecipe(newRecipe);

    // Reset Form
    setCmsTitle('');
    setCmsIngredientsText('');
    setCmsPrepText('');
    setCmsWhy('');
    setCmsNutrient('');
    
    setCmsSuccessMessage(true);
    setTimeout(() => {
      setCmsSuccessMessage(false);
    }, 3000);
  };

  const handleExportDataSimulate = () => {
    setExportFeedback(true);
    
    // Create actual downloadable simulated text CSV
    const headers = "Nombre,Correo,Celular,Fecha de Registro,Nivel (Gamificación),Estado Suscripción\n";
    const rows = USER_DATABASE.map(u => `"${u.name}","${u.email}","${u.phone}","${u.registeredAt}","${u.tier}","${u.status}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Glow_Usuarias_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setExportFeedback(false);
    }, 3000);
  };

  // Filter criteria logic
  const filteredUsers = USER_DATABASE.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeSubmissions = pendingSubmissions.filter(s => s.status === 'pending');

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-24 w-full text-left font-sans"
    >
      {/* SaaS Admin Title Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-brand-subdued/80 pb-4 gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#D4A373] font-bold block">Consola Ejecutiva de Control</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-dark mt-0.5">Módulo Catherine's View</h1>
          <p className="text-brand-grey text-xs mt-1">
            Gestión de KPIs de retención, base de datos de usuarias registradas, moderación comunitaria y CMS.
          </p>
        </div>

        {/* Live Admin Role Badge */}
        <div className="bg-[#CCD5AE]/20 border border-[#CCD5AE]/60 rounded-full px-3 py-1 flex items-center gap-2 self-start md:self-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8F9E62] animate-ping" />
          <span className="text-[11px] font-black uppercase text-[#8F9E62]">SuperAdmin Activo</span>
        </div>
      </div>

      {/* ADMIN TABS SELECTOR */}
      <div className="flex border-b border-[#CDBCAC]/25 gap-2">
        <button
          onClick={() => setAdminTab('analytics')}
          className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            adminTab === 'analytics'
              ? 'border-[#D4A373] text-brand-dark font-black'
              : 'border-transparent text-brand-grey font-semibold hover:text-brand-dark'
          }`}
        >
          📈 Analíticas Glow
        </button>
        <button
          onClick={() => setAdminTab('moderation')}
          className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            adminTab === 'moderation'
              ? 'border-[#D4A373] text-brand-dark font-black'
              : 'border-transparent text-brand-grey font-semibold hover:text-brand-dark'
          }`}
        >
          <span>💬 Moderar Recetas</span>
          {activeSubmissions.length > 0 && (
            <span className="bg-red-500 text-white font-mono font-black text-[9px] px-1.5 py-0.5 rounded-full">
              {activeSubmissions.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setAdminTab('cms')}
          className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            adminTab === 'cms'
              ? 'border-[#D4A373] text-brand-dark font-black'
              : 'border-transparent text-brand-grey font-semibold hover:text-brand-dark'
          }`}
        >
          ✍ Publicador CMS
        </button>
      </div>

      {/* ANALYTICS TAB CONTENT - SCREEN 16 */}
      <AnimatePresence mode="wait">
        {adminTab === 'analytics' && (
          <motion.div
            key="tab-analytics"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-6"
          >
            {/* Top KPI Cards (Screen 16: Professional SaaS Backend KPI metrics) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card 1: Total Usuarias Activas */}
              <div className="bg-white border border-[#CDBCAC]/30 rounded-3xl p-5 shadow-xs flex items-center gap-4 hover:border-[#D4A373]/50 transition-all">
                <div className="p-3 bg-amber-50 rounded-2xl text-[#D4A373]">
                  <Users className="w-6 h-6 shrink-0" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-grey block">Total Usuarias Activas</span>
                  <span className="text-2xl font-serif font-black text-brand-dark block mt-0.5">2,485</span>
                  <div className="text-[10px] text-[#8F9E62] font-semibold mt-1 flex items-center gap-0.5">
                    <span>↑ +12.4% este mes</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Suscripciones Nuevas */}
              <div className="bg-white border border-[#CDBCAC]/30 rounded-3xl p-5 shadow-xs flex items-center gap-4 hover:border-[#D4A373]/50 transition-all">
                <div className="p-3 bg-[#CCD5AE]/20 rounded-2xl text-[#8F9E62]">
                  <TrendingUp className="w-6 h-6 shrink-0" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-grey block">Suscripciones Nuevas (Mes)</span>
                  <span className="text-2xl font-serif font-black text-brand-dark block mt-0.5">412</span>
                  <div className="text-[10px] text-[#8F9E62] font-semibold mt-1 flex items-center gap-0.5">
                    <span>★ 96% conversión quiz</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Tasa de Retención */}
              <div className="bg-white border border-[#CDBCAC]/30 rounded-3xl p-5 shadow-xs flex items-center gap-4 hover:border-[#D4A373]/50 transition-all">
                <div className="p-3 bg-orange-50 rounded-2xl text-orange-400">
                  <Activity className="w-6 h-6 shrink-0" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-grey block">Tasa de Retención</span>
                  <span className="text-2xl font-serif font-black text-brand-dark block mt-0.5">94.2%</span>
                  <div className="text-[10px] text-[#8F9E62] font-semibold mt-1 flex items-center gap-0.5">
                    <span>Estándar médico de primer nivel</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Split layout: Engagement Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-2">
              
              {/* Chart 1: Recetas Más Guardadas */}
              <div className="lg:col-span-6 bg-white border border-[#CDBCAC]/30 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="border-b border-[#CDBCAC]/20 pb-2">
                  <h3 className="font-serif text-sm font-bold text-brand-dark flex items-center gap-1.5">
                    <BarChart3 className="w-4.5 h-4.5 text-brand-primary" />
                    <span>Recetas Más Guardadas (Favoritas)</span>
                  </h3>
                  <p className="text-[10px] text-brand-grey">Volumen acumulado de marcadores de favoritos en app</p>
                </div>
                
                <div className="space-y-3 pt-1">
                  {ENGAGEMENT_DATA.savedRecipes.map((recipe, idx) => {
                    const maxVal = ENGAGEMENT_DATA.savedRecipes[0].count;
                    const percent = (recipe.count / maxVal) * 100;

                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-bold text-brand-dark">
                          <span className="truncate max-w-[260px]">{recipe.name}</span>
                          <span className="font-mono text-brand-primary font-black">{recipe.count} clics</span>
                        </div>
                        <div className="w-full h-3 bg-brand-bg rounded-sm overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${percent}%` }}
                            transition={{ duration: 0.8, delay: idx * 0.05 }}
                            className="h-full bg-linear-to-r from-[#D4A373] to-[#c39162]"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chart 2: Actividad de la Comunidad */}
              <div className="lg:col-span-6 bg-white border border-[#CDBCAC]/30 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="border-b border-[#CDBCAC]/20 pb-2">
                  <h3 className="font-serif text-sm font-bold text-brand-dark flex items-center gap-1.5">
                    <Users className="w-4.5 h-4.5 text-[#8F9E62]" />
                    <span>Engagement en Muro Social</span>
                  </h3>
                  <p className="text-[10px] text-brand-grey">Relación de comentarios y fotos publicadas en los últimos 7 días</p>
                </div>

                {/* Simulated line visualization graph */}
                <div className="h-44 flex items-end justify-between pt-2 border-b border-[#CDBCAC]/30 px-1">
                  {ENGAGEMENT_DATA.communityActivity.map((day, idx) => {
                    const maxComment = 100;
                    const hComments = (day.commentsCount / maxComment) * 100;
                    const hPosts = (day.postsCount / maxComment) * 100;

                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                        <div className="absolute bottom-full mb-1 text-[8px] bg-brand-dark text-white p-1 rounded-sm opacity-0 group-hover:opacity-100 z-10 select-none whitespace-nowrap leading-none transition-all">
                          {`Coms: ${day.commentsCount} • Fotos: ${day.postsCount}`}
                        </div>

                        <div className="w-full flex items-end justify-center gap-1 h-32">
                          {/* Inner double bars */}
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${hComments}%` }}
                            className="w-2 rounded-t bg-[#CCD5AE] font-mono"
                          />
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${hPosts}%` }}
                            className="w-2 rounded-t bg-[#D4A373]"
                          />
                        </div>
                        <span className="text-[9px] font-bold text-brand-grey">{day.day}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-4 items-center justify-center text-[9px] font-bold text-brand-grey">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-[#CCD5AE] rounded-sm" />
                    <span>Comentarios de Apoyo</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-[#D4A373] rounded-sm" />
                    <span>Fotos de Platos</span>
                  </div>
                </div>
              </div>

            </div>

            {/* USER DATABASE TABLE (Screen 16) */}
            <div className="bg-white border border-[#CDBCAC]/30 rounded-3xl p-5 shadow-sm space-y-4">
              
              {/* Header and filters section */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#CDBCAC]/20 pb-3">
                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-brand-dark">Directorio de Usuarias Premium</h3>
                  <p className="text-[11px] text-brand-grey">Consulte, filtre por estado y exporte metadatos seguros de clientes.</p>
                </div>

                {/* CSV download actions */}
                <button
                  onClick={handleExportDataSimulate}
                  className="bg-linear-to-r from-[#8F9E62] to-[#7e8c53] hover:from-[#7e8c53] hover:to-[#687342] text-white py-2 px-3 text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-3xs cursor-pointer select-none grow-0 shrink-0 self-start sm:self-center"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>{exportFeedback ? 'Exportando...' : 'Exportar Datos a CSV'}</span>
                </button>
              </div>

              {/* Filters Panel Row */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-[#FDFBF9] p-3 rounded-2xl border border-brand-subdued/80">
                <div className="sm:col-span-8 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-grey/50">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Buscar por Nombre, Apellido o Correo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-[#CDBCAC]/50 focus:border-[#D4A373] outline-hidden rounded-xl text-xs pl-9 pr-4 py-2.5 font-medium transition-all"
                  />
                </div>
                
                <div className="sm:col-span-4">
                  <select
                    value={statusFilter}
                    aria-label="Filtrar por estado"
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="w-full bg-white border border-[#CDBCAC]/50 focus:border-[#D4A373] outline-hidden rounded-xl text-xs px-3 py-2.5 font-bold cursor-pointer transition-all"
                  >
                    <option value="Todos">Filtro Estado: Todos</option>
                    <option value="Pago">Pago Premium</option>
                    <option value="Mes Gratis">Mes de Prueba Gratis</option>
                  </select>
                </div>
              </div>

              {/* Main Responsive Table */}
              <div className="overflow-x-auto rounded-xl border border-brand-subdued/60">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-bg text-[10px] font-black uppercase text-brand-dark border-b border-brand-subdued">
                      <th className="py-3 px-4">Nombre Completo</th>
                      <th className="py-3 px-4">Correo</th>
                      <th className="py-3 px-4">Celular</th>
                      <th className="py-3 px-4">Registro</th>
                      <th className="py-3 px-4">Nivel Gamif.</th>
                      <th className="py-3 px-4">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#CDBCAC]/20 text-xs text-brand-grey">
                    {filteredUsers.map((user, idx) => (
                      <tr key={idx} className="hover:bg-brand-bg/20 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-brand-dark">{user.name}</td>
                        <td className="py-3.5 px-4 font-mono select-all text-[11px]">{user.email}</td>
                        <td className="py-3.5 px-4 font-semibold">{user.phone}</td>
                        <td className="py-3.5 px-4 font-medium">{user.registeredAt}</td>
                        <td className="py-3.5 px-4">
                          <span className="bg-[#CCD5AE]/15 border border-[#CCD5AE]/30 text-[#8F9E62] text-[10px] font-bold px-2 py-0.5 rounded-md">
                            🏅 {user.tier}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            user.status === 'Pago'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-[#D4A373] border border-amber-200'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}

                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-8 font-serif italic text-brand-grey">
                          No se encontraron usuarias con los filtros aplicados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* CMS RECIPE CREATION TAB CONTENT */}
        {adminTab === 'cms' && (
          <motion.div
            key="tab-cms"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-white border border-[#CDBCAC]/30 rounded-3xl p-5 sm:p-6 shadow-sm max-w-3xl"
          >
            <div className="border-b border-[#CDBCAC]/20 pb-3 mb-4">
              <h2 className="font-serif text-lg font-bold text-brand-dark flex items-center gap-1.5">
                <Layers className="w-5 h-5 text-brand-primary" />
                <span>Creador de Contenido Oficial (CMS)</span>
              </h2>
              <p className="text-[11px] text-brand-grey">Inserta recetas con validación científica al recetario oficial de Glow.</p>
            </div>

            <form onSubmit={handlePublishCMS} className="space-y-4">
              {cmsSuccessMessage && (
                <div className="p-3 bg-[#CCD5AE]/20 border border-[#CCD5AE]/60 text-[#8F9E62] text-xs font-bold rounded-xl animate-pulse">
                  ✓ Receta oficial insertada correctamente de forma permanente al recetario Glow.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="cms-title" className="text-[10px] font-bold uppercase text-brand-dark">Título de la Receta</label>
                  <input
                    id="cms-title"
                    type="text"
                    required
                    placeholder="Ej. Sopa Calmante Hashimoto"
                    value={cmsTitle}
                    onChange={(e) => setCmsTitle(e.target.value)}
                    className="w-full bg-[#FDFBF9] border border-[#CDBCAC]/55 rounded-xl text-xs px-3 py-2.5 focus:border-[#D4A373] outline-hidden font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="cms-category" className="text-[10px] font-bold uppercase text-brand-dark">Categoría</label>
                  <select
                    id="cms-category"
                    value={cmsCategory}
                    onChange={(e) => setCmsCategory(e.target.value as RecipeCategory)}
                    className="w-full bg-[#FDFBF9] border border-[#CDBCAC]/55 rounded-xl text-xs px-3 py-2.5 focus:border-[#D4A373] outline-hidden font-bold"
                  >
                    <option value="Desayunos">☕ Desayunos</option>
                    <option value="Almuerzos">🥗 Almuerzos</option>
                    <option value="Cenas">🍲 Cenas</option>
                    <option value="Snacks y Postres">🍎 Snacks y Postres</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label htmlFor="cms-time" className="text-[10px] font-bold uppercase text-brand-dark">Tiempo de Prep</label>
                  <input
                    id="cms-time"
                    type="text"
                    placeholder="Ej. 15 min"
                    value={cmsTime}
                    onChange={(e) => setCmsTime(e.target.value)}
                    className="w-full bg-[#FDFBF9] border border-[#CDBCAC]/55 rounded-xl text-xs px-3 py-2.5 focus:border-[#D4A373]"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="cms-difficulty" className="text-[10px] font-bold uppercase text-brand-dark">Dificultad</label>
                  <select
                    id="cms-difficulty"
                    value={cmsDifficulty}
                    onChange={(e) => setCmsDifficulty(e.target.value as any)}
                    className="w-full bg-[#FDFBF9] border border-[#CDBCAC]/55 rounded-xl text-xs px-3 py-2.5 focus:border-[#D4A373] font-bold"
                  >
                    <option value="Fácil">Fácil</option>
                    <option value="Medio">Medio</option>
                    <option value="Difícil">Difícil</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label htmlFor="cms-nutrient" className="text-[10px] font-bold uppercase text-brand-dark">Fito-Nutriente Destacado</label>
                  <input
                    id="cms-nutrient"
                    type="text"
                    placeholder="Ej. Sulforafano"
                    value={cmsNutrient}
                    onChange={(e) => setCmsNutrient(e.target.value)}
                    className="w-full bg-[#FDFBF9] border border-[#CDBCAC]/55 rounded-xl text-xs px-3 py-2.5 focus:border-[#D4A373]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="cms-why" className="text-[10px] font-bold uppercase text-brand-dark">Explicación Científica Antiinflamatoria</label>
                <textarea
                  id="cms-why"
                  rows={2}
                  placeholder="Justifique el impacto bioquímico en la microbiota o desinflamación hepática..."
                  value={cmsWhy}
                  onChange={(e) => setCmsWhy(e.target.value)}
                  className="w-full bg-[#FDFBF9] border border-[#CDBCAC]/55 rounded-xl text-xs p-3 focus:border-[#D4A373] outline-hidden font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="cms-ingredients" className="text-[10px] font-bold uppercase text-brand-dark">Ingredientes (Uno por línea)</label>
                  <textarea
                    id="cms-ingredients"
                    rows={4}
                    required
                    placeholder="Escriba los ingredientes exactamente..."
                    value={cmsIngredientsText}
                    onChange={(e) => setCmsIngredientsText(e.target.value)}
                    className="w-full bg-[#FDFBF9] border border-[#CDBCAC]/55 rounded-xl text-xs p-3 focus:border-[#D4A373]"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="cms-prep" className="text-[10px] font-bold uppercase text-brand-dark">Instrucciones (Uno por línea)</label>
                  <textarea
                    id="cms-prep"
                    rows={4}
                    required
                    placeholder="Proceso de cocción paso a paso..."
                    value={cmsPrepText}
                    onChange={(e) => setCmsPrepText(e.target.value)}
                    className="w-full bg-[#FDFBF9] border border-[#CDBCAC]/55 rounded-xl text-xs p-3 focus:border-[#D4A373]"
                  />
                </div>
              </div>

              {/* Nutritional fields row */}
              <div className="grid grid-cols-4 gap-2.5 pb-2">
                <div className="space-y-1">
                  <label htmlFor="cms-kcal" className="text-[8px] font-extrabold uppercase text-brand-grey">Kcal</label>
                  <input
                    id="cms-kcal"
                    type="number"
                    value={cmsCalories}
                    onChange={(e) => setCmsCalories(Number(e.target.value))}
                    className="w-full bg-[#FDFBF9] border border-[#CDBCAC]/40 rounded-lg text-xs p-2"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="cms-prot" className="text-[8px] font-extrabold uppercase text-brand-grey">Prot (g)</label>
                  <input
                    id="cms-prot"
                    type="number"
                    value={cmsProtein}
                    onChange={(e) => setCmsProtein(Number(e.target.value))}
                    className="w-full bg-[#FDFBF9] border border-[#CDBCAC]/40 rounded-lg text-xs p-2"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="cms-carbs" className="text-[8px] font-extrabold uppercase text-brand-grey">Carbs (g)</label>
                  <input
                    id="cms-carbs"
                    type="number"
                    value={cmsCarbs}
                    onChange={(e) => setCmsCarbs(Number(e.target.value))}
                    className="w-full bg-[#FDFBF9] border border-[#CDBCAC]/40 rounded-lg text-xs p-2"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="cms-fats" className="text-[8px] font-extrabold uppercase text-brand-grey font-sans">Grasas (g)</label>
                  <input
                    id="cms-fats"
                    type="number"
                    value={cmsFats}
                    onChange={(e) => setCmsFats(Number(e.target.value))}
                    className="w-full bg-[#FDFBF9] border border-[#CDBCAC]/40 rounded-lg text-xs p-2"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#D4A373] hover:bg-[#c39162] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs hover:shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
              >
                <span>Añadir e Indexar Receta de Calidad</span>
              </button>
            </form>
          </motion.div>
        )}

        {/* MODERATION TAB CONTENT */}
        {adminTab === 'moderation' && (
          <motion.div
            key="tab-moderation"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-4 max-w-3xl"
          >
            <div className="bg-white border border-[#CDBCAC]/30 rounded-3xl p-5 shadow-sm">
              <div className="border-b border-[#CDBCAC]/20 pb-3 mb-4">
                <h3 className="font-serif text-base font-bold text-brand-dark flex items-center gap-1.5">
                  <Users className="w-5 h-5 text-[#8F9E62]" />
                  <span>Bandeja de Validación de Recetas Estudiantiles</span>
                </h3>
                <p className="text-[11px] text-brand-grey">Recetas propuestas por usuarias activas que requieren revisión científica antes del despliegue oficial.</p>
              </div>

              <div className="space-y-4">
                {activeSubmissions.map((sub) => (
                  <motion.div
                    key={sub.id}
                    layoutId={`sub-${sub.id}`}
                    className="p-4 bg-[#FDFBF9] border border-[#CDBCAC]/35 hover:border-[#D4A373]/80 rounded-2xl flex flex-col gap-3 transition-colors"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-brand-primary bg-amber-50 px-2 py-0.5 rounded-sm">
                            Hormonas & Digestión • {sub.category}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-brand-dark mt-1">
                          {sub.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[10px] text-brand-grey mt-0.5">
                          <span>Postulado por: <strong>{sub.authorName}</strong></span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-xs text-brand-grey">
                        <Clock3 className="w-4 h-4 text-brand-primary" />
                        <span>{sub.timeNeeded || '20 min'}</span>
                      </div>
                    </div>

                    <div className="space-y-1 bg-white/50 p-3 rounded-xl border border-brand-subdued/20 text-[10px]">
                      <p className="text-brand-dark leading-normal">
                        <strong>Fito-Nutriente Destacado:</strong> {sub.keyNutrient}
                      </p>
                      <p className="text-brand-grey">
                        <strong>Ingredientes:</strong> {sub.ingredients.join(', ')}
                      </p>
                      <p className="text-brand-grey">
                        <strong>Pasos:</strong> {sub.preparation.join(' → ')}
                      </p>
                    </div>

                    <div className="flex gap-2.5 pt-1">
                      <button
                        onClick={() => onApproveSubmission(sub.id)}
                        className="flex-1 bg-white border border-brand-subdued text-xs text-[#8F9E62] font-bold py-2.5 px-3 rounded-xl hover:bg-[#8F9E62] hover:text-white hover:border-[#8F9E62] cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-3xs"
                      >
                        <Check className="w-4 h-4" />
                        Aprobar y Registrar
                      </button>

                      <button
                        onClick={() => onRejectSubmission(sub.id)}
                        className="bg-white border border-brand-subdued text-xs text-red-500 font-bold px-3 py-2.5 rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500 cursor-pointer transition-colors"
                        title="Rechazar"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}

                {activeSubmissions.length === 0 && (
                  <div className="text-center py-12 bg-[#FDFBF9] border border-brand-subdued/40 rounded-2xl space-y-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto border border-brand-subdued shadow-3xs text-[#8F9E62]">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <div>
                      <p className="font-serif text-sm font-bold text-brand-dark">Bandeja despejada</p>
                      <p className="text-[11px] text-brand-grey max-w-[210px] mx-auto mt-1 leading-relaxed">
                        No hay propuestas pendientes de la comunidad Glow. ¡Excelente control de calidad!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
