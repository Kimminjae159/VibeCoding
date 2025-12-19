
import React, { useState, useEffect } from 'react';

const LoadingView: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "AI가 경기 영상을 정밀하게 스캔하고 있습니다...",
    "선수들의 움직임과 주요 스탯을 추출 중입니다...",
    "데이터를 기반으로 최적의 티어를 산출하고 있습니다...",
    "당신만을 위한 개인화된 스카우팅 리포트를 작성 중입니다...",
    "거의 다 되었습니다! 잠시만 기다려주세요."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-40 animate-in fade-in duration-700">
      <div className="relative w-24 h-24 mb-10">
        <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl animate-pulse"></div>
        </div>
      </div>
      <h2 className="text-2xl font-black text-slate-900 mb-4">AI 분석 진행 중</h2>
      <p className="text-slate-400 text-lg transition-all duration-500 font-bold tracking-tight">
        "{messages[messageIndex]}"
      </p>
      <div className="mt-12 max-w-md w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div className="bg-indigo-600 h-full animate-[loading_15s_ease-in-out_infinite]"></div>
      </div>
      <style>{`
        @keyframes loading {
          0% { width: 0% }
          50% { width: 70% }
          100% { width: 95% }
        }
      `}</style>
    </div>
  );
};

export default LoadingView;
