import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import PostCard from '../components/PostCard';

const Explore = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'snippet' | 'documentation'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Mock data
  const mockPosts = [
    {
      id: '1',
      type: 'snippet',
      title: 'Beautiful React Button Component',
      content: `const Button = ({ children, variant = 'primary', size = 'md', ...props }) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]}\`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;`,
      componentType: 'react-tailwind',
      caption: 'A highly customizable React button component with multiple variants and sizes.',
      author: {
        id: '2',
        username: 'sarah_codes',
        name: 'Sarah Wilson',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        verified: true,
      },
      timestamp: '2h',
      likes: 156,
      comments: 23,
      shares: 12,
      bookmarks: 45,
      liked: false,
      bookmarked: false,
      tags: ['react', 'button', 'component', 'tailwind'],
    },
    {
      id: '2',
      type: 'snippet',
      title: 'Responsive Card Layout',
      content: `<div class="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
  <div class="md:flex">
    <div class="md:shrink-0">
      <img class="h-48 w-full object-cover md:h-full md:w-48" src="/img/building.jpg" alt="Modern building architecture">
    </div>
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div>
      <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible accommodation for your team</a>
      <p class="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
    </div>
  </div>
</div>`,
      componentType: 'html-tailwind',
      caption: 'A beautiful responsive card component perfect for showcasing content.',
      author: {
        id: '3',
        username: 'css_wizard',
        name: 'Emma Davis',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        verified: true,
      },
      timestamp: '4h',
      likes: 89,
      comments: 12,
      shares: 8,
      bookmarks: 34,
      liked: false,
      bookmarked: true,
      tags: ['html', 'card', 'responsive', 'tailwind'],
    },
    {
      id: '3',
      type: 'documentation',
      title: 'React Hooks Best Practices',
      content: `# React Hooks Best Practices

React Hooks have revolutionized how we write React components. Here are some essential best practices to follow:

## 1. Rules of Hooks

Always follow the two fundamental rules:
- Only call hooks at the top level
- Only call hooks from React functions

## 2. Custom Hooks

Create custom hooks to share stateful logic:

\`\`\`javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}
\`\`\`

## 3. useEffect Dependencies

Always include all dependencies in the dependency array:

\`\`\`javascript
useEffect(() => {
  fetchData(userId);
}, [userId]); // Include userId in dependencies
\`\`\`

## 4. Performance Optimization

Use useMemo and useCallback for expensive operations:

\`\`\`javascript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
\`\`\``,
      author: {
        id: '4',
        username: 'react_guru',
        name: 'Mike Johnson',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        verified: false,
      },
      timestamp: '6h',
      likes: 203,
      comments: 31,
      shares: 18,
      bookmarks: 67,
      liked: true,
      bookmarked: false,
      tags: ['react', 'hooks', 'best-practices', 'performance'],
    },
  ];

  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'all' || post.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            bookmarked: !post.bookmarked,
            bookmarks: post.bookmarked ? post.bookmarks - 1 : post.bookmarks + 1
          }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-slate-900">Explore</h1>
            
            <div className="flex bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400"
              />
            </div>
            
            <div className="flex bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === 'all'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType('snippet')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === 'snippet'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Snippets
              </button>
              <button
                onClick={() => setSelectedType('documentation')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === 'documentation'
                    ? 'bg-white text-violet-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Docs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {viewMode === 'list' ? (
          <div className="max-w-2xl mx-auto space-y-6">
            {filteredPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onBookmark={handleBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onBookmark={handleBookmark}
                compact
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;