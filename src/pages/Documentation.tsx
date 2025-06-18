import React, { useState } from 'react';
import { Search, BookOpen, Clock, User, ArrowRight, Tag } from 'lucide-react';

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', count: 24 },
    { id: 'react', label: 'React', count: 8 },
    { id: 'javascript', label: 'JavaScript', count: 6 },
    { id: 'typescript', label: 'TypeScript', count: 4 },
    { id: 'css', label: 'CSS', count: 3 },
    { id: 'node', label: 'Node.js', count: 3 },
  ];

  const documentation = [
    {
      id: '1',
      title: 'React Hooks Complete Guide',
      description: 'Master React Hooks with practical examples and best practices. Learn useState, useEffect, useContext, and custom hooks.',
      category: 'react',
      author: {
        username: 'react_expert',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        verified: true,
      },
      timestamp: '2 days ago',
      readTime: '12 min read',
      likes: 234,
      bookmarks: 89,
      tags: ['react', 'hooks', 'useState', 'useEffect'],
      featured: true,
    },
    {
      id: '2',
      title: 'Modern CSS Grid Layouts',
      description: 'Create responsive layouts with CSS Grid. From basic concepts to advanced techniques and real-world examples.',
      category: 'css',
      author: {
        username: 'css_master',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        verified: true,
      },
      timestamp: '1 week ago',
      readTime: '15 min read',
      likes: 189,
      bookmarks: 67,
      tags: ['css', 'grid', 'responsive', 'layout'],
      featured: false,
    },
    {
      id: '3',
      title: 'TypeScript Advanced Types',
      description: 'Deep dive into TypeScript\'s advanced type system. Learn utility types, conditional types, and mapped types.',
      category: 'typescript',
      author: {
        username: 'ts_guru',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        verified: false,
      },
      timestamp: '3 days ago',
      readTime: '18 min read',
      likes: 156,
      bookmarks: 78,
      tags: ['typescript', 'types', 'advanced', 'utility'],
      featured: false,
    },
    {
      id: '4',
      title: 'JavaScript Performance Optimization',
      description: 'Optimize your JavaScript applications for better performance. Learn about memory management, async patterns, and more.',
      category: 'javascript',
      author: {
        username: 'js_optimizer',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        verified: true,
      },
      timestamp: '5 days ago',
      readTime: '20 min read',
      likes: 298,
      bookmarks: 134,
      tags: ['javascript', 'performance', 'optimization', 'async'],
      featured: true,
    },
  ];

  const filteredDocs = documentation.filter(doc => {
    const matchesSearch = !searchQuery || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredDocs = filteredDocs.filter(doc => doc.featured);
  const regularDocs = filteredDocs.filter(doc => !doc.featured);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Documentation
              </h1>
            </div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive guides and tutorials to help you master modern web development
            </p>
          </div>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 placeholder-slate-400 shadow-sm"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-violet-600 text-white shadow-lg'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <span>{category.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-violet-500 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Featured Docs */}
        {featuredDocs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
              <span>✨ Featured</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredDocs.map(doc => (
                <div key={doc.id} className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full bg-violet-100 text-violet-700`}>
                      {doc.category}
                    </span>
                    <ArrowRight className="w-5 h-5 text-violet-400 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-violet-700 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {doc.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <img 
                          src={doc.author.avatar} 
                          alt={doc.author.username}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span>{doc.author.username}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{doc.readTime}</span>
                      </div>
                    </div>
                    <span>{doc.timestamp}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {doc.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/60 text-violet-600 text-xs rounded-lg"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Docs */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">All Documentation</h2>
          <div className="space-y-4">
            {regularDocs.map(doc => (
              <div key={doc.id} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-all cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600`}>
                        {doc.category}
                      </span>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{doc.readTime}</span>
                        </div>
                        <span>{doc.timestamp}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {doc.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img 
                          src={doc.author.avatar} 
                          alt={doc.author.username}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-slate-700">{doc.author.username}</span>
                        {doc.author.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {doc.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-slate-50 text-slate-600 text-xs rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all ml-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredDocs.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No documentation found</h3>
            <p className="text-slate-500">Try adjusting your search terms or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documentation;