import React, { useState } from 'react';
import { X, Code, FileText, Eye, Send, Sparkles } from 'lucide-react';
import CodeEditor from './CodeEditor';
import MarkdownPreview from './MarkdownPreview';
import PreviewPanel from './PreviewPanel';

interface CreatePostProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: any) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ isOpen, onClose, onSubmit }) => {
  const [mode, setMode] = useState<'snippet' | 'documentation'>('snippet');
  const [componentType, setComponentType] = useState<'html-tailwind' | 'react-tailwind'>('react-tailwind');
  const [code, setCode] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showPreview, setShowPreview] = useState(true);

  const componentTypes = [
    { id: 'html-tailwind', label: 'HTML + Tailwind', language: 'html' },
    { id: 'react-tailwind', label: 'React + Tailwind', language: 'typescript' },
  ];

  const handleSubmit = () => {
    const post = {
      id: Date.now().toString(),
      type: mode,
      title: title || (mode === 'snippet' ? 'Code Snippet' : 'Documentation'),
      content: mode === 'snippet' ? code : markdown,
      caption: description,
      componentType: mode === 'snippet' ? componentType : undefined,
      tags: [],
      author: {
        id: '1',
        username: 'john_dev',
        name: 'John Developer',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        verified: true,
      },
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      shares: 0,
      bookmarks: 0,
      liked: false,
      bookmarked: false,
    };

    onSubmit(post);
    onClose();
    
    // Reset form
    setCode('');
    setMarkdown('');
    setTitle('');
    setDescription('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Create Post</h2>
              <p className="text-sm text-slate-500">Share your code with the community</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="flex bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setMode('snippet')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                mode === 'snippet'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Code Snippet</span>
            </button>
            <button
              onClick={() => setMode('documentation')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                mode === 'documentation'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Documentation</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Form */}
          <div className="w-1/3 border-r border-slate-100 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={mode === 'snippet' ? 'Beautiful React Button' : 'Getting Started Guide'}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 text-slate-900 placeholder-slate-400"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={mode === 'snippet' ? 'A customizable button component...' : 'This guide covers...'}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 text-slate-900 placeholder-slate-400 resize-none"
                />
              </div>

              {/* Component Type (Snippet Mode) */}
              {mode === 'snippet' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Component Type
                  </label>
                  <div className="space-y-2">
                    {componentTypes.map(type => (
                      <label key={type.id} className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl hover:bg-slate-50 transition-colors">
                        <input
                          type="radio"
                          name="componentType"
                          value={type.id}
                          checked={componentType === type.id}
                          onChange={(e) => setComponentType(e.target.value as any)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                        />
                        <span className="text-slate-700 font-medium">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Preview Toggle */}
              {mode === 'snippet' && (
                <div>
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={showPreview}
                      onChange={(e) => setShowPreview(e.target.checked)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    />
                    <Eye className="w-4 h-4 text-slate-600" />
                    <span className="text-slate-700 font-medium">Show Preview</span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!title || (mode === 'snippet' ? !code : !markdown)}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg hover:shadow-xl"
              >
                <Send className="w-4 h-4" />
                <span>Publish Post</span>
              </button>
            </div>
          </div>

          {/* Right Panel - Editor/Preview */}
          <div className="flex-1 flex flex-col">
            {mode === 'snippet' ? (
              showPreview ? (
                <div className="flex-1 flex">
                  <div className="w-1/2 p-4">
                    <div className="h-full">
                      <CodeEditor
                        code={code}
                        language={componentTypes.find(t => t.id === componentType)?.language || 'typescript'}
                        onChange={(value) => setCode(value || '')}
                        height="100%"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 p-4 border-l border-slate-100">
                    <PreviewPanel
                      code={code}
                      language={componentTypes.find(t => t.id === componentType)?.language || 'typescript'}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-1 p-4">
                  <CodeEditor
                    code={code}
                    language={componentTypes.find(t => t.id === componentType)?.language || 'typescript'}
                    onChange={(value) => setCode(value || '')}
                    height="100%"
                  />
                </div>
              )
            ) : (
              <div className="flex-1 flex">
                <div className="w-1/2 p-4">
                  <div className="h-full">
                    <CodeEditor
                      code={markdown}
                      language="markdown"
                      onChange={(value) => setMarkdown(value || '')}
                      height="100%"
                    />
                  </div>
                </div>
                <div className="w-1/2 p-4 border-l border-slate-100">
                  <MarkdownPreview content={markdown} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;