import React from 'react';
import { Link } from 'react-router-dom';
import { ScanLine, Search, ShoppingBag, TrendingUp, ShieldAlert, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard';
import { products } from '@/data/db';

export default function Home() {
  const recentProducts = products.slice(0, 3);
  const boycottedCount = products.filter(p => p.is_boycotted).length;

  return (
    <div className="px-4 pt-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-3">
          <ShieldAlert className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-cairo font-extrabold text-2xl text-foreground">مقاطعة ليبيا</h1>
        <p className="font-cairo text-sm text-muted-foreground mt-1">امسح المنتج واعرف إذا كان مقاطع أو لا</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
        <Link to="/scan">
          <Card className="bg-gradient-to-bl from-primary to-primary/80 p-6 text-primary-foreground text-center hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-3">
              <ScanLine className="w-7 h-7" />
            </div>
            <h2 className="font-cairo font-bold text-lg">امسح الباركود</h2>
            <p className="font-cairo text-sm opacity-80 mt-1">وجه الكاميرا على باركود المنتج</p>
          </Card>
        </Link>
      </motion.div>

      <div className="grid grid-cols-3 gap-3 mt-5">
        {[
          { icon: ShieldAlert, value: boycottedCount, label: 'منتج مقاطع', color: 'text-destructive bg-destructive/10' },
          { icon: ShoppingBag, value: products.length, label: 'منتج مسجل', color: 'text-primary bg-primary/10' },
          { icon: Users, value: '🇱🇾', label: 'صنع في ليبيا', color: 'text-accent-foreground bg-accent' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}>
            <Card className="p-3 text-center">
              <div className={`w-9 h-9 mx-auto rounded-xl flex items-center justify-center mb-1.5 ${stat.color}`}>
                {typeof stat.value === 'string' ? <span className="text-lg">{stat.value}</span> : <stat.icon className="w-4.5 h-4.5" />}
              </div>
              <p className="font-cairo font-bold text-lg leading-tight">{typeof stat.value === 'number' ? stat.value : ''}</p>
              <p className="font-cairo text-[10px] text-muted-foreground">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-5">
        <Link to="/products">
          <Card className="p-4 hover:shadow-md transition-all flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
              <Search className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h3 className="font-cairo font-bold text-sm">المنتجات المقاطعة</h3>
              <p className="font-cairo text-[10px] text-muted-foreground">تصفح القائمة</p>
            </div>
          </Card>
        </Link>
        <Link to="/alternatives">
          <Card className="p-4 hover:shadow-md transition-all flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-cairo font-bold text-sm">البدائل المحلية</h3>
              <p className="font-cairo text-[10px] text-muted-foreground">منتجات ليبية</p>
            </div>
          </Card>
        </Link>
      </div>

      {recentProducts.length > 0 && (
        <div className="mt-6 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-cairo font-bold text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              آخر المنتجات المضافة
            </h2>
            <Link to="/products" className="font-cairo text-xs text-primary font-semibold">عرض الكل</Link>
          </div>
          <div className="space-y-2">
            {recentProducts.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}