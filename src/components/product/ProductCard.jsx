import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, ShieldCheck, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
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

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
    >
      <Link to={`/result?barcode=${product.barcode}`}>
        <Card className="p-3.5 hover:shadow-md transition-all duration-200 border-border/60">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              product.is_boycotted ? 'bg-destructive/10' : 'bg-primary/10'
            }`}>
              {product.is_boycotted ? (
                <ShieldAlert className="w-5 h-5 text-destructive" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-primary" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-cairo font-bold text-sm truncate">{product.name_ar}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground">{product.brand}</span>
                <Badge variant="outline" className="text-[10px] font-cairo px-1.5 py-0">
                  {categoryLabels[product.category] || product.category}
                </Badge>
              </div>
            </div>
            <ChevronLeft className="w-4 h-4 text-muted-foreground shrink-0" />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}