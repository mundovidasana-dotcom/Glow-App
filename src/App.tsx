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
import { Sparkles, Home, ShoppingBag, User, Users, FileText, Activity, Trophy } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'challenge' | 'tracker' | 'shopping' | 'community' | 'profile' | 'admin'>('home');
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(() => localStorage.getItem('glow_onboarding_completed') === 'true');
  
  // Estados protegidos con array vacío por defecto
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('glow_shopping_list');
    return saved ? JSON.parse(saved) : [];
  });

  const [submissions, setSubmissions] = useState<UserSubmission[]>(() => {
    const saved = localStorage.getItem('glow_submissions');
    return saved ? JSON.parse(saved) : [];
  });
  const [userProfile, setUserProfile] = useState<UserProfile>(() => JSON.parse(localStorage.getItem('glow_profile') || JSON.stringify(INITIAL_USER_PROFILE)));

  useEffect(() => {
    localStorage.setItem('glow_onboarding_completed', String(onboardingCompleted));
    localStorage.setItem('glow_shopping_list', JSON.stringify(shoppingList));
    localStorage.setItem('glow_submissions', JSON.stringify(submissions));
    localStorage.setItem('glow_profile', JSON.stringify(userProfile));
  }, [onboardingCompleted, shoppingList, submissions, userProfile]);

  // Protección para cálculos de filtros
  const activeShoppingItems = (shoppingList || []).filter((item) => !item.completed).length;

  if (!onboardingCompleted) {
    return <OnboardingView onComplete={(data) => { setUserProfile(prev => ({...prev, ...data})); setOnboardingCompleted(true); }} onSkip={() => setOnboardingCompleted(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-brand-dark flex flex-col lg:flex-row w-full">
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#CDBCAC]/30 p-6">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="w-6 h-6 text-[#D4A373]" />
          <h1 className="font-serif text-2xl font-black">Glow</h1>
        </div>
        <nav className="space-y-2">
          {[
            { id: 'home', icon: Home, label: 'Inicio' },
            { id: 'shopping', icon: ShoppingBag, label: 'Lista de Compras' },
            { id: 'tracker', icon: Activity, label: 'Tracker' },
            { id: 'community', icon: Users, label: 'Comunidad' },
            { id: 'profile', icon: User, label: 'Perfil' }
          ].map((item) => (
            <button key={item.id} onClick={() => setCurrentTab(item.id as any)} className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-[#FDFBF9]">
              <item.icon className="w-5 h-5" /> {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {currentTab === 'home' && <DashboardView onRecipeSelect={() => {}} />}
        {currentTab === 'shopping' && <SmartShoppingList items={shoppingList} setItems={setShoppingList} />}
        {currentTab === 'tracker' && <SymptomTrackerView />}
        {currentTab === 'community' && <GlowCommunity />}
        {currentTab === 'profile' && <ProfileView user={userProfile} />}
      </main>
    </div>
  );
}