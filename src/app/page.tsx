'use client';

import { useState } from 'react';

const MODELS = [
  'claude-3-haiku-20240307',
  'claude-3-sonnet-20240229',
  'claude-3-opus-20240229',
  'claude-3-5-sonnet-20240229'
] as const;

type Model = typeof MODELS[number];

export default function Home() {
  const [text, setText] = useState('');
  const [model, setModel] = useState<Model>('claude-3-haiku-20240307');
  const [tokenCount, setTokenCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const countTokens = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/count-tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, model }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      
      setTokenCount(data.tokenCount);
    } catch (error) {
      console.error('Failed to count tokens:', error);
      alert('Failed to count tokens');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">
        Claude Token Counter
      </h1>
      
      <div className="w-full max-w-2xl">
        <select
          value={model}
          onChange={(e) => setModel(e.target.value as Model)}
          className="w-full p-2 mb-6 border rounded-lg font-mono"
        >
          {MODELS.map((modelOption) => (
            <option key={modelOption} value={modelOption}>
              {modelOption}
            </option>
          ))}
        </select>

        <textarea
          className="w-full h-64 p-4 border rounded-lg mb-4 resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
        />
        
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={countTokens}
            disabled={isLoading || !text}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Counting...' : 'Count Tokens'}
          </button>
          
          {tokenCount !== null && (
            <p className="text-lg">
              Token count: <span className="font-bold">{tokenCount}</span>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
