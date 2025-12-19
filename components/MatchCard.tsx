
import React from 'react';
import { Match, Tier } from '../types.ts';
import TierBadge from './TierBadge.tsx';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const isFull = match.currentPlayers >= match.maxPlayers;
  const isClosing = !isFull && (match.maxPlayers - match.currentPlayers) <= 2;

  return (
    <div className="py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 cursor-pointer group">
      {/* Time column */}
      <div className="flex flex-col items-center justify-center min-w-[70px]">
        <span className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{match.time}</span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{match.sport}</span>
      </div>
      
      {/* Content column */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1.5">
          <h4 className="text-lg font-black text-slate-900 truncate tracking-tight">{match.title}</h4>
          {isClosing && <span className="text-[10px] font-black bg-red-50 text-red-500 px-2 py-0.5 rounded-full border border-red-100">마감 임박</span>}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-slate-500 text-xs">
          <div className="flex items-center gap-1 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-bold">
            <span className="text-sm">📍</span>
            {match.location}
          </div>
          <TierBadge tier={match.tier} />
          <span className="text-slate-300 font-bold">|</span>
          <span className="font-bold text-slate-900">{match.price.toLocaleString()}원</span>
        </div>
      </div>

      {/* Status column */}
      <div className="flex items-center gap-6 self-end sm:self-center">
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 mb-1">
             <div className="flex -space-x-2">
                {[...Array(Math.min(match.currentPlayers, 4))].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[8px]">👤</div>
                ))}
                {match.currentPlayers > 4 && (
                  <div className="w-6 h-6 rounded-full bg-indigo-50 border-2 border-white flex items-center justify-center text-[8px] font-bold text-indigo-400">+{match.currentPlayers - 4}</div>
                )}
             </div>
             <span className={`text-sm font-black ${isFull ? 'text-slate-300' : 'text-slate-900'}`}>
               {match.currentPlayers}/{match.maxPlayers} 명
             </span>
          </div>
          <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-700 ${isFull ? 'bg-slate-300' : isClosing ? 'bg-red-400' : 'bg-indigo-500'}`} 
              style={{ width: `${(match.currentPlayers / match.maxPlayers) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <button className={`hidden md:block px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
          isFull 
          ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
        }`}>
          {isFull ? '매칭 마감' : '신청하기'}
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
