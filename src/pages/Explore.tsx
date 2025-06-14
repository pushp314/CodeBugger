import React, { useState, useEffect } from 'react';
import { Grid, List, Search, Filter } from 'lucide-react';
import SnippetCard from '../components/SnippetCard';
import PlaygroundModal from '../components/PlaygroundModal';

const Explore = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'snippet' | 'documentation'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [playgroundSnippet, setPlaygroundSnippet] = useState<any>(null);

  // Mock data
  const mockPosts = [
    {
      id: '1',
      type: 'snippet',
      title: 'Beautiful React Button Component',
      code: `const Button = ({ children, variant = 'primary' }) => {
  return (
    <button className={\`btn btn-\${variant} px-4 py-2 rounded-lg font-medium transition-colors\`}>
      {children}
    </button>
  );
};`,
      language: 'javascript',
      caption: 'A highly customizable React button component with multiple variants.',
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
    },
    {
      id: '2',
      type: 'snippet',
      title: 'CSS Grid Layout',
      code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.grid-item {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}`,
      language: 'css',
      caption: 'Responsive CSS Grid layout perfect for card layouts.',
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
    },
    {
      id: '3',
      type: 'snippet',
      title: 'Custom React Hook',
      code: `function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}`,
      language: 'javascript',
      caption: 'Custom React hook for localStorage management.',
      author: {
        id: '4',
        username: 'react_dev',
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
    },
  ];

  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.code.toLowerCase().includes(searchQuery.toLowerCase());
    
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

  const handleOpenPlayground = (snippet: any) => {
    setPlaygroundSnippet(snippet);
  };

  const handleClosePlayground = () => {
    setPlaygroundSnippet(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Explore</h1>
            
            <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search snippets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white"
              />
            </div>
            
            <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedType === 'all'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType('snippet')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedType === 'snippet'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                Snippets
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <SnippetCard
                key={post.id}
                snippet={post}
                onLike={handleLike}
                onBookmark={handleBookmark}
                onOpenPlayground={handleOpenPlayground}
              />
            ))}
          </div>
        ) : (
          <div className="max-w-lg mx-auto space-y-6">
            {filteredPosts.map(post => (
              <SnippetCard
                key={post.id}
                snippet={post}
                onLike={handleLike}
                onBookmark={handleBookmark}
                onOpenPlayground={handleOpenPlayground}
              />
            ))}
          </div>
        )}
      </div>

      {/* Playground Modal */}
      <PlaygroundModal
        isOpen={!!playgroundSnippet}
        onClose={handleClosePlayground}
        snippet={playgroundSnippet}
      />
    </div>
  );
};

export default Explore;