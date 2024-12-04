'use client';

import { useState } from 'react';
import { useTokenHistory } from './hooks/useTokenHistory';
import { HistoryPanel } from './components/history/HistoryPanel';
import Image from 'next/image';

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
  const { history, addHistoryItem } = useTokenHistory();

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
      
      // Add to history
      addHistoryItem({
        model,
        text,
        tokenCount: data.tokenCount,
      });
    } catch (error) {
      console.error('Failed to count tokens:', error);
      alert('Failed to count tokens');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl pr-[240px]">
        <h1 className="text-3xl font-bold mb-2">
          Claude Token Counter
        </h1>
        
        <div className="flex gap-4 mb-6 text-sm text-gray-600">
          <a
            href="https://docs.anthropic.com/en/docs/build-with-claude/token-counting"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-gray-900"
          >
            <Image src="/globe.svg" alt="Docs" width={14} height={14} />
            Token counting API docs
          </a>
          <a
            href="https://github.com/HeavenOSK/claude-token-counter/blob/9d3abdf51babe42736d8635085bb0a3f02110ec2/src/app/api/count-tokens/route.ts"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-gray-900"
          >
            <Image src="/globe.svg" alt="GitHub" width={14} height={14} />
            View source on GitHub
          </a>
        </div>
  
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

      <HistoryPanel history={history} />
    </main>
  );
}
