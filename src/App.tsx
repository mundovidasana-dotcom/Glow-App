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

export default function App() {
  // Navigation states
  const [currentTab, setCurrentTab] = useState<'home' | 'challenge' | 'tracker' | 'search' | 'shopping' | 'community' | 'profile' | 'admin' | 'share'>('home');
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory>('Desayunos');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  
  // Responsive sidebar drawer state for Tablet
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Simulated view Role: User vs Admin
  const [userRole, setUserRole] = useState<'user' | 'admin'>(() => {
    const saved = localStorage.getItem('glow_user_role');
    return (saved as 'user' | 'admin') || 'user';
  });

  // DB and Profile states
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('glow_recipes');
    return saved ? JSON.parse(saved) : RECIPES_DB;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('glow_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.points === undefined) {
        parsed.points = 150;
        parsed.tier = 'Brote Activo';
      }
      return parsed;
    }
    return {
      ...INITIAL_USER_PROFILE,
      points: 150,
      tier: 'Brote Activo'
    };
  });

  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(() => {
    const saved = localStorage.getItem('glow_onboarding_completed');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('glow_onboarding_completed', String(onboardingCompleted));
  }, [onboardingCompleted]);

  // Saved / Fired recipes (Favorites)
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('glow_saved_ids');
    return saved ? JSON.parse(saved) : ['desayuno-1', 'almuerzo-1'];
  });

  // Shopping List state
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('glow_shopping_list');
    return saved ? JSON.parse(saved) : [];
  });

  // Social community posts
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(() => {
    const saved = localStorage.getItem('glow_social_posts');
    return saved ? JSON.parse(saved) : INITIAL_SOCIAL_POSTS;
  });

  // User submissions queue
  const [submissions, setSubmissions] = useState<UserSubmission[]>(() => {
    const saved = localStorage.getItem('glow_submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem('glow_user_role', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('glow_recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('glow_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('glow_saved_ids', JSON.stringify(savedRecipeIds));
  }, [savedRecipeIds]);

  useEffect(() => {
    localStorage.setItem('glow_shopping_list', JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem('glow_social_posts', JSON.stringify(socialPosts));
  }, [socialPosts]);

  useEffect(() => {
    localStorage.setItem('glow_submissions', JSON.stringify(submissions));
  }, [submissions]);

  // Actions
  const handleToggleSaveRecipe = (recipeId: string) => {
    setSavedRecipeIds((prev) =>
      prev.includes(recipeId) 
        ? prev.filter((id) => id !== recipeId) 
        : [...prev, recipeId]
    );
  };

  const handleUpdateUserProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
  };

  const handleAddPoints = (pointsToAdd: number) => {
    setUserProfile((prev) => {
      const currentPoints = prev.points ?? 150;
      const newPoints = currentPoints + pointsToAdd;
      
      let newTier = prev.tier ?? 'Brote Activo';
      if (newPoints >= 500) {
        newTier = 'Rayo de Oro';
      } else if (newPoints >= 200) {
        newTier = 'Flor Silvestre';
      } else if (newPoints >= 50) {
        newTier = 'Brote Activo';
      } else {
        newTier = 'Semilla Radiante';
      }
      
      return {
        ...prev,
        points: newPoints,
        tier: newTier
      };
    });
  };

  const handlePublishOfficialRecipe = (newRecipe: Recipe) => {
    setRecipes((prev) => [newRecipe, ...prev]);
  };

  const handleAddIngredientsToShoppingList = (ingredients: string[], recipeTitle: string) => {
    const newItems: ShoppingItem[] = ingredients.map((ing) => ({
      id: `shop-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      ingredientName: ing,
      recipeTitle: recipeTitle,
      completed: false,
    }));
    setShoppingList((prev) => [...prev, ...newItems]);
  };

  const handleToggleShoppingItem = (itemId: string) => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDeleteShoppingItem = (itemId: string) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearShoppingList = () => {
    setShoppingList([]);
  };

  const handleSelectRecipeById = (id: string) => {
    setSelectedRecipeId(id);
  };

  // Social interactions
  const handleToggleLikePost = (postId: string) => {
    setSocialPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.likedByCurrentUser;
          return {
            ...post,
            likedByCurrentUser: isLiked,
            likesCount: isLiked ? post.likesCount + 1 : post.likesCount - 1,
          };
        }
        return post;
      })
    );
  };

  const handleToggleSavePost = (postId: string) => {
    setSocialPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            savedByCurrentUser: !post.savedByCurrentUser,
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId: string, commentText: string) => {
    setSocialPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: `comm-${Date.now()}`,
            authorName: userProfile.name,
            authorAvatar: userProfile.avatar,
            text: commentText,
            timeAgo: 'Hace instantes',
          };
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      })
    );
  };

  // Submission Flow
  const handleCreateRecipeSubmission = (subPayload: any) => {
    const newSub: UserSubmission = {
      id: `sub-${Date.now()}`,
      ...subPayload,
      authorName: userProfile.name,
      authorAvatar: userProfile.avatar,
      status: 'pending',
      createdAt: 'Hace instantes'
    };
    setSubmissions((prev) => [newSub, ...prev]);
  };

  // Admin Approval Loop back to app
  const handleApproveSubmission = (subId: string) => {
    const sub = submissions.find((s) => s.id === subId);
    if (!sub) return;

    // 1. Mark as approved in queue
    setSubmissions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: 'approved' as const } : s))
    );

    // 2. Insert as a verified official recipe in DB
    const newRecipeId = `approved-${subId}`;
    const newRecipe: Recipe = {
      id: newRecipeId,
      title: sub.title,
      category: sub.category,
      image: sub.image,
      rating: 4.9,
      reviews: 1,
      time: sub.time,
      difficulty: sub.difficulty,
      keyNutrient: sub.keyNutrient,
      whyAntiInflammatory: sub.whyAntiInflammatory,
      ingredients: sub.ingredients,
      preparation: sub.preparation,
      nutritionalInfo: sub.nutritionalInfo,
      featured: true,
    };
    setRecipes((prev) => [newRecipe, ...prev]);

    // 3. Post automatically to Community Wall as approved premium recipe
    const newPost: SocialPost = {
      id: `post-${subId}`,
      authorName: sub.authorName,
      authorAvatar: sub.authorAvatar,
      isApprovedRecipe: true,
      image: sub.image,
      title: sub.title,
      description: `¡Hola chicas! Acaban de validarme la receta de "${sub.title}". Es baja-inflamatoria, super alta en ${sub.keyNutrient.toLowerCase()} y fácil de preparar. ¡Pruébenla!`,
      likesCount: 12,
      comments: [],
      recipeId: newRecipeId,
      createdAt: 'Hace instantes',
    };
    setSocialPosts((prev) => [newPost, ...prev]);
  };

  const handleRejectSubmission = (subId: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: 'rejected' as const } : s))
    );
  };

  const currentRecipe = selectedRecipeId 
    ? recipes.find(r => r.id === selectedRecipeId) || null 
    : null;

  const activeShoppingItemsCount = shoppingList.filter((item) => !item.completed).length;
  const activeSubmissionsCount = submissions.filter((s) => s.status === 'pending').length;

  // Render navigation icon
  const getNavIcon = (tab: string, active: boolean) => {
    switch (tab) {
      case 'home':
        return <Home className={`w-5 h-5 ${active ? 'text-[#D4A373]' : 'text-brand-grey'}`} />;
      case 'challenge':
        return <Trophy className={`w-5 h-5 ${active ? 'text-[#D4A373]' : 'text-brand-grey'}`} />;
      case 'tracker':
        return <Activity className={`w-5 h-5 ${active ? 'text-[#D4A373]' : 'text-brand-grey'}`} />;
      case 'search':
        return <Compass className={`w-5 h-5 ${active ? 'text-[#D4A373]' : 'text-brand-grey'}`} />;
      case 'shopping':
        return <ShoppingBag className={`w-5 h-5 ${active ? 'text-[#D4A373]' : 'text-brand-grey'}`} />;
      case 'community':
        return <Users className={`w-5 h-5 ${active ? 'text-[#D4A373]' : 'text-brand-grey'}`} />;
      case 'profile':
        return <User className={`w-5 h-5 ${active ? 'text-[#D4A373]' : 'text-brand-grey'}`} />;
      case 'admin':
        return <Shield className={`w-5 h-5 ${active ? 'text-[#D4A373]' : 'text-brand-grey'}`} />;
      default:
        return <Sparkles className="w-5 h-5 text-brand-grey" />;
    }
  };

  if (!onboardingCompleted) {
    return (
      <OnboardingView 
        onComplete={(newPatch) => {
          setUserProfile(prev => ({
            ...prev,
            ...newPatch
          }));
          setOnboardingCompleted(true);
        }}
        onSkip={() => setOnboardingCompleted(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-brand-dark flex flex-col lg:flex-row font-sans antialiased overflow-x-hidden selection:bg-[#E0A96D]/30 selection:text-brand-dark w-full">
      
      {/* ----------------- 1. VISUAL DEVICE SIDEBAR (Desktop >1024px) ----------------- */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#CDBCAC]/30 h-screen sticky top-0 px-5 py-6 justify-between shrink-0 z-40 select-none shadow-3xs">
        <div className="space-y-6">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2.5 px-1 py-2 border-b border-brand-subdued/30 pb-4">
            <Sparkles className="w-6 h-6 text-[#D4A373]" />
            <div>
              <h1 className="font-serif text-2xl font-black tracking-tight text-brand-dark">Glow</h1>
              <span className="text-[10px] font-bold text-[#CCD5AE] uppercase tracking-widest block -mt-1">Nutrición Activa</span>
            </div>
          </div>

          {/* User profile teaser */}
          <div className="flex items-center gap-3 bg-brand-bg/40 p-3 rounded-2xl border border-brand-subdued/40">
            <img src={userProfile.avatar} alt="Avatar" className="w-9 h-9 rounded-full object-cover border border-brand-primary/20" referrerPolicy="no-referrer" />
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-brand-dark truncate">{userProfile.name}</h4>
              <span className="text-[9px] text-[#8F9E62] font-semibold flex items-center gap-0.5">
                • Suscripción Activa
              </span>
            </div>
          </div>

          {/* Persistent Sidebar Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => { setSelectedRecipeId(null); setCurrentTab('home'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                currentTab === 'home' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373] shadow-3xs' : 'text-brand-grey hover:bg-brand-bg/30 hover:text-brand-dark'
              }`}
            >
              <Home className="w-4.5 h-4.5" />
              <span>Inicio</span>
            </button>

            <button
              onClick={() => { setSelectedRecipeId(null); setCurrentTab('search'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                currentTab === 'search' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373] shadow-3xs' : 'text-brand-grey hover:bg-brand-bg/30 hover:text-brand-dark'
              }`}
            >
              <Compass className="w-4.5 h-4.5" />
              <span>Explorar</span>
            </button>

            <button
              onClick={() => { setSelectedRecipeId(null); setCurrentTab('challenge'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                currentTab === 'challenge' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373] shadow-3xs' : 'text-brand-grey hover:bg-brand-bg/30 hover:text-brand-dark'
              }`}
            >
              <Trophy className="w-4.5 h-4.5" />
              <span>Reto 21 Días</span>
            </button>

            <button
              onClick={() => { setSelectedRecipeId(null); setCurrentTab('tracker'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                currentTab === 'tracker' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373] shadow-3xs' : 'text-brand-grey hover:bg-brand-bg/30 hover:text-brand-dark'
              }`}
            >
              <Activity className="w-4.5 h-4.5" />
              <span>Mi Bienestar</span>
            </button>

            <button
              onClick={() => { setSelectedRecipeId(null); setCurrentTab('shopping'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer relative ${
                currentTab === 'shopping' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373] shadow-3xs' : 'text-brand-grey hover:bg-brand-bg/30 hover:text-brand-dark'
              }`}
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              <span>Mi Lista</span>
              {activeShoppingItemsCount > 0 && (
                <span className="absolute right-3 bg-red-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                  {activeShoppingItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => { setSelectedRecipeId(null); setCurrentTab('community'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                currentTab === 'community' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373] shadow-3xs' : 'text-brand-grey hover:bg-brand-bg/30 hover:text-brand-dark'
              }`}
            >
              <Users className="w-4.5 h-4.5" />
              <span>Comunidad Glow</span>
            </button>

            <button
              onClick={() => { setSelectedRecipeId(null); setCurrentTab('profile'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                currentTab === 'profile' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373] shadow-3xs' : 'text-brand-grey hover:bg-brand-bg/30 hover:text-brand-dark'
              }`}
            >
              <User className="w-4.5 h-4.5" />
              <span>Mi Perfil</span>
            </button>

            {/* Admin control panel - visual lock if role is user to invite switching */}
            <button
              onClick={() => { setSelectedRecipeId(null); setCurrentTab('admin'); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                currentTab === 'admin' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373] shadow-3xs' : 'text-brand-grey hover:bg-brand-bg/30 hover:text-brand-dark'
              }`}
            >
              <span className="flex items-center gap-3">
                <Shield className="w-4.5 h-4.5" />
                <span>Panel de Control</span>
              </span>
              {userRole === 'admin' ? (
                activeSubmissionsCount > 0 ? (
                  <span className="bg-[#D4A373] text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                    {activeSubmissionsCount}
                  </span>
                ) : (
                  <Unlock className="w-3.5 h-3.5 text-[#8F9E62]" />
                )
              ) : (
                <Lock className="w-3.5 h-3.5 text-brand-grey/50" />
              )}
            </button>
          </nav>
        </div>

 {/* Footer de versión sin simulación */}
<div className="pt-4 border-t border-brand-subdued/40">
  <p className="text-[10px] text-brand-grey/70 text-center">Glow Nutrición v2.1 • 2026</p>
</div>
      </aside>

      {/* ----------------- 2. TABLET DRAWER BAR (Tablet 768px - 1024px) ----------------- */}
      <aside className="hidden md:flex lg:hidden flex-col w-20 border-r border-[#CDBCAC]/30 bg-white h-screen sticky top-0 items-center justify-between py-6 shrink-0 z-40 select-none">
        <div className="space-y-8 flex flex-col items-center">
          <button 
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="p-2.5 bg-brand-bg/50 border border-brand-subdued/80 rounded-xl hover:border-[#D4A373] transition-all cursor-pointer"
            title="Abrir menú"
          >
            <Menu className="w-5 h-5 text-brand-dark" />
          </button>

          <nav className="flex flex-col items-center gap-4">
            <button 
              onClick={() => { setSelectedRecipeId(null); setCurrentTab('home'); }}
              className={`p-3 rounded-xl transition-all cursor-pointer ${currentTab === 'home' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373]' : 'text-brand-grey hover:text-brand-dark'}`}
              title="Inicio"
            >
              <Home className="w-5 h-5" />
            </button>
            <button 
              onClick={() => { setSelectedRecipeId(null); setCurrentTab('search'); }}
              className={`p-3 rounded-xl transition-all cursor-pointer ${currentTab === 'search' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373]' : 'text-brand-grey hover:text-brand-dark'}`}
              title="Explorar"
            >
              <Compass className="w-5 h-5" />
            </button>
            <button 
              onClick={() => { setSelectedRecipeId(null); setCurrentTab('challenge'); }}
              className={`p-3 rounded-xl transition-all cursor-pointer ${currentTab === 'challenge' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373]' : 'text-brand-grey hover:text-brand-dark'}`}
              title="Reto 21 Días"
            >
              <Trophy className="w-5 h-5" />
            </button>
            <button 
              onClick={() => { setSelectedRecipeId(null); setCurrentTab('tracker'); }}
              className={`p-3 rounded-xl transition-all cursor-pointer ${currentTab === 'tracker' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373]' : 'text-brand-grey hover:text-brand-dark'}`}
              title="Mi Bienestar"
            >
              <Activity className="w-5 h-5" />
            </button>
            <button 
              onClick={() => { setSelectedRecipeId(null); setCurrentTab('shopping'); }}
              className={`p-3 rounded-xl transition-all cursor-pointer relative ${currentTab === 'shopping' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373]' : 'text-brand-grey hover:text-brand-dark'}`}
              title="Mi Lista"
            >
              <ShoppingBag className="w-5 h-5" />
              {activeShoppingItemsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-red-500 text-white font-mono text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {activeShoppingItemsCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => { setSelectedRecipeId(null); setCurrentTab('community'); }}
              className={`p-3 rounded-xl transition-all cursor-pointer ${currentTab === 'community' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373]' : 'text-brand-grey hover:text-brand-dark'}`}
              title="Comunidad"
            >
              <Users className="w-5 h-5" />
            </button>
            <button 
              onClick={() => { setSelectedRecipeId(null); setCurrentTab('profile'); }}
              className={`p-3 rounded-xl transition-all cursor-pointer ${currentTab === 'profile' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373]' : 'text-brand-grey hover:text-brand-dark'}`}
              title="Mi Perfil"
            >
              <User className="w-5 h-5" />
            </button>
          </nav>
        </div>

      <div className="flex flex-col items-center gap-3">
  <img src={userProfile.avatar} alt="User Profile Avatar" className="w-8 h-8 rounded-full object-cover border border-brand-primary" referrerPolicy="no-referrer" />
</div>
      </aside>

      {/* ----------------- TABLET SLIDE DRAWER (Tablet Menu) ----------------- */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black z-50 lg:hidden cursor-pointer"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-[#CDBCAC]/30 z-50 p-5 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-brand-subdued/30 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5.5 h-5.5 text-brand-primary" />
                    <h2 className="font-serif text-lg font-bold text-brand-dark">Glow Navegación</h2>
                  </div>
                  <button onClick={() => setDrawerOpen(false)} className="p-1.5 hover:bg-brand-bg rounded-lg cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  <button
                    onClick={() => { setSelectedRecipeId(null); setCurrentTab('home'); setDrawerOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${currentTab === 'home' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373]' : 'text-brand-grey hover:bg-brand-bg/20'}`}
                  >
                    <Home className="w-4.5 h-4.5" />
                    <span>Inicio</span>
                  </button>
                  <button
                    onClick={() => { setSelectedRecipeId(null); setCurrentTab('search'); setDrawerOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${currentTab === 'search' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373]' : 'text-brand-grey hover:bg-brand-bg/20'}`}
                  >
                    <Compass className="w-4.5 h-4.5" />
                    <span>Explorar</span>
                  </button>
                  <button
                    onClick={() => { setSelectedRecipeId(null); setCurrentTab('challenge'); setDrawerOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${currentTab === 'challenge' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373]' : 'text-brand-grey hover:bg-brand-bg/20'}`}
                  >
                    <Trophy className="w-4.5 h-4.5" />
                    <span>Reto 21 Días</span>
                  </button>
                  <button
                    onClick={() => { setSelectedRecipeId(null); setCurrentTab('tracker'); setDrawerOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${currentTab === 'tracker' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373]' : 'text-brand-grey hover:bg-brand-bg/20'}`}
                  >
                    <Activity className="w-4.5 h-4.5" />
                    <span>Mi Bienestar</span>
                  </button>
                  <button
                    onClick={() => { setSelectedRecipeId(null); setCurrentTab('shopping'); setDrawerOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${currentTab === 'shopping' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373]' : 'text-brand-grey hover:bg-brand-bg/20'}`}
                  >
                    <span className="flex items-center gap-3">
                      <ShoppingBag className="w-4.5 h-4.5" />
                      <span>Mi Lista</span>
                    </span>
                    {activeShoppingItemsCount > 0 && (
                      <span className="bg-red-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                        {activeShoppingItemsCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => { setSelectedRecipeId(null); setCurrentTab('community'); setDrawerOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${currentTab === 'community' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373]' : 'text-[#8F9E62] hover:bg-brand-bg/20'}`}
                  >
                    <Users className="w-4.5 h-4.5" />
                    <span>Comunidad Glow</span>
                  </button>
                  <button
                    onClick={() => { setSelectedRecipeId(null); setCurrentTab('profile'); setDrawerOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${currentTab === 'profile' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373]' : 'text-[#8F9E62] hover:bg-brand-bg/20'}`}
                  >
                    <User className="w-4.5 h-4.5" />
                    <span>Mi Perfil</span>
                  </button>
                  <button
                    onClick={() => { setSelectedRecipeId(null); setCurrentTab('admin'); setDrawerOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${currentTab === 'admin' && !selectedRecipeId ? 'bg-brand-bg text-[#D4A373]' : 'text-brand-grey hover:bg-brand-bg/20'}`}
                  >
                    <span className="flex items-center gap-3">
                      <Shield className="w-4.5 h-4.5" />
                      <span>Panel de Control</span>
                    </span>
                    {userRole === 'admin' ? (
                      <Unlock className="w-3.5 h-3.5 text-[#8F9E62]" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-brand-grey/50" />
                    )}
                  </button>
                </nav>
              </div>

              {/* Simulation inside Side Drawer */}
              <div className="space-y-3 pt-3 border-t border-brand-subdued/40">
                <span className="text-[10px] uppercase tracking-widest text-[#D4A373] font-bold block">Simulación de Rol</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setUserRole('user'); setDrawerOpen(false); }}
                    className={`flex-1 py-1 rounded-md text-[10px] font-bold ${userRole === 'user' ? 'bg-[#D4A373] text-white' : 'bg-brand-bg text-brand-grey'}`}
                  >
                    Usuario
                  </button>
                  <button 
                    onClick={() => { setUserRole('admin'); setDrawerOpen(false); }}
                    className={`flex-1 py-1 rounded-md text-[10px] font-bold ${userRole === 'admin' ? 'bg-[#CCD5AE] text-brand-dark' : 'bg-brand-bg text-brand-grey'}`}
                  >
                    Admin
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ----------------- 3. TOP MENU BAR (Mobile & general helper) ----------------- */}
      <div className="w-full bg-white border-b border-brand-subdued/80 px-4 py-3.5 flex justify-between items-center sm:px-6 md:px-8 lg:hidden sticky top-0 z-40 select-none shrink-0 shadow-3xs">
        <div className="flex items-center gap-2">
          {/* Menu triggers slide on Mobile, drawer on Tablet */}
          <button 
            onClick={() => setDrawerOpen(true)}
            className="p-1.5 rounded-lg text-brand-dark hover:bg-brand-bg/30 md:hidden"
          >
            <Menu className="w-5.5 h-5.5" />
          </button>
          
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4.5 h-4.5 text-[#D4A373] shrink-0" />
            <h1 className="font-serif text-lg font-black tracking-tight text-brand-dark">Glow</h1>
          </div>
        </div>

        {/* Roles Pill Switcher directly in top header */}
        <div className="flex items-center gap-1 bg-brand-bg/85 border border-[#CDBCAC]/30 p-0.5 rounded-full text-[9px] font-extrabold select-none">
          <button 
            onClick={() => setUserRole('user')}
            className={`px-2 py-1 rounded-full transition-all cursor-pointer ${userRole === 'user' ? 'bg-[#D4A373] text-white shadow-3xs' : 'text-brand-grey'}`}
          >
            Usuario
          </button>
          <button 
            onClick={() => setUserRole('admin')}
            className={`px-2 py-1 rounded-full transition-all cursor-pointer ${userRole === 'admin' ? 'bg-[#CCD5AE] text-brand-dark shadow-3xs' : 'text-brand-grey'}`}
          >
            Admin
          </button>
        </div>
      </div>

      {/* ----------------- 4. MAIN INTUITIVE WORKSPACE CANVAS ----------------- */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6 w-full max-w-7xl mx-auto flex flex-col justify-start">
        
        {/* Banner highlighting active mode if in admin simulating role */}
        {userRole === 'admin' && currentTab !== 'admin' && (
          <div className="mb-6 bg-[#CCD5AE]/15 border border-[#CCD5AE]/40 rounded-2xl p-3 flex items-center justify-between text-xs text-[#8F9E62]">
            <p className="font-medium">
              ✨ <strong className="font-bold">Simulación Admin:</strong> Tienes acceso a la Bandeja de Aprobación. Usa el menú para ir al panel.
            </p>
            <button 
              onClick={() => setCurrentTab('admin')} 
              className="bg-[#CCD5AE] hover:bg-[#b0bd8a] text-brand-dark px-3 py-1 rounded-xl text-[10px] font-bold"
            >
              Ir al Panel (8)
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* 1. Deep Recipe Details view override (always visual focus hierarchy) */}
          {currentRecipe ? (
            <div className="max-w-4xl mx-auto w-full">
              <RecipeDetailView
                key={`recipe-${currentRecipe.id}`}
                recipe={currentRecipe}
                isSaved={savedRecipeIds.includes(currentRecipe.id)}
                onToggleSave={() => handleToggleSaveRecipe(currentRecipe.id)}
                onGoBack={() => setSelectedRecipeId(null)}
                onAddIngredientsToShoppingList={handleAddIngredientsToShoppingList}
                onAddPoints={handleAddPoints}
                userAvatar={userProfile.avatar}
                userName={userProfile.name}
                userTier={userProfile.tier}
              />
            </div>
          ) : (
            /* 2. Standard Tab routing workspace */
            <div className="w-full">
              {currentTab === 'home' && (
                <DashboardView
                  userName={userProfile.name}
                  recipes={recipes}
                  onSelectCategory={(category) => {
                    setSelectedCategory(category);
                    setCurrentTab('search');
                  }}
                  onSelectRecipe={handleSelectRecipeById}
                  savedRecipeIds={savedRecipeIds}
                  onToggleSaveRecipe={handleToggleSaveRecipe}
                />
              )}

              {currentTab === 'search' && (
                <CategoryView
                  initialCategory={selectedCategory}
                  recipes={recipes}
                  onSelectRecipe={handleSelectRecipeById}
                  onGoBack={() => setCurrentTab('home')}
                />
              )}

              {currentTab === 'challenge' && (
                <ChallengeView
                  userProfile={userProfile}
                  onAddPoints={handleAddPoints}
                  onAddIngredientsToShoppingList={handleAddIngredientsToShoppingList}
                />
              )}

              {currentTab === 'tracker' && (
                <SymptomTrackerView
                  onAddPoints={handleAddPoints}
                />
              )}

              {currentTab === 'shopping' && (
                <SmartShoppingList
                  shoppingList={shoppingList}
                  onToggleShoppingItem={handleToggleShoppingItem}
                  onDeleteShoppingItem={handleDeleteShoppingItem}
                  onClearShoppingList={handleClearShoppingList}
                />
              )}

              {currentTab === 'community' && (
                <GlowCommunity
                  posts={socialPosts}
                  onToggleLike={handleToggleLikePost}
                  onToggleSavePost={handleToggleSavePost}
                  onAddComment={handleAddComment}
                  onNavigateToShare={() => setCurrentTab('share')}
                />
              )}

              {currentTab === 'share' && (
                <RecipeSubmissionForm
                  onSubmitSubmission={handleCreateRecipeSubmission}
                  onGoBack={() => setCurrentTab('community')}
                />
              )}

              {currentTab === 'profile' && (
                <ProfileView
                  userProfile={userProfile}
                  onUpdateUserProfile={handleUpdateUserProfile}
                  recipes={recipes}
                  onAddRecipe={handlePublishOfficialRecipe}
                  shoppingList={shoppingList}
                  onToggleShoppingItem={handleToggleShoppingItem}
                  onDeleteShoppingItem={handleDeleteShoppingItem}
                  onClearShoppingList={handleClearShoppingList}
                  onSwitchToRecipe={handleSelectRecipeById}
                />
              )}

              {currentTab === 'admin' && (
                <AdminDashboard
                  pendingSubmissions={submissions}
                  recipesCount={recipes.length}
                  onApproveSubmission={handleApproveSubmission}
                  onRejectSubmission={handleRejectSubmission}
                  onPublishOfficialRecipe={handlePublishOfficialRecipe}
                />
              )}
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* ----------------- 5. UNIFIED BOTTOM BAR NAVIGATION (Mobile <768px Only) ----------------- */}
      <footer className="z-40 bg-white border-t border-brand-subdued/80 px-4 py-2.5 flex justify-between items-center shrink-0 fixed bottom-0 left-0 right-0 md:hidden select-none">
        {/* Home */}
        <button
          onClick={() => { setSelectedRecipeId(null); setCurrentTab('home'); }}
          className={`flex flex-col items-center gap-1 cursor-pointer relative py-1 px-2.5 ${
            currentTab === 'home' && !selectedRecipeId ? 'text-[#D4A373]' : 'text-brand-grey hover:text-brand-dark'
          }`}
        >
          {getNavIcon('home', currentTab === 'home' && !selectedRecipeId)}
          <span className="text-[9px] font-bold tracking-tight">Inicio</span>
        </button>

        {/* Explore */}
        <button
          onClick={() => { setSelectedRecipeId(null); setCurrentTab('search'); }}
          className={`flex flex-col items-center gap-1 cursor-pointer relative py-1 px-2.5 ${
            currentTab === 'search' && !selectedRecipeId ? 'text-[#D4A373]' : 'text-brand-grey hover:text-brand-dark'
          }`}
        >
          {getNavIcon('search', currentTab === 'search' && !selectedRecipeId)}
          <span className="text-[9px] font-bold tracking-tight">Explorar</span>
        </button>

        {/* Reto 21 Días */}
        <button
          onClick={() => { setSelectedRecipeId(null); setCurrentTab('challenge'); }}
          className={`flex flex-col items-center gap-1 cursor-pointer relative py-1 px-2.5 ${
            currentTab === 'challenge' && !selectedRecipeId ? 'text-[#D4A373]' : 'text-brand-grey hover:text-brand-dark'
          }`}
        >
          {getNavIcon('challenge', currentTab === 'challenge' && !selectedRecipeId)}
          <span className="text-[9px] font-bold tracking-tight">Reto</span>
        </button>

        {/* Mi Bienestar / Tracker */}
        <button
          onClick={() => { setSelectedRecipeId(null); setCurrentTab('tracker'); }}
          className={`flex flex-col items-center gap-1 cursor-pointer relative py-1 px-2.5 ${
            currentTab === 'tracker' && !selectedRecipeId ? 'text-[#D4A373]' : 'text-brand-grey hover:text-brand-dark'
          }`}
        >
          {getNavIcon('tracker', currentTab === 'tracker' && !selectedRecipeId)}
          <span className="text-[9px] font-bold tracking-tight">Bienestar</span>
        </button>

        {/* Shopping list */}
        <button
          onClick={() => { setSelectedRecipeId(null); setCurrentTab('shopping'); }}
          className={`flex flex-col items-center gap-1 cursor-pointer relative py-1 px-2.5 ${
            currentTab === 'shopping' && !selectedRecipeId ? 'text-[#D4A373]' : 'text-brand-grey hover:text-brand-dark'
          }`}
        >
          <div className="relative">
            {getNavIcon('shopping', currentTab === 'shopping' && !selectedRecipeId)}
            {activeShoppingItemsCount > 0 && (
              <div className="absolute -top-1.5 -right-2 bg-red-500 text-white font-mono text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {activeShoppingItemsCount}
              </div>
            )}
          </div>
          <span className="text-[9px] font-bold tracking-tight">Lista</span>
        </button>

        {/* Community */}
        <button
          onClick={() => { setSelectedRecipeId(null); setCurrentTab('community'); }}
          className={`flex flex-col items-center gap-1 cursor-pointer relative py-1 px-2.5 ${
            currentTab === 'community' && !selectedRecipeId ? 'text-[#D4A373]' : 'text-brand-grey hover:text-brand-dark'
          }`}
        >
          {getNavIcon('community', currentTab === 'community' && !selectedRecipeId)}
          <span className="text-[9px] font-bold tracking-tight">Comunidad</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => { setSelectedRecipeId(null); setCurrentTab('profile'); }}
          className={`flex flex-col items-center gap-1 cursor-pointer relative py-1 px-2.5 ${
            currentTab === 'profile' && !selectedRecipeId ? 'text-[#D4A373]' : 'text-brand-grey hover:text-brand-dark'
          }`}
        >
          {getNavIcon('profile', currentTab === 'profile' && !selectedRecipeId)}
          <span className="text-[9px] font-bold tracking-tight">Perfil</span>
        </button>

        {/* Admin (Only visible if admin role active on mobile) */}
        {userRole === 'admin' && (
          <button
            onClick={() => { setSelectedRecipeId(null); setCurrentTab('admin'); }}
            className={`flex flex-col items-center gap-1 cursor-pointer relative py-1 px-2.5 ${
              currentTab === 'admin' && !selectedRecipeId ? 'text-[#D4A373]' : 'text-brand-grey hover:text-brand-dark'
            }`}
          >
            <div className="relative">
              {getNavIcon('admin', currentTab === 'admin' && !selectedRecipeId)}
              {activeSubmissionsCount > 0 && (
                <div className="absolute -top-1.5 -right-2 bg-[#D4A373] text-white font-mono text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {activeSubmissionsCount}
                </div>
              )}
            </div>
            <span className="text-[9px] font-bold tracking-tight">Panel</span>
          </button>
        )}
      </footer>

      {/* Frame footer brand notes */}
      <div className="hidden lg:flex fixed bottom-3 right-6 text-[10px] text-brand-grey/50 tracking-wide items-center gap-1 select-none pointer-events-none">
        <span>Glow Nutrición Antiinflamatoria • Para la mujer</span>
      </div>
    </div>
  );
}
