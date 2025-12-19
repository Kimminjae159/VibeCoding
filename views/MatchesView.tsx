
import React from 'react';
import { Match, Sport } from '../types';
import MatchCard from '../components/MatchCard';

interface MatchesViewProps {
  matches: Match[];
  selectedSport: Sport | 'ALL';
  onSportChange: (s: Sport | 'ALL') => void;
}

const MatchesView: React.FC<MatchesViewProps> = ({ matches, selectedSport, onSportChange }) => {
  const filteredMatches = selectedSport === 'ALL' 
    ? matches 
    : matches.filter(m => m.sport === selectedSport);

  const dates = Array.from(new Set(matches.map(m => m.date))).sort();

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">소셜 매치</h2>
          <p className="text-slate-500 mt-2">오늘부터 이번 주까지 진행되는 모든 매치를 확인하세요.</p>
        </div>
        
        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => onSportChange('ALL')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
              selectedSport === 'ALL' 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'
            }`}
          >
            전체 종목
          </button>
          {Object.values(Sport).map(s => (
            <button
              key={s}
              onClick={() => onSportChange(s)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                selectedSport === s 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {dates.length > 0 ? (
          dates.map(date => {
            const dateMatches = filteredMatches.filter(m => m.date === date);
            if (dateMatches.length === 0) return null;
            
            return (
              <div key={date}>
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    {date}
                  </h3>
                  <div className="flex-1 h-px bg-slate-100"></div>
                </div>
                
                <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
                  <div className="divide-y divide-slate-100">
                    {dateMatches.map(match => (
                      <div key={match.id} className="px-8 hover:bg-slate-50/50 transition-colors">
                        <MatchCard match={match} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-32 text-center bg-white rounded-[32px] border border-dashed border-slate-200">
            <div className="text-6xl mb-6 grayscale opacity-20">🏟️</div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">검색 결과가 없습니다</h4>
            <p className="text-slate-400">필터를 변경하거나 다른 날짜를 선택해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesView;
