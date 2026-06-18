/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SocialPost, Comment } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageSquare, Bookmark, Plus, Sparkles, Send, Check } from 'lucide-react';

interface GlowCommunityProps {
  posts: SocialPost[];
  onToggleLike: (postId: string) => void;
  onToggleSavePost: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
  onNavigateToShare: () => void;
}

export const GlowCommunity: React.FC<GlowCommunityProps> = ({
  posts,
  onToggleLike,
  onToggleSavePost,
  onAddComment,
  onNavigateToShare,
}) => {
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [newCommentTexts, setNewCommentTexts] = useState<{ [postId: string]: string }>({});

  const handleSendComment = (postId: string) => {
    const text = newCommentTexts[postId]?.trim();
    if (!text) return;
    onAddComment(postId, text);
    setNewCommentTexts(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-24 w-full relative"
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#D4A373] font-bold block">Conexión Wellness</span>
          <h1 className="font-serif text-3xl font-bold text-brand-dark mt-0.5">Comunidad Glow</h1>
          <p className="text-secondary-dark/70 text-xs mt-1">
            Espacio de acompañamiento donde mujeres de todo el mundo comparten sus recetas curativas y experiencias antiinflamatorias.
          </p>
        </div>
      </div>

      {/* Floating Action Button (FAB) or Prominent banner to share */}
      <div className="bg-[#FAEDCD]/50 border border-[#D4A373]/30 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif text-sm font-bold text-brand-dark flex items-center gap-1.5 justify-center sm:justify-start">
            <Sparkles className="w-4.5 h-4.5 text-brand-primary" /> ¿Tienes una receta secreta?
          </h3>
          <p className="text-xs text-brand-grey max-w-sm">
            Compártela con la comunidad Glow. Nuestro equipo nutricional la revisará para certificar su estatus antiinflamatorio.
          </p>
        </div>
        <button
          onClick={onNavigateToShare}
          className="bg-brand-primary hover:bg-[#c99564] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 group shadow-3xs cursor-pointer inline-flex self-stretch sm:self-auto justify-center"
        >
          <Plus className="w-4 h-4 shrink-0 group-hover:rotate-90 transition-transform duration-200" />
          Compartir mi receta
        </button>
      </div>

      {/* Vertical Feed List */}
      <div className="space-y-6">
        {posts.map((post) => {
          const isCommenting = activeCommentPostId === post.id;
          return (
            <motion.div
              key={post.id}
              layout
              className="bg-white border border-brand-subdued/80 rounded-2xl overflow-hidden shadow-3xs space-y-3"
            >
              {/* Header: User Profile Block */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-brand-subdued/50">
                    <img 
                      src={post.authorAvatar} 
                      alt={post.authorName} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-dark">{post.authorName}</h4>
                    <span className="text-[10px] text-brand-grey block mt-0.5">{post.createdAt}</span>
                  </div>
                </div>

                {/* Receta Aprobada Badge */}
                {post.isApprovedRecipe && (
                  <span className="flex items-center gap-1 bg-[#8F9E62]/10 border border-[#8F9E62]/20 text-[#8F9E62] px-2 py-1 rounded-full text-[10px] font-extrabold tracking-wide select-none">
                    <Check className="w-3 h-3 stroke-[3]" />
                    Receta Aprobada
                  </span>
                )}
              </div>

              {/* High-quality post image */}
              {post.image && (
                <div className="aspect-video w-full overflow-hidden relative group">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              )}

              {/* Main Content Info */}
              <div className="px-4 space-y-1">
                <h3 className="font-serif text-lg font-bold text-brand-dark leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-brand-grey leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* Interaction Bar */}
              <div className="px-4 py-2 border-t border-brand-subdued/30 flex items-center justify-between bg-brand-bg/25">
                <div className="flex items-center gap-4">
                  {/* Like Button */}
                  <button
                    onClick={() => onToggleLike(post.id)}
                    className="flex items-center gap-1.5 py-1.5 text-brand-grey hover:text-red-500 transition-colors cursor-pointer group"
                  >
                    <Heart 
                      className={`w-4.5 h-4.5 transition-transform group-hover:scale-110 duration-100 ${
                        post.likedByCurrentUser 
                          ? 'text-red-500 fill-red-500' 
                          : 'text-brand-grey'
                      }`} 
                    />
                    <span className={`text-[11px] font-bold ${post.likedByCurrentUser ? 'text-red-500' : 'text-brand-grey'}`}>
                      {post.likesCount}
                    </span>
                  </button>

                  {/* Comment Toggle Button */}
                  <button
                    onClick={() => setActiveCommentPostId(isCommenting ? null : post.id)}
                    className="flex items-center gap-1.5 py-1.5 text-brand-grey hover:text-brand-primary transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4.5 h-4.5" />
                    <span className="text-[11px] font-bold">
                      {post.comments.length}
                    </span>
                  </button>
                </div>

                {/* Save Button */}
                <button
                  onClick={() => onToggleSavePost(post.id)}
                  className="flex items-center gap-1.5 py-1.5 text-brand-grey hover:text-brand-primary transition-colors cursor-pointer group"
                >
                  <Bookmark 
                    className={`w-4.5 h-4.5 group-hover:scale-110 transition-transform ${
                      post.savedByCurrentUser 
                        ? 'text-[#D4A373] fill-[#D4A373]' 
                        : 'text-brand-grey'
                    }`} 
                  />
                  <span className="sr-only">Guardar</span>
                </button>
              </div>

              {/* Comments Accordion */}
              <AnimatePresence>
                {(isCommenting || post.comments.length > 0) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-[#FDFBF9] border-t border-brand-subdued/20"
                  >
                    {/* List of comments */}
                    <div className="p-4 space-y-3 max-h-[180px] overflow-y-auto no-scrollbar">
                      {post.comments.map((comm) => (
                        <div key={comm.id} className="flex gap-2.5 items-start">
                          <img 
                            src={comm.authorAvatar} 
                            alt={comm.authorName} 
                            className="w-6.5 h-6.5 rounded-full object-cover shrink-0 mt-0.5 border border-brand-subdued/40"
                            referrerPolicy="no-referrer"
                          />
                          <div className="bg-brand-bg/50 border border-brand-subdued/20 p-2.5 rounded-xl flex-1 space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-brand-dark">{comm.authorName}</span>
                              <span className="text-[9px] text-brand-grey font-medium">{comm.timeAgo}</span>
                            </div>
                            <p className="text-[11px] text-brand-grey leading-normal">{comm.text}</p>
                          </div>
                        </div>
                      ))}

                      {post.comments.length === 0 && (
                        <p className="text-[10px] text-brand-grey italic text-center py-2">
                          Sé la primera en escribir un comentario de apoyo.
                        </p>
                      )}
                    </div>

                    {/* Quick input row for Comment */}
                    <div className="p-3 bg-brand-bg/30 border-t border-brand-subdued/30 flex gap-2">
                      <input
                        type="text"
                        value={newCommentTexts[post.id] || ''}
                        onChange={(e) => setNewCommentTexts(prev => ({ ...prev, [post.id]: e.target.value }))}
                        placeholder="Escribe un comentario..."
                        className="flex-1 bg-white border border-brand-subdued text-xs px-3 py-2 rounded-xl focus:outline-hidden focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373] text-brand-dark placeholder-brand-grey/75"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendComment(post.id);
                        }}
                      />
                      <button
                        onClick={() => handleSendComment(post.id)}
                        className="bg-brand-primary text-white p-2 rounded-xl hover:bg-[#c99564] transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
