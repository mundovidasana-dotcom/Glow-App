/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RecipeCategory = 'Desayunos' | 'Almuerzos' | 'Cenas' | 'Snacks y Postres';

export interface NutritionalInfo {
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  healthyFats: number; // in grams
}

export interface Recipe {
  id: string;
  title: string;
  category: RecipeCategory;
  image: string;
  rating: number;
  reviews: number;
  time: string;
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  whyAntiInflammatory: string;
  keyNutrient: string;
  ingredients: string[];
  preparation: string[];
  nutritionalInfo: NutritionalInfo;
  featured?: boolean;
}

export interface UserProfile {
  name: string;
  avatar: string;
  subscriptionActive: boolean;
  renewalDate: string;
  lastName?: string;
  email?: string;
  phone?: string;
  points?: number;
  tier?: string;
  country?: string;
}

export interface ShoppingItem {
  id: string;
  ingredientName: string;
  recipeTitle: string;
  completed: boolean;
  category?: string; // e.g. 🥦 Vegetales, 🥩 Proteínas, etc.
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  timeAgo: string;
}

export interface SocialPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  isApprovedRecipe: boolean;
  image: string;
  title: string;
  description: string;
  likesCount: number;
  likedByCurrentUser?: boolean;
  savedByCurrentUser?: boolean;
  comments: Comment[];
  recipeId?: string;
  createdAt: string;
}

export interface UserSubmission {
  id: string;
  title: string;
  category: RecipeCategory;
  image: string;
  time: string;
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  keyNutrient: string;
  whyAntiInflammatory: string;
  ingredients: string[];
  preparation: string[];
  nutritionalInfo: NutritionalInfo;
  authorName: string;
  authorAvatar: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}
