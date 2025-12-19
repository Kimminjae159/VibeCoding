
import React from 'react';
import { Post } from '../types';

interface CommunityViewProps {
  posts: Post[];
}

const CommunityView: React.FC<CommunityViewProps> = ({ posts }) => {
  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex justify-between items-end mb-10 px-2">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">커뮤니티</h2>
          <p className="text-slate-500 mt-2">스포츠를 사랑하는 사람들의 공간입니다.</p>
        </div>
        <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl text-sm font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
          게시글 작성하기
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-8">
          {posts.map(post => (
            <div key={post.id} className="bg-white border border-slate-200 rounded-[32px] p-8 hover:shadow-xl hover:shadow-slate-100 transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-xl border border-indigo-100 text-indigo-500">👤</div>
                <div>
                  <div className="font-black text-slate-900 flex items-center gap-3">
                    {post.author}
                    <span className="text-[10px] font-black px-2.5 py-1 bg-indigo-600/5 text-indigo-600 rounded-full border border-indigo-600/10 uppercase tracking-widest">
                      {post.sport}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{post.timestamp}</div>
                </div>
              </div>

              <p className="text-slate-700 text-lg leading-relaxed mb-6 whitespace-pre-line font-medium">
                {post.content}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Stadium Info Box */}
                {post.stadiumInfo && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-indigo-50/30 group-hover:border-indigo-100 transition-colors">
                    <div className="flex items-start gap-3">
                      <span className="text-indigo-500 text-lg">📍</span>
                      <div className="flex-1">
                        <p className="text-[11px] font-black text-slate-400 uppercase mb-1">구장 정보</p>
                        <p className="text-xs text-slate-700 font-bold">{post.stadiumInfo}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Play Style Tags */}
                {post.playStyles && post.playStyles.length > 0 && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-indigo-50/30 group-hover:border-indigo-100 transition-colors">
                    <p className="text-[11px] font-black text-slate-400 uppercase mb-2">플레이 스타일</p>
                    <div className="flex flex-wrap gap-2">
                      {post.playStyles.map((style, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white border border-slate-200 text-slate-500 rounded-lg text-[10px] font-black">
                          #{style}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-8 text-xs font-black text-slate-400 pt-6 border-t border-slate-50">
                <button className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                  <span className="text-base">👍</span> 좋아요 {post.likes}
                </button>
                <button className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                  <span className="text-base">💬</span> 댓글 {post.comments}
                </button>
                <button className="ml-auto hover:text-slate-800 transition-colors">공유하기</button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-indigo-600 rounded-[32px] p-8 text-white shadow-xl shadow-indigo-100">
             <h3 className="text-xl font-black mb-3 italic">ScoutPick Premium</h3>
             <p className="text-indigo-100 text-sm leading-relaxed mb-6">
               프리미엄 멤버십으로 매칭 우선권과 상세 분석 리포트를 무제한으로 이용하세요.
             </p>
             <button className="w-full py-3 bg-white text-indigo-600 rounded-2xl font-black text-sm hover:scale-105 transition-transform">
               멤버십 혜택 보기
             </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
             <h3 className="text-lg font-black text-slate-900 mb-6 tracking-tight">인기 태그</h3>
             <div className="flex flex-wrap gap-2">
               {['#매너겜', '#빡겜환영', '#초보가능', '#샤워시설완비', '#주차무료', '#선출환영', '#주말농구'].map(tag => (
                 <span key={tag} className="px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors">
                   {tag}
                 </span>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityView;
