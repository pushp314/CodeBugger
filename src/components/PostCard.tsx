import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, Code, Copy, Check, Eye, Play, User, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import PreviewPanel from './PreviewPanel';
import MarkdownPreview from './MarkdownPreview';

interface PostCardProps {
  post: any;
  onLike?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  compact?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onBookmark, compact = false }) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(post.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleCardClick = () => {
    navigate(`/post/${post.id}`);
  };

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300 mb-6">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
            />
            {post.author.verified && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">{post.author.username}</h3>
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <Calendar className="w-3 h-3" />
              <span>{post.timestamp}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            post.type === 'snippet' 
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
              : 'bg-violet-50 text-violet-600 border border-violet-100'
          }`}>
            {post.type === 'snippet' ? 'Snippet' : 'Documentation'}
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="px-4 pb-3">
        <h2 className="text-lg font-bold text-slate-900 mb-1 line-clamp-2">
          {post.title}
        </h2>
        {post.caption && (
          <p className="text-slate-600 text-sm line-clamp-2">
            {post.caption}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="relative">
        {post.type === 'snippet' ? (
          <>
            {/* Toggle Buttons */}
            <div className="absolute top-3 right-3 z-10 flex bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-slate-200 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => handleActionClick(e, () => setViewMode('preview'))}
                className={`p-2 transition-colors ${
                  viewMode === 'preview'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                title="Preview"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => handleActionClick(e, () => setViewMode('code'))}
                className={`p-2 transition-colors ${
                  viewMode === 'code'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                title="Code"
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopy}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                title="Copy Code"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="h-80 group">
              {viewMode === 'preview' ? (
                <PreviewPanel
                  code={post.content}
                  language={post.componentType === 'react-tailwind' ? 'typescript' : 'html'}
                />
              ) : (
                <CodeEditor
                  code={post.content}
                  language={post.componentType === 'react-tailwind' ? 'typescript' : 'html'}
                  readOnly
                  height="100%"
                />
              )}
            </div>
          </>
        ) : (
          <div className="h-80 p-6 overflow-hidden">
            <MarkdownPreview content={post.content} />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>
        )}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="px-4 py-3 border-t border-slate-50">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 bg-slate-50 text-slate-600 text-xs rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 4 && (
              <span className="px-2 py-1 text-slate-500 text-xs">
                +{post.tags.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 border-t border-slate-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={(e) => handleActionClick(e, () => onLike?.(post.id))}
              className={`flex items-center space-x-2 transition-colors ${
                post.liked 
                  ? 'text-rose-500' 
                  : 'text-slate-500 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            
            <button
              onClick={(e) => handleActionClick(e, () => {})}
              className="flex items-center space-x-2 text-slate-500 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{post.comments}</span>
            </button>
            
            <button
              onClick={(e) => handleActionClick(e, () => {})}
              className="flex items-center space-x-2 text-slate-500 hover:text-emerald-500 transition-colors"
            >
              <Share className="w-5 h-5" />
              <span className="text-sm font-medium">{post.shares}</span>
            </button>
          </div>
          
          <button
            onClick={(e) => handleActionClick(e, () => onBookmark?.(post.id))}
            className={`transition-colors ${
              post.bookmarked 
                ? 'text-amber-500' 
                : 'text-slate-500 hover:text-amber-500'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${post.bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;