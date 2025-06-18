import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Compass, 
  MessageCircle, 
  Heart, 
  PlusSquare, 
  User, 
  Code2,
  BookOpen,
  Settings,
  Sparkles
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
    console.log('New post created:', post);
  };

  if (mobile) {
    return (
      <>
        <div className="flex justify-around py-3 bg-white border-t border-slate-100">
          {items.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex flex-col items-center space-y-1 py-2 px-3 transition-colors ${
                  isActive 
                    ? 'text-blue-600' 
                    : 'text-slate-500'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
                <span className="text-xs font-medium">{label}</span>
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
      <div className="p-6 h-full flex flex-col bg-white border-r border-slate-100">
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CodeGram
            </h1>
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
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
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
            className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Sparkles className="w-6 h-6" />
            <span className="font-medium">Create</span>
          </button>
        </nav>

        {/* Settings */}
        <div className="mt-auto">
          <button
            onClick={() => navigate('/settings')}
            className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
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