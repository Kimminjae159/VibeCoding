
import React, { useState, useEffect } from 'react';
import { ViewState, Match, Post, Sport, GameReport, Tier } from './types.ts';
import HomeView from './views/HomeView.tsx';
import MatchesView from './views/MatchesView.tsx';
import CommunityView from './views/CommunityView.tsx';
import LandingView from './components/LandingView.tsx';
import LoadingView from './components/LoadingView.tsx';
import ReportView from './components/ReportView.tsx';
import { getAiMatchRecommendations, getCommunityFeed, analyzeYoutubeVideo } from './services/geminiService.ts';

// 고품질 초기 데이터 (AI 응답 대기 중 또는 에러 시 표시)
const INITIAL_MATCHES: Match[] = [
  { id: '1', sport: Sport.FUTSAL, title: '판교 IT 직장인 친목 풋살', location: '판교 킹 풋살장', date: '오늘', time: '20:00', currentPlayers: 10, maxPlayers: 12, tier: Tier.AMATEUR, price: 10000, isHot: true },
  { id: '2', sport: Sport.BASKETBALL, title: '강남 실내 코트 3:3', location: '역삼 멀티코트', date: '오늘', time: '19:30', currentPlayers: 5, maxPlayers: 6, tier: Tier.PRO, price: 15000, isHot: true },
  { id: '3', sport: Sport.SOCCER, title: '강북구 일요 축구 대회', location: '도봉산 축구장', date: '내일', time: '08:00', currentPlayers: 20, maxPlayers: 22, tier: Tier.AMATEUR, price: 8000 },
];

const INITIAL_POSTS: Post[] = [
  { id: 'p1', author: '슛도리김씨', sport: Sport.SOCCER, content: '방금 강남역 근처 구장에서 경기 뛰고 왔는데 여기 샤워실 정말 깨끗하네요! 강력 추천합니다.', timestamp: '방금 전', likes: 24, comments: 8, stadiumInfo: '강남 스카이 풋살파크', playStyles: ['매너겜', '공격적'] },
  { id: 'p2', author: '덩크마스터', sport: Sport.BASKETBALL, content: '요즘 날씨 추운데 실내 농구장 정보 공유합니다. 판교 근처에 새로 생긴 곳 시설 대박이에요.', timestamp: '10분 전', likes: 15, comments: 4, stadiumInfo: '판교 테크노 농구관', playStyles: ['실내코트', '친목'] },
];

const App: React.FC = () => {
  const [view, setView] = useState<ViewState | 'SCOUTING'>('HOME');
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [loading, setLoading] = useState(false);
  const [selectedSport, setSelectedSport] = useState<Sport | 'ALL'>('ALL');
  
  // Scouting Analysis States
  const [analysisStatus, setAnalysisStatus] = useState<'IDLE' | 'LOADING' | 'REPORT'>('IDLE');
  const [currentReport, setCurrentReport] = useState<GameReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // 이미 초기 데이터가 있으므로 로딩 바를 띄우지 않고 백그라운드에서 업데이트
    try {
      const [m, p] = await Promise.all([
        getAiMatchRecommendations("최신 트렌드 스포츠 매치"),
        getCommunityFeed()
      ]);
      
      // 데이터가 정상적으로 왔을 때만 업데이트
      if (m && m.length > 0) setMatches(m);
      if (p && p.length > 0) setPosts(p);
    } catch (err) {
      console.error("데이터 업데이트 실패, 초기 데이터를 유지합니다.", err);
    }
  };

  const handleStartAnalysis = async (url: string) => {
    setAnalysisStatus('LOADING');
    setError(null);
    try {
      const report = await analyzeYoutubeVideo(url);
      setCurrentReport(report);
      setAnalysisStatus('REPORT');
    } catch (err) {
      setError("AI가 영상을 분석하는 데 실패했습니다. 유튜브 링크가 올바른지 확인해주세요.");
      setAnalysisStatus('IDLE');
    }
  };

  const NavLink = ({ id, label }: { id: ViewState | 'SCOUTING', label: string }) => (
    <button
      onClick={() => setView(id)}
      className={`px-4 py-2 text-sm font-bold transition-all border-b-2 ${
        view === id 
          ? 'text-indigo-600 border-indigo-600' 
          : 'text-slate-500 border-transparent hover:text-slate-800'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('HOME')}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white italic text-base shadow-lg shadow-indigo-200">S</div>
              <span className="text-xl font-black tracking-tighter text-indigo-600">ScoutPick</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-4 h-16">
              <NavLink id="HOME" label="홈" />
              <NavLink id="SCOUTING" label="AI 스카우팅" />
              <NavLink id="MATCHES" label="소셜 매치" />
              <NavLink id="COMMUNITY" label="커뮤니티" />
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block p-2 text-slate-500 hover:text-indigo-600 transition-colors">🔍</button>
            <button onClick={() => setView('MYPAGE')} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${view === 'MYPAGE' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              로그인 / 가입
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {view === 'HOME' && (
          <HomeView 
            matches={matches} 
            posts={posts} 
            onViewAllMatches={() => setView('MATCHES')}
            onViewCommunity={() => setView('COMMUNITY')}
            onSelectSport={(s) => { setSelectedSport(s); setView('MATCHES'); }}
          />
        )}
        
        {view === 'SCOUTING' && (
          <div className="py-4">
            {analysisStatus === 'IDLE' && <LandingView onAnalyze={handleStartAnalysis} error={error} />}
            {analysisStatus === 'LOADING' && <LoadingView />}
            {analysisStatus === 'REPORT' && currentReport && <ReportView report={currentReport} onReset={() => setAnalysisStatus('IDLE')} />}
          </div>
        )}

        {view === 'MATCHES' && <MatchesView matches={matches} selectedSport={selectedSport} onSportChange={setSelectedSport} />}
        {view === 'COMMUNITY' && <CommunityView posts={posts} />}
        {view === 'MYPAGE' && (
          <div className="py-20 text-center animate-in fade-in duration-500 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-md mx-auto">
             <div className="w-24 h-24 bg-indigo-50 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-inner">👤</div>
             <h2 className="text-2xl font-black text-slate-900">반가워요!</h2>
             <p className="text-slate-500 text-sm mt-3 px-10 leading-relaxed">로그인하시면 나만의 매치 일정과 커뮤니티 활동을 한눈에 관리할 수 있습니다.</p>
             <div className="mt-8 px-8 space-y-3">
               <button className="w-full py-3 bg-[#FEE500] text-[#191919] rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">카카오로 3초만에 시작하기</button>
               <button className="w-full py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors">다른 방법으로 로그인</button>
             </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2 mb-4">
               <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center font-black text-white italic text-xs">S</div>
               <span className="text-lg font-black tracking-tighter text-indigo-600">ScoutPick</span>
             </div>
             <p className="text-slate-400 text-sm leading-relaxed max-w-sm">아마추어 스포츠인들을 위한 데이터 기반 매칭 및 분석 플랫폼.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">서비스</h4>
            <ul className="text-slate-500 text-sm space-y-2">
              <li className="hover:text-indigo-600 cursor-pointer">소셜 매치</li>
              <li className="hover:text-indigo-600 cursor-pointer">커뮤니티</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">고객센터</h4>
            <ul className="text-slate-500 text-sm space-y-2">
              <li className="hover:text-indigo-600 cursor-pointer">자주 묻는 질문</li>
              <li className="hover:text-indigo-600 cursor-pointer">공지사항</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-slate-100 text-slate-400 text-xs">
          © 2024 ScoutPick Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
