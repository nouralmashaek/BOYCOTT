import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Tag } from 'lucide-react';
import HealthScoreBadge from './HealthScoreBadge';
import { motion } from 'framer-motion';

const categoryLabels = {
  food: 'طعام',
  beverages: 'مشروبات',
  personal_care: 'عناية شخصية',
  cleaning: 'تنظيف',
  snacks: 'وجبات خفيفة',
  dairy: 'ألبان',
  other: 'أخرى',
};

export default function AlternativeCard({ alternative, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
    >
      <Card className="p-4 hover:shadow-lg transition-all duration-300 border-border/60">
        <div className="flex gap-3">
          <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center shrink-0 overflow-hidden">
            {alternative.image_url ? (
              <img src={alternative.image_url} alt={alternative.name_ar} className="w-full h-full object-cover" />
            ) : (
              <Tag className="w-6 h-6 text-primary/40" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-cairo font-bold text-sm text-foreground leading-tight">{alternative.name_ar}</h3>
                {alternative.brand && (
                  <p className="text-xs text-muted-foreground mt-0.5">{alternative.brand}</p>
                )}
              </div>
              <div className="text-left shrink-0">
                <span className="font-cairo font-bold text-primary text-base">
                  {alternative.price_lyd}
                </span>
                <span className="text-xs text-muted-foreground mr-0.5">د.ل</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <HealthScoreBadge score={alternative.health_score} />
              {alternative.is_libyan && (
                <Badge variant="secondary" className="text-[10px] font-cairo gap-1 bg-primary/5 text-primary border-primary/10">
                  🇱🇾 ليبي
                </Badge>
              )}
              <Badge variant="outline" className="text-[10px] font-cairo">
                {categoryLabels[alternative.category] || alternative.category}
              </Badge>
            </div>
            {alternative.available_in && (
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{alternative.available_in}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}