import React from 'react';
import { Flame, TrendingUp, CheckCircle2, Zap } from 'lucide-react';

interface Props {
  score: number;
}

export function OpportunityBadge({ score }: Props) {
  if (score >= 70) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-200/80 animate-pulse">
        <Flame className="w-3.5 h-3.5 fill-white text-white" />
        Alta Oportunidade ({score}%)
      </span>
    );
  }

  if (score >= 40) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-sm shadow-amber-100">
        <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
        Média Oportunidade ({score}%)
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-sm shadow-emerald-100">
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
      Estruturado ({score}%)
    </span>
  );
}
