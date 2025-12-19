
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
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={onReset}
              className="px-4 py-1 rounded-full bg-slate-800 text-slate-400 text-sm hover:bg-slate-700 transition-colors"
            >
              ← 다시 분석하기
            </button>
            <span className="text-indigo-400 font-bold text-sm tracking-widest uppercase">SCOUTING REPORT</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-6">{report.title}</h1>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 text-center">
              <div className="text-slate-400 text-xs font-bold mb-1 uppercase tracking-wider">TEAM A</div>
              <div className="text-5xl font-black text-white">{report.teamAScore}</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-4xl font-black text-slate-700">VS</div>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 text-center">
              <div className="text-slate-400 text-xs font-bold mb-1 uppercase tracking-wider">TEAM B</div>
              <div className="text-5xl font-black text-white">{report.teamBScore}</div>
            </div>
          </div>

          <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-3xl">
            <h3 className="text-indigo-400 font-bold mb-2 flex items-center gap-2">
              <span>🤖</span> AI 종합 평가
            </h3>
            <p className="text-slate-300 leading-relaxed">{report.gameSummary}</p>
          </div>
        </div>

        <div className="w-full md:w-96">
           <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-700 mb-4">
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
           <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <span>🔥</span> 주요 하이라이트
              </h4>
              <div className="space-y-4">
                {report.highlights.map((h, i) => (
                  <div key={i} className="flex gap-3 group cursor-pointer">
                    <span className="text-indigo-400 font-mono text-sm group-hover:underline">{h.timestamp}</span>
                    <span className="text-slate-400 text-sm group-hover:text-slate-200 transition-colors">{h.description}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>

      {/* MVP Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">MATCH MVP</h2>
        <div className="bg-gradient-to-r from-indigo-900/40 to-slate-800/40 border border-indigo-500/30 p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -z-10 group-hover:bg-indigo-500/20 transition-all"></div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-slate-700 rounded-full flex items-center justify-center text-5xl border-4 border-indigo-500 shadow-xl">
              👤
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <h3 className="text-3xl font-black text-white">{report.mvp}</h3>
                <TierBadge tier={report.players.find(p => p.name === report.mvp)?.tier || report.players[0].tier} />
              </div>
              <p className="text-slate-300 max-w-xl italic">
                "{report.players.find(p => p.name === report.mvp)?.feedback}"
              </p>
            </div>
            <div className="flex-1 flex justify-center md:justify-end">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 px-4 py-2 rounded-xl text-center">
                    <div className="text-xs text-slate-500 font-bold uppercase">EFFICIENCY</div>
                    <div className="text-xl font-black text-indigo-400">{report.players.find(p => p.name === report.mvp)?.efficiency}</div>
                  </div>
                  <div className="bg-slate-900/50 px-4 py-2 rounded-xl text-center">
                    <div className="text-xs text-slate-500 font-bold uppercase">POINTS</div>
                    <div className="text-xl font-black text-white">{report.players.find(p => p.name === report.mvp)?.points}</div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Table */}
      <div className="mb-12 overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-6">PLAYER PERFORMANCE</h2>
        <div className="bg-slate-800/30 border border-slate-700 rounded-3xl overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">이름</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">티어</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">득점</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">REB</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">AST</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">BLK</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">STL</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">TO</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">EFF</th>
              </tr>
            </thead>
            <tbody>
              {report.players.map((player, i) => (
                <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">👤</div>
                      <span className="font-bold text-slate-200">{player.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <TierBadge tier={player.tier} />
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-indigo-400">{player.points}</td>
                  <td className="px-6 py-4 text-center text-slate-400">{player.rebounds}</td>
                  <td className="px-6 py-4 text-center text-slate-400">{player.assists}</td>
                  <td className="px-6 py-4 text-center text-slate-400">{player.blocks}</td>
                  <td className="px-6 py-4 text-center text-slate-400">{player.steals}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{player.turnovers}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-slate-900 px-2 py-1 rounded font-mono text-sm text-cyan-400">{player.efficiency}</span>
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
