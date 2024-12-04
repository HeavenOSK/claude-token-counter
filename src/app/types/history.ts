export type TokenCountHistory = {
  id: string;
  timestamp: string;
  model: string;
  text: string;
  tokenCount: number;
};

export type TokenCountHistoryItem = TokenCountHistory;
