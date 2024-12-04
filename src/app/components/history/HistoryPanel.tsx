import { TokenCountHistory } from '../../types/history';
import { HistoryItem } from './HistoryItem';

type Props = {
  history: TokenCountHistory[];
};

export const HistoryPanel = ({ history }: Props) => {
  return (
    <div className="fixed right-0 top-0 bottom-0 w-[240px] bg-white border-l border-gray-200 overflow-y-auto z-10">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-3">
        <h2 className="font-bold text-sm">History</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {history.map((item) => (
          <HistoryItem key={item.id} item={item} />
        ))}
      </div>
      
      {history.length === 0 && (
        <div className="p-4 text-center text-gray-500 text-sm">
          No history yet
        </div>
      )}
    </div>
  );
};
