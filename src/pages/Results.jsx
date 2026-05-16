import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Package, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import BoycottBadge from '@/components/product/BoycottBadge';
import AlternativeCard from '@/components/product/AlternativeCard';
import { products, alternatives } from '@/data/db';

const categoryLabels = {
  food: 'طعام', beverages: 'مشروبات', personal_care: 'عناية شخصية',
  cleaning: 'تنظيف', snacks: 'وجبات خفيفة', dairy: 'ألبان', other: 'أخرى',
};

export default function Results() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const barcode = urlParams.get('barcode');

  const product = products.find(p => p.barcode === barcode);
  const productAlternatives = product
    ? alternatives.filter(a => a.replaces_category === product.category)
    : [];

  if (!product) {
    return (
      <div className="px-4 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
            <ArrowRight className="w-5 h-5" />
          </Button>
          <h1 className="font-cairo font-bold text-xl">نتيجة البحث</h1>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
          <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
            <Package className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="font-cairo font-bold text-lg mb-2">المنتج غير موجود</h2>
          <p className="font-cairo text-sm text-muted-foreground mb-1">الباركود: <span dir="ltr">{barcode}</span></p>
          <p className="font-cairo text-sm text-muted-foreground mb-6">هذا المنتج غير مسجل في قاعدة البيانات بعد</p>
          <Button onClick={() => navigate('/scan')} className="font-cairo gap-2">
            <RefreshCw className="w-4 h-4" />مسح منتج آخر
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-4">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
          <ArrowRight className="w-5 h-5" />
        </Button>
        <h1 className="font-cairo font-bold text-xl">نتيجة البحث</h1>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className={`p-5 border-2 ${product.is_boycotted ? 'border-destructive/30 bg-destructive/5' : 'border-primary/30 bg-primary/5'}`}>
          <div className="text-center mb-4"><BoycottBadge isBoycotted={product.is_boycotted} /></div>
          <div className="text-center">
            {product.image_url && <img src={product.image_url} alt={product.name_ar} className="w-24 h-24 mx-auto rounded-xl object-cover mb-3" />}
            <h2 className="font-cairo font-extrabold text-xl">{product.name_ar}</h2>
            {product.name_en && <p className="font-inter text-sm text-muted-foreground mt-0.5" dir="ltr">{product.name_en}</p>}
            <div className="flex items-center justify-center gap-2 mt-2 flex-wrap">
              {product.brand && <Badge variant="secondary" className="font-cairo text-xs">{product.brand}</Badge>}
              {product.category && <Badge variant="outline" className="font-cairo text-xs">{categoryLabels[product.category]}</Badge>}
              {product.country_of_origin && <Badge variant="outline" className="font-cairo text-xs">{product.country_of_origin}</Badge>}
            </div>
          </div>
          {product.is_boycotted && product.boycott_reason && (
            <div className="mt-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
              <p className="font-cairo text-sm text-destructive font-semibold">سبب المقاطعة:</p>
              <p className="font-cairo text-sm text-foreground mt-1">{product.boycott_reason}</p>
            </div>
          )}
          <p className="text-center mt-3 font-inter text-xs text-muted-foreground" dir="ltr">Barcode: {product.barcode}</p>
        </Card>
      </motion.div>

      {product.is_boycotted && (
        <div className="mt-6">
          <h2 className="font-cairo font-bold text-base mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />البدائل المتاحة
          </h2>
          {productAlternatives.length > 0 ? (
            <div className="space-y-3">
              {productAlternatives.map((alt, i) => <AlternativeCard key={alt.id} alternative={alt} index={i} />)}
            </div>
          ) : (
            <Card className="p-6 text-center">
              <p className="font-cairo text-sm text-muted-foreground">لا توجد بدائل مسجلة لهذا المنتج حالياً</p>
            </Card>
          )}
        </div>
      )}
      <div className="mt-6">
        <Button onClick={() => navigate('/scan')} variant="outline" className="w-full font-cairo gap-2">
          <RefreshCw className="w-4 h-4" />مسح منتج آخر
        </Button>
      </div>
    </div>
  );
}