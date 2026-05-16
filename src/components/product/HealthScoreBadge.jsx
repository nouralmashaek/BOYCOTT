import React from 'react';
import { Heart } from 'lucide-react';

export default function HealthScoreBadge({ score }) {
  const getColor = () => {
    if (score >= 8) return 'text-primary bg-primary/10';
    if (score >= 5) return 'text-yellow-600 bg-yellow-50';
    return 'text-destructive bg-destructive/10';
  };

  const getLabel = () => {
    if (score >= 8) return 'ممتاز';
    if (score >= 6) return 'جيد';
    if (score >= 4) return 'متوسط';
    return 'ضعيف';
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-cairo font-semibold ${getColor()}`}>
      <Heart className="w-3.5 h-3.5" />
      <span>{score}/10</span>
      <span className="opacity-70">({getLabel()})</span>
    </div>
  );
}