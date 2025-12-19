
import React, { useState } from 'react';

interface LandingViewProps {
  onAnalyze: (url: string) => void;
  error: string | null;
}

const LandingView: React.FC<LandingViewProps> = ({ onAnalyze, error }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold tracking-wide">
        AMATEUR SPORTS AI REVOLUTION
      </div>
      <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
        당신의 땀방울을<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">숫자로 증명하라</span>
      </h1>
      <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12 font-medium">
        유튜브 경기 영상만 있으면 AI가 자동으로 개인 스탯 분석, 하이라이트 추출,<br className="hidden md:block" />
        그리고 당신의 실력을 '티어'로 검증해 드립니다.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl">
        <div className="relative group">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="유튜브 경기 영상 링크를 입력하세요 (예: https://youtube.com/watch?v=...)"
            className="w-full px-6 py-5 rounded-2xl bg-slate-800/50 border-2 border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all text-lg shadow-2xl group-hover:border-slate-600"
          />
          <button
            type="submit"
            className="absolute right-3 top-3 bottom-3 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20"
          >
            분석하기
          </button>
        </div>
        {error && <p className="mt-4 text-red-400 font-medium">{error}</p>}
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full">
        {[
          { icon: '📊', title: 'AI 스카우팅 리포트', desc: '활동량, 성공률 등 핵심 지표를 정밀 분석' },
          { icon: '🏅', title: '검증 기반 티어 시스템', desc: '데이터로 증명하는 객관적인 내 실력' },
          { icon: '🤝', title: '밸런스 매칭', desc: '내 티어에 딱 맞는 상대 팀을 자동 추천' },
        ].map((feature, i) => (
          <div key={i} className="bg-slate-800/30 border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-800/50 transition-colors text-left group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{feature.icon}</div>
            <h3 className="text-white font-bold text-xl mb-2">{feature.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingView;
