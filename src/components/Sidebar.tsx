import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Compass, 
  Film, 
  MessageCircle, 
  Heart, 
  PlusSquare, 
  User, 
  Menu,
  Code2,
  BookOpen,
  Settings
} from 'lucide-react';
import CreatePost from './CreatePost';

interface SidebarProps {
  mobile?: boolean;
}

const Sidebar = ({ mobile = false }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCreatePost, setShowCreatePost] = useState(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/explore', icon: Compass, label: 'Explore' },
    { path: '/snippets', icon: Code2, label: 'Snippets' },
    { path: '/documentation', icon: BookOpen, label: 'Docs' },
    { path: '/messages', icon: MessageCircle, label: 'Messages' },
    { path: '/notifications', icon: Heart, label: 'Notifications' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const mobileNavItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/explore', icon: Compass, label: 'Explore' },
    { path: '/snippets', icon: Code2, label: 'Snippets' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const items = mobile ? mobileNavItems : navItems;

  const handleCreateClick = () => {
    setShowCreatePost(true);
  };

  const handleCreatePost = (post: any) => {
    // Handle post creation
    console.log('New post created:', post);
  };

  if (mobile) {
    return (
      <>
        <div className="flex justify-around py-2">
          {items.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex flex-col items-center space-y-1 py-2 px-3 transition-colors ${
                  isActive 
                    ? 'text-neutral-900 dark:text-white' 
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
                <span className="text-xs">{label}</span>
              </button>
            );
          })}
        </div>
        
        <CreatePost
          isOpen={showCreatePost}
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleCreatePost}
        />
      </>
    );
  }

  return (
    <>
      <div className="p-6 h-full flex flex-col">
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Code2 className="w-8 h-8 text-neutral-900 dark:text-white" />
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">CodeGram</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`w-full flex items-center space-x-4 px-3 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white' 
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
                <span className="font-medium">{label}</span>
              </button>
            );
          })}
          
          {/* Create Post */}
          <button
            onClick={handleCreateClick}
            className="w-full flex items-center space-x-4 px-3 py-3 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <PlusSquare className="w-6 h-6" />
            <span className="font-medium">Create</span>
          </button>
        </nav>

        {/* Settings */}
        <div className="mt-auto">
          <button
            onClick={() => navigate('/settings')}
            className="w-full flex items-center space-x-4 px-3 py-3 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <Settings className="w-6 h-6" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </div>
      
      <CreatePost
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onSubmit={handleCreatePost}
      />
    </>
  );
};

export default Sidebar;