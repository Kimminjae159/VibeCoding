
import React from 'react';
import { Tier } from '../types';

interface TierBadgeProps {
  tier: Tier;
}

const TierBadge: React.FC<TierBadgeProps> = ({ tier }) => {
  const getStyles = () => {
    switch (tier) {
      case Tier.STARTER: return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case Tier.BEGINNER: return 'bg-cyan-50 text-cyan-600 border-cyan-100';
      case Tier.AMATEUR: return 'bg-amber-50 text-amber-600 border-amber-100';
      case Tier.PRO: return 'bg-indigo-50 text-indigo-600 border-indigo-100 font-black';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStyles()}`}>
      {tier}
    </span>
  );
};

export default TierBadge;
