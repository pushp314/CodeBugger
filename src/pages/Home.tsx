import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SnippetCard from '../components/SnippetCard';
import PlaygroundModal from '../components/PlaygroundModal';

const Home = () => {
  const { snippets, toggleLike, toggleBookmark } = useApp();
  const [playgroundSnippet, setPlaygroundSnippet] = useState<any>(null);

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
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white">CodeGram</h1>
        </div>
      </div>

      {/* Feed */}
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {snippets.map(snippet => (
          <SnippetCard
            key={snippet.id}
            snippet={snippet}
            onLike={toggleLike}
            onBookmark={toggleBookmark}
            onOpenPlayground={handleOpenPlayground}
          />
        ))}
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

export default Home;