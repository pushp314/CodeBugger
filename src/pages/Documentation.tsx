import React, { useState } from 'react';
import { Search, BookOpen, ChevronRight, Clock, User } from 'lucide-react';

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'react', label: 'React' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'css', label: 'CSS' },
    { id: 'node', label: 'Node.js' },
  ];

  const documentation = [
    {
      id: '1',
      title: 'React Hooks Best Practices',
      description: 'Learn advanced techniques for using React hooks effectively in your applications.',
      category: 'react',
      author: {
        username: 'react_expert',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      },
      timestamp: '2 days ago',
      readTime: '8 min read',
      tags: ['react', 'hooks', 'best-practices'],
    },
    {
      id: '2',
      title: 'Modern CSS Grid Layouts',
      description: 'Complete guide to creating responsive layouts with CSS Grid.',
      category: 'css',
      author: {
        username: 'css_master',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      },
      timestamp: '1 week ago',
      readTime: '12 min read',
      tags: ['css', 'grid', 'responsive'],
    },
    {
      id: '3',
      title: 'TypeScript Advanced Types',
      description: 'Deep dive into TypeScript\'s advanced type system and utility types.',
      category: 'typescript',
      author: {
        username: 'ts_guru',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      },
      timestamp: '3 days ago',
      readTime: '15 min read',
      tags: ['typescript', 'types', 'advanced'],
    },
  ];

  const filteredDocs = documentation.filter(doc => {
    const matchesSearch = !searchQuery || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 z-40">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Documentation</h1>
          </div>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white"
            />
          </div>

          {/* Categories */}
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {filteredDocs.map(doc => (
            <div key={doc.id} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                    {doc.title}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                    {doc.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-500">
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
                      <span>{doc.timestamp}</span>
                    </div>
                    <span>{doc.readTime}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {doc.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors ml-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDocs.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">No documentation found</h3>
            <p className="text-neutral-500 dark:text-neutral-400">Try adjusting your search terms or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documentation;