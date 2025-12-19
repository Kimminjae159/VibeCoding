
import React from 'react';
import { GameReport, PlayerStats } from '../types';
import TierBadge from './TierBadge';
import StatRadar from './StatRadar';

interface ReportViewProps {
  report: GameReport;
  onReset: () => void;
}

const ReportView: React.FC<ReportViewProps> = ({ report, onReset }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={onReset}
              className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-all"
            >
              ← 다시 분석하기
            </button>
            <span className="text-indigo-600 font-black text-[10px] tracking-widest uppercase bg-indigo-50 px-2 py-1 rounded">SCOUTING REPORT</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-6">{report.title}</h1>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center shadow-sm">
              <div className="text-slate-400 text-[10px] font-black mb-1 uppercase tracking-wider">TEAM A</div>
              <div className="text-5xl font-black text-slate-900">{report.teamAScore}</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-2xl font-black text-slate-300 italic">VS</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center shadow-sm">
              <div className="text-slate-400 text-[10px] font-black mb-1 uppercase tracking-wider">TEAM B</div>
              <div className="text-5xl font-black text-slate-900">{report.teamBScore}</div>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-[32px]">
            <h3 className="text-indigo-600 font-black text-sm mb-3 flex items-center gap-2">
              <span>🤖</span> AI 종합 평가
            </h3>
            <p className="text-indigo-900/80 leading-relaxed font-medium text-sm">{report.gameSummary}</p>
          </div>
        </div>

        <div className="w-full md:w-96">
           <div className="aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 mb-6">
             <iframe
               width="100%"
               height="100%"
               src={`https://www.youtube.com/embed/${report.videoId}`}
               title="YouTube video player"
               frameBorder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
             ></iframe>
           </div>
           <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="text-slate-900 font-black text-sm mb-4 flex items-center gap-2">
                <span>🔥</span> 주요 하이라이트
              </h4>
              <div className="space-y-3">
                {report.highlights.map((h, i) => (
                  <div key={i} className="flex gap-3 group cursor-pointer p-2 hover:bg-slate-50 rounded-xl transition-colors">
                    <span className="text-indigo-600 font-black text-xs min-w-[45px]">{h.timestamp}</span>
                    <span className="text-slate-600 text-xs font-bold leading-tight">{h.description}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">MATCH MVP</h2>
        <div className="bg-white border border-indigo-200 p-8 rounded-[40px] relative overflow-hidden group shadow-xl shadow-indigo-50">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 blur-[100px] -z-10 group-hover:bg-indigo-500/10 transition-all"></div>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-32 h-32 bg-indigo-50 rounded-3xl flex items-center justify-center text-5xl border border-indigo-100 shadow-inner">👤</div>
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                <h3 className="text-3xl font-black text-slate-900">{report.mvp}</h3>
                <TierBadge tier={report.players.find(p => p.name === report.mvp)?.tier || report.players[0].tier} />
              </div>
              <p className="text-slate-500 max-w-xl italic font-medium leading-relaxed">
                "{report.players.find(p => p.name === report.mvp)?.feedback}"
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
                <StatRadar stats={{
                  points: report.players.find(p => p.name === report.mvp)?.points || 0,
                  rebounds: report.players.find(p => p.name === report.mvp)?.rebounds || 0,
                  assists: report.players.find(p => p.name === report.mvp)?.assists || 0,
                  defense: (report.players.find(p => p.name === report.mvp)?.blocks || 0) + (report.players.find(p => p.name === report.mvp)?.steals || 0),
                  efficiency: report.players.find(p => p.name === report.mvp)?.efficiency || 0
                }} size={180} />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12 overflow-hidden">
        <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">PLAYER PERFORMANCE</h2>
        <div className="bg-white border border-slate-200 rounded-[32px] overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">선수</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">티어</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">PTS</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">REB</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">AST</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">BLK</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">STL</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">EFF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {report.players.map((player, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-sm border border-slate-200">👤</div>
                      <span className="font-bold text-slate-900">{player.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <TierBadge tier={player.tier} />
                  </td>
                  <td className="px-8 py-5 text-center font-black text-indigo-600">{player.points}</td>
                  <td className="px-8 py-5 text-center text-slate-500 font-bold">{player.rebounds}</td>
                  <td className="px-8 py-5 text-center text-slate-500 font-bold">{player.assists}</td>
                  <td className="px-8 py-5 text-center text-slate-500 font-bold">{player.blocks}</td>
                  <td className="px-8 py-5 text-center text-slate-500 font-bold">{player.steals}</td>
                  <td className="px-8 py-5 text-center">
                    <span className="bg-slate-900 text-white px-3 py-1 rounded-lg font-mono text-xs font-bold">{player.efficiency}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportView;
