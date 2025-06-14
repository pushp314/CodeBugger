import React, { useState, useEffect } from 'react';
import { X, Maximize2, Minimize2, Copy, Check } from 'lucide-react';
import CodeEditor from './CodeEditor';
import PreviewPanel from './PreviewPanel';

interface PlaygroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  snippet: any;
}

const PlaygroundModal: React.FC<PlaygroundModalProps> = ({ isOpen, onClose, snippet }) => {
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (snippet) {
      setCode(snippet.code);
    }
  }, [snippet]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  if (!isOpen || !snippet) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className={`bg-white dark:bg-neutral-900 rounded-lg shadow-2xl ${
        isFullscreen ? 'w-full h-full' : 'w-full max-w-7xl h-[90vh]'
      } flex flex-col overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center space-x-3">
            <img 
              src={snippet.author.avatar} 
              alt={snippet.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white">{snippet.author.username}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Playground Mode</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              title="Copy Code"
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            
            <button
              onClick={onClose}
              className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Split View */}
        <div className="flex-1 flex">
          {/* Code Editor */}
          <div className="w-1/2 border-r border-neutral-200 dark:border-neutral-800">
            <CodeEditor
              code={code}
              language={snippet.language}
              onChange={(value) => setCode(value || '')}
              height="100%"
            />
          </div>
          
          {/* Preview */}
          <div className="w-1/2">
            <PreviewPanel
              code={code}
              language={snippet.language}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundModal;