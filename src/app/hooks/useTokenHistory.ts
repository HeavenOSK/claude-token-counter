import { useState, useEffect } from 'react';
import { TokenCountHistory } from '../types/history';

const STORAGE_KEY = 'token-count-history';
const MAX_HISTORY_ITEMS = 100;

export const useTokenHistory = () => {
  const [history, setHistory] = useState<TokenCountHistory[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse history:', error);
      }
    }
  }, []);

  const addHistoryItem = (item: Omit<TokenCountHistory, 'id' | 'timestamp'>) => {
    const newItem: TokenCountHistory = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };

    setHistory((prev) => {
      const newHistory = [newItem, ...prev].slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  return {
    history,
    addHistoryItem,
  };
};
