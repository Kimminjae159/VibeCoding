
import React from 'react';
import { Match, Post, Sport } from '../types.ts';
import MatchCard from '../components/MatchCard.tsx';

interface HomeViewProps {
  matches: Match[];
  posts: Post[];
  onViewAllMatches: () => void;
  onViewCommunity: () => void;
  onSelectSport: (s: Sport) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ matches, posts, onViewAllMatches, onViewCommunity, onSelectSport }) => {
  const sports = [
    { type: Sport.SOCCER, icon: '⚽' },
    { type: Sport.BASKETBALL, icon: '🏀' },
    { type: Sport.FUTSAL, icon: '👟' },
    { type: Sport.BADMINTON, icon: '🏸' },
    { type: Sport.TENNIS, icon: '🎾' },
  ];

  return (
    <div className="animate-in fade-in duration-700 space-y-12">
      {/* Main Banner */}
      <section>
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-800 h-64 md:h-80 flex items-center shadow-2xl shadow-indigo-100">
          <div className="relative z-10 px-10 md:px-16 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-4">New Match Open</span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              오늘 바로 뛸 수 있는<br />우리 동네 매치
            </h2>
            <p className="text-indigo-100 text-sm md:text-base mt-4 opacity-90">
              이미 2,400명이 넘는 유저들이 오늘 경기를 확정했습니다.<br className="hidden md:block" />
              지금 참여하고 실력을 증명하세요.
            </p>
            <button 
              onClick={onViewAllMatches}
              className="mt-8 px-8 py-3 bg-white text-indigo-600 rounded-full font-extrabold text-sm shadow-xl hover:scale-105 transition-transform"
            >
              매치 보러가기
            </button>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden md:flex items-center justify-center overflow-hidden">
             <div className="text-[280px] opacity-10 rotate-12 -mr-20">⚽</div>
          </div>
        </div>
      </section>

      {/* Sport Selector - Grid Layout */}
      <section>
        <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight px-2">종목별 매치 찾기</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {sports.map((s) => (
            <button
              key={s.type}
              onClick={() => onSelectSport(s.type)}
              className="flex flex-col items-center gap-4 p-6 bg-white rounded-3xl border border-slate-100 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-50 transition-all group"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <span className="text-sm font-bold text-slate-700">{s.type}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Popular Matches */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-end mb-6 px-2">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">마감 임박 인기 매치 🔥</h3>
              <p className="text-slate-400 text-sm mt-1">지금 가장 핫한 경기들이에요.</p>
            </div>
            <button onClick={onViewAllMatches} className="text-sm text-indigo-600 font-bold hover:underline">전체보기</button>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100">
              {matches.slice(0, 5).map(match => (
                <div key={match.id} className="px-6 hover:bg-slate-50 transition-colors">
                  <MatchCard match={match} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Community Preview */}
        <div className="lg:col-span-1">
          <div className="flex justify-between items-end mb-6 px-2">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">커뮤니티 소식</h3>
            <button onClick={onViewCommunity} className="text-sm text-indigo-600 font-bold hover:underline">더보기</button>
          </div>
          <div className="space-y-4">
            {posts.slice(0, 3).map(post => (
              <div key={post.id} className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer shadow-sm group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">{post.sport}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{post.timestamp}</span>
                </div>
                <p className="text-sm text-slate-700 font-bold line-clamp-3 leading-relaxed mb-4 group-hover:text-indigo-600 transition-colors">
                  {post.content}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">by {post.author}</span>
                  <div className="flex gap-3 text-[10px] font-black text-slate-400">
                    <span>👍 {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="p-6 bg-slate-900 rounded-3xl text-white overflow-hidden relative group cursor-pointer">
              <div className="relative z-10">
                <h4 className="font-bold mb-1">우리 팀을 홍보하세요!</h4>
                <p className="text-slate-400 text-xs">매칭을 기다리는 팀원을 찾아보세요.</p>
              </div>
              <div className="absolute -right-2 -bottom-2 text-5xl opacity-20 group-hover:scale-110 transition-transform">⚽</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
