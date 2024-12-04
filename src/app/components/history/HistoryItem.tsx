import { useState } from 'react';
import { TokenCountHistoryItem } from '../../types/history';

type Props = {
  item: TokenCountHistoryItem;
};

export const HistoryItem = ({ item }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateText = (text: string) => {
    const lines = text.split('\n');
    if (lines.length <= 4 && text.length <= 200) return text;
    
    return lines.slice(0, 4).join('\n') + '...';
  };

  return (
    <div className="border-b border-gray-200 p-3 text-sm">
      <div className="text-gray-500 text-xs">
        {formatDate(item.timestamp)}
      </div>
      
      <div className="font-mono text-xs mt-1 text-blue-600">
        {item.model}
      </div>
      
      <div className="mt-2 font-mono text-xs">
        <pre className="whitespace-pre-wrap">
          {isExpanded ? item.text : truncateText(item.text)}
        </pre>
        {(item.text.split('\n').length > 4 || item.text.length > 200) && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-700 mt-1"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
      
      <div className="mt-2 text-xs">
        Tokens: <span className="font-bold">{item.tokenCount}</span>
      </div>
    </div>
  );
};
