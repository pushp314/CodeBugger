import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, Code, Copy, Check, Play, Eye, EyeOff } from 'lucide-react';
import CodeEditor from './CodeEditor';
import PreviewPanel from './PreviewPanel';

interface SnippetCardProps {
  snippet: any;
  onLike?: (id: string) => void;
  onBookmark?: (id: string) => void;
  onOpenPlayground?: (snippet: any) => void;
}

const SnippetCard = ({ snippet, onLike, onBookmark, onOpenPlayground }: SnippetCardProps) => {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleToggleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewMode(viewMode === 'preview' ? 'code' : 'preview');
  };

  const handlePlayground = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenPlayground?.(snippet);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={snippet.author.avatar} 
            alt={snippet.author.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">{snippet.author.username}</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{snippet.timestamp}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleToggleView}
            className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            title={viewMode === 'preview' ? 'Show Code' : 'Show Preview'}
          >
            {viewMode === 'preview' ? <Code className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          
          <button
            onClick={handleCopy}
            className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
          
          <button
            onClick={handlePlayground}
            className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            title="Open in Playground"
          >
            <Play className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="aspect-square relative">
        {viewMode === 'preview' ? (
          <PreviewPanel
            code={snippet.code}
            language={snippet.language}
          />
        ) : (
          <CodeEditor
            code={snippet.code}
            language={snippet.language}
            readOnly
            height="100%"
          />
        )}
      </div>

      {/* Caption */}
      {snippet.caption && (
        <div className="p-4 pt-3">
          <p className="text-sm text-neutral-800 dark:text-neutral-200">{snippet.caption}</p>
        </div>
      )}

      {/* Actions */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onLike?.(snippet.id)}
              className={`flex items-center space-x-1 transition-colors ${
                snippet.liked ? 'text-red-500' : 'text-neutral-600 dark:text-neutral-400 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${snippet.liked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{snippet.likes}</span>
            </button>
            
            <button className="flex items-center space-x-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{snippet.comments}</span>
            </button>
            
            <button className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
              <Share className="w-5 h-5" />
            </button>
          </div>
          
          <button
            onClick={() => onBookmark?.(snippet.id)}
            className={`transition-colors ${
              snippet.bookmarked ? 'text-neutral-900 dark:text-white' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${snippet.bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;