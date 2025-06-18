import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PostCard from '../components/PostCard';
import { Sparkles, TrendingUp, Clock } from 'lucide-react';

const Home = () => {
  const { snippets, toggleLike, toggleBookmark } = useApp();
  const [filter, setFilter] = useState<'all' | 'trending' | 'recent'>('all');

  const filters = [
    { id: 'all', label: 'For You', icon: Sparkles },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'recent', label: 'Recent', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CodeGram
            </h1>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex bg-slate-100 rounded-xl p-1">
            {filters.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setFilter(id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all flex-1 justify-center ${
                  filter === id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {snippets.map(snippet => (
          <PostCard
            key={snippet.id}
            post={snippet}
            onLike={toggleLike}
            onBookmark={toggleBookmark}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;