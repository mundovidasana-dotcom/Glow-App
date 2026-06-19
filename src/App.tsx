/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Recipe, RecipeCategory, UserProfile, ShoppingItem, SocialPost, UserSubmission } from './types';
import { RECIPES_DB, INITIAL_USER_PROFILE, INITIAL_SOCIAL_POSTS, INITIAL_SUBMISSIONS } from './data';
import { DashboardView } from './components/DashboardView';
import { CategoryView } from './components/CategoryView';
import { RecipeDetailView } from './components/RecipeDetailView';
import { ProfileView } from './components/ProfileView';
import { SmartShoppingList } from './components/SmartShoppingList';
import { GlowCommunity } from './components/GlowCommunity';
import { RecipeSubmissionForm } from './components/RecipeSubmissionForm';
import { AdminDashboard } from './components/AdminDashboard';
import { OnboardingView } from './components/OnboardingView';
import { ChallengeView } from './components/ChallengeView';
import { SymptomTrackerView } from './components/SymptomTrackerView';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Home, Compass, ShoppingBag, User, Sparkles, 
  Heart, CheckCircle2, Trash2, Users, FileText, Lock, Unlock, Menu, X, ArrowLeft, Shield,
  Trophy, Activity
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'challenge' | 'tracker' | 'search' | 'shopping' | 'community' | 'profile' | 'admin' | 'share'>('home');
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory>('Desayunos');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userRole, setUserRole] = useState<'user' | 'admin'>('user');
  const [recipes, setRecipes] = useState<Recipe[]>(RECIPES_DB);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(false);
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>(['desayuno-1', 'almuerzo-1']);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(INITIAL_SOCIAL_POSTS);
  const [submissions, setSubmissions] = useState<UserSubmission[]>(INITIAL_SUBMISSIONS);

  // Lógica de conexión a Supabase
  useEffect(() => {
    async function loadUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setUserProfile(prev => ({
            ...prev,
            name: profile.name || prev.name,
            avatar: profile.avatar_url || prev.avatar
          }));
        }
      }
    }
    loadUserData();
  }, []);

  // Funciones de control (añadidas para recuperar la funcionalidad)
  const handleToggleSaveRecipe = (id: string) => {
    setSavedRecipeIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleAddPoints = (amount: number) => {
    setUserProfile(prev => ({ ...prev, points: prev.points + amount }));
  };

  if (!onboardingCompleted) {
    return (
      <OnboardingView 
        onComplete={(newPatch) => {
          setUserProfile(prev => ({ ...prev, ...newPatch }));
          setOnboardingCompleted(true);
        }}
        onSkip={() => setOnboardingCompleted(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-brand-dark flex flex-col lg:flex-row font-sans antialiased overflow-x-hidden">
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#CDBCAC]/30 h-screen sticky top-0 px-5 py-6 justify-between shrink-0 z-40">
        <div className="space-y-6">
           <div className="flex items-center gap-3 bg-brand-bg/40 p-3 rounded-2xl border border-brand-subdued/40">
            <img src={userProfile.avatar} alt="Avatar" className="w-9 h-9 rounded-full object-cover border border-brand-primary/20" />
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-brand-dark truncate">{userProfile.name}</h4>
            </div>
          </div>
          {/* Navegación básica */}
          <nav className="space-y-1">
            <button onClick={() => setCurrentTab('home')} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium hover:bg-brand-bg rounded-lg">
              <Home size={18} /> Inicio
            </button>
            <button onClick={() => setCurrentTab('profile')} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium hover:bg-brand-bg rounded-lg">
              <User size={18} /> Perfil
            </button>
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-6">
        {currentTab === 'home' && <DashboardView onRecipeSelect={(id) => { setSelectedRecipeId(id); setCurrentTab('search'); }} />}
        {currentTab === 'profile' && <ProfileView user={userProfile} />}
        {/* Aquí renderizarás tus otros componentes según el estado currentTab */}
      </main>
    </div>
  );
}